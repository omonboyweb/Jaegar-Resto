import { getApi } from "./server.js";
const productsBlock = document.querySelector(".products__block")
const headItem = document.querySelectorAll(".headItem")
const tabItem = document.querySelector(".tab__item-block")

tabItem.addEventListener("click", (e) => {
    const path = e.target.dataset.path
    headItem.forEach(el => el.classList.remove("tabActive"))
    e.target.classList.add("tabActive")
    if (!path) return;
    if (["hot", "salats", "cool", "sushi", "lunch"].includes(path)) {
        getData(path)
    }
})


function renderData(data, path) {
    productsBlock.innerHTML = data.map(item => {
        return `
  <div class="card">
  <img
    src="${item.img}"
    alt="${item.title}"
    class="card-img"
  />
  <div class="card-content">
    <h2 class="card-title">${item.title}</h2>
    <p class="card-price">$ ${item.price}</p>
    <p class="card-stock">Sale $${item.sale}</p>
    </div>
    <button class="add-btn" data-id="${item.id}" data-path="${path}">Add</button>
</div>
    `
    }).join("")

}
async function getData(path) {
    try {
        productsBlock.innerHTML = `<span class="loading">Malumotlar yuklanishi biroz vaqt olishi mumkin</span>`;
        const res = await getApi(path)
        renderData(res, path)

    } catch (error) {
        productsBlock.innerHTML = `<span class="shoeses">Serverda qisqa muammo kelib chiqdi, qisqa muddatda hal etiladi</span>`;
    }
}
getData("hot")

