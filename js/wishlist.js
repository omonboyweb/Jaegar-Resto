import { setStorage } from "./storage.js";
import { getApi } from "./server.js";
import { renderUser, wishlist2, setPriceCount } from "./user.js";

const productsAdd = document.querySelector(".products__block")

renderUser(wishlist2);

productsAdd.addEventListener("click", async (e) => {
    const id = Number(e.target.dataset.id)
    const path = e.target.dataset.path;
    if (!id && !path) return;
    const smilar = wishlist2.some(el => el.id === id)
    if (smilar) {
        const index = wishlist2.findIndex(el => el.id === id);
        if (index !== -1) wishlist2.splice(index, 1)
    } else {
        const getId = await getApi(path, id);
        wishlist2.unshift({ ...getId, count: 1 })
    }
    setStorage("wishlist", wishlist2);
    renderUser(wishlist2);
    setPriceCount();
})

