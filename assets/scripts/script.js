//CHECK IF LOCAL STORAGE HAS A PROP
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Check for active class
  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    // ADD CLASS ACTIVE
    if (mainColor === el.dataset.color) {
      el.classList.add("active");
    }
  });
}
// Rabdom bg optuon
let bgOption = true;
let backGroundIntrvl;

// Check
let randomBgOption = localStorage.getItem("random_bg");

if (randomBgOption !== null) {
  if (randomBgOption === "true") {
    bgOption = true;
  } else {
    bgOption = false;
  }
  // remove active class feom spans
  document.querySelectorAll(".random-bg span").forEach((el) => {
    el.classList.remove("active");
  });

  if (randomBgOption === "true") {
    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    document.querySelector(".random-bg .no").classList.add("active");
  }
}

// TOGGLE SETTING BOX
let boxIcon = document.querySelector(".toggle-setting .fa-arrow-circle-right"),
  settingBox = document.querySelector(".setting-box");

boxIcon.onclick = () => {
  boxIcon.classList.toggle("fa-rotate-180");
  settingBox.classList.toggle("open");
};

// SWITCH COLORS
const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // SET LOCAL STORAGE
    localStorage.setItem("color_option", e.target.dataset.color);

    // Rmove and Add Class active
    handleActive(e);
  });
});

// SWITCH Random BACKGROUND
const randomBg = document.querySelectorAll(".random-bg span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Rmove and Add Class active
    handleActive(e);

    if (e.target.dataset.bg === "yes") {
      bgOption = true;

      toRandomImg();

      // SET LOCAL STORAGE
      localStorage.setItem("random_bg", true);
    } else {
      bgOption = false;

      clearInterval(backGroundIntrvl);
      // SET LOCAL STORAGE
      localStorage.setItem("random_bg", false);
    }
  });
});

// LANDING PAGE
let landingPage = document.querySelector(".landing-page");

// ARRAY OF IMAGES NAME
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// CHANGE BACKGROUND IMAGE
function toRandomImg() {
  if (bgOption === true) {
    backGroundIntrvl = setInterval(() => {
      let randomNmbr = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url(./assets/images/${imgsArray[randomNmbr]})`;
    }, 10000);
  }
}
document.onload = toRandomImg();

// OPEN MENU FOR SMALL DVICES
let menu_bars = document.querySelector(".mega-menu");
let links_open = document.querySelector(".links");
menu_bars.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links_open.classList.toggle("open");
};

// CLICK OUTSIDE MENU AND MENU BUTTON

document.addEventListener("click", (e) => {
  if (e.target !== menu_bars && e.target !== links_open) {
    if (links_open.classList.contains("open")) {
      menu_bars.classList.toggle("menu-active");
      links_open.classList.toggle("open");
    }
  }
});

//STOP PROPAGATION FOR MENU LINKS
links_open.onclick = function (e) {
  e.stopPropagation();
};

// SKILL SELECTOR
let ourSkill = document.querySelector(".skills");
// ON SCROLL ANIMATION
window.onscroll = function () {
  let ourSkilloffSetTop = ourSkill.offsetTop;
  let ourSkilloffHeight = ourSkill.offsetHeight;
  let windowHieght = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  //let offSetFinal = ourSkilloffSetTop + ourSkilloffHeight - windowHieght;

  if (windowScrollTop > ourSkilloffSetTop + ourSkilloffHeight - windowHieght) {
    let allSkill = document.querySelectorAll(".skill-box .skill-progress span");
    allSkill.forEach((skillP) => {
      skillP.style.width = skillP.dataset.progress;
      skillP.textContent = skillP.dataset.progress;
    });
  }
};

// Gallery Images Popup
let gallery = document.querySelectorAll(".imgs-box img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create An OverLay
    let overlay = document.createElement("div");

    overlay.className = "overlay-popup";

    document.body.appendChild(overlay);

    // Create popup
    let popuBox = document.createElement("div");
    popuBox.className = "popup-box";

    if (img.alt !== null) {
      // CREATE HEADING FOR IMAGE
      let headImg = document.createElement("h3");
      let textImg = document.createTextNode(img.alt);

      //************** */
      headImg.appendChild(textImg);
      popuBox.appendChild(headImg);
    }

    // CREATE IMAGE ELEMENT

    let imgPopup = document.createElement("img");
    imgPopup.src = img.src;

    // ADD IMAGE TO POPUP AND POPUP TO OVERLAY
    popuBox.appendChild(imgPopup);
    document.body.appendChild(popuBox);

    // CREATE CLOSE SPAN
    let closeBtn = document.createElement("span");
    closeBtn.className = "fa";
    closeBtn.classList.add("fa-plus");
    popuBox.appendChild(closeBtn);
  });
});
//-------------------------

document.addEventListener("click", (e) => {
  if (e.target.className == "fa fa-plus") {
    document.querySelector(".overlay-popup").remove();
    e.target.parentElement.remove();
  }
});

// BULLETS MENU SIDE
let pullets = document.querySelectorAll(".pullets-side .pullet");
scrollTo(pullets);
// LINKS OF NAVBAR
let links = document.querySelectorAll(".links li a");
scrollTo(links);

// Function Scroll To
function scrollTo(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      handleActive(e);
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// FUNCTION TO HANDLE THE ACTIVE CLASS
function handleActive(e) {
  //REMOVE ACTIVE CLASS
  e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  // Add class active
  e.target.classList.add("active");
}
