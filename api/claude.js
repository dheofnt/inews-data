// api/claude.js
export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { message, sheetData } = req.body;

    if (!message) {
        res.status(400).json({ error: 'Message required' });
        return;
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: 'CLAUDE_API_KEY not configured' });
        return;
    }

    try {
        const dataContext = sheetData && sheetData.length > 0
            ? `Nielsen Data (${sheetData.length} records):\n${JSON.stringify(sheetData.slice(0, 30))}`
            : 'No data';

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1500,
                system: 'Anda adalah Nielsen Analytics Expert. Analisis data dengan insights yang actionable. Gunakan bahasa Indonesia.',
                messages: [{
                    role: 'user',
                    content: `${dataContext}\n\nPertanyaan: ${message}`
                }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            res.status(response.status).json({ error: error.error?.message || 'Claude API error' });
            return;
        }

        const data = await response.json();
        res.status(200).json({ success: true, response: data.content[0].text });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
