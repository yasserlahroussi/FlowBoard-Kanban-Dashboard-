
import { get_card, loaddata, change_status, deletee } from './api.js'
//1 : ajoute des cartes
export function afficher_les_cartes(CARD,) {
    eror_bare.classList = "hidden"
    const a_faire = document.getElementById("a-faire")
    const in_progress = document.getElementById("in-progre")
    const done = document.getElementById("done")
    a_faire.textContent = ""
    in_progress.textContent = ""
    done.textContent = ""
    for (let i = 0; i < CARD.length; i++) {
        if (CARD[i].status == "todo") {
            ajoute_selon_status(CARD, i, a_faire)
            console.log("hi")
        } else if (CARD[i].status == "in-progress") {
            ajoute_selon_status(CARD, i, in_progress)
            console.log("hi2")
        } else {
            ajoute_selon_status(CARD, i, done)
            console.log("hi3")
        }
    }
}
const assigne_delta = document.getElementById("assignee_delta")
const filtree = document.getElementById("payment-")
const rech = document.getElementById("recherche")
function ajoute_selon_status(CARD, i, parent) {
    const div_parent = document.createElement("div")
    div_parent.classList = "flex flex-col gap-5  bg-[white] p-6 mb-10 rounded-lg"
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    div2.classList = "flex justify-between items-centre"
    const h3 = document.createElement("h3")
    h3.classList = "font-serif"
    const btn_delete = document.createElement("button")
    btn_delete.textContent = "Supprimer"
    btn_delete.classList = "btn bg-[red] text-white"
    btn_delete.setAttribute("data-delete", CARD[i].id)
    btn_delete.addEventListener('click', async (e) => {
        let id_delete = e.currentTarget.dataset.delete
        await deletee(id_delete)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
    })
    const btn_modifi = document.createElement("button")
    btn_modifi.textContent = "modify"
    btn_modifi.className = "modify"
    btn_modifi.classList.add("btn")
    const div_status = document.createElement("div")
    const btn_r_progress = document.createElement("button")
    const btn_l_done = document.createElement("button")
    const btn_r_todo = document.createElement("button")
    const btn_l_progress = document.createElement("button")
    btn_l_progress.textContent = "→"
    btn_l_progress.addEventListener('click', async (e) => {
        await change_status("in-progress", e.currentTarget.dataset.status)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
        console.log(rech.value)
    })
    btn_r_progress.addEventListener('click', async (e) => {
        await change_status("in-progress", e.currentTarget.dataset.status)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
    })
    btn_r_todo.addEventListener('click', async (e) => {
        await change_status("todo", e.currentTarget.dataset.status)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
    })
    btn_l_done.addEventListener('click', async (e) => {
        await change_status("done", e.currentTarget.dataset.status)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
    })
    btn_l_progress.setAttribute("data-status", CARD[i].id)
    btn_r_progress.setAttribute("data-status", CARD[i].id)
    btn_l_done.setAttribute("data-status", CARD[i].id)
    btn_r_todo.setAttribute("data-status", CARD[i].id)
    btn_r_todo.textContent = "←"
    btn_l_done.textContent = "→"
    btn_r_progress.textContent = "←"
    btn_l_progress.classList = "btn w-full"
    btn_l_done.classList = "btn w-full"
    btn_r_progress.classList = "btn w-full"
    btn_r_todo.classList = "btn w-full"
    div_status.append(btn_l_progress, btn_r_todo, btn_l_done, btn_r_progress)
    div_status.classList = "flex flex-col"
    if (CARD[i].status == "todo") {
        btn_l_progress.classList.remove("hidden")
        btn_l_done.classList.add("hidden")
        btn_r_progress.classList.add("hidden")
        btn_r_todo.classList.add("hidden")
        console.log(CARD[i].status)
    } else if (CARD[i].status == "in-progress") {
        btn_r_todo.classList.remove("hidden")
        btn_l_done.classList.remove("hidden")
        btn_l_progress.classList.add("hidden")
        btn_r_progress.classList.add("hidden")
        console.log(CARD[i].status)
    } else {
        btn_r_progress.classList.remove("hidden")
        btn_l_done.classList.add("hidden")
        btn_l_progress.classList.add("hidden")
        btn_r_todo.classList.add("hidden")
        console.log(CARD[i].status)
    }
    const btn_submit = document.getElementById("btn-submit")
    const btn_modify = document.getElementById("submit-modify")
    btn_modifi.setAttribute("data-id", CARD[i].id)
    btn_modifi.addEventListener('click', async (e) => {
        console.log(e.currentTarget.dataset.id)
        const btn_submit = document.getElementById("btn-submit")
        const titre_ajout = document.getElementById("titre-ajout")
        titre_ajout.textContent = "MODIFICATION DE CARD  : "
        btn_submit.classList.add("hidden")
        btn_modify.classList.remove("hidden")
        let { data } = await get_card(e.currentTarget.dataset.id)
        my_modal_1.showModal()
        my_modal_1.querySelector('[name="title"]').value = data.title
        my_modal_1.querySelector('[name="Description"]').value = data.description
        my_modal_1.querySelector('[name="payment"]').value = data.priority
        my_modal_1.querySelector('[name="nom"]').value = data.assignee
        my_modal_1.querySelector('[name="Status"]').value = data.status
        my_modal_1.querySelector('[name="idd"]').value = data.id
    })
    const description = document.createElement("p")
    description.classList = "text-[grey] text-xs"
    const priority = document.createElement("p")
    priority.textContent = CARD[i].priority
    priority.classList = "bg-[red] text-[white] p-1 text-xs rounded-sm  font-mono"
    if (priority.textContent == "medium") {
        priority.classList.remove("bg-[red]")
        priority.classList.add("bg-[orange]")
    } else if (priority.textContent == "low") {
        priority.classList.remove("bg-[red]")
        priority.classList.add("bg-[green]")
    } else {
        console.log("amin")
    }
    const name = document.createElement("p")
    name.classList = "text-[blue] text-xs font-sans p-1"
    h3.textContent = CARD[i].title
    description.textContent = CARD[i].description
    name.textContent = CARD[i].assignee
    div1.append(h3, description)
    div2.append(priority, name)
    div_parent.append(div1, div2, btn_modifi, btn_delete, div_status)
    parent.append(div_parent)
}



