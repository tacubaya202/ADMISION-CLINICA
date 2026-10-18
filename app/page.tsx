
export const metadata = {
  title: "Admisión y Expediente Clínico",
  description: "Sistema integral de admisión y expediente clínico.",
};

export default function Home() {
  return (
    <html lang="es-MX">
      <body
        style={{
          margin: 0,
          padding: "32px",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <main style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ color: "#0f766e", fontWeight: 700 }}>
            CLÍNICA · ADMISIÓN
          </p>

          <h1>Admisión y expediente clínico</h1>

          <p>
            Bienvenido. Este sistema permitirá completar la admisión
            y organizar la información necesaria para tu atención.
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
      </body>
    </html>
  );
}
