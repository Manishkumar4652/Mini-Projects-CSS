let btn = document.querySelector("#fetch-btn");
let url = "https://dog.ceo/api/breeds/image/random";

btn.addEventListener("click", async function(){
    let link = await getDogImage();
    console.log(link);

    // Ab yeh #dog-image ek <img> tag hai, toh src sahi se set ho jayega
    let imageElement = document.querySelector("#dog-image");
    imageElement.setAttribute("src", link);
});

async function getDogImage(){
    try {
        let res = await axios.get(url);
        return res.data.message;
    } catch (error) {
        console.error("Error fetching dog image:", error);
        return ""; // Error ke case me empty string return karega
    }
}