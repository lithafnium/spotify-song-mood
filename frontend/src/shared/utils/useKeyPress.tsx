import { useState, useEffect } from "react";

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  const downHandler = ({ key }: any): void => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  // If released key is our target key then set to false
  const upHandler = ({ key }: any): void => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
