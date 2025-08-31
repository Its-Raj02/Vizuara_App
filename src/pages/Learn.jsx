import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Learn() {
  const emotions = [
    { id: 1, emoji: "😊", title: "Happy", text: "We smile when we are happy!" },
    { id: 2, emoji: "😢", title: "Sad", text: "Tears come when we feel sad." },
    { id: 3, emoji: "😡", title: "Angry", text: "We frown when we are angry!" },
    { id: 4, emoji: "😲", title: "Surprised", text: "We open our eyes wide when surprised!" },
    { id: 5, emoji: "😴", title: "Sleepy", text: "We yawn and feel tired when sleepy." },
    { id: 6, emoji: "😎", title: "Cool", text: "We feel confident and relaxed when cool." },
    { id: 7, emoji: "😱", title: "Scared", text: "We scream or shiver when scared." },
    { id: 8, emoji: "🤔", title: "Thinking", text: "We scratch our head or ponder when thinking." },
    { id: 9, emoji: "😍", title: "Love", text: "We smile with hearts in eyes when we feel love." },
    { id: 10, emoji: "🤗", title: "Excited", text: "We hug or jump with joy when excited!" },
  ];

  const [cards, setCards] = useState(emotions);

  // rotate slowly every 9s
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => [...prev.slice(-1), ...prev.slice(0, -1)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen w-full p-8 pt-28 bg-cover bg-center"
      style={{ backgroundImage: "url('/rf.jpg')" }}
    >
      <h1 className="text-4xl -mt-5 font-['Fredoka_One'] md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Learn Emotions
      </h1>
      

      {/* Grid with smooth animation */}
      <div className="grid grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layout
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="relative rounded-2xl p-6 text-center
                       bg-white/10 backdrop-blur-lg
                       shadow-xl border border-[#ff1493] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 via-purple-400/30 to-blue-400/40 opacity-70 pointer-events-none"></div>
            <div className="relative z-10">
              <span className="text-5xl drop-shadow-lg">{card.emoji}</span>
              <h2 className="text-xl font-bold mt-2 text-[#00008b] drop-shadow-sm">{card.title}</h2>
              <p className="text-gray-800">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Book-style Article Section --- */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center font-['Fredoka_One'] text-[#9400d3] mb-6">Explore Emotions in Stories 📖</h2>
        <BookArticle />
      </div>
    </div>
  );
}

// ----------------- BookArticle Component -----------------
function BookArticle() {
  const pages = [
    {
      id: 1,
      title: "🌟 What Are Emotions?",
      content: `Emotions are feelings inside us that tell us how we feel.
They help us understand ourselves and others.
Examples: Happy 😊, Sad 😢, Angry 😡, Surprised 😲, Sleepy 😴, Cool 😎, Scared 😱, Thinking 🤔, Love 😍, Excited 🤗.`,
      bg: "from-pink-100 via-yellow-100 to-green-100",
    },
    {
      id: 2,
      title: "😊 Happy & 😢 Sad",
      content: `Happy: Smiles, laughter, jumping with joy! 🎉
Example: Playing with friends or ice cream .
Sad: Feeling down, sometimes crying .
Example: Losing a toy or missing someone .`,
      bg: "from-yellow-100 via-orange-100 to-pink-100",
    },
    {
      id: 3,
      title: "😡 Angry & 😲 Surprised",
      content: `Angry: Feeling upset 😠. Take deep breaths 🌬️ to calm down.
Surprised: Eyes wide open 😲. Example: Rainbow  or magic trick .
Scared 😱: Shiver, scream, hide. Example: Thunder  or scary movie .
Thinking 🤔: Ponder or scratch head . Example: Solving puzzles .
Excited 🤗: Jump, hug or shout! Example: Birthday party or gifts .`,
      bg: "from-red-100 via-purple-100 to-blue-100",
    },
    {
      id: 4,
      title: "😎 Cool & 😍 Love",
      content: `Cool: Feeling confident 😎. Example: New haircut or finishing homework.
Love: Hearts in eyes 😍. Example: Family , friends , pets .
Sleepy 😴: Yawning, feeling tired. Example: Bedtime or long day .`,
      bg: "from-blue-100 via-green-100 to-pink-100",
    },
  ];

  const [pageIndex, setPageIndex] = useState(0);

  const nextPage = () => setPageIndex((prev) => (prev + 1) % pages.length);
  const prevPage = () => setPageIndex((prev) => (prev - 1 + pages.length) % pages.length);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pages[pageIndex].id}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.8 }}
          className={`p-6 rounded-3xl shadow-2xl mb-6 bg-gradient-to-br ${pages[pageIndex].bg} text-gray-800 text-center`}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">{pages[pageIndex].title}</h3>
          <p className="text-lg whitespace-pre-line">{pages[pageIndex].content}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button
          onClick={prevPage}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          ◀ Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
