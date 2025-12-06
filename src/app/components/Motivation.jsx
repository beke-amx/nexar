<<<<<<< HEAD
"use client";
import TextAnimation from "./ui/scroll-text";
import React from "react";
=======
import TextAnimation from "./ui/scroll-text";
import React, { useRef } from "react";
>>>>>>> 764d7959d32ee2c6b8097327ff1a306096ccb445

function Motivation() {
  return (
    <div className="max-w-5xl mx-auto ">
      <div className="h-[80vh] flex flex-col justify-center items-center text-center">
        <TextAnimation
          text="Creative ideas start here."
          variants={{
            hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: { ease: "linear" },
            },
          }}
          classname="xl:text-8xl sm:text-7xl text-5xl max-w-md mx-auto font-medium capitalize"
        />
      </div>

      <div className="h-[80vh] flex items-center text-left">
        <TextAnimation
          as="p"
          letterAnime={true}
          text="Let's team up and turn ideas into reality ✨"
          classname="sm:text-7xl text-5xl max-w-md lowercase"
          variants={{
            hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          }}
        />
      </div>

      <div className="h-[80vh] flex justify-center items-center text-right">
        <TextAnimation
          text="Turning concepts into reality"
          direction="right"
          classname="sm:text-7xl text-5xl max-w-md ml-auto capitalize"
        />
      </div>

      <div className="h-[80vh] flex justify-center items-center text-center">
        <TextAnimation
          text="Dream big, work hard & achieve greatness "
          direction="down"
          lineAnime={true}
          classname="text-5xl sm:text-7xl max-w-md mx-auto capitalize"
        />
      </div>
    </div>
  );
}

export default Motivation;
