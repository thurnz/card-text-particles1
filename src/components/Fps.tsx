import { Container, Text, useTick } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useReducer } from "react";

const textStyle = new TextStyle({
  align: "left",
  fontFamily: "Courier New",
  fontSize: 16,
  fill: ["#00ff00"],
});

const initialState = {
  elapsed: 0,
  fps: 0,
};

const reducer = (state: { elapsed: number; fps: number }, action: any) => {
  switch (action.type) {
    case "update":
      return { fps: 1000 / (action.now - state.elapsed), elapsed: action.now };
    default:
      return state;
  }
};

const Fps = () => {
  const [time, dispatch] = useReducer(reducer, initialState);

  useTick(() => {
    dispatch({ type: "update", now: Date.now() });
  });

  return (
    <Container x={10} y={5}>
      <Text
        text={time.fps.toFixed(2) + " fps"}
        anchor={{ x: 0, y: 0 }}
        style={textStyle}
      />
    </Container>
  );
};

export default Fps;
