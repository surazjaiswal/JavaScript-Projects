const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

// onload images
function onImgLoad() {
  console.log("Image Loaded");
}

// Unsplash API
const apiKey = "uqZQxMR2ncKYb1WwypiaNBLSvAhNZy2IzPytiEbYm14";
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// create elements for links & photos, add to DOM
function displayImg() {
  totalImages = photosArray.length;
  console.log("totalImages = ", totalImages);
  photosArray.forEach((photo) => {
    // create <a> to link photo to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // Event listener, chk when each img load if finished
    img.addEventListener("load", onImgLoad);
    // putting <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    imageLoaded++;
    if (imageLoaded === totalImages) {
      loader.hidden = true;
      imageLoaded = 0;
      ready = true;
      console.log("ready = ", ready);
    }
  });
}

// Get Photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayImg();
    console.log(photosArray);
  } catch (error) {
    // handle error
  }
}

// to chk if scrolled to bottom or not, for loading new images
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    console.log("load more");
    getPhotos();
    displayImg();
  }
});

// onload
getPhotos();
