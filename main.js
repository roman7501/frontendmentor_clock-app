const URL_QUOTES = "https://api.quotable.io/random";
const URL_CLOCK = "http://worldclockapi.com/api/json/cet/now";

const refreshBtn = document.getElementById("refresh");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

const clockEl = document.getElementById("clock");

const btnMore = document.getElementById("btn-more");
const desc = document.getElementById("desc");
const app = document.getElementById("app");

const body = document.querySelector("body");

getQuote();
getClock();
const interval = setInterval(getClock, 1000);
clearInterval(interval);

async function getQuote() {
  const res = await fetch(URL_QUOTES);
  const data = await res.json();
  const quote = data.content;
  const author = data.author;
  displayQuote(quote, author);
}

function displayQuote(quoteData, authorData) {
  // Reset
  quoteEl.innerText = "";
  authorEl.innerText = "";

  // Add quotte
  quoteEl.innerText = quoteData;
  authorEl.innerText = authorData;
}

async function getClock() {
  const res = await fetch(URL_CLOCK);
  const data = await res.json();
  const date = new Date(data.currentDateTime);
  const hours = date.getHours();
  const min = date.getMinutes();

  displayClock(hours, min);
}

function displayClock(h, m) {
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }

  clockEl.innerText = h + ":" + m;
  if (h >= 18) {
    body.classList.add("night");
  }
}

function showDesc() {
  if (app.classList.contains("show-desc")) {
    app.classList.remove("show-desc");
    app.style.transform = "translateY(0)";
  } else {
    app.classList.add("show-desc");
    app.style.transform = `translateY(-${desc.offsetHeight}px)`;
  }
  console.log(app);
}

refreshBtn.addEventListener("click", getQuote);

btnMore.addEventListener("click", showDesc);
