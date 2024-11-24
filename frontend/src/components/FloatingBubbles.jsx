import React, { useState, useEffect } from "react";

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate initial bubble positions
    const initialBubbles = Array(20)
      .fill(0)
      .map(() => ({
        x: Math.random() * 100, // percentage-based
        y: Math.random() * 100,
        size: Math.random() * 3 + 2, // Bubble size in rem
        delay: Math.random() * 5, // Delay for animation
      }));
    setBubbles(initialBubbles);

    // Track cursor position
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-indigo-800">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white opacity-50 transition-transform duration-500"
          style={{
            width: `${bubble.size}rem`,
            height: `${bubble.size}rem`,
            top: `${bubble.y}%`,
            left: `${bubble.x}%`,
            animation: `float ${Math.random() * 5 + 10}s ease-in-out infinite`,
            animationDelay: `${bubble.delay}s`,
            transform: `translate(calc(${cursorPos.x}px / 50 - 50%), calc(${cursorPos.y}px / 50 - 50%))`,
          }}
        ></div>
      ))}
      <h2 className="absolute w-full text-center text-white text-4xl font-bold top-1/3">
        Floating Bubbles
      </h2>
      <p className="absolute w-full text-center text-white/70 text-lg top-1/2">
        Move your cursor to interact with the bubbles!
      </p>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingBubbles;
