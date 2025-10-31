import React from "react";
import bg from "../../../assets/beach.png"; // replace with your background

const steps = [
  {
    title: "Eligibility Check",
    desc: "Ut pulvinar purus ultricies risus auctor a amet non scelerisque placerat.",
  },
  {
    title: "Document Verification",
    desc: "Nunc tincidunt pulvinar lorem vitae aliquet sed elementum.",
  },
  {
    title: "Language Preparation",
    desc: "Tortor orci vitae dolor sem ultrices sapien senectus feugiat scelerisque.",
  },
  {
    title: "Visa Application with our Assistance",
    desc: "Et felis ut mi tempor amet venenatis interdum sed lectus urna parturient.",
  },
  {
    title: "Pre-departure Support",
    desc: "Tristique at ultrices pulvinar auctor volutpat laoreet nullam tristique.",
  },
];

export default function ApplicationSteps() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "#1e293b", fontSize: "28px", marginBottom: "30px" }}>
        Your Step-by-Step Application Journey
      </h2>

      <div style={{ width: "90%", maxWidth: 700 }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "16px 24px",
              marginBottom: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#2563eb",
                marginBottom: 6,
              }}
            >
              STEP {index + 1}
            </div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
            <div style={{ color: "#64748b", fontSize: 14 }}>{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
