
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <section className="mx-auto max-w-4xl">
        <header className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Clínica · Admisión
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Admisión y expediente clínico
          </h1>

          <p className="mt-3 text-slate-600">
            Bienvenido. Desde este sistema podrás completar tu información
            de admisión para preparar tu atención en la clínica.
          </p>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Admisión de pacientes</h2>
            <p className="mt-2 text-sm text-slate-600">
              Formulario de identificación, antecedentes y necesidades
              de atención.
            </p>
            <p className="mt-4 text-sm text-amber-700">
              Próximamente
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Centro de Control</h2>
            <p className="mt-2 text-sm text-slate-600">
              Área del personal para gestionar admisiones y expedientes
              autorizados.
            </p>
            <p className="mt-4 text-sm text-amber-700">
              Próximamente
            </p>
          </article>
        </section>

        <footer className="mt-8 text-center text-sm text-slate-500">
          La información clínica estará disponible únicamente mediante
          acceso autorizado.
        </footer>
      </section>
    </main>
  );
}
