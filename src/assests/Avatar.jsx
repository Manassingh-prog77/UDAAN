import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Animation } from "@babylonjs/core";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AvatarScene = ({ isSpeaking }) => {
  const canvasRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Add Camera
    const camera = new ArcRotateCamera("Camera", Math.PI * 4, Math.PI / 2, 3, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add Light
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Load Avatar Model
    SceneLoader.ImportMesh("", "/avatarmodel.glb", "", scene, (meshes) => {
      const avatar = meshes[0];
      avatar.scaling = new Vector3(1.5, 1.5, 1.5);
      avatar.position.y = -1;
      avatarRef.current = avatar;
    });

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => {
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    if (avatarRef.current) {
      const avatar = avatarRef.current;
      if (isSpeaking) {
        // Start animation
        const animation = new Animation(
          "speakingAnimation",
          "rotation.y",
          10, // FPS
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keyFrames = [
          { frame: 0, value: 0 },
          { frame: 10, value: 0.1 },
          { frame: 20, value: -0.1 },
          { frame: 30, value: 0 },
        ];

        animation.setKeys(keyFrames);
        avatar.animations = [animation];
        avatar.getScene().beginAnimation(avatar, 0, 30, true);
      } else {
        // Stop animation
        avatar.getScene().stopAnimation(avatar);
      }
    }
  }, [isSpeaking]);

  return <canvas ref={canvasRef} style={{ width: "50%", height: "300px", borderRadius: 16 }} />;
};
AvatarScene.propTypes = {
  isSpeaking: PropTypes.bool.isRequired,
};

export default AvatarScene;
