const eror_bare = document.getElementById("erorrr")
export function showLoading() {
    document.getElementById("loading").classList.remove("hidden")
    document.getElementById("main").classList.add("hidden")
    document.getElementById("zero-cartes").classList.add("hidden")
    eror_bare.classList = "hidden"
}
export function hideLoading() {
    document.getElementById("loading").classList.add("hidden")
}