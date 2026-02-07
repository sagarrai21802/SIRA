// API Utilities with retry logic and timeout protection

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Fetch with timeout, retry logic, and exponential backoff
 * @param url - The URL to fetch
 * @param options - Fetch options including timeout, retries, and retryDelay
 * @returns Promise<Response>
 */
export async function fetchWithRetry(
  url: string, 
  options: FetchOptions = {}
): Promise<Response> {
  const { 
    timeout = 10000, 
    retries = 3, 
    retryDelay = 1000,
    ...fetchOptions 
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // If we get a 5xx error, retry
      if (response.status >= 500 && response.status < 600 && attempt < retries - 1) {
        const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
        console.warn(`Server error ${response.status}, retrying in ${delay}ms... (attempt ${attempt + 1}/${retries})`);
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error: any) {
      lastError = error;
      
      // Don't retry if it's not a network error or timeout
      if (error.name !== 'AbortError' && error.name !== 'TypeError') {
        throw error;
      }

      // If this is the last attempt, throw the error
      if (attempt === retries - 1) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timed out after ${timeout}ms`);
        }
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const baseDelay = retryDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 1000; // Add up to 1 second of randomness
      const delay = baseDelay + jitter;
      
      console.warn(`Request failed, retrying in ${Math.round(delay)}ms... (attempt ${attempt + 1}/${retries})`);
      await sleep(delay);
    }
  }

  throw lastError || new Error('Request failed after retries');
}

/**
 * Simple sleep function
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch multiple requests in parallel with individual retry logic
 * @param requests - Array of {url, options} objects
 * @returns Promise<Response[]>
 */
export async function fetchParallel(
  requests: Array<{ url: string; options?: FetchOptions }>
): Promise<Response[]> {
  return Promise.all(
    requests.map(({ url, options }) => fetchWithRetry(url, options))
  );
}

/**
 * Pre-warm the API server to prevent cold start delays
 * Call this on app initialization or before critical operations
 */
export async function warmUpServer(apiBase: string): Promise<void> {
  try {
    // Fire a lightweight health check request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    await fetch(`${apiBase}/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    console.log('Server warmed up successfully');
  } catch (error) {
    // Silently fail - this is just a warm-up attempt
    console.log('Server warm-up request sent (may still be starting)');
  }
}
