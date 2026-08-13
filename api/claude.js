// api/claude.js
// Backend untuk Vercel - Claude API Integration

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, sheetData } = req.body;
    const apiKey = process.env.CLAUDE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Claude API Key not configured in Vercel' });
    }

    if (!message) {
        return res.status(400).json({ error: 'Message required' });
    }

    try {
        // Prepare data context untuk Claude
        const dataContext = sheetData && sheetData.length > 0 
            ? `Data Nielsen Rating (${sheetData.length} records):\n${JSON.stringify(sheetData.slice(0, 50), null, 2)}\n...dan ${Math.max(0, sheetData.length - 50)} records lainnya`
            : 'No sheet data provided';

        const systemPrompt = `Anda adalah Nielsen Analytics Expert. 
Analisis data Nielsen Rating dengan intelligent insights.
Berikan jawaban yang natural, professional, dan actionable.
Jika diminta chart/dashboard, berikan format JSON yang bisa di-visualisasi.
Gunakan bahasa Indonesia yang natural dan jelas.`;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
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
                        content: `Data:\n${dataContext}\n\nPertanyaan User: ${message}`
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Claude API Error:', data);
            throw new Error(data.error?.message || 'Claude API error');
        }

        const claudeResponse = data.content[0].text;

        res.status(200).json({
            success: true,
            response: claudeResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Backend error:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
