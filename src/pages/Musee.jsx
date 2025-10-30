import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Musee.css";
import Scene3D from "../components/Scene3D"; 
import Gallery from "../components/Gallery";

function Musee() {
  const timeline = [
  {
    id: 1,
    titre: "🌟 Les Pionniers",
    texte:
      "Dans les années 1960-1970, des cinéastes visionnaires comme Gaston Kaboré et Idrissa Ouédraogo posent les bases du cinéma burkinabè.",
    image: "/images/pionniers.jpg" 
  },
  {
    id: 2,
    titre: "🏆 Le FESPACO",
    texte:
      "Créé en 1969 à Ouagadougou, le FESPACO est devenu le plus grand festival panafricain de cinéma et a fait du Burkina Faso la capitale du cinéma africain.",
    image: "/images/fespaco.jpg"
  },
  {
    id: 3,
    titre: "🎥 Le Cinéma Moderne",
    texte:
      "Aujourd’hui, une nouvelle génération renouvelle la narration et profite des plateformes internationales pour une visibilité mondiale.",
    image: "/images/moderne.jpg"
  }
];


  return (
    <div className="musee-page">
      {/* Section Intro */}
      <section className="musee-section intro text-center">
        <Container>
          <h1 className="musee-title">🎬 L’Histoire du Cinéma Burkinabè</h1>
          <p className="musee-subtitle">
            Suivez la chronologie qui a façonné l’âme du 7ᵉ art burkinabè.
          </p>
        </Container>
      </section>

      {/* Section Modèle 3D */}
      <section className="musee-section scene3d text-center">
        <Container fluid>
          <h2 className="section-title">🕍 Musée Virtuel</h2>
          <p className="section-description">
            Explorez en 3D les lieux et objets symboliques du cinéma burkinabè.
          </p>
          <Scene3D />
          <Gallery/>
        </Container>
      </section>

      {/* Timeline */}
      <section className="timeline">
        {timeline.map((event, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            key={event.id}
          >
            <div className="timeline-content">
              <h2>{event.titre}</h2>
              <p>{event.texte}</p>
              <img src={event.image} alt={event.titre} />
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="musee-section archives-link text-center">
        <Container>
          <h2>📚 Explorez nos Archives</h2>
          <p>Retrouvez les grandes œuvres qui ont marqué l’histoire du cinéma burkinabè.</p>
          <Link to="/archives">
            <Button className="custom-btn">Voir les archives</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}

export default Musee;
