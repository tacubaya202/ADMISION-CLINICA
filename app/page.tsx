
"use client";

import { useState, type FormEvent } from "react";

type Datos = Record<string, string>;

const hojas = [
  "Identificación del paciente",
  "Antecedentes clínicos",
  "Síntomas y valoración del dolor",
  "Cuestionario nutricional",
  "Consentimiento y firmas",
];

function Campo({
  label,
  name,
  type = "text",
  required = false,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: string[];
}) {
  return (
    <label className="campo">
      <span>{label}{required ? " *" : ""}</span>
      {options ? (
        <select name={name} required={required} defaultValue="">
          <option value="">Seleccionar...</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} rows={3} required={required} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
        />
      )}
    </label>
  );
}

function Respuesta({
  datos,
  nombre,
  etiqueta,
}: {
  datos: Datos;
  nombre: string;
  etiqueta: string;
}) {
  return (
    <div className="respuesta">
      <strong>{etiqueta}</strong>
      <p>{datos[nombre]?.trim() || "No especificado"}</p>
    </div>
  );
}

export default function Home() {
  const [datos, setDatos] = useState<Datos | null>(null);

  function generarDocumentos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);
    const respuestas: Datos = {};

    formulario.forEach((valor, clave) => {
      respuestas[clave] = String(valor);
    });

    setDatos(respuestas);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="contenedor">
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f1f5f9;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }
        .contenedor { max-width: 1000px; margin: auto; padding: 24px; }
        .encabezado { background: #fff; padding: 24px; border-radius: 16px; margin-bottom: 20px; border-top: 5px solid #0f766e; }
        .encabezado p { color: #475569; }
        h1 { margin-top: 8px; font-size: 28px; }
        h2 { font-size: 19px; margin-top: 0; }
        .seccion { background: white; padding: 24px; border-radius: 14px; margin-bottom: 18px; }
        .rejilla { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .campo { display: flex; flex-direction: column; gap: 7px; margin-bottom: 15px; font-size: 14px; }
        .campo span { font-weight: 600; }
        input, select, textarea { width: 100%; padding: 11px; border: 1px solid #cbd5e1; border-radius: 8px; font: inherit; background: white; color: #172033; }
        textarea { resize: vertical; }
        .acciones { display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0; }
        button { border: 0; border-radius: 9px; padding: 13px 18px; font-weight: 700; cursor: pointer; }
        .principal { background: #0f766e; color: white; }
        .secundario { background: #e2e8f0; color: #172033; }
        .aviso { background: #fffbeb; border: 1px solid #fde68a; padding: 14px; border-radius: 10px; font-size: 14px; line-height: 1.5; }
        .hojas-impresion { display: none; }
        .hoja { background: white; padding: 18mm; margin: 20px 0; min-height: 240mm; }
        .membrete { border-bottom: 2px solid #0f766e; padding-bottom: 14px; margin-bottom: 24px; }
        .membrete h2 { margin-bottom: 6px; }
        .numero-hoja { color: #64748b; font-size: 12px; }
        .respuesta { border-bottom: 1px solid #cbd5e1; padding: 10px 0; break-inside: avoid; }
        .respuesta strong { font-size: 12px; color: #475569; }
        .respuesta p { margin: 6px 0 0; white-space: pre-wrap; overflow-wrap: anywhere; }
        .firmas { display: grid; grid-template-columns: 1fr 1fr; gap: 35px; margin-top: 70px; }
        .firma { border-top: 1px solid #334155; text-align: center; padding-top: 8px; font-size: 12px; }
        @media (max-width: 600px) {
          .contenedor { padding: 12px; }
          .rejilla { grid-template-columns: 1fr; gap: 0; }
          .seccion { padding: 17px; }
          h1 { font-size: 24px; }
        }
        @media print {
          @page { size: A4; margin: 12mm; }
          body { background: white !important; color: black; }
          .contenedor { max-width: none; padding: 0; }
          .solo-pantalla { display: none !important; }
          .hojas-impresion { display: block !important; }
          .hoja {
            min-height: 0;
            margin: 0;
            padding: 0;
            page-break-after: always;
            break-after: page;
          }
          .hoja:last-child { page-break-after: auto; break-after: auto; }
          .membrete { border-color: #333; }
          .respuesta { border-color: #bbb; }
        }
      `}</style>

      <div className="solo-pantalla">
        <header className="encabezado">
          <p><strong>CLÍNICA · ADMISIÓN</strong></p>
          <h1>Formulario de admisión del paciente</h1>
          <p>
            Completa los datos solicitados. Al finalizar podrás revisar
            las respuestas y generar las hojas para imprimir.
          </p>
          <div className="aviso">
            Los campos marcados con * son obligatorios. Responde con
            información veraz. Si no conoces algún dato, puedes dejarlo
            sin especificar cuando no sea obligatorio.
          </div>
        </header>

        <form onSubmit={generarDocumentos}>
          <section className="seccion">
            <h2>1. Identificación y contacto</h2>
            <div className="rejilla">
              <Campo label="Nombre completo" name="nombre" required />
              <Campo label="Fecha de nacimiento" name="fechaNacimiento" type="date" required />
              <Campo label="Sexo (dato de registro)" name="sexo" options={["Femenino", "Masculino", "Intersexual", "Prefiero no responder"]} />
              <Campo label="Teléfono" name="telefono" type="tel" required />
              <Campo label="Correo electrónico" name="correo" type="email" />
              <Campo label="Ocupación" name="ocupacion" />
              <Campo label="Estado civil" name="estadoCivil" options={["Soltero/a", "Casado/a", "Unión libre", "Divorciado/a", "Viudo/a", "Prefiero no responder"]} />
              <Campo label="Contacto de emergencia" name="contactoEmergencia" />
              <Campo label="Teléfono de emergencia" name="telefonoEmergencia" type="tel" />
            </div>
            <Campo label="Domicilio completo" name="domicilio" />
          </section>

          <section className="seccion">
            <h2>2. Antecedentes clínicos</h2>
            <Campo label="Motivo principal de la consulta" name="motivoConsulta" type="textarea" required />
            <Campo label="Enfermedades o diagnósticos previos" name="enfermedades" type="textarea" />
            <Campo label="Antecedentes médicos familiares" name="antecedentesFamiliares" type="textarea" />
            <Campo label="Cirugías, hospitalizaciones o accidentes" name="cirugias" type="textarea" />
            <Campo label="Medicamentos, suplementos y dosis actuales" name="medicamentos" type="textarea" />
            <Campo label="Alergias y reacciones conocidas" name="alergias" type="textarea" />
            <Campo label="¿Tiene alguna alergia conocida?" name="tieneAlergias" options={["Sí", "No", "No lo sé"]} required />
          </section>

          <section className="seccion">
            <h2>3. Síntomas y valoración del dolor</h2>
            <Campo label="Síntomas actuales" name="sintomas" type="textarea" />
            <Campo label="¿Desde cuándo presenta los síntomas?" name="duracionSintomas" />
            <Campo label="Zona del cuerpo afectada" name="zonaDolor" />
            <Campo label="Intensidad del dolor (0 = sin dolor, 10 = máximo)" name="intensidadDolor" options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "No aplica"]} />
            <Campo label="¿Qué empeora o mejora los síntomas?" name="factoresSintomas" type="textarea" />
          </section>

          <section className="seccion">
            <h2>4. Cuestionario nutricional</h2>
            <Campo label="¿Cómo describiría su alimentación habitual?" name="alimentacion" type="textarea" />
            <Campo label="Número aproximado de comidas al día" name="comidasDia" options={["1", "2", "3", "4", "5 o más", "Variable"]} />
            <Campo label="Consumo de agua al día" name="agua" options={["Menos de 500 ml", "500 ml a 1 litro", "1 a 2 litros", "Más de 2 litros", "No lo sé"]} />
            <Campo label="Restricciones, intolerancias o preferencias alimentarias" name="restricciones" type="textarea" />
            <Campo label="Cambios recientes de peso" name="cambiosPeso" type="textarea" />
            <Campo label="Apetito y síntomas digestivos" name="digestivo" type="textarea" />
            <Campo label="Actividad física habitual" name="actividadFisica" type="textarea" />
          </section>

          <section className="seccion">
            <h2>5. Confirmación y consentimiento</h2>
            <Campo
              label="¿Confirmas que la información proporcionada es correcta?"
              name="datosCorrectos"
              options={["Sí", "No"]}
              required
            />
            <Campo
              label="¿Autorizas el tratamiento de tus datos para la atención clínica, conforme al aviso de privacidad de la clínica?"
              name="consentimientoDatos"
              options={["Sí, otorgo mi consentimiento", "No otorgo mi consentimiento"]}
              required
            />
            <Campo label="Observaciones del paciente" name="observaciones" type="textarea" />
            <p style={{ fontSize: 13, color: "#475569" }}>
              El consentimiento definitivo debe acompañarse del aviso de
              privacidad correspondiente. La impresión no sustituye su
              aceptación formal ni las obligaciones legales de la clínica.
            </p>
          </section>

          <div className="acciones">
            <button type="submit" className="principal">
              Preparar hojas de impresión
            </button>
            <button
              type="reset"
              className="secundario"
              onClick={() => setDatos(null)}
            >
              Limpiar formulario
            </button>
          </div>

          <p className="aviso">
            Importante: en esta primera versión, las respuestas se preparan
            en memoria para imprimir. Todavía no se guardan en Appwrite.
            No cierres ni recargues la página antes de imprimir.
          </p>
        </form>

        {datos && (
          <section className="seccion">
            <h2>Documentos preparados</h2>
            <p>
              Se han organizado las respuestas en cinco hojas. Revisa la
              información antes de imprimir.
            </p>
            <div className="acciones">
              <button className="principal" onClick={() => window.print()}>
                Imprimir / Guardar como PDF
              </button>
              <button className="secundario" onClick={() => setDatos(null)}>
                Volver al formulario
              </button>
            </div>
          </section>
        )}
      </div>

      {datos && (
        <div className="hojas-impresion">
          <section className="hoja">
            <header className="membrete">
              <p><strong>CLÍNICA · ADMISIÓN</strong></p>
              <h2>Expediente clínico · Identificación</h2>
              <p className="numero-hoja">Hoja 1 de 5</p>
            </header>
            <Respuesta datos={datos} nombre="nombre" etiqueta="Nombre completo" />
            <Respuesta datos={datos} nombre="fechaNacimiento" etiqueta="Fecha de nacimiento" />
            <Respuesta datos={datos} nombre="sexo" etiqueta="Sexo (dato de registro)" />
            <Respuesta datos={datos} nombre="telefono" etiqueta="Teléfono" />
            <Respuesta datos={datos} nombre="correo" etiqueta="Correo electrónico" />
            <Respuesta datos={datos} nombre="domicilio" etiqueta="Domicilio" />
            <Respuesta datos={datos} nombre="ocupacion" etiqueta="Ocupación" />
            <Respuesta datos={datos} nombre="estadoCivil" etiqueta="Estado civil" />
            <Respuesta datos={datos} nombre="contactoEmergencia" etiqueta="Contacto de emergencia" />
            <Respuesta datos={datos} nombre="telefonoEmergencia" etiqueta="Teléfono de emergencia" />
            <Respuesta datos={datos} nombre="motivoConsulta" etiqueta="Motivo de consulta" />
          </section>

          <section className="hoja">
            <header className="membrete">
              <p><strong>CLÍNICA · ADMISIÓN</strong></p>
              <h2>Antecedentes clínicos</h2>
              <p className="numero-hoja">Hoja 2 de 5 · Paciente: {datos.nombre}</p>
            </header>
            <Respuesta datos={datos} nombre="enfermedades" etiqueta="Enfermedades o diagnósticos previos" />
            <Respuesta datos={datos} nombre="antecedentesFamiliares" etiqueta="Antecedentes familiares" />
            <Respuesta datos={datos} nombre="cirugias" etiqueta="Cirugías, hospitalizaciones o accidentes" />
            <Respuesta datos={datos} nombre="medicamentos" etiqueta="Medicamentos, suplementos y dosis" />
            <Respuesta datos={datos} nombre="tieneAlergias" etiqueta="¿Tiene alergias conocidas?" />
            <Respuesta datos={datos} nombre="alergias" etiqueta="Alergias y reacciones" />
          </section>

          <section className="hoja">
            <header className="membrete">
              <p><strong>CLÍNICA · ADMISIÓN</strong></p>
              <h2>Síntomas y valoración del dolor</h2>
              <p className="numero-hoja">Hoja 3 de 5 · Paciente: {datos.nombre}</p>
            </header>
            <Respuesta datos={datos} nombre="sintomas" etiqueta="Síntomas actuales" />
            <Respuesta datos={datos} nombre="duracionSintomas" etiqueta="Duración de los síntomas" />
            <Respuesta datos={datos} nombre="zonaDolor" etiqueta="Zona afectada" />
            <Respuesta datos={datos} nombre="intensidadDolor" etiqueta="Intensidad del dolor (0–10)" />
            <Respuesta datos={datos} nombre="factoresSintomas" etiqueta="Factores que mejoran o empeoran los síntomas" />
          </section>

          <section className="hoja">
            <header className="membrete">
              <p><strong>CLÍNICA · ADMISIÓN</strong></p>
              <h2>Cuestionario nutricional</h2>
              <p className="numero-hoja">Hoja 4 de 5 · Paciente: {datos.nombre}</p>
            </header>
            <Respuesta datos={datos} nombre="alimentacion" etiqueta="Alimentación habitual" />
            <Respuesta datos={datos} nombre="comidasDia" etiqueta="Comidas al día" />
            <Respuesta datos={datos} nombre="agua" etiqueta="Consumo de agua" />
            <Respuesta datos={datos} nombre="restricciones" etiqueta="Restricciones o intolerancias" />
            <Respuesta datos={datos} nombre="cambiosPeso" etiqueta="Cambios recientes de peso" />
            <Respuesta datos={datos} nombre="digestivo" etiqueta="Apetito y síntomas digestivos" />
            <Respuesta datos={datos} nombre="actividadFisica" etiqueta="Actividad física" />
          </section>

          <section className="hoja">
            <header className="membrete">
              <p><strong>CLÍNICA · ADMISIÓN</strong></p>
              <h2>Confirmación y firmas</h2>
              <p className="numero-hoja">Hoja 5 de 5 · Paciente: {datos.nombre}</p>
            </header>
            <Respuesta datos={datos} nombre="datosCorrectos" etiqueta="Confirmación de los datos" />
            <Respuesta datos={datos} nombre="consentimientoDatos" etiqueta="Consentimiento sobre tratamiento de datos" />
            <Respuesta datos={datos} nombre="observaciones" etiqueta="Observaciones del paciente" />
            <p style={{ marginTop: 28, fontSize: 12 }}>
              Las respuestas anteriores fueron proporcionadas por el paciente
              y deben revisarse durante la atención clínica. Este documento
              no constituye por sí solo un diagnóstico ni una prescripción.
            </p>
            <div className="firmas">
              <div className="firma">Firma del paciente</div>
              <div className="firma">Nombre y firma del personal que recibe</div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
