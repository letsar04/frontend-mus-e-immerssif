
import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./Gallery.css";

/*
  Exemple de données. Adapte les champs `image`, `thumb`, `video`, `detailPath`.
  - image : affichage grand format dans le modal
  - thumb : vignette dans la grille
  - video : chemin relatif (public) vers l'extrait local (optionnel)
  - detailPath : chemin interne (ex: /archives/1) pour redirection si besoin
*/
const items = [
  {
    id: 1,
    title: "Yaaba (1989)",
    subtitle: "Idrissa Ouédraogo",
    thumb: "/asset/images/yaaba-thumb.jpg",
    image: "/asset/images/yaaba.jpg",
    video: "/asset/videos/yaaba-clip.mp4",
    detailPath: "/archives/yaaba"
  },
  {
    id: 2,
    title: "Tilai (1990)",
    subtitle: "Idrissa Ouédraogo",
    thumb: "/asset/images/tilai-thumb.jpg",
    image: "/asset/images/tilai.jpg",
    video: "/asset/videos/tilai.mp4",
    detailPath: "/archives/tilai"
  },
  {
    id: 3,
    title: "Wend Kuuni (1982)",
    subtitle: "Gaston Kaboré",
    thumb: "/asset/images/wendkuuni-thumb.jpg",
    image: "/asset/images/wendkuuni.jpg",
    video: "/asset/videos/wend-kuuni.mp4",
    detailPath: "/archives/wendkuuni"
  }
];

export default function Gallery({ itemsData = items }) {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  function openItem(item) {
    setCurrent(item);
    setShow(true);
  }

  function closeModal() {
    // stop video playback if present (video element will be removed on close)
    setShow(false);
    setTimeout(() => setCurrent(null), 200);
  }

  return (
    <section className="gallery-section">
      <Container fluid>
        <h2 className="gallery-title">🎞️ Galerie — Extraits & affiches</h2>
        <Row className="g-3">
          {itemsData.map((it) => (
            <Col key={it.id} xs={6} sm={4} md={3} lg={2}>
              <div className="gallery-card" onClick={() => openItem(it)}>
                <img src={it.thumb} alt={it.title} className="gallery-thumb" />
                <div className="gallery-meta">
                  <div className="gallery-title-sm">{it.title}</div>
                  <div className="gallery-sub">{it.subtitle}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{current?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {current && (
            <div className="modal-body-grid">
              <div className="modal-media">
                {/* Affiche / image grand format */}
                <img src={current.image} alt={current.title} className="modal-image" />
              </div>

              <div className="modal-info">
                <h5>{current.subtitle}</h5>
                <p>
                  
                  Description courte du film. synopsis,
                  l'année, le réalisateur, récompenses, etc.
                </p>

                {/* Si une vidéo locale existe, propose de la lire */}
                {current.video ? (
                  <>
                    <p><strong>Extrait :</strong></p>
                    <video
                      controls
                      src={current.video}
                      style={{ width: "100%", borderRadius: 8, background: "#000" }}
                    />
                  </>
                ) : (
                  <p style={{ fontStyle: "italic" }}>Aucun extrait disponible.</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {current?.detailPath && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                // redirection vers une page d'archive interne
                window.location.href = current.detailPath;
              }}
            >
              Voir la fiche complète
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
