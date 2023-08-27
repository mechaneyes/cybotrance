import { useState, useEffect } from "react";
import { crossingBrooklynArray } from "./crossingBrooklynArray";

const Whitman = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // An example array containing lines from the poem "Crossing Brooklyn Ferry"
  const lines = crossingBrooklynArray;

  useEffect(() => {
    // Set up a timer to update the current line every 10 seconds
    const timer = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentLine((prevLine) => (prevLine + 1) % lines.length);
        setFadeIn(true);
        setFadeOut(false);
        setTimeout(() => {
          setFadeIn(false);
        }, 1000); // 1 second
      }, 500);
    }, 10000); // 10 seconds

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  const handleAnimationEnd = () => {
    // Remove the fade-out element from the DOM after the animation completes
    setFadeOut(false);
  };

  return (
    <section className="whitman">
      {/* <h1>"Crossing Brooklyn Ferry" by Walt Whitman</h1> */}
      <div>
        {fadeOut ? (
          <p className="fade-out" onAnimationEnd={handleAnimationEnd}>
            {lines[currentLine]}
          </p>
        ) : (
          <p className={fadeIn ? "fade-in" : ""}>{lines[currentLine]}</p>
        )}
      </div>
    </section>
  );
};

export default Whitman;
