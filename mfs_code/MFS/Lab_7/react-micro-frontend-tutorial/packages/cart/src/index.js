// index.js

import("./bootstrap");

const data = [];
const elementsData = document.querySelector(".collection-list").children
for (let index = 0; index < elementsData.length; index++) {
    const element = elementsData[index];
    const name = element.querySelector(".info").innerText
    const image = element.querySelector(".gallery-image").src
    data.push({ name, image })
}
