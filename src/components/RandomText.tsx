import { Container, Text, Sprite } from "@pixi/react";
import { CardStackProps } from "./CardStack";
import { useEffect, useState, useRef } from "react";
import { TextStyle } from "pixi.js";

const words = ["Happy", "Sad", "Sunny", "Hot", "Angry", "Love"];
const images = [
  "/images/bunny_blue.png",
  "/images/bunny_green.png",
  "/images/fire0.png",
  "/images/logo.png",
  "/images/coin.png",
];
const fonts = [
  "Arial",
  "Verdana",
  "Georgia",
  "Garamond",
  "Courier New",
  "monospace",
  "Brush Script MT",
];

const RandomText = ({ width, height, start }: CardStackProps) => {
  const conRef = useRef<any | null>(null);
  const [num, setNum] = useState(0);

  useEffect(() => {
    conRef.current.visible = start;
    if (!start) return;
    let timer = setTimeout(() => {
      let n = 0;
      do {
        n = Math.floor(Math.random() * words.length)
      }
      while(words[n] === words[num]);
      setNum(n);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [start, num]);

  return (
    <Container ref={conRef} x={10} y={5}>
      <Text
        x={width / 2}
        y={height * 0.4 - 10}
        text={words[num]}
        anchor={{ x: 0.5, y: 1 }}
        style={
          new TextStyle({
            align: "center",
            fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
            fontSize: 20 + Math.floor(Math.random() * 60),
            fill: ["#ffffff"],
          })
        }
      />
      <Sprite
        image={images[Math.floor(Math.random() * images.length)]}
        x={width / 2}
        y={height * 0.4 + 10}
        anchor={{ x: 0.5, y: 0 }}
        scale={2}
      />
    </Container>
  );
};

export default RandomText;
