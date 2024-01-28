import { ButtonGroup, Button, Container } from "@mui/material";
import CardStack from "./components/CardStack";
import Fire from "./components/Fire";
import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

type SCENES = 'cards' | 'text' | 'particles';

function App() {
  const [size, setSize] = useState({width: 0, height: 0});
  const [scene, setScene] = useState<SCENES>('cards');

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  useEffect(() => {
    if(size.width !== window.innerWidth){
      setSize({width: window.innerWidth, height: window.innerHeight});
    }
  }, [size]);

  const getScene = () => {
    switch(scene){
      case 'text':
        return <CardStack width={size.width} height={size.height} />;
      case 'particles':
        return <Fire width={size.width} height={size.height} />
      default:
        return <CardStack width={size.width} height={size.height} />;
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {getScene()}
      <ButtonGroup
        variant="contained"
        size="large"
        sx={{
          position: "absolute",
          bottom: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setScene('cards')}>CARDS</Button>
        <Button onClick={() => setScene('text')}>TEXT</Button>
        <Button onClick={() => setScene('particles')}>PARTICLES</Button>
      </ButtonGroup>
    </Container>
  );
}

export default App;
