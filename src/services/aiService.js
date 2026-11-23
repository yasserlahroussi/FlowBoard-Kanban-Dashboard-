export async function generer(description, count, apikey) {
    await axios.post('https://flowboard-api-virid.vercel.app/ai/cards',
        {
            description: description,
            apiKey: apikey,
            count: count
        }, {
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        params: {
            password: "1234"
        }
    }
    )
}