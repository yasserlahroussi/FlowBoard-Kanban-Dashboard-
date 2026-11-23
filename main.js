import { loaddata, modify_card, deletee, ajout_card, generer } from './api.js'
import { afficher_les_cartes, eror, actualiser, filtre } from './ui.js'

const btn_modify = document.getElementById("submit-modify")
const assigne_delta = document.getElementById("assignee_delta")
const filtree = document.getElementById("payment-")
const rech = document.getElementById("recherche")
btn_modify.addEventListener('click', async (e) => {
    let data = {
        id: my_modal_1.querySelector('[name="idd"]').value,
        title: my_modal_1.querySelector('[name="title"]').value,
        description: my_modal_1.querySelector('[name="Description"]').value,
        priority: my_modal_1.querySelector('[name="payment"]').value,
        assignee: my_modal_1.querySelector('[name="nom"]').value,
        status: my_modal_1.querySelector('[name="Status"]').value
    }
    btn_modify.classList.add("hidden")
    console.log(data.id)
    await modify_card(data.id, data)
    loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
})
loaddata(afficher_les_cartes, eror)
actualiser()

filtre()
const title_input = document.getElementById("title_input_ajout")
const description = document.getElementById("description_input_ajout")
const priority_input = document.getElementById("priority_input_ajout")
const assigne_ajout = document.getElementById("assigne_input_ajout")
const status_input = document.getElementById("status_input_ajout")

let check_title
let check_description

title_input.addEventListener('input', (e) => {
    const alert_title = document.getElementById("alert-title")
    let title = e.currentTarget.value
    check_title = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(title) && title != ""
    if (!check_title) {
        alert_title.classList.remove("hidden")
    } else {
        alert_title.classList.add("hidden")
        btn_submit.classList.remove("hidden")
    }
})

description.addEventListener('input', (e) => {
    const alert_description = document.getElementById("alert-description")
    let description = e.currentTarget.value
    check_description = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(description) && description != ""
    if (!check_description) {
        alert_description.classList.remove("hidden")
    } else {
        alert_description.classList.add("hidden")
        btn_submit.classList.remove("hidden")
    }

})

const btn_submit = document.getElementById("btn-submit")
btn_submit.addEventListener('click', async (e) => {
    console.log(assigne_ajout.value)
    let objet = {}
    if (check_description &&
        check_title &&
        my_modal_1.querySelector('[name="payment"]').value !== "" &&
        my_modal_1.querySelector('[name="nom"]').value !== "" &&
        my_modal_1.querySelector('[name="Status"]').value !== "") {
        objet = {
            title: title_input.value,
            description: description.value,
            status: status_input.value,
            priority: priority_input.value,
            assignee: assigne_ajout.value
        }
        my_modal_1.querySelector('[name="title"]').value = ""
        my_modal_1.querySelector('[name="Description"]').value = ""
        my_modal_1.querySelector('[name="payment"]').value = ""
        my_modal_1.querySelector('[name="nom"]').value = ""
        my_modal_1.querySelector('[name="Status"]').value = ""
        my_modal_1.querySelector('[name="idd"]').value = ""
        console.log(objet)       
        btn_submit.classList.add("hidden")
        await ajout_card(objet)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
    }

})

document.getElementById("nouveau-card").addEventListener('click', (e) => {
    btn_modify.classList.add("hidden")
    btn_submit.classList.remove("hidden")
    const titre_ajout = document.getElementById("titre-ajout")
    titre_ajout.textContent = "Création d'une nouveau CARD : "
    my_modal_1.querySelector('[name="title"]').value = ""
    my_modal_1.querySelector('[name="Description"]').value = ""
    my_modal_1.querySelector('[name="payment"]').value = ""
    my_modal_1.querySelector('[name="nom"]').value = ""
    my_modal_1.querySelector('[name="Status"]').value = ""
    my_modal_1.querySelector('[name="idd"]').value = ""
})

// generer les cartes avec IA:
const number_taches = document.getElementById("Number-IA-input")
const alert_num = document.getElementById("alert-Number-IA")
const alert_tit = document.getElementById("alert-title-IA")
let check_IA_title
let check_IA_Num
const tache_name = document.getElementById("taches-IA-input")
const btn_IA = document.getElementById("submit-IA")
number_taches.addEventListener("input", (e) => {
    check_IA_Num = /^\d/.test(number_taches.value) && number_taches.value != "" && number_taches.value < 11
    if (!check_IA_Num) {
        alert_num.classList.remove("hidden")
    } else {
        alert_num.classList.add("hidden")
    }
    btn_IA.classList.remove("hidden")
})
tache_name.addEventListener("input", (e) => {
    check_IA_title = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(tache_name.value) && tache_name.value != "" && tache_name.value.length > 10
    if (!check_IA_title) {
        alert_tit.classList.remove("hidden")
    } else {
        alert_tit.classList.add("hidden")
    }
    btn_IA.classList.remove("hidden")
})
btn_IA.addEventListener("click", async (e) => {
    if (check_IA_Num && check_IA_title) {
        btn_IA.classList.add("hidden")
        let num = Number(number_taches.value)
        await generer(tache_name.value, num)
        loaddata(afficher_les_cartes, eror, filtree.value, assigne_delta.value, rech.value)
        number_taches.value = ""
        tache_name.value = ""

    }
})