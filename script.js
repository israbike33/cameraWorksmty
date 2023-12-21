const colorSchemes = [

{
    name: "Light",
    bgColor: "238, 238, 238",
    shadowLight: "#ffffff",
    shadowDark: "#cacaca",
    textColor: "#6b7280",
    linkColor: "#6d28d9" },

{
  name: "Dark",
  bgColor: "31, 39, 51",
  shadowLight: "#273140",
  shadowDark: "#171d26",
  textColor: "#D8E8F6",
  linkColor: "#3BA7E9" },

  {
    name: "Gray",
    bgColor: "58, 56, 66",
    shadowLight: "#43404c",
    shadowDark: "#313038",
    textColor: "#D8E8F6",
    linkColor: "#44CF6C" },
 

{
  name: "Cream",
  bgColor: "241, 226, 199",
  shadowLight: "#fff2d5",
  shadowDark: "#e0d2b9",
  textColor: "#5A5353",
  linkColor: "#1EA896" },

{
  name: "Blue",
  bgColor: "39, 122, 247",
  shadowLight: "#2b86ff",
  shadowDark: "#236ede",
  textColor: "#EFEFEF",
  linkColor: "#CEFF1A" },

{
  name: "Green",
  bgColor: "124, 165, 105",
  shadowLight: "#87B472",
  shadowDark: "#719660",
  textColor: "#111D13",
  linkColor: "#59114D" },

{
  name: "Purple",
  bgColor: "102, 8, 196",
  shadowLight: "#7509e1",
  shadowDark: "#5707A7",
  textColor: "#BCF8EC",
  linkColor: "#F9CFF2" },

{
  name: "Orange",
  bgColor: "252, 121, 0",
  shadowLight: "#ff8b00",
  shadowDark: "#d66700",
  textColor: "#303336",
  linkColor: "#1D2F6F" },



{
  name: "Pink",
  bgColor: "251, 192, 189",
  shadowLight: "#ffccc8",
  shadowDark: "#ecb4b2",
  textColor: "#111D4A",
  linkColor: "#5F56B3" }];



const FOCUSABLE_SELECTORS =
"a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

const root = document.documentElement;
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-dropdown");

const themeSelect = document.getElementById("theme-select");
const optGroup = document.createElement("optgroup");
optGroup.label = "Color";
themeSelect.appendChild(optGroup);
colorSchemes.forEach((element, index) => {
  themeSelect.add(new Option(element.name, index));
});

let colorIndex = 0;

themeSelect.addEventListener("change", function () {
  colorIndex = this.value;
  setStyles(colorIndex);
});

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("open");
  menu.classList.toggle("show");
});

function setStyles(colorIndex) {
  let activeColor = colorSchemes[colorIndex];

  root.style.setProperty("--bg-color", activeColor.bgColor);
  root.style.setProperty("--text-color", activeColor.textColor);
  root.style.setProperty("--shadow-light", activeColor.shadowLight);
  root.style.setProperty("--shadow-dark", activeColor.shadowDark);
  root.style.setProperty("--link-color", activeColor.linkColor);
}

const cardContainer = document.querySelector(".card-container");

cardContainer.addEventListener("click", e => {
  if (e.target.classList.contains("homepage-card-link")) {
    const closeModal = (element, triggerElement) => {
      element.remove();

      document.body.classList.remove("filter-blur");

      // Untrap the tab focus by removing tabindex=-1. You should restore previous values if an element had them.
      const focusableElements = document.querySelectorAll(FOCUSABLE_SELECTORS);
      focusableElements.forEach(el => el.removeAttribute("tabindex"));

      // restore focus to the triggering element
      triggerElement.focus();

      // remove escape keydown listener from document
      document.removeEventListener("keydown", escapeHandler);
    };

    const escapeHandler = () => {
      const evt = window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        closeModal(clonedCard, e.target);
      }
    };

    // close modal on escape key press
    document.addEventListener("keydown", escapeHandler);

    let target = e.target;
    // clone card click
    let card = e.target.closest(".homepage-card");
    let clonedCard = card.cloneNode(true);
    clonedCard.classList.remove("homepage-card");
    clonedCard.id = "cloned-card";

    // botton cloned card
    let btn = document.createElement("button");
    btn.innerText = "Informes";
    btn.classList.add("buy-button");
    clonedCard.appendChild(btn);

    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = `<svg class="block h-5 w-30" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    closeBtn.classList.add("close-button");
    clonedCard.appendChild(closeBtn);
    document.body.appendChild(clonedCard);
    document.body.classList.add("filter-blur");

    closeBtn.addEventListener("click", () => {
      closeModal(clonedCard, target);
    });

    const focusableElements = document.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach(el => el.setAttribute("tabindex", "-1"));
    const modalFocusableElements = clonedCard.querySelectorAll(
    FOCUSABLE_SELECTORS);

    modalFocusableElements.forEach(el => el.setAttribute("tabindex", "0"));
    clonedCard.querySelector(FOCUSABLE_SELECTORS).focus();

    // close modal on mask click
    clonedCard.addEventListener("click", function (e) {
      if (e.target.id === "cloned-card") {
        closeModal(clonedCard, target);
      }
    });
  }
});

// save color theme selection to local storage
document.addEventListener('DOMContentLoaded', function () {
  const myStorage = window.localStorage;
  document.getElementById("theme-select").addEventListener("change", function () {
    populateStorage();
  });

  if (!myStorage.getItem("colorIndex")) {
    populateStorage();
  } else {
    setStyles();
  }

  function setStyles() {
    let colorIndex = myStorage.getItem("colorIndex");
    let activeColor = colorSchemes[colorIndex];
    document.getElementById("theme-select").value = colorIndex;

    root.style.setProperty("--bg-color", activeColor.bgColor);
    root.style.setProperty("--text-color", activeColor.textColor);
    root.style.setProperty("--shadow-light", activeColor.shadowLight);
    root.style.setProperty("--shadow-dark", activeColor.shadowDark);
    root.style.setProperty("--link-color", activeColor.linkColor);
  }

  function populateStorage() {
    myStorage.setItem(
    "colorIndex",
    document.getElementById("theme-select").value);


    setStyles();
  }
}, false);