import React, { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function InteractivePoints({ onSelect }) {
  const points = [
    {
      id: 1,
      position: [20.2, -5.3, -16.5],
      title: "🎬 Tilaï (1990)",
      description:
        "Film d'Idrissa Ouédraogo, Grand Prix du Jury à Cannes. Une œuvre majeure du cinéma africain.",
      image: "/assets/images/tilai.jpg",
    },
    {
      id: 2,
      position: [9.5, -5.3, -6.5],
      title: "🎞️ Yaaba (1989)",
      description:
        "Chef-d'œuvre du cinéma burkinabè racontant l'amitié entre un enfant et une vieille femme.",
      image: "/assets/images/yaaba.jpg",
    },
    {
      id: 3,
      position: [1.0, -5.4, -15.8],
      title: "Gaston Kaboré",
      description:
        "Gaston Kaboré, né le 23 avril 1951 à Bobo-Dioulasso, au Burkina Faso, est un réalisateur, scenariste, producteur de cinéma, formateur et homme de culture burkinabè. Il est reconnu comme l'un des pionniers de l'industrie cinématographique au Burkina Faso. Il remporte l’Etalon du Yennenga avec le film Buud Yam au 15e Festival panafricain du cinéma et de la télévision de Ouagadougou (FESPACO) en 1997.",
      image: "/assets/images/camera.png",
    },
    {
      id: 4,
      position: [14.2, -5.3, 42.5],
      title: "Maïmouna N'Diaye",
      description:
        "Malika l’un des acteurs principaux de la série super flics, de son vrai nom Maïmouna N’Diaye est une actrice comédienne et une réalisatrice franco-Burkinabè très talentueuse.",
      image: "/assets/images/tilai.jpg",
    },
    {
      id: 5,
      position: [-5.5, -7.3, 42.5],
      title: "Hippolyte Ouangrawa",
      description:
        "Icone du cinema burkinabè surtout connue avec sous les feux des projecteurs du nom de M'Baboanga.",
      image: "/assets/images/yaaba.jpg",
    },
    {
      id: 6,
      position: [5.0, -5.4, 42.8],
      title: "Joseph Tapsoba",
      description:
        "Acteur emblématique du cinéma burkinabè surtout connue dans la serie commissariat de tampy avec son role chocho.",
      image: "/assets/images/camera.png",
    },
  ];
  
  return (
    <>
      {points.map((point) => (
        <AnimatedPoint key={point.id} point={point} onSelect={onSelect} />
      ))}
    </>
  );
}

/* ----- Composant individuel animé ----- */
function AnimatedPoint({ point, onSelect }) {
  const meshRef = useRef();
  const haloRef = useRef();
  const groupRef = useRef();
  const hoverRef = useRef(false);
  const [visibleTime, setVisibleTime] = useState(0);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Apparition douce (fade-in)
    if (visibleTime < 1) {
      setVisibleTime((prev) => Math.min(prev + 0.02, 1));
    }

    // Animation de pulsation
    const pulse = 1 + Math.sin(elapsed * 2) * 0.1;
    if (meshRef.current) {
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.material.emissiveIntensity = hoverRef.current
        ? 1.2
        : 0.6 + Math.sin(elapsed * 2) * 0.3;
    }

    // Halo lumineux pulsant
    if (haloRef.current) {
      const haloScale = 1.6 + Math.sin(elapsed * 3) * 0.1;
      haloRef.current.scale.set(haloScale, haloScale, haloScale);
      haloRef.current.material.opacity = 0.3 + Math.sin(elapsed * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={point.position}>
      {/* Ligne verticale */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 16]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffcc00"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Point interactif lumineux agrandi */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={() => onSelect(point)}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoverRef.current = true;
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hoverRef.current = false;
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.15, 32, 32]} /> {/* <— plus gros point */}
        <meshStandardMaterial
          color="#ffcc00"
          emissive="#ff8800"
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Halo lumineux transparent */}
      <mesh ref={haloRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial
          color="#ffdd88"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 💬 Titre flottant au survol */}
      {hovered && (
        <Html distanceFactor={12} position={[0, 0.4, 0]}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.75)",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "13px",
              whiteSpace: "nowrap",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {point.title}
          </div>
        </Html>
      )}
    </group>
  );
}
