export async function loaddata(affiche, eror, priority = "", assignee = "", search = "") {
    let parametre = {}
    if (priority !== "") {
        parametre.priority = priority
    }
    if (assignee !== "") {
        parametre.assignee = assignee
    }
    if (search !== "") {
        parametre.q = search
    }
    try {
        const response = await axios.get('https://flowboard-api-virid.vercel.app/cards', {
            headers: {
                'X-Workspace': 'flowboard-yassir-area'
            },
            params: parametre,
            password: "1234"
        })
        affiche(response.data)

    } catch (error) {
        eror(error)
    }

}
