import * as cheerio from 'cheerio';

// This function fetches the content of a given URL and extracts the text.
export async function scrapeWebsite(url: string): Promise<string> {
  try {
    // Use fetch to get the HTML content of the page.
    // We are using a proxy to avoid CORS issues when fetching from the browser.
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }

    const data = await response.json();
    const html = data.contents;

    if (!html) {
      throw new Error('No content found in the response.');
    }

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Remove script and style elements
    $('script, style, noscript, iframe, svg, header, footer, nav').remove();

    // Get the text content of the body
    const text = $('body').text();

    // Clean up the text by removing extra whitespace and newlines
    const cleanedText = text.replace(/\s\s+/g, ' ').trim();

    return cleanedText;
  } catch (error) {
    console.error('Error scraping website:', error);
    // Throw an error so it can be caught by the calling function
    throw new Error('Could not scrape website content.');
  }
}
