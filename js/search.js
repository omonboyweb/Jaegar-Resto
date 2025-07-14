const URL = "https://admin-json-server.vercel.app/all"
const input = document.querySelector(".input");
const resaultSearch = document.querySelector(".product-search")
const productsBlock = document.querySelector(".products__block")

function resultRender(data) {
    if (!input.value) {
        resaultSearch.innerHTML = "";
        productsBlock.style.display = "grid"
        resaultSearch.style.display = "none"
        return
    }
    resaultSearch.innerHTML = data.map(item => {
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
    <button class="add-btn" data-id="${item.id}">Add</button>
</div>
        
        `
    }).join("")
}

function debonce(func, delay) {
    let timeoutId;
    return function (e) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(e.target.value)
        }, delay)
    }
}

async function handInput(value) {
    const res = await fetch(`${URL}?title_like=${value}`)
    const data = await res.json();
    console.log(data);
    productsBlock.style.display = "none"
    resaultSearch.style.display = "grid"
    resultRender(data)
}

const deboncedInput = debonce(handInput, 500)
input.addEventListener("keyup", deboncedInput)