//2: affichage d'erreur
const eror_bare = document.getElementById("erorrr")
const actualisation = document.getElementById("actualiser")
export function eror() {
    eror_bare.classList.remove("hidden")
}
export function filtre() {
    const assigne_delta = document.getElementById("assignee_delta")
    document.getElementById('assignee_delta').addEventListener('change', (e) => {
        let value_assigne = e.currentTarget.value
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = filtre.value
        console.log(value_assigne)
        assigne_delta.value
        loaddata(afficher_les_cartes, eror, filtre_input, value_assigne, value_holder)
    })


    const filtre = document.getElementById("payment-")
    // const assigne = document.getElementById("assignee")
    document.getElementById('recherche').addEventListener('input', function () {
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = filtre.value
        const value_assigne = assigne_delta.value
        // const assigne_input = assigne.value
        loaddata(afficher_les_cartes, eror, filtre_input, value_assigne, value_holder)

    })

    filtre.addEventListener('change', (e) => {
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = e.currentTarget.value
        const value_assigne = assigne_delta.value
        // const assigne_input = assigne.value
        loaddata(afficher_les_cartes, eror, filtre_input, value_assigne, value_holder)

    })
    const rechercherrr = document.getElementById("recherche")
    const btn_init = document.getElementById("renitialiser")
    btn_init.addEventListener('click', (e) => {
        rechercherrr.value = ""
        assigne_delta.value = ""
        filtre.value = ""
        loaddata(afficher_les_cartes, eror, filtre.value, assigne_delta.value, rechercherrr.value)
    })

}
export function actualiser() {
    actualisation.addEventListener('click', () => {
        loaddata(afficher_les_cartes, eror)
    })
}











