let url = "https://v2.jokeapi.dev/joke/Any";
let btn = document.querySelector("#fetch-btn");

// English elements
let textp = document.querySelector("#jok-text");
let deliveryP = document.querySelector("#delivery");

// Hindi elements
let textpHindi = document.querySelector("#jok-text-hindi");
let deliveryPHindi = document.querySelector("#delivery-hindi");

// Function to translate text to Hindi
async function translateToHindi(text) {
    try {
        let response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
        return response.data.responseData.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return "अनुवाद विफल";
    }
}

btn.addEventListener("click", async function() {
    // Button text change for good UX
    btn.textContent = "Fetching...";
    btn.disabled = true;

    try {
        let res = await axios.get(url);
        
        // CSS animation re-trigger karne ke liye classes remove-add karenge
        textp.style.animation = 'none';
        deliveryP.style.animation = 'none';
        textpHindi.style.animation = 'none';
        deliveryPHindi.style.animation = 'none';
        
        // Trick to trigger reflow (animation reset)
        void textp.offsetHeight; 
        void deliveryP.offsetHeight;
        void textpHindi.offsetHeight;
        void deliveryPHindi.offsetHeight;

        textp.style.animation = null;
        deliveryP.style.animation = null;
        textpHindi.style.animation = null;
        deliveryPHindi.style.animation = null;

        if (res.data.type === "twopart") {
            // Two-part joke (Setup + Delivery)
            textp.textContent = `🤔 ${res.data.setup}`;
            deliveryP.textContent = `😂 ${res.data.delivery}`;
            
            // Translate to Hindi
            let setupHindi = await translateToHindi(res.data.setup);
            let deliveryHindi = await translateToHindi(res.data.delivery);
            
            textpHindi.textContent = `🤔 ${setupHindi}`;
            deliveryPHindi.textContent = `😂 ${deliveryHindi}`;
        } else {
            // Single-line joke
            textp.textContent = `😂 ${res.data.joke}`;
            deliveryP.textContent = ""; // Single line me delivery khali rahegi
            
            // Translate to Hindi
            let jokeHindi = await translateToHindi(res.data.joke);
            textpHindi.textContent = `😂 ${jokeHindi}`;
            deliveryPHindi.textContent = "";
        }

    } catch (error) {
        console.error("Error fetching joke:", error);
        textp.textContent = "Oops! Something went wrong. Try again.";
        deliveryP.textContent = "";
        textpHindi.textContent = "कोई समस्या हुई। फिर से कोशिश करो।";
        deliveryPHindi.textContent = "";
    } finally {
        // Reset button
        btn.textContent = "Fetch Random Joke";
        btn.disabled = false;
    }
});