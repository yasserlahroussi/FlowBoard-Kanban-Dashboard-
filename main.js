import { loaddata,modify_card,deletee } from './api.js'
import { afficher_les_cartes, eror, actualiser, filtre } from './ui.js'
const btn_modify = document.getElementById("submit-modify")
btn_modify.addEventListener('click', async (e) => {
    let data = {
        id: my_modal_1.querySelector('[name="idd"]').value,
        title: my_modal_1.querySelector('[name="title"]').value,
        description: my_modal_1.querySelector('[name="Description"]').value,
        priority: my_modal_1.querySelector('[name="payment"]').value,
        assignee: my_modal_1.querySelector('[name="nom"]').value,
        status: my_modal_1.querySelector('[name="Status"]').value
    }
    console.log(data.id)
    await modify_card(data.id, data)
    loaddata(afficher_les_cartes, eror)
})
loaddata(afficher_les_cartes, eror)
actualiser()

filtre()
