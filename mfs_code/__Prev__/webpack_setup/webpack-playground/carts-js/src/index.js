import { faker } from "@faker-js/faker";
const cartText = `<div>You have ${faker.number.int()} items in your cart</div>`;

document.querySelector("#cart-dev").innerHTML = cartText;
