import { ButtonGroup, Button, Container } from "@mui/material";
import CardStack from "./components/CardStack";
import Fire from "./components/Fire";
import Fps from "./components/Fps";
import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Stage } from "@pixi/react";

type SCENES = "cards" | "text" | "particles";

function App() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [scene, setScene] = useState<SCENES>("particles");

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  useEffect(() => {
    if (size.width !== window.innerWidth) {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, [size]);

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
      <Stage width={size.width} height={size.height}>
        <CardStack
          width={size.width}
          height={size.height}
          start={scene === "cards"}
        />
        <Fire
          width={size.width}
          height={size.height}
          start={scene === "particles"}
        />
        <Fps />
      </Stage>
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
        <Button
          onClick={() => {
            setScene("cards");
          }}
        >
          CARDS
        </Button>
        <Button
          onClick={() => {
            setScene("text");
          }}
        >
          TEXT
        </Button>
        <Button
          onClick={() => {
            setScene("particles");
          }}
        >
          PARTICLES
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default App;
