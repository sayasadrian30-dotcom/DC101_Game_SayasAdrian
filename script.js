const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing regularly improves speed and accuracy over time.",
    "JavaScript allows developers to create interactive websites.",
    "Consistent practice is the key to mastering any skill.",
    "Learning to type faster saves valuable time every day.",
    "A good typing posture prevents strain and fatigue.",
    "Front end development combines design and logic together.",
    "Clean code is easier to read and maintain.",
    "The internet has transformed how people learn new skills.",
    "Small improvements lead to big results over time.",
    "Programming requires patience and logical thinking.",
    "Practice typing without looking at the keyboard.",
    "Technology continues to evolve at a rapid pace.",
    "Focus and accuracy matter more than speed at first.",
    "Web applications run directly inside a browser.",
    "Problem solving is a valuable life skill.",
    "Never stop learning and improving yourself.",
    "Good habits create long term success.",
    "Consistency beats motivation every single time.",
    "Every expert was once a beginner."
];

const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const resultEl = document.getElementById("result");
const retryBtn = document.getElementById("retry");

let startTime = null;
let timer = null;
let currentSentence = "";

function loadSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    textEl.innerHTML = "";
    currentSentence.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        textEl.appendChild(span);
    });

    inputEl.value = "";
    timeEl.innerText = 0;
    wpmEl.innerText = 0;
    resultEl.classList.add("hidden");
    inputEl.disabled = false;
    startTime = null;
    clearInterval(timer);
}

inputEl.addEventListener("input", () => {
    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTime, 1000);
    }

    const input = inputEl.value.split("");
    const spans = textEl.querySelectorAll("span");

    spans.forEach((span, i) => {
        if (input[i] == null) {
            span.classList.remove("correct", "incorrect");
        } else if (input[i] === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    if (input.join("") === currentSentence) {
        finishTest();
    }

    calculateWPM();
});

function updateTime() {
    const seconds = Math.floor((new Date() - startTime) / 1000);
    timeEl.innerText = seconds;
}

function calculateWPM() {
    const minutes = (new Date() - startTime) / 60000;
    const words = inputEl.value.trim().split(/\s+/).length;
    const wpm = Math.round(words / minutes);
    wpmEl.innerText = isFinite(wpm) ? wpm : 0;
}

function finishTest() {
    clearInterval(timer);
    inputEl.disabled = true;
    resultEl.classList.remove("hidden");
}

retryBtn.addEventListener("click", loadSentence);

loadSentence();