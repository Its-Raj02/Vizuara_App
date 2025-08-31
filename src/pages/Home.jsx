// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Home() {
  return (
     <section
      className="relative w-full min-h-screen overflow-hidden pt-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/rf.jpg')" }} // ← इथे background image path
    >

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-12">
        <div className="max-w-xl text-center md:text-left ml-10 -mt-30">
          <motion.h1
 className="text-5xl font-extrabold text-transparent bg-clip-text
               bg-gradient-to-r from-[#0B3D91] font-['Fredoka_One'] via-[#008BFF] to-[#FF1493]"
              
  initial={{ opacity: 0, y: 50, scale: 0.8 }}
  animate={{ opacity: 1, y: 0, scale: 1.05 }}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 12,
    duration: 1,
    delay: 0.2,
  }}
  whileHover={{ scale: 1.1, textShadow: "0 0 20px #ffffff" }}
>
  Explore Emotions in Text
</motion.h1>

 <motion.p
  className="mt-4 text-lg md:text-xl -ml-2 font-semibold text-rose-800 leading-relaxed"
   initial={{ opacity: 0, y: 20 }}   
  animate={{ opacity: 1, y: 0 }}    
  transition={{ delay: 0.5, duration: 1 }}
>
  Discover how to understands happiness, sadness & more — through fun
  exercises, stories, and interactive games.
</motion.p>
          
        </div>
        <motion.img
          src="/w.png"
          alt="Cute Panda"
          className="w-64 md:w-[32rem] drop-shadow-2xl -mt-35"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0, 10, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>
    </section>
  );
}
