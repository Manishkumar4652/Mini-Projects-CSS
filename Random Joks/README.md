# Jester 🎭 | Bilingual Random Joke Generator

A sleek, highly interactive, and responsive web application that fetches random jokes from the JokeAPI, translates them into Hindi dynamically, and offers immersive browser-level Text-to-Speech (TTS) narration.

Designed with a premium glassmorphic UI, modern animations, and smooth layout adaptation for sharing on LinkedIn, GitHub, and portfolios.

---

## 🌟 Features

- 🎭 **Bilingual Joke Experience**: View random English jokes and their corresponding Hindi translations side-by-side using an interactive segmented tab switch.
- 🔊 **Text-to-Speech (TTS)**: Built-in voice synthesis reads jokes aloud in native accents (`en-US` and `hi-IN` fallbacks) with a single click.
- 📋 **Copy to Clipboard**: One-click copies the currently selected language joke format instantly with beautiful toast notifications.
- 🚀 **LinkedIn-Ready Post Share**: Click the share button to automatically format a well-crafted LinkedIn/Twitter post with hashtags and copy it to your clipboard.
- 🎨 **Premium Aesthetics**:
  - **Dynamic Mesh Gradient**: A continuous, animated, multi-colored background transition.
  - **Glassmorphism**: Translucent panels with glowing borders and high-blur drop-shadows.
  - **Adaptive Emojis**: Responsive background emojis that scale down and shift behind the card layout to prevent blocking readability on smaller mobile viewports.
- 📱 **Fully Responsive Layout**: Built with a mobile-first responsive approach, adjusting seamlessly from large desktop monitors down to tiny 320px screen resolutions.

---

## 🛠️ Technology Stack

- **Structure**: HTML5 (Semantic Structure)
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, Keyframe Animations, Glassmorphism, Media Queries)
- **Logic**: Vanilla JavaScript (ES6+, Axios, Web Speech Synthesis API, Web Share API, Clipboard API)
- **API integrations**:
  - [JokeAPI](https://sv443.net/jokeapi/v2/) (Fetching random jokes)
  - [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) (Bilingual translation)

---

## 🚀 How to Run Locally

### Method 1: Open Directly
Simply double-click the `index.html` file in your file explorer to open the page directly in your browser.

### Method 2: Live Server (Recommended)
1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension.
3. Click the **"Go Live"** button at the bottom-right of the status bar.
4. The application will launch at `http://127.0.0.1:5500/index.html`.

---

## 📱 Responsiveness Previews

- **Desktop (1024px+)**: Features decorative floating emojis flanking the sides of the central joke card.
- **Tablets (768px - 1024px)**: Scaled down layout with reduced margins and resized side decorative emojis.
- **Mobile (320px - 768px)**: Emojis are automatically placed subtly in the background with low opacity, layout paddings reduce, and utility action buttons wrap neatly.

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome! Feel free to fork this project and add more interactive features.

*Show your support by giving it a ⭐️ if you liked the design!*
