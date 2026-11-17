import { modify_card } from './api.js'
const btn_modify = document.getElementById("submit-modify")
btn_modify.addEventListener('click', (e) => {
    let data = {
        id: my_modal_1.querySelector('[name="idd"]').value,
        title: my_modal_1.querySelector('[name="title"]').value,
        description: my_modal_1.querySelector('[name="Description"]').value,
        priority: my_modal_1.querySelector('[name="payment"]').value,
        assignee: my_modal_1.querySelector('[name="nom"]').value,
        status: my_modal_1.querySelector('[name="Status"]').value
    }
    console.log(data.id)
    modify_card(data.id,data)
})