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
export async function get_card(id) {
    return await axios.get('https://flowboard-api-virid.vercel.app/cards/' + id, {
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        password: "1234"

    })

}
export async function modify_card(id, data) {
    const options = {
        method: 'PUT',
        url: 'https://flowboard-api-virid.vercel.app/cards/' + id,
        headers: {
            'X-Workspace': 'flowboard-yassir-area'

        },
        params: {
            password: "1234"
        },
        data: data
    }

    try {
        const { data } = await axios.request(options)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}
export async function change_status(status, id) {
    const options = {
        method: 'PATCH',
        url: 'https://flowboard-api-virid.vercel.app/cards/' + id,
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        params: {
            password: "1234"
        },
        data: {
            status: status
        }
    }

    try {
        const { data } = await axios.request(options)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}