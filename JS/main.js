let mainColor = window.localStorage.getItem("Color-Option");
if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
let mainBackgroundOpt = window.localStorage.getItem("Background-Option");
let randomBackgroundOpt = true;
if (mainBackgroundOpt) {
  if (mainBackgroundOpt === "true") {
    randomBackgroundOpt = true;
  } else {
    randomBackgroundOpt = false;
  }
  document
    .querySelectorAll(".settings-box .random-backgrounds span")
    .forEach((span) => {
      span.classList.remove("active");
    });
  if (mainBackgroundOpt === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
let bulletsOption = window.localStorage.getItem("Bullets-Option");
if (bulletsOption) {
  document.querySelectorAll(".bullets-option span").forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsOption === "block") {
    document.querySelector(".bullets-option .yes").classList.add("active");
    document.querySelector(".nav-bullets").style.display = "block";
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
    document.querySelector(".nav-bullets").style.display = "none";
  }
}
let settingsGear = document.querySelector(
  ".settings-box .settings-toggle .shape"
);
let settingsBox = document.querySelector(".settings-box");
settingsGear.onclick = function () {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("show");
};

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", () => {
    colorsLi.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    window.localStorage.setItem("Color-Option", li.dataset.color);
  });
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundInterval;

function StartRandomBackground() {
  if (randomBackgroundOpt === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  } else {
    clearInterval(backgroundInterval);
  }
}
StartRandomBackground();

let backgroundBtns = document.querySelectorAll(
  ".settings-box .random-backgrounds span"
);
backgroundBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    backgroundBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    if (btn.dataset.background === "yes") {
      randomBackgroundOpt = true;
      StartRandomBackground();
      window.localStorage.setItem("Background-Option", randomBackgroundOpt);
    } else {
      randomBackgroundOpt = false;
      StartRandomBackground();
      window.localStorage.setItem("Background-Option", randomBackgroundOpt);
    }
  });
});

let progressSpans = document.querySelectorAll(
  ".skills .skill-box .skill-progress span"
);

let skillsSection = document.querySelector(".skills");
window.onscroll = function () {
  if (window.scrollY >= skillsSection.offsetTop - 100) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

let OurGalleryArray = Array.from(
  document.querySelectorAll(".gallery .images-box img")
);

OurGalleryArray.forEach((img) => {
  img.addEventListener("click", () => {
    let overlayEl = document.createElement("div");
    overlayEl.className = "popup-overlay";
    document.body.appendChild(overlayEl);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    if (img.alt) {
      let heading = document.createElement("h3");
      let headingText = document.createTextNode(img.alt);
      heading.appendChild(headingText);
      popupBox.prepend(heading);
    }
    let closeSpan = document.createElement("span");
    closeSpan.className = "close";
    let closeSpanText = document.createTextNode("X");
    closeSpan.appendChild(closeSpanText);
    popupBox.appendChild(closeSpan);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(el.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

let bulletsSpans = document.querySelectorAll(
  ".settings-box .bullets-option span"
);
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpans.forEach((span) => {
  span.addEventListener("click", () => {
    bulletsSpans.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      window.localStorage.setItem("Bullets-Option", "block");
    } else {
      bulletsContainer.style.display = "none";
      window.localStorage.setItem("Bullets-Option", "none");
    }
  });
});

let resetBtn = document.querySelector(".settings-box .reset");
resetBtn.onclick = function () {
  window.localStorage.removeItem("Color-Option");
  window.localStorage.removeItem("Background-Option");
  window.localStorage.removeItem("Bullets-Option");
  window.location.reload();
};

let toggleBtn = document.querySelector(".links-container .toggle-menu");
let tlinks = document.querySelector(".header-area .links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  tlinks.classList.toggle("open");
  this.classList.toggle("menu-active");
};

tlinks.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      tlinks.classList.remove("open");
      toggleBtn.classList.remove("menu-active");
    }
  }
});