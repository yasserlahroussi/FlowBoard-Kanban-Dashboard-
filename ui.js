
import { get_card, loaddata, change_status, deletee } from './api.js'
//1 : ajoute des cartes
export function afficher_les_cartes(CARD,) {
    eror_bare.classList = "hidden"
    const a_faire = document.getElementById("a-faire")
    const in_progress = document.getElementById("in-progre")
    const done = document.getElementById("done")
    const count_a_faire = document.getElementById("count-todo")
    const count_in_progress = document.getElementById("count-progress")
    const count_done = document.getElementById("count-done")
    const main = document.getElementById("main")
    const zero = document.getElementById("zero-cartes")
    let count_todo = []
    let count_progre = []
    let count_donee = []
    a_faire.textContent = ""
    in_progress.textContent = ""
    done.textContent = ""
    count_a_faire.textContent = count_todo.length
    count_in_progress.textContent = count_progre.length
    count_done.textContent = count_donee.length
    for (let i = 0; i < CARD.length; i++) {
        if (CARD[i].status == "todo" && CARD.length !== 0) {
            count_todo.push(CARD[i])
            count_a_faire.textContent = count_todo.length
            console.log(count_todo.length)
            ajoute_selon_status(CARD, i, a_faire)
        } else if (CARD[i].status == "in-progress" && CARD.length !== 0) {
            count_progre.push(CARD[i])
            count_in_progress.textContent = count_progre.length
            ajoute_selon_status(CARD, i, in_progress)
        } else if (CARD[i].status == "done" && CARD.length !== 0) {
            count_donee.push(CARD[i])
            count_done.textContent = count_donee.length
            ajoute_selon_status(CARD, i, done)
        }
    }
    if (CARD.length == 0) {
        zero.classList.remove("hidden")
        console.log(CARD.length)
    } else {
        zero.classList.add("hidden")
    }
}
const assigne_delta = document.getElementById("assignee_delta")
const filtree = document.getElementById("payment-")
filtree.value = localStorage.getItem("propertyy")
const rech = document.getElementById("recherche")
rech.value = localStorage.getItem("recherche")
function ajoute_selon_status(CARD, i, parent) {
    main.classList.remove("hidden")
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
        showLoading()
        try {
            await deletee(id_delete)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
    
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            hideLoading()
        }
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
        try {
            await change_status("in-progress", e.currentTarget.dataset.status)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    })
    btn_r_progress.addEventListener('click', async (e) => {
        try {
            await change_status("in-progress", e.currentTarget.dataset.status)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    })
    btn_r_todo.addEventListener('click', async (e) => {
        try {
            await change_status("todo", e.currentTarget.dataset.status)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    })
    btn_l_done.addEventListener('click', async (e) => {
        try {
            await change_status("done", e.currentTarget.dataset.status)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
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
    const btn_modify = document.getElementById("submit-modify")
    btn_modifi.setAttribute("data-id", CARD[i].id)
    btn_modifi.addEventListener('click', async (e) => {
        btn_modify.classList.remove("hidden")
        try {
            let { data } = await get_card(e.currentTarget.dataset.id)
            my_modal_5.showModal()
            my_modal_5.querySelector('[name="title-modify"]').value = data.title
            my_modal_5.querySelector('[name="Description-modify"]').value = data.description
            my_modal_5.querySelector('[name="payment-modify"]').value = data.priority
            my_modal_5.querySelector('[name="nom-modify"]').value = data.assignee
            my_modal_5.querySelector('[name="Status-modify"]').value = data.status
            my_modal_5.querySelector('[name="idd"]').value = data.id
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
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
const main = document.getElementById("main")
export function eror() {
    eror_bare.classList.remove("hidden")
    main.classList.add("hidden")
}

assigne_delta.value = localStorage.getItem("assigne")
export function filtre() {
    const assigne_delta = document.getElementById("assignee_delta")
    assigne_delta.value = localStorage.getItem("assigne")
    document.getElementById('assignee_delta').addEventListener('change', async (e) => {
        let value_assigne = e.currentTarget.value
        localStorage.setItem("assigne", value_assigne)
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = filtre.value
        showLoading()
        try {
            let objet = await loaddata(filtre_input, value_assigne, value_holder)
            afficher_les_cartes(objet)
        } catch (error) {
            eror()
        } finally {
            hideLoading()
        }

    })


    const filtre = document.getElementById("payment-")
    document.getElementById('recherche').addEventListener('input', async function () {
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = filtre.value
        localStorage.setItem("recherche", value_holder)
        const value_assigne = assigne_delta.value
        showLoading()
        try {
            let objet = await loaddata(filtre_input, value_assigne, value_holder)
            afficher_les_cartes(objet)
        } catch (error) {
            eror()
        } finally {
            hideLoading()
        }

    })

    filtre.addEventListener('change', async (e) => {
        let value_holder = document.getElementById('recherche').value.trim();
        const filtre_input = e.currentTarget.value
        const value_assigne = assigne_delta.value
        localStorage.setItem("propertyy", filtre_input)
        showLoading()
        try {
            let objet = await loaddata(filtre_input, value_assigne, value_holder)
            afficher_les_cartes(objet)
        } catch (error) {
            eror()
        } finally {
            hideLoading()
        }

    })
    const rechercherrr = document.getElementById("recherche")
    const btn_init = document.getElementById("renitialiser")
    btn_init.addEventListener('click', async (e) => {
        rechercherrr.value = ""
        assigne_delta.value = ""
        filtre.value = ""
        localStorage.setItem("propertyy", "")
        localStorage.setItem("recherche", "")
        localStorage.setItem("assigne", "")
        showLoading()
        try {
            let objet = await loaddata(filtre.value, assigne_delta.value, rechercherrr.value)
            afficher_les_cartes(objet)
        } catch (error) {
            eror()
        } finally {
            hideLoading()
        }
    })

}
export function showLoading() {
    document.getElementById("loading").classList.remove("hidden")
    document.getElementById("main").classList.add("hidden")
    document.getElementById("zero-cartes").classList.add("hidden")
    eror_bare.classList = "hidden"
}
export function hideLoading() {
    document.getElementById("loading").classList.add("hidden")

}
export function actualiser() {
    actualisation.addEventListener('click', async () => {
        showLoading()
        try {
            let objet = await loaddata("", "", "")
            afficher_les_cartes(objet)
        } catch (error) {
            eror()
        } finally {
            hideLoading()
        }
    })
}












