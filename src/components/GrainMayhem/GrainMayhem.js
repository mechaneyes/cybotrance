import { useEffect } from "react";

const GrainMayhem = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "grain-mayhem.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default GrainMayhem;
