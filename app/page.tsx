
export default function Home() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 32,
      }}
    >
      <p style={{ color: "#0f766e", fontWeight: 700 }}>
        CLÍNICA · ADMISIÓN
      </p>

      <h1>Admisión y expediente clínico</h1>

      <p>
        Sistema de admisión y organización del expediente clínico.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 32,
        }}
      >
        <article style={{ background: "white", padding: 24, borderRadius: 16 }}>
          <h2>Admisión de pacientes</h2>
          <p>Registro de datos y antecedentes clínicos.</p>
        </article>

        <article style={{ background: "white", padding: 24, borderRadius: 16 }}>
          <h2>Centro de Control</h2>
          <p>Gestión de admisiones para personal autorizado.</p>
        </article>
      </section>
    </main>
  );
}
