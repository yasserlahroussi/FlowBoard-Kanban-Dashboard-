import { loaddata } from './api.js'
loaddata(afficher_les_cartes, eror)

//1 : ajoute des cartes
function afficher_les_cartes(CARD,) {
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

function ajoute_selon_status(CARD, i, parent) {
    const div_parent = document.createElement("div")
    div_parent.classList = "flex flex-col gap-5  bg-[white] p-6 mb-10 rounded-lg"
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    div2.classList = "flex justify-between items-centre"
    const h3 = document.createElement("h3")
    h3.classList = "font-serif"
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
    div_parent.append(div1, div2)
    parent.append(div_parent)
}



//2: affichage d'erreur
const eror_bare = document.getElementById("erorrr")
const actualisation = document.getElementById("actualiser")
function eror() {
    eror_bare.classList.remove("hidden")
}
actualisation.addEventListener('click', () => {
    loaddata(afficher_les_cartes, eror)
})


// 3: filtre et recherche :


const assigne_delta = document.getElementById("assignee_delta")
document.getElementById('assignee_delta').addEventListener('change', (e) => {
    let value_assigne = e.currentTarget.value
    console.log(value_assigne)
    assigne_delta.value
    loaddata(afficher_les_cartes, eror, "", value_assigne, "")
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

