 
/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ----------- Game 1: Sentence Emotion Detection -----------
async function analyzeEmotion(sentence) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
    Analyze the emotion in simple language in this sentence: "${sentence}".
    Give response in this format only:
    Emotion: <one word like Happy/Sad/Angry/etc.> 😃
    Explanation: <very short 1-line in childlike language reason>.
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post("/api/emotion-detect", async (req, res) => {
  try {
    const { sentence } = req.body;
    if (!sentence) return res.status(400).json({ error: "Sentence is required" });

    const output = await analyzeEmotion(sentence);
    res.json({ output });
  } catch (error) {
    console.error("❌ Emotion Detect Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ----------- Game 2: Emoji Match -----------
async function emojiMatch(word) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
    Match this word with the best fitting emoji.
    Word: "${word}"
    Answer format only:
    Emoji: <emoji symbol>
    Explanation: <1 short line why this emoji fits>.
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post("/api/emoji-match", async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) return res.status(400).json({ error: "Word is required" });

    const output = await emojiMatch(word);
    res.json({ output });
  } catch (error) {
    console.error("❌ Emoji Match Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ----------- New Route: Story Next Line -----------
app.post("/api/story-next", async (req, res) => {
  try {
    const { previousLine } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt;
    if (!previousLine) {
      // First line of the story
     prompt = `
Write the first sentence of a fun story for 6th grade kids.
Characters: Sunny the Sun ☀️, Cloudy the Cloud ☁️, Nikki Robo 🧠.
Make it:
- Short and easy to read
- Fun and playful
- Kid-friendly
Respond ONLY with the first story line.
`;

    } else {
      // Continue story based on previous line
      prompt = `
      
Continue the story for 6th grade kids.
Previous line: "${previousLine}"
Characters: Sunny the Sun ☀️, Cloudy the Cloud ☁️, Nikki Robo 🧠.
Add ONE new line that is:
- Fun and easy to understand
- Short and simple
- Kid-friendly
Do NOT use difficult words or big phrases.
Respond ONLY with the new story line.
`;
    }

    const result = await model.generateContent(prompt);
    const line = result.response.text().trim();

    res.json({ line });
  } catch (error) {
    console.error("❌ Story Next Error:", error);
    res.status(500).json({ line: "" }); // return empty when error
  }
});


const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
// Serve static frontend build

app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(5000, () => {
  console.log("✅ Backend with Gemini running on port 5000");
});
