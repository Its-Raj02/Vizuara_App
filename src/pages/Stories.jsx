 
 
import React, { useState, useEffect } from "react";

import Confetti from "react-confetti";
import api from "./api";

const characters = {
  sunny: "/s.png",
  cloudy: "/c.png",
  nikki: "/ini.png",
};

const Stories = () => {
  const [storyLines, setStoryLines] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [happyCount, setHappyCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [storyEnded, setStoryEnded] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState([]);
  const [flash, setFlash] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [rewardType, setRewardType] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowInitialPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchFirstLine = async () => {
      setLoading(true);
      try {
        const res = await api.post('/api/story-next', { previousLine: "" });
        setStoryLines([res.data.line]);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchFirstLine();
  }, []);

  useEffect(() => {
    if (happyCount > 0) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [happyCount]);

  const handleSubmit = async () => {
    if (!userInput) return alert("Please write your next line!");
    setLoading(true);

    try {
      const emotionRes = await api.post('/api/emotion-detect', { sentence: userInput });
      const emotionOutput = emotionRes.data.output;
      const emotion = emotionOutput.match(/Emotion:\s*(\w+)/)?.[1];

      if (emotion === "Happy") setHappyCount((prev) => prev + 1);

      setFeedback(emotionOutput);

      if (emotion === "Happy") {
        const newCoin = { id: Date.now(), top: 400, left: 200 };
        setAnimatedCoins((prev) => [...prev, newCoin]);
      }

      const storyRes = await api.post('/api/story-next', { previousLine: userInput });
      const nextLine = storyRes.data.line;

      if (!nextLine) {
        setStoryEnded(true);
      } else {
        setStoryLines((prev) => [...prev, userInput, nextLine]);
      }

      setUserInput("");
    } catch (err) {
      console.error(err);
      setFeedback("Error communicating with backend.");
    }
    setLoading(false);
  };

  const handleFinish = () => {
    if (happyCount === 0) setRewardType("none");
    else if (happyCount <= 2) setRewardType("heart");
    else if (happyCount <= 4) setRewardType("gift");
    else setRewardType("trophy");

    setShowFinishPopup(true);
    setTimeout(() => setShowFinishPopup(false), 10000);
  };

  const renderRewardContent = () => {
    if (rewardType === "none") return <p className="text-xl text-white font-bold">Oh no! Nothing in your pocket 😢</p>;
    if (rewardType === "heart") return <p className="text-3xl">❤️ You got some happy moments! 🌟</p>;
    if (rewardType === "gift") return (
      <>
        <p className="text-3xl">🎁 You got a gift! 🌟</p>
        <img src="/gift.png" alt="gift" className="mx-auto w-32 h-32 mt-2" />
      </>
    );
    if (rewardType === "trophy") return (
      <>
        <p className="text-3xl">🏆 Amazing! You collected max happy coins! 🌟</p>
        <img src="/trophy.png" alt="trophy" className="mx-auto w-32 h-32 mt-2" />
      </>
    );
  };

  return (
    <>
    
      <div className={`fixed top-6 right-6 w-16 h-16 mt-7 flex items-center justify-center z-50 ${flash ? "animate-ping" : ""}`}>
        <img src="/v.png" alt="coin" className="w-full h-full rounded-full shadow-lg" />
        <span className="absolute font-bold text-xl text-white">{happyCount}</span>
      </div>

     
      <div className="relative min-h-screen w-full flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/j.jpg')" }}>
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Fredoka_One'] text-pink-600 mt-20 mb-8 text-center">Make Your Story</h1>
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {storyLines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl shadow-lg">
              <img
                src={idx % 3 === 0 ? characters.sunny : idx % 3 === 1 ? characters.cloudy : characters.nikki}
                alt="character"
                className="w-16 h-16 rounded-full"
              />
              <p className="text-lg">{line}</p>
            </div>
          ))}

          {!storyEnded && (
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                placeholder="Write your next line..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center"
                disabled={loading}
              />
              <div className="flex gap-4 justify-center mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Thinking..." : "Submit Line"}
                </button>
                <button onClick={handleFinish} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
                  Finish
                </button>
              </div>
            </div>
          )}

          {animatedCoins.map((coin) => (
            <div key={coin.id} className="coin" style={{ top: coin.top, left: coin.left, position: "absolute" }}>🪙</div>
          ))}

          {feedback && <p className="mt-2 font-medium text-center text-lg text-purple-700">{feedback}</p>}
        </div>
      </div>

     
      {showInitialPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-3xl p-6 shadow-2xl text-center max-w-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-pink-600 mb-2"> Welcome to Happy Story Game! </h2>
            <p className="text-lg">Write happy moments in your story to collect coins! 🪙</p>
          </div>
        </div>
      )}

 
      {showFinishPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {(rewardType !== "none") && <Confetti numberOfPieces={300} />}
          <div className="bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 rounded-3xl p-8 shadow-2xl text-center max-w-sm w-full animate-bounce">
            {renderRewardContent()}
            {rewardType !== "none" && <p className="text-xl text-white mt-2">You collected {happyCount} happy coins! 🌟</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
