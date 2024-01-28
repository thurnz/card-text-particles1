import { Sprite, ParticleContainer, useTick } from "@pixi/react";
import { CardStackProps } from "./CardStack";
import { useEffect, useRef } from "react";
import { useReducer } from "react";

type FlameProps = {
  alpha: number;
  scale: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const reducer = (states: FlameProps[], action: any) => {
  return states.map((fp: FlameProps, index: number) => {
    return {
      ...fp,
      scale: fp.alpha <= 0 ? 0.25 + Math.random() * 1 : fp.scale,
      y: fp.alpha <= 0 ? fp.height : fp.y - 15 * fp.scale,
      x: fp.alpha <= 0 ? Math.random() * fp.width : fp.x,
      alpha: fp.alpha <= 0 ? Math.random() * 0.5 + 0.5 : Math.max(0, fp.alpha - 0.02),
      width: action.width,
      height: action.height,
    };
  });
};

const Fire = ({ width, height, start }: CardStackProps) => {
  const pcRef = useRef<any | null>(null);

  const setInitialState = () => {
    const initialState: FlameProps[] = [];
    const w = 1920;
    const h = 1080;
    for (let i = 0; i < 10; i++) {
      const flameProps: FlameProps = {
        alpha: Math.random() * 0.5 + 0.5,
        scale: 0.25 + Math.random() * 0.25,
        x: Math.random() * w,
        y: h + Math.random() * 200 - 100,
        width: w,
        height: h,
      };
      initialState.push(flameProps);
    }
    return initialState;
  };

  setInitialState();

  const [flames, dispatch] = useReducer(reducer, setInitialState());

  useEffect(() => {
    if (!pcRef.current) return;
    pcRef.current.visible = start;
  }, [start]);

  useTick(() => {
    if(!start) return;
    dispatch({ type: 'update', width, height });
  });

  return (
    <ParticleContainer ref={pcRef} maxSize={10}>
      {flames.map((flame: FlameProps) => (
        <Sprite
          image={"/images/fire1.png"}
          x={flame.x}
          y={flame.y}
          anchor={{x: 0.5, y: 0}}
          scale={flame.scale}
          alpha={flame.alpha}
        />
      ))}
    </ParticleContainer>
  );
};

export default Fire;
