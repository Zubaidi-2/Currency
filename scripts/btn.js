"use strict";

const cta = document.querySelector(".start-cta");
const mainDiv = document.querySelector(".hidden");
cta.addEventListener("click", () => {
  cta.style.animation = "removeAnimation 0.5s forwards";
  setTimeout(() => {
    mainDiv.classList.add("convert");
    cta.remove();
  }, 600);
});

/   animation: removeAnimation 0.5s forwards; /;
