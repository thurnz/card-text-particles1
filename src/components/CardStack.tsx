import { Container } from "@pixi/react";
import Card from "./Card";
import { useEffect, useRef } from "react";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";

export type CardStackProps = {
  width: number;
  height: number;
  start: boolean;
};

const CARD = {
  WIDTH: 169,
  HEIGHT: 240,
};

const CardStack = ({ width, height, start }: CardStackProps) => {
  const conRef = useRef<any | null>(null);

  const getCards = () => {
    const cards = [];
    const total = 144;
    const d = (width - CARD.WIDTH) / total;
    for (let i = 0; i < total; i++) {
      cards.push(<Card key={i} x={CARD.WIDTH / 2 + d * i} y={150} />);
    }
    return cards;
  };

  useEffect(() => {
    if (!conRef.current) return;
    const cards = conRef.current.children;

    const shuffle = () => {
      const d = (width - CARD.WIDTH) / cards.length;
      cards.forEach((card: Sprite, index: number) => {
        card.x = CARD.WIDTH / 2 + d * index;
        card.y = 150;
        gsap.to(card, {
          delay: cards.length - index,
          duration: 2,
          y: height - 200,
          onStart: () => {
            conRef.current.addChild(card);
          },
        });
      });
    };

    if (start) {
      shuffle();
    } else {
      gsap.killTweensOf(cards);
    }

    conRef.current.visible = start;

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [start, height, width]);

  return <Container ref={conRef}>{getCards()}</Container>;
};

export default CardStack;
