import { Sprite } from "@pixi/react";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { useEffect, useRef } from "react";

export type CardProps = {
  x?: number;
  y?: number;
};

const Card = ({ x, y }: CardProps) => {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    ref.current.filters = [new DropShadowFilter({ offset:{x: 0, y: 0} })];
  },[]);

  return <Sprite ref={ref} image="/images/card.png" anchor={0.5} x={x} y={y} />;
};

export default Card;
