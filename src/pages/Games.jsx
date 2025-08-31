import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import api from "./api";

const Games = () => {
  
  const [sentence, setSentence] = useState("");
  const [word, setWord] = useState("");
  const [emotionResult, setEmotionResult] = useState("");
  const [emojiResult, setEmojiResult] = useState("");
  const [loadingEmotion, setLoadingEmotion] = useState(false);
  const [loadingEmoji, setLoadingEmoji] = useState(false);

  const handleEmotionDetect = async () => {
    if (!sentence) return alert("Please enter a sentence!");
    setLoadingEmotion(true);
    try {
      const res = await api.post("/api/emotion-detect", { sentence });
      setEmotionResult(res.data.output);
    } catch (err) {
      console.error(err);
      alert("Error detecting emotion");
    }
    setLoadingEmotion(false);
  };

  const handleEmojiMatch = async () => {
    if (!word) return alert("Please enter a word!");
    setLoadingEmoji(true);
    try {
      const res = await api.post("/api/emoji-match", { word });
      setEmojiResult(res.data.output);
    } catch (err) {
      console.error(err);
      alert("Error matching emoji");
    }
    setLoadingEmoji(false);
  };

  //  Game: Mood Color Picker 
  const [moodSentence, setMoodSentence] = useState("");
  const [moodResult, setMoodResult] = useState("");
  const [moodColor, setMoodColor] = useState("#ffffff");
  const [loadingMood, setLoadingMood] = useState(false);

  const handleMoodColor = async () => {
    if (!moodSentence) return alert("Please enter a feeling!");
    setLoadingMood(true);
    try {
      const res = await api.post("/api/emotion-detect", { sentence: moodSentence });
      const emotionOutput = res.data.output;
      setMoodResult(emotionOutput);

      const emotion = emotionOutput.match(/Emotion:\s*(\w+)/)?.[1];
      let color = "#ffffff";
      if (emotion === "Happy") color = "#FFD700";
      else if (emotion === "Sad") color = "#1E90FF";
      else if (emotion === "Angry") color = "#FF4500";
      else if (emotion === "Surprised") color = "#FF69B4";
      setMoodColor(color);

    } catch (err) {
      console.error(err);
      alert("Error detecting mood");
    }
    setLoadingMood(false);
  };

  //  CardFunction 
  const cardStyle = "relative flex flex-col items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl w-80 p-6 shadow-xl overflow-hidden";

  const gradientOverlay = "absolute inset-0 bg-gradient-to-br from-pink-400/30 via-purple-400/20 to-blue-400/30 opacity-70 pointer-events-none";

  return (
    <div
      className="relative flex flex-col items-center min-h-screen p-6 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/rf.jpg')" }}
    >
    
      <motion.div
        className="absolute w-48 h-48 bg-pink-300/40 rounded-full top-20 left-10"
        animate={{ y: [0, 60, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-blue-300/40 rounded-full bottom-28 right-20"
        animate={{ y: [0, -90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-purple-300/30 rounded-full top-64 right-10"
        animate={{ x: [0, 15, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <h1 className="text-4xl md:text-5xl font-extrabold font-['Fredoka_One'] text-pink-600 mt-15 text-center drop-shadow-xl ">
         Fun Games for Students 
      </h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full mt-10 z-10 flex-wrap">
        {/* Game 1: Emotion Detect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
          className={cardStyle}
        >
          <div className={gradientOverlay}></div>
          <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center drop-shadow-md z-10"> Emotion Detect</h2>
          <input
            type="text"
            placeholder="Type a sentence..."
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="w-3/4 p-2 rounded-lg border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-3 text-center bg-white/30 backdrop-blur-sm z-10"
          />
          <button
            onClick={handleEmotionDetect}
            className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-pink-600 transition-colors mb-3 z-10"
          >
            {loadingEmotion ? "Analyzing..." : "Detect"}
          </button>
          {emotionResult && <p className="text-pink-800 font-medium text-center z-10">{emotionResult}</p>}
        </motion.div>

        {/*  Game 2: Emoji Match*/}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
          className={cardStyle}
        >
          <div className={gradientOverlay}></div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center drop-shadow-md z-10"> Emoji Match</h2>
          <input
            type="text"
            placeholder="Type a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-3/4 p-2 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-center bg-white/30 backdrop-blur-sm z-10"
          />
          <button
            onClick={handleEmojiMatch}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors mb-3 z-10"
          >
            {loadingEmoji ? "Matching..." : "Match"}
          </button>
          {emojiResult && <p className="text-blue-800 font-medium text-center z-10">{emojiResult}</p>}
        </motion.div>

        {/*  Game 3: Mood Color Picker*/}
        <motion.div
          whileHover={{ scale: 1.07, rotate: 1 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex flex-col items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl w-80 p-6 shadow-xl overflow-hidden"
        >
          <div className={gradientOverlay}></div>
          <h2 className="text-2xl font-bold mb-4 text-green-700 drop-shadow-md text-center z-10"> Mood Color Picker</h2>
          <input
            type="text"
            placeholder="Type your feeling..."
            value={moodSentence}
            onChange={(e) => setMoodSentence(e.target.value)}
            className="w-full p-3 rounded-xl border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-3 text-center bg-white/30 backdrop-blur-sm z-10"
          />
          <button
            onClick={handleMoodColor}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors mb-3 shadow-md z-10"
          >
            {loadingMood ? "Analyzing..." : "Show Mood Color"}
          </button>
          {moodResult && (
            <div className="flex flex-col items-center mt-2 z-10">
              <p className="text-green-800 font-medium text-center mb-2">{moodResult}</p>
              <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: moodColor }} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Games;
