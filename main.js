import { loaddata, modify_card, ajout_card, generer } from './api.js'
import { afficher_les_cartes, eror, actualiser, filtre,showLoading,hideLoading } from './ui.js'
const btn_modify = document.getElementById("submit-modify")
const assigne_delta = document.getElementById("assignee_delta")
const filtree = document.getElementById("payment-")
const rech = document.getElementById("recherche")
const alert_modify_title = document.getElementById("alert-title-modify")
const alert_modify_desc = document.getElementById("alert-description-modify")
let check_title_ = true
let check_description_= true
my_modal_5.querySelector('[name="title-modify"]').addEventListener('input', (e) => {
    check_title_ = /^[\p{L}\p{N}][\p{L}\p{N}\s'’\-.,!?:()]{2,59}$/u.test(my_modal_5.querySelector('[name="title-modify"]').value)
    if (!check_title_) {
        alert_modify_title.classList.remove("hidden")
    } else {
        alert_modify_title.classList.add("hidden")
    }
})
my_modal_5.querySelector('[name="Description-modify"]').addEventListener('input', (e) => {
check_description_ = /^[\p{L}\p{N}][\p{L}\p{N}\s'’\-.,!?:()]{2,59}$/u.test(my_modal_5.querySelector('[name="Description-modify"]').value)
    if (!check_description_) {
        alert_modify_desc.classList.remove("hidden")
    } else {
        alert_modify_desc.classList.add("hidden")
    }
})
btn_modify.addEventListener('click', async (e) => {
    if (check_title_ && check_description_ && my_modal_5.querySelector('[name="payment-modify"]').value !== "" && my_modal_5.querySelector('[name="nom-modify"]').value !== "" && my_modal_5.querySelector('[name="Status-modify"]').value !== "") {
          alert_modification.classList.add("hidden")
        let data = {
            id: my_modal_5.querySelector('[name="idd"]').value,
            title: my_modal_5.querySelector('[name="title-modify"]').value,
            description: my_modal_5.querySelector('[name="Description-modify"]').value,
            priority: my_modal_5.querySelector('[name="payment-modify"]').value,
            assignee: my_modal_5.querySelector('[name="nom-modify"]').value,
            status: my_modal_5.querySelector('[name="Status-modify"]').value
        }
        btn_modify.classList.add("hidden")
        console.log(data.id)
        showLoading()
        try {
            await modify_card(data.id, data)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }finally{
            hideLoading()
        }
    }else{
        alert_modification.classList.remove("hidden")
    }
})
let priorityy = localStorage.getItem("propertyy")
let assigne = localStorage.getItem("assigne")
let recherche = localStorage.getItem("recherche")
showLoading()
try {
    let objet = await loaddata(priorityy, assigne, recherche)
    afficher_les_cartes(objet)
} catch (error) {
    eror(error)
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
    });
}finally{
    hideLoading()
}

actualiser()

filtre()
const title_input = document.getElementById("title_input_ajout")
const description = document.getElementById("description_input_ajout")
const priority_input = document.getElementById("priority_input_ajout")
priority_input.value = localStorage.getItem("input_priority")
priority_input.addEventListener("change", (e) => {
    localStorage.setItem("input_priority", e.currentTarget.value)
})
const assigne_ajout = document.getElementById("assigne_input_ajout")
assigne_ajout.value = localStorage.getItem("input_assigne")
assigne_ajout.addEventListener("change", (e) => {
    localStorage.setItem("input_assigne", e.currentTarget.value)
})
const status_input = document.getElementById("status_input_ajout")
status_input.value = localStorage.getItem("input_status")
status_input.addEventListener("change", (e) => {
    localStorage.setItem("input_status", e.currentTarget.value)
})



let check_title
let check_description
title_input.value = sessionStorage.getItem("title")
title_input.addEventListener('input', (e) => {
    const alert_title = document.getElementById("alert-title")
    let title = e.currentTarget.value
    const titre_ajout = document.getElementById("titre-ajout")
    check_title = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(title) && title != ""
    if (!check_title) {
        alert_title.classList.remove("hidden")
        sessionStorage.setItem("title", "")
    } else {
        alert_title.classList.add("hidden")
        sessionStorage.setItem("title", title_input.value)
        if (titre_ajout.textContent != "MODIFICATION DE CARD  : ") {
            btn_submit.classList.remove("hidden")
        }
    }
})
description.value = sessionStorage.getItem("description")
description.addEventListener('input', (e) => {
    const alert_description = document.getElementById("alert-description")
    let description = e.currentTarget.value
    const titre_ajout = document.getElementById("titre-ajout")
    check_description = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(description) && description != ""
    if (!check_description) {
        alert_description.classList.remove("hidden")
        sessionStorage.setItem("description", "")
    } else {
        sessionStorage.setItem("description", description)
        alert_description.classList.add("hidden")
        if (titre_ajout.textContent != "MODIFICATION DE CARD  : ") {
            btn_submit.classList.remove("hidden")
        }
    }


})
const alert_creation = document.getElementById("span-remlpir-creation")
const alert_modification = document.getElementById("span-remlpir-modification")
const btn_submit = document.getElementById("btn-submit")
btn_submit.addEventListener('click', async (e) => {
    console.log(assigne_ajout.value)
    check_title = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(title_input.value) && title_input.value != ""
    check_description = /^[a-zA-ZÀ-ÿ\s'-]+$/.test(description.value) && description.value != ""
    let objet_ = {}
    if (check_description &&
        check_title &&
        my_modal_1.querySelector('[name="payment"]').value !== "" &&
        my_modal_1.querySelector('[name="nom"]').value !== "" &&
        my_modal_1.querySelector('[name="Status"]').value !== "") {
            alert_creation.classList.add("hidden")
        objet_ = {
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
        console.log(objet_)
        localStorage.setItem("input_status", "")
        localStorage.setItem("input_assigne", "")
        localStorage.setItem("input_priority", "")
        sessionStorage.setItem("description", "")
        sessionStorage.setItem("title", "")
        btn_submit.classList.add("hidden")
        showLoading()
        try {
            await ajout_card(objet_)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }finally{
            hideLoading()
        }
    }else{
     alert_creation.classList.remove("hidden")
    }

})

document.getElementById("nouveau-card").addEventListener('click', (e) => {
    btn_modify.classList.add("hidden")
    btn_submit.classList.remove("hidden")
    const titre_ajout = document.getElementById("titre-ajout")
    titre_ajout.textContent = "Création d'une nouveau CARD : "
    my_modal_1.querySelector('[name="title"]').value = sessionStorage.getItem("title")
    my_modal_1.querySelector('[name="Description"]').value = sessionStorage.getItem("description")
    my_modal_1.querySelector('[name="payment"]').value = localStorage.getItem("input_priority")
    my_modal_1.querySelector('[name="nom"]').value = localStorage.getItem("input_assigne")
    my_modal_1.querySelector('[name="Status"]').value = localStorage.getItem("input_status")
})

// generer les cartes avec IA:
const number_taches = document.getElementById("Number-IA-input")
const alert_num = document.getElementById("alert-Number-IA")
const alert_tit = document.getElementById("alert-title-IA")
let check_IA_title
let check_IA_Num
const tache_name = document.getElementById("taches-IA-input")
const cle = document.getElementById("cle-IA-input")
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
        showLoading()
        try {
            await generer(tache_name.value, num,cle.value)
            let objet = await loaddata(filtree.value, assigne_delta.value, rech.value)
            afficher_les_cartes(objet)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }finally{
            hideLoading()
        }
        number_taches.value = ""
        tache_name.value = ""

    }
})