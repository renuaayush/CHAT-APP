// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//       <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//         <div className="max-w-md text-center">
//           <div className="grid grid-cols-3 gap-3 mb-8">
//             {[...Array(9)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`aspect-square rounded-2xl bg-primary/10 ${
//                   i % 2 === 0 ? "animate-pulse" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <h2 className="text-2xl font-bold mb-4">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default AuthImagePattern;





import React from "react";

const AnimatedGrid = ({ title, subtitle }) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-purple-500"];

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-lg ${colors[i % colors.length]} animate-bounce transform-gpu ${
                i % 2 === 0 ? "rotate-45" : "scale-110"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-4">{title}</h2>
        <p className="text-lg text-white/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AnimatedGrid;



// import React, { useState } from "react";

// const AnimatedGrid = ({ title, subtitle }) => {
//   const [positions, setPositions] = useState(Array(16).fill({ x: 0, y: 0 }));
//   const [scattered, setScattered] = useState(false);

//   const handleMouseEnter = () => {
//     const newPositions = positions.map(() => ({
//       x: Math.random() * 400 - 200, // Random x-offset within a range
//       y: Math.random() * 400 - 200, // Random y-offset within a range
//     }));
//     setPositions(newPositions);
//     setScattered(true);
//   };

//   const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-purple-500"];

//   return (
//     <div
//       className="hidden lg:flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12 relative overflow-hidden"
//       onMouseEnter={handleMouseEnter}
//     >
//       <div className="max-w-md text-center relative">
//         <div className="grid grid-cols-4 gap-4 mb-8 relative">
//           {[...Array(16)].map((_, i) => (
//             <div
//               key={i}
//               className={`w-16 h-16 rounded-lg ${colors[i % colors.length]} transition-transform duration-700`}
//               style={{
//                 transform: scattered
//                   ? `translate(${positions[i].x}px, ${positions[i].y}px)`
//                   : "translate(0px, 0px)",
//               }}
//             />
//           ))}
//         </div>
//         <h2 className="text-3xl font-extrabold text-white mb-4">{title}</h2>
//         <p className="text-lg text-white/70">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// export default AnimatedGrid;
