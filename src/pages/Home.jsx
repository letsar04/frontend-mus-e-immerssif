import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "pionniers",
      icon: "🌟",
      title: "Pionniers",
      content:
        "Découvrez les premiers réalisateurs et films qui ont posé les bases du cinéma burkinabè, comme Gaston Kaboré ou Idrissa Ouédraogo.",
    },
    {
      id: "fespaco",
      icon: "🏆",
      title: "FESPACO",
      content:
        "Le Festival Panafricain du Cinéma et de la Télévision de Ouagadougou, créé en 1969, est un pilier du cinéma africain.",
    },
    {
      id: "modernite",
      icon: "🎥",
      title: "Modernité",
      content:
        "Découvrez la nouvelle génération de cinéastes burkinabè qui marient innovation et engagement social.",
    },
  ];

  return (
    <div className="home-page">
      {/* 🌄 Arrière-plan animé */}
      <div className="background-slider">
        <div className="background-track">
          <img src="/images/bg1.jpg" alt="Cinéma 1" />
          <img src="/images/bg2.jpg" alt="Cinéma 2" />
          <img src="/images/bg3.jpg" alt="Cinéma 3" />
          <img src="/images/bg4.jpg" alt="Cinéma 4" />
          {/* duplication pour une boucle fluide */}
          <img src="/images/bg1.jpg" alt="Cinéma 1" />
          <img src="/images/bg2.jpg" alt="Cinéma 2" />
          <img src="/images/bg3.jpg" alt="Cinéma 3" />
          <img src="/images/bg4.jpg" alt="Cinéma 4" />
        </div>
      </div>

      {/* 🌫 Superposition */}
      <div className="hero-overlay">
        {/* Section Hero */}
        <section className="hero-section text-center">
          <Container>
            <h1 className="hero-title">🎬 Musée Virtuel du Cinéma Burkinabè</h1>
            <p className="hero-subtitle">
              Explorez l’histoire, les pionniers et l’évolution du 7ᵉ art au Burkina Faso.
            </p>
            
            <Button className="custom-btn" onClick={() => navigate('/musee')}>Entrer dans le Musee</Button>
            
          </Container>
        </section>

        {/* Section interactive */}
        <section className="intro-section">
          <Container>
            <Row className="text-center justify-content-center">
              {sections.map((section) => (
                <Col
                  key={section.id}
                  md={3}
                  className={`info-section ${
                    activeSection === section.id ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveSection(section.id)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <h3>
                    {section.icon} {section.title}
                  </h3>
                  <div className="info-content">
                    <p>{section.content}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
}

export default Home;
