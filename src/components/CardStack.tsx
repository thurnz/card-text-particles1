import { Stage, Container } from "@pixi/react";
import Fps from "./Fps";
import Card from "./Card";
import { useEffect, useRef } from "react";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";

export type CardStackProps = {
  width: number;
  height: number;
};

const CardStack = ({ width, height }: CardStackProps) => {
  const cardsRef = useRef<any | null>(null);

  const setCards = () => {
    const cards = [];
    const total = 144;
    const w = 169;
    const d = (width - w) / total;
    for (let i = 0; i < total; i++) {
      cards.push(<Card key={i} x={w / 2 + d * i} y={150} />);
    }
    return cards;
  };

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    const shuffle = () => {
      cards.forEach((card: Sprite, index: number) => {
        gsap.to(card, {
          delay: cards.length - index,
          duration: 2,
          y: height - 200,
          onStart: () => {
            cardsRef.current.addChild(card);
          },
        });
      });
    };
    shuffle();

    return () => {
      gsap.killTweensOf(cards);
    };
  });

  return (
    <Stage width={width} height={height}>
      <Container ref={cardsRef}>{setCards()}</Container>
      <Fps />
    </Stage>
  );
};

export default CardStack;
