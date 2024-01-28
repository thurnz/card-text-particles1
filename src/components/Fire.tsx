import { PixiComponent, applyDefaultProps } from "@pixi/react";
import { CardStackProps } from "./CardStack";
import { Container } from "pixi.js";
//import * as particles from "@pixi/particle-emitter";

/*const emitterConfig = {
  lifetime: { min: 0.1, max: 3 },
  frequency: 1,
  spawnChance: 1,
  particlesPerWave: 1,
  emitterLifetime: 120,
  maxParticles: 10,
  pos: { x: 327, y: 200 },
  autoUpdate: true,
  behaviors: [
    {
      type: "spawnShape",
      config: { type: "torus", data: { x: 0, y: 0, radius: 100 } },
    },
    { type: "textureSingle", config: { texture: Texture.WHITE } },
  ],
};*/

/*const Emitter = PixiComponent("Emitter", {
  create() {
    return new PIXI.Container();
  },
  applyProps(instance, oldProps, newProps) {
    const { image, config } = newProps;

    if (!this._emitter) {
      this._emitter = new PIXI.particles.Emitter(
        instance,
        [PIXI.Texture.from(image)],
        config
      );

      let elapsed = Date.now();

      const t = () => {
        this._emitter.raf = requestAnimationFrame(t);
        const now = Date.now();

        this._emitter.update((now - elapsed) * 0.001);

        elapsed = now;
      };

      this._emitter.emit = true;
      t();
    }
  },
  willUnmount() {
    if (this._emitter) {
      this._emitter.emit = false;
      cancelAnimationFrame(this._emitter.raf);
    }
  }
});*/

const Fire = ({ width, height }: CardStackProps) => {
  const Emitter: any = PixiComponent("Emitter", {
    config: {
      destroy: true,
      destroyChildren: true,
    },
    create: () => {
      return new Container;
    },
    applyProps: (instance, oldProps, newProps) => {
      applyDefaultProps(instance, oldProps, newProps);
    },
    willUnmount() {},
  });

  return <Emitter />;
};

export default Fire;
