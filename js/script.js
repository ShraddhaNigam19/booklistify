const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

document.addEventListener("DOMContentLoaded", function () {
  const logoLink = document.querySelector(".logo");

  const tryForFreeLink = document.querySelector(".nav-cta");

  const currentPage = window.location.pathname.split("/").pop();

  logoLink.addEventListener("click", function (event) {
    event.preventDefault();
    navigateToIndexPage(currentPage);
  });

  tryForFreeLink.addEventListener("click", function (event) {
    event.preventDefault();
    navigateToIndexPage(currentPage, "#cta");
  });

  function navigateToIndexPage(currentPage, hash = "") {
    // Determine the target URL based on the current page
    let targetURL = "index.html";
    if (currentPage === "list.html") {
      targetURL += "#testimonials";
    } else if (currentPage === "about.html") {
      targetURL += "#about";
    }
    targetURL += hash;

    // Redirect to the target URL
    window.location.href = targetURL;
  }
});

// Handle navigation for links on specific pages
const listLink = document.querySelector(".list-link");
const testimonialsLink = document.querySelector(".testimonials-link");
const pricingLink = document.querySelector(".pricing-link");

listLink.addEventListener("click", function (event) {
  window.location.href = "list.html";
});

testimonialsLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html#testimonials";
});

pricingLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html#pricing";
});

////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

const aboutLink = document.querySelector(".about-link");

aboutLink.addEventListener("click", function () {
  window.location.href = "about.html";
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

/////////////
///popup/////

const bookCards = document.querySelectorAll(".book");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupAuthor = document.getElementById("popup-author");
const popupYear = document.getElementById("popup-year");
const popupDescription = document.getElementById("popup-description");
const popupBookImg = document.getElementById("popup-book-img");
const popupTags = document.getElementById("popup-tags");
const popupRating = document.getElementById("popup-rating");
const popupReadingTime = document.getElementById("popup-reading-time");

const popupClose = document.getElementById("popup-close");

bookCards.forEach((bookCard) => {
  bookCard.addEventListener("click", () => {
    const bookTitle = bookCard.querySelector(".book-title").textContent;
    const bookAuthor = bookCard.querySelector(
      ".book-attributes strong"
    ).textContent;
    let bookDescription = "";
    let bookYear = ""; // Default
    let bookTags = [];
    let bookRating = "";
    let bookReadingTime = "";
    let bookImgSrc = bookCard.querySelector(".book-img").src;

    if (bookTitle === "The Adventures of Sherlock Holmes") {
      bookDescription = `"The Adventures of Sherlock Holmes" is a captivating collection of twelve short stories penned by Arthur Conan Doyle. Introducing readers to the brilliant detective Sherlock Holmes and his loyal companion Dr. John Watson, the stories delve into Holmes's astute deductive skills and his knack for solving intricate mysteries. From the enigmatic case of Irene Adler in "A Scandal in Bohemia" to the perplexing events of "The Adventure of the Speckled Band," this compilation showcases Holmes's unparalleled ability to unravel the truth behind baffling crimes.`;
      bookYear = "1892";
      bookTags = ["Mystery"];
      bookRating = "4.9";
      bookReadingTime = "8 to 10 hours";
    } else if (bookTitle === "The Night Circus") {
      bookDescription = `"The Night Circus" weaves an enchanting tale of magic and love, set within the captivating confines of Le Cirque des Rêves, a mysterious and ethereal circus that appears only at night. The narrative follows the destinies of two young illusionists, Celia and Marco, who are bound by a fierce competition that spans years. Their magical displays become the heart of the circus, captivating audiences around the world. As their rivalry transforms into a deep and intricate connection, the story explores themes of destiny, sacrifice, and the power of extraordinary love against the backdrop of a fantastical, ever-shifting circus.`;
      bookYear = "2011";
      bookTags = ["Fantasy", "Romance"];
      bookRating = "4.8";
      bookReadingTime = "10 to 12 hours";
    }

    popupTitle.textContent = bookTitle;
    popupAuthor.textContent = `Author: ${bookAuthor}`;
    popupYear.textContent = `Year: ${bookYear}`;
    popupDescription.textContent = bookDescription;
    popupBookImg.src = bookImgSrc;

    popupTags.innerHTML = "";
    bookTags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tag");
      if (tag === "Mystery") {
        tagElement.classList.add("tag--mystery");
      } else if (tag === "Romance") {
        tagElement.classList.add("tag--romance");
      } else if (tag === "Fantasy") {
        tagElement.classList.add("tag--fantasy");
      }
      tagElement.textContent = tag;
      popupTags.appendChild(tagElement);
    });

    popupRating.textContent = `Rating: ${bookRating}`;
    popupReadingTime.textContent = `Reading Time: ${bookReadingTime}`;

    // Show the popup
    popup.style.display = "block";
  });
});

// Close the popup when the close button is clicked
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});
