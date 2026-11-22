const url = 'https://flowboard-api-virid.vercel.app/cards'
export async function loaddata(priority = "", assignee = "", search = "") {
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
    const response = await axios.get(url, {
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        params: parametre,
        password: '1234'
    })
    return response.data
}
export async function get_card(id) {
    return await axios.get(url + '/' + id, {
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        password: "1234"

    }
    )
}
export async function modify_card(id, data) {
    await axios.put(url + '/' + id,
        data,
        {
            headers: {
                'X-Workspace': 'flowboard-yassir-area',
            },
            params: {
                password: '1234'
            }
        }
    );
}
export async function change_status(status, id) {
    await axios.patch(url + '/' + id,
        {
            status: status
        },
        {
            headers: {
                'X-Workspace': 'flowboard-yassir-area',
                'Content-Type': 'application/json'
            },
            params: {
                password: '1234'
            }
        }
    )
}
export async function deletee(id) {
    await axios.delete(url + '/' + id, {
        headers: {
            'X-Workspace': 'flowboard-yassir-area'
        },
        params: {
            password: '1234'
        }
    })
}
export async function ajout_card(data) {
    await axios.post(url,
        data,
        {
            headers: {
                'X-Workspace': 'flowboard-yassir-area'
            },
            params: {
                password: "1234"
            }
        }
    )
}
export async function generer(description, count,apikey) {
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