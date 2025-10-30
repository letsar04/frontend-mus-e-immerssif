import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------
   🌆 Composant principal : Archive.jsx
--------------------------------------*/
export default function Archive() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const archives = [
    {
      id: 1,
      type: "image",
      title: "Affiche du FESPACO 1991",
      src: "/assets/archives/photo1.jpg",
      description:
        "Affiche emblématique du FESPACO 1991, symbole de la vitalité du cinéma africain.",
    },
    {
      id: 2,
      type: "video",
      title: "Interview d’Idrissa Ouédraogo",
      src: "/assets/archives/video1.mp4",
      description:
        "Extrait d’une interview inédite du réalisateur sur la naissance du cinéma burkinabè.",
    },
    {
      id: 3,
      type: "document",
      title: "Programme officiel 1995 (PDF)",
      src: "/assets/archives/doc1.pdf",
      description:
        "Document historique présentant la programmation complète du FESPACO 1995.",
    },
    {
      id: 4,
      type: "image",
      title: "Cérémonie d’ouverture",
      src: "/assets/archives/photo2.jpg",
      description:
        "Photographie rare de la cérémonie d’ouverture du festival en 1997.",
    },
  ];

  // Filtrage des éléments selon le type choisi
  const filteredArchives =
    selectedType === "all"
      ? archives
      : archives.filter((a) => a.type === selectedType);

  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #0a0a0a, #000)",
        color: "#fff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* 🏛️ En-tête avec effet flou */}
      <header
        style={{
          textAlign: "center",
          padding: "80px 20px 40px 20px",
          background:
            "linear-gradient(to bottom, rgba(255,204,0,0.1), rgba(0,0,0,0.8))",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#ffcc00" }}>
          Archives du Cinéma Burkinabè
        </h1>
        <p
          style={{
            maxWidth: "600px",
            margin: "10px auto",
            color: "#ccc",
            fontSize: "1.1rem",
          }}
        >
          Explorez les trésors visuels, sonores et historiques du patrimoine
          cinématographique du Burkina Faso.
        </p>
      </header>

      {/* 🎛️ Filtres */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {[
          { type: "all", label: "🌍 Tous" },
          { type: "image", label: "📷 Images" },
          { type: "video", label: "🎬 Vidéos" },
          { type: "document", label: "📄 Documents" },
        ].map((filter) => (
          <button
            key={filter.type}
            onClick={() => setSelectedType(filter.type)}
            style={{
              background:
                selectedType === filter.type ? "#ffcc00" : "rgba(255,255,255,0.1)",
              color: selectedType === filter.type ? "#000" : "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 🖼️ Grille des archives */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
          padding: "0 40px 80px",
          justifyItems: "center",
        }}
      >
        {filteredArchives.map((item) => (
          <motion.div
            key={item.id}
            layout
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedItem(item)}
            style={{
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 0 12px rgba(255,255,255,0.15)",
              maxWidth: "280px",
            }}
          >
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderBottom: "2px solid #ffcc00",
                }}
              />
            )}
            {item.type === "video" && (
              <video
                src={item.src}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderBottom: "2px solid #ffcc00",
                }}
                muted
                loop
                autoPlay
              />
            )}
            {item.type === "document" && (
              <div
                style={{
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,204,0,0.1)",
                  color: "#ffcc00",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                📄 PDF
              </div>
            )}

            <div style={{ padding: "10px 15px" }}>
              <h4 style={{ color: "#ffcc00", marginBottom: "5px" }}>
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#ccc",
                  lineHeight: "1.3",
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🪟 Fenêtre modale */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(30,30,30,0.95)",
                padding: "20px",
                borderRadius: "10px",
                maxWidth: "800px",
                width: "90%",
                textAlign: "center",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>
                {selectedItem.title}
              </h3>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "0.9rem",
                  marginBottom: "15px",
                }}
              >
                {selectedItem.description}
              </p>

              {selectedItem.type === "image" && (
                <motion.img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                />
              )}

              {selectedItem.type === "video" && (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}

              {selectedItem.type === "document" && (
                <iframe
                  src={selectedItem.src}
                  title={selectedItem.title}
                  style={{
                    width: "100%",
                    height: "500px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#fff",
                  }}
                />
              )}

              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  marginTop: "20px",
                  background: "#ffcc00",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
