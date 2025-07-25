const productRight = document.querySelector(".product-right")
const proPriceSale = document.querySelector(".pro-d-price")
const proSprice = document.querySelector(".pro-s-price")
import { setStorage, getStorage } from "./storage.js";
export let wishlist2 = getStorage("wishlist") || [];
export function renderUser(data) {
  productRight.innerHTML = data.map(item => {
    return `
  <div div class="pro-cart">
            <div class="pro-top">
              <img
                class="pro-top-img"
                src="${item.img}"
                alt="${item.title}"
              />
              <div class="pro-data">
                <span class="pro-name">${item.title}</span>
                <span class="pro-price">$ ${item.sale}</span>
              </div>
              <div class="count-price">
              <div class="number-input count">
  <button data-id="${item.id}" class="decrement">-</button>
  <input type="number" value="${item.count}"  min="1" max="${item.total}"/>
  <button data-id="${item.id}" class="increment">+</button>
</div>
          <span class="price">$ ${item.price * item.count}</span>
              </div>
            </div>
            <div class="pro-bottom">
              <span class="pro-note"
                >Please, just a little bit spicy only.</span
              >
              <button class="pro-delate" data-id="${item.id}">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7325 7.26564L15.8153 7.26677C16.1229 7.2922 16.3587 7.54759 16.375 7.855L16.3671 8.02641L16.105 11.2358L15.8301 14.3678C15.7719 14.993 15.7198 15.5204 15.6749 15.9355C15.5187 17.3823 14.5796 18.2769 13.1638 18.3034C10.9578 18.3441 8.83731 18.3437 6.7781 18.2992C5.40331 18.2703 4.47805 17.366 4.32462 15.9414L4.21858 14.8918L4.03328 12.8558L3.84347 10.6217L3.62643 7.93986C3.59946 7.59578 3.84959 7.29442 4.18512 7.26676C4.49269 7.2414 4.76525 7.45483 4.82932 7.7556L4.85426 8.0014L5.05805 10.5156L5.28057 13.1215C5.38038 14.2496 5.46695 15.1626 5.53622 15.804C5.62365 16.6158 6.05115 17.0336 6.80343 17.0494C8.84654 17.0936 10.9512 17.094 13.1417 17.0535C13.9398 17.0386 14.374 16.6249 14.4633 15.7978L14.5689 14.7538C14.5998 14.4321 14.6328 14.0769 14.6678 13.691L14.8905 11.1281L15.1588 7.83954C15.1836 7.52414 15.4327 7.28238 15.7325 7.26564ZM3.10949 5.82428C2.77288 5.82428 2.5 5.54445 2.5 5.19926C2.5 4.88283 2.72929 4.62133 3.02679 4.57994L3.10949 4.57423H5.76476C6.0803 4.57423 6.35654 4.36602 6.45535 4.06604L6.47953 3.9734L6.68587 2.92106C6.86759 2.2241 7.45767 1.72787 8.14916 1.6719L8.27993 1.66663H11.7199C12.4229 1.66663 13.0436 2.12186 13.2826 2.82528L13.3228 2.96003L13.5203 3.97315C13.5822 4.29056 13.8354 4.52762 14.1417 4.5681L14.2351 4.57423H16.8905C17.2271 4.57423 17.5 4.85406 17.5 5.19926C17.5 5.51568 17.2707 5.77719 16.9732 5.81857L16.8905 5.82428H3.10949ZM11.7199 2.91667H8.27993C8.10892 2.91667 7.95691 3.01931 7.89377 3.14831L7.87235 3.20499L7.67483 4.21861C7.65067 4.34233 7.61566 4.46146 7.57093 4.57506L12.429 4.57522C12.4011 4.50434 12.377 4.43132 12.3569 4.35636L12.325 4.21836L12.1364 3.24396C12.0923 3.07489 11.9561 2.95111 11.7918 2.92281L11.7199 2.91667Z"
                    fill="#FF7CA3"
                  />
                </svg>
              </button>
            </div>
          </div >
    `
  })
}

productRight.addEventListener("click", (e) => {
  const btnID = e.target.closest(".pro-delate");
  const decrement = e.target.closest(".decrement")
  const increment = e.target.closest(".increment")
  const id = e.target.dataset.id;

  if (btnID) {
    if (!btnID) return;
    const id = Number(btnID.dataset.id);
    if (id) {
      const index = wishlist2.findIndex(el => el.id === id);
      if (index !== -1) wishlist2.splice(index, 1)
    }
  }

  if (increment) {
    const res = wishlist2.find((obj) => obj.id == id);
    res.count += 1;
  }
  if (decrement) {
    const res = wishlist2.find((obj) => obj.id == id);
    res.count -= 1;
  }


  setStorage("wishlist", wishlist2)
  renderUser(wishlist2)
  setPriceCount()
})


function formatPrice(value) {
  return `$ ${value.toFixed(2)}`;
};

export function setPriceCount() {
  let res = wishlist2.reduce(
    (acc, item) => {
      acc.price += item.price * item.count;
      acc.sale += item.sale * item.count;
      return acc;
    },
    { price: 0, sale: 0 }
  );
  proPriceSale.textContent = formatPrice(res.sale);
  proSprice.textContent = formatPrice(res.price);
}

setPriceCount()

