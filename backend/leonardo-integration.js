// Leonardo AI Image Generation Helper
// Add this to backend/index.js

async function generateWithLeonardoAI(prompt, width, height, modelId, styleUUID) {
    const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY || process.env.VITE_LEONARDO_API_KEY;

    if (!LEONARDO_API_KEY) {
        throw new Error('Leonardo AI API key not configured');
    }

    // Leonardo AI requires dimensions to be multiples of 8 and within valid ranges (512-2048)
    const validWidth = Math.max(512, Math.min(2048, Math.floor(parseInt(width) / 8) * 8));
    const validHeight = Math.max(512, Math.min(2048, Math.floor(parseInt(height) / 8) * 8));

    // Create generation
    const createResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${LEONARDO_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            prompt,
            width: validWidth,
            height: validHeight,
            num_images: 1,
            modelId: modelId || '7b592283-e8a7-4c5a-9ba6-d18c31f258b9',
            styleUUID: styleUUID || '111dc692-d470-4eec-b791-3475abac4c46',
            alchemy: false,
            contrast: 3.5,
            ultra: false
        })
    });

    if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Leonardo AI creation failed: ${errorText}`);
    }

    const createData = await createResponse.json();
    const generationId = createData.sdGenerationJob?.generationId;

    if (!generationId) {
        throw new Error('No generation ID returned from Leonardo AI');
    }

    // Poll for completion
    const maxAttempts = 60;
    const pollInterval = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));

        const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
            headers: {
                'Authorization': `Bearer ${LEONARDO_API_KEY}`,
                'Accept': 'application/json'
            }
        });

        if (!statusResponse.ok) continue;

        const statusData = await statusResponse.json();
        const status = statusData.generations_by_pk?.status;

        if (status === 'COMPLETE') {
            const imageUrl = statusData.generations_by_pk?.generated_images?.[0]?.url;
            if (imageUrl) {
                return { imageUrl, generationId };
            }
        } else if (status === 'FAILED') {
            throw new Error('Leonardo AI generation failed');
        }
    }

    throw new Error('Leonardo AI generation timed out');
}

export { generateWithLeonardoAI };
