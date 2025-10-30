import React, { useState, useEffect } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import InteractivePoints from "./InteractivePoints";

/* --------- 📦 Composant du modèle 3D --------- */
function MuseumModel() {
  const gltf = useLoader(GLTFLoader, "/models/musee.glb");

  // Correction des matériaux et du rendu
  const { gl, scene } = useThree();
  useEffect(() => {
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1;

    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          obj.material.side = THREE.DoubleSide;
          obj.material.needsUpdate = true;
        }
      }
    });
  }, [gl, scene]);

  return (
    <primitive
      object={gltf.scene}
      scale={1.2}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

/* --------- 🎥 Gestion du mouvement de caméra --------- */
function CameraMover({ target }) {
  const { camera } = useThree();
  const [initialPos] = useState(() => camera.position.clone());
  const [isReturning, setIsReturning] = useState(false);

  useFrame(() => {
    if (target) {
      // Position visée légèrement devant le point
      const targetPos = new THREE.Vector3(
        target.position[0],
        target.position[1] + 1.5,
        target.position[2] + 3
      );

      // Déplacement fluide vers le point
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(
        target.position[0],
        target.position[1],
        target.position[2]
      );
    } else if (isReturning) {
      // Retour progressif à la position initiale
      camera.position.lerp(initialPos, 0.03);
      if (camera.position.distanceTo(initialPos) < 0.1) {
        setIsReturning(false);
      }
    }
  });

  useEffect(() => {
    if (!target) setIsReturning(true);
  }, [target]);

  return null;
}

/* --------- 🌍 Scène principale --------- */
function Scene3D() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        shadows
        camera={{ position: [5, 2, 6], fov: 55 }}
        gl={{
          physicallyCorrectLights: true,
          antialias: true,
          toneMappingExposure: 1,
        }}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "15px",
          background:
            "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)",
        }}
      >
        {/* 💡 Lumières calibrées */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-3, 2, 3]} intensity={0.6} color="#ffd9b3" />
        <spotLight
          position={[0, 8, 8]}
          angle={0.4}
          intensity={1}
          color="#ffe6cc"
          penumbra={0.8}
          castShadow
        />

        {/* 🌆 Ambiance HDR */}
        <Environment preset="city" background={false} />

        {/* 🏛️ Modèle 3D */}
        <MuseumModel />

        {/* 💡 Points interactifs */}
        <InteractivePoints onSelect={(p) => setSelected(p)} />

        {/* 🚀 Mouvement fluide de caméra */}
        <CameraMover target={selected} />

        {/* 🌫 Ombres au sol */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.45}
          scale={10}
          blur={2}
          far={4}
        />

        {/* 🎥 Contrôles caméra : rotation auto désactivée pendant le zoom */}
        <OrbitControls
          enableZoom
          enablePan
          autoRotate={!selected}
          autoRotateSpeed={1.1}
        />
      </Canvas>

      {/* 🪧 Fenêtre d'information */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "300px",
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            zIndex: 10,
          }}
        >
          <img
            src={selected.image}
            alt={selected.title}
            style={{
              width: "100%",
              borderRadius: "6px",
              marginBottom: "10px",
              objectFit: "cover",
            }}
          />
          <h3 style={{ marginBottom: "10px", color: "#ffcc00" }}>
            {selected.title}
          </h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
            {selected.description}
          </p>

          {selected.video && (
            <video
              src={selected.video}
              controls
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}

          <button
            onClick={() => setSelected(null)}
            style={{
              marginTop: "15px",
              background: "#ffcc00",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default Scene3D;
