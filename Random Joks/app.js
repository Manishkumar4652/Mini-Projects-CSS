const url = "https://v2.jokeapi.dev/joke/Any";
const fetchBtn = document.querySelector("#fetch-btn");
const btnText = fetchBtn.querySelector(".btn-text");
const loader = fetchBtn.querySelector(".loader");

// Tabs
const tabEn = document.querySelector("#tab-en");
const tabHi = document.querySelector("#tab-hi");
const secEn = document.querySelector("#sec-en");
const secHi = document.querySelector("#sec-hi");

// Content elements
const textEn = document.querySelector("#jok-text");
const deliveryEn = document.querySelector("#delivery");
const textHi = document.querySelector("#jok-text-hindi");
const deliveryHi = document.querySelector("#delivery-hindi");

// Utilities
const speakBtn = document.querySelector("#speak-btn");
const copyBtn = document.querySelector("#copy-btn");
const shareBtn = document.querySelector("#share-btn");
const toast = document.querySelector("#toast");

let currentTab = "english"; // "english" or "hindi"
let speechUtterance = null;

// Tab Switch Logic
function switchTab(lang) {
    currentTab = lang;
    if (lang === "english") {
        tabEn.classList.add("active");
        tabHi.classList.remove("active");
        secEn.classList.add("active");
        secHi.classList.remove("active");
    } else {
        tabHi.classList.add("active");
        tabEn.classList.remove("active");
        secHi.classList.add("active");
        secEn.classList.remove("active");
    }
    // Stop speaking if playing
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}

tabEn.addEventListener("click", () => switchTab("english"));
tabHi.addEventListener("click", () => switchTab("hindi"));

// Function to translate text to Hindi
async function translateToHindi(text) {
    try {
        const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
        if (response.data && response.data.responseData) {
            return response.data.responseData.translatedText;
        }
        return "अनुवाद त्रुटि";
    } catch (error) {
        console.error("Translation error:", error);
        return "अनुवाद विफल";
    }
}

// Show Toast feedback
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Fetch Random Joke
async function fetchJoke() {
    // Stop ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Set Loading state
    btnText.classList.add("hidden");
    loader.classList.remove("hidden");
    fetchBtn.disabled = true;

    try {
        const res = await axios.get(url);
        
        // Reset animations to re-trigger
        [textEn, deliveryEn, textHi, deliveryHi].forEach(el => {
            el.style.animation = 'none';
            void el.offsetHeight; // force reflow
            el.style.animation = null;
        });

        if (res.data.type === "twopart") {
            const setupText = res.data.setup;
            const deliveryText = res.data.delivery;

            textEn.textContent = `🤔 ${setupText}`;
            deliveryEn.textContent = `😂 ${deliveryText}`;
            deliveryEn.classList.remove("hidden");

            // Translate to Hindi
            const setupHindi = await translateToHindi(setupText);
            const deliveryHindi = await translateToHindi(deliveryText);

            textHi.textContent = `🤔 ${setupHindi}`;
            deliveryHi.textContent = `😂 ${deliveryHindi}`;
            deliveryHi.classList.remove("hidden");
        } else {
            const jokeText = res.data.joke;

            textEn.textContent = `😂 ${jokeText}`;
            deliveryEn.textContent = "";
            deliveryEn.classList.add("hidden");

            // Translate to Hindi
            const jokeHindi = await translateToHindi(jokeText);
            textHi.textContent = `😂 ${jokeHindi}`;
            deliveryHi.textContent = "";
            deliveryHi.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching joke:", error);
        textEn.textContent = "Oops! Failed to load a new joke. Please try again.";
        deliveryEn.textContent = "";
        textHi.textContent = "ओह! नया जोक लोड करने में विफल। कृपया पुन: प्रयास करें।";
        deliveryHi.textContent = "";
    } finally {
        // Reset Loading state
        btnText.classList.remove("hidden");
        loader.classList.add("hidden");
        fetchBtn.disabled = false;
    }
}

fetchBtn.addEventListener("click", fetchJoke);

// Text-to-Speech (TTS)
speakBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
    }

    let jokeToRead = "";
    let langCode = "en-US";

    if (currentTab === "english") {
        jokeToRead = textEn.textContent;
        if (deliveryEn.textContent && !deliveryEn.classList.contains("hidden")) {
            jokeToRead += ". " + deliveryEn.textContent;
        }
        langCode = "en-US";
    } else {
        jokeToRead = textHi.textContent;
        if (deliveryHi.textContent && !deliveryHi.classList.contains("hidden")) {
            jokeToRead += ". " + deliveryHi.textContent;
        }
        langCode = "hi-IN";
    }

    // Strip emoji characters from TTS for smoother voicing
    const cleanText = jokeToRead.replace(/[🤔😂😄]/g, "").trim();

    if (!cleanText) return;

    speechUtterance = new SpeechSynthesisUtterance(cleanText);
    speechUtterance.lang = langCode;

    // Try to find a matched voice on user system
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(langCode));
    if (voice) {
        speechUtterance.voice = voice;
    }

    window.speechSynthesis.speak(speechUtterance);
});

// Copy to Clipboard
copyBtn.addEventListener("click", () => {
    let copyText = "";
    if (currentTab === "english") {
        copyText = textEn.textContent;
        if (deliveryEn.textContent && !deliveryEn.classList.contains("hidden")) {
            copyText += "\n" + deliveryEn.textContent;
        }
    } else {
        copyText = textHi.textContent;
        if (deliveryHi.textContent && !deliveryHi.classList.contains("hidden")) {
            copyText += "\n" + deliveryHi.textContent;
        }
    }

    navigator.clipboard.writeText(copyText)
        .then(() => showToast("Joke copied to clipboard! 📋"))
        .catch(err => {
            console.error("Clipboard copy failed: ", err);
            showToast("Failed to copy joke 😕");
        });
});

// Share Formatting (LinkedIn Friendly copy text)
shareBtn.addEventListener("click", () => {
    let jokeText = "";
    if (currentTab === "english") {
        jokeText = textEn.textContent;
        if (deliveryEn.textContent && !deliveryEn.classList.contains("hidden")) {
            jokeText += "\n" + deliveryEn.textContent;
        }
    } else {
        jokeText = textHi.textContent;
        if (deliveryHi.textContent && !deliveryHi.classList.contains("hidden")) {
            jokeText += "\n" + deliveryHi.textContent;
        }
    }

    const shareContent = `🎭 *Joke of the Day* 🎭\n\n${jokeText}\n\nGenerated using Jester Bilingual Joke App ✨\n#webdev #javascript #css #learning`;

    // Try Native Share if on mobile browser
    if (navigator.share) {
        navigator.share({
            title: 'Jester | Joke of the Day',
            text: shareContent,
            url: window.location.href
        }).then(() => {
            console.log('Shared successfully');
        }).catch(err => {
            console.error('Error sharing:', err);
        });
    } else {
        // Fallback: Copy to clipboard with custom message
        navigator.clipboard.writeText(shareContent)
            .then(() => showToast("LinkedIn-ready post copied to clipboard! 🚀"))
            .catch(err => {
                console.error("Clipboard share failed: ", err);
                showToast("Failed to copy share post 😕");
            });
    }
});

// Populate voices once loaded (especially for Chrome)
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {};
}