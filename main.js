import { loaddata } from './api.js'
import { afficher_les_cartes, eror, actualiser } from './ui.js'
loaddata(afficher_les_cartes, eror)
actualiser()

function filtre() {
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
filtre()
