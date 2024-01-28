import { Container, Text, useTick } from "@pixi/react";
import { TextStyle } from 'pixi.js';
import { useRef, useState } from "react";

const textStyle = new TextStyle({
  align: 'left',
  fontFamily: 'Courier New',
  fontSize: 16,
  fill: ['#00ff00']
});

const Fps = () => {
  const [fps, setFps] = useState(0);
  let elapsedRef = useRef(Date.now());

  useTick((delta: number) => {
    const now = Date.now();
    setFps(1000 / (now - elapsedRef.current));
    elapsedRef.current = now;
  });

  return (
    <Container x={10} y={5}>
      <Text
        text={fps.toFixed(2) + ' fps'}
        anchor={{ x: 0, y: 0 }}
        style={textStyle}
      />
    </Container>
  );
};

export default Fps;
