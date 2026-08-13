// api/claude.js
// Fixed version with proper CORS handling

export default async function handler(req, res) {
    // Set CORS headers FIRST
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sheetData } = req.body;
        const apiKey = process.env.CLAUDE_API_KEY;

        if (!apiKey) {
            console.error('CLAUDE_API_KEY not set in environment');
            return res.status(500).json({ 
                error: 'Claude API Key not configured',
                details: 'CLAUDE_API_KEY environment variable is missing'
            });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Prepare data context
        const dataContext = sheetData && Array.isArray(sheetData) && sheetData.length > 0
            ? `Data Nielsen Rating (${sheetData.length} records):\n${JSON.stringify(sheetData.slice(0, 50), null, 2)}`
            : 'No data provided';

        const systemPrompt = `Anda adalah Nielsen Analytics Expert.
Analisis data Nielsen Rating dengan intelligent insights.
Berikan jawaban yang natural, professional, dan actionable.
Gunakan bahasa Indonesia.`;

        // Call Claude API
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 2000,
                system: systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: `Data:\n${dataContext}\n\nPertanyaan: ${message}`
                    }
                ]
            })
        });

        const data = await claudeResponse.json();

        if (!claudeResponse.ok) {
            console.error('Claude API error:', data);
            return res.status(claudeResponse.status).json({ 
                error: data.error?.message || 'Claude API error',
                type: data.error?.type
            });
        }

        const response = data.content[0].text;

        return res.status(200).json({
            success: true,
            response: response
        });

    } catch (error) {
        console.error('Backend error:', error);
        return res.status(500).json({ 
            error: error.message || 'Internal server error',
            type: 'backend_error'
        });
    }
}
