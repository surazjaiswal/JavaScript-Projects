const toggleSwitch = document.querySelector('input[type="checkbox"]');

const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const switchIcon = document.getElementById("switch-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const flink1 = document.getElementById("link1");
const flink2 = document.getElementById("link2");
const flink3 = document.getElementById("link3");
const title = document.getElementById("title");

// for favicon dark mode
function favToDark() {
  title.innerText = "Dark Mode";
  flink1.href = "faviconDark/apple-touch-icon.png";
  flink2.href = "faviconDark/favicon-32x32.png";
  flink3.href = "faviconDark/favicon-16x16.png";
}
// for favicon light mode
function favToLight() {
  title.innerText = "Light Mode";
  flink1.href = "faviconLight/apple-touch-icon.png";
  flink2.href = "faviconLight/favicon-32x32.png";
  flink3.href = "faviconLight/favicon-16x16.png";
}

//  for images to dark mode
function imgToDark() {
  image1.src = "img/undraw_feeling_proud_dark.svg";
  image2.src = "img/undraw_conceptual_idea_dark.svg";
  image3.src = "img/undraw_proud_coder_dark.svg";
}

// for images to light mode
function imgToLight() {
  image1.src = "img/undraw_feeling_proud_light.svg";
  image2.src = "img/undraw_conceptual_idea_light.svg";
  image3.src = "img/undraw_proud_coder_light.svg";
}

// for toggle icon light mode
function toggleLight() {
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.remove("fa-moon");
  toggleIcon.children[1].classList.add("fa-sun");
}

// for toggle icon dark mode
function toggleDark() {
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.remove("fa-sun");
  toggleIcon.children[1].classList.add("fa-moon");
}

// Dark Mode
function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleDark();
  imgToDark();
  favToDark();
}

// Light Mode
function lightMode() {
  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
  toggleLight();
  imgToLight();
  favToLight();
}

function switchTheme(event) {
  //   console.log(event.target.checked);

  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

// for getting current theme from local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  } else {
    toggleSwitch.checked = false;
    lightMode();
  }
}
