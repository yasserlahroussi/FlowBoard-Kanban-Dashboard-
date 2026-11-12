export function loaddata(affiche, eror,priority= "", assignee = "", search= "") {
    let parametre = new URLSearchParams()
    if (priority !== "") {
        parametre.append("priority",priority)
    }
    if (assignee !=="") {
        parametre.append("assignee",assignee)
    }
    if (search !== "") {
         parametre.append("q",search);
    }
      return fetch("https://flowboard-api-virid.vercel.app/cards?" + parametre)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then((data) => {
            affiche(data)
        }).catch(E => {
            eror()
        })
}
