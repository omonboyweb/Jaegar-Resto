import { setStorage, getStorage } from "./storage.js";
import { getApi } from "./server.js";
import { renderUser } from "./user.js";
const productsAdd = document.querySelector(".products__block")
let wishlist = getStorage("wishlists")

productsAdd.addEventListener("click", async (e) => {
    const id = Number(e.target.dataset.id)
    const path = e.target.dataset.path;
    if (!id && !path) return;
    const smilar = wishlist.some(el => el.id === id)
    if (smilar) {
        wishlist = wishlist.filter(el => el.id !== id)
    } else {
        const getId = await getApi(path, id);
        wishlist.push(getId)
    }
    setStorage("wishlist", wishlist);
    renderUser(wishlist);
})
