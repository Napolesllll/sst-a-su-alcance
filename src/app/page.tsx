import dynamic from "next/dynamic";
import { Hero } from "../components/Hero";

// Lazy loading de componentes con prioridades
const SobreNosotros = dynamic(() => import("@/components/SobreNosotros"), {
  loading: () => <ComponentSkeleton />,
});

const Servicios = dynamic(
  () =>
    import("../components/Servicios").then((mod) => ({
      default: mod.Servicios,
    })),
  {
    loading: () => <ComponentSkeleton />,
  }
);

const Clientes = dynamic(
  () =>
    import("../components/Clientes").then((mod) => ({ default: mod.Clientes })),
  {
    loading: () => <ComponentSkeleton />,
  }
);

const Contacto = dynamic(
  () =>
    import("../components/Contacto").then((mod) => ({ default: mod.Contacto })),
  {
    loading: () => <ComponentSkeleton />,
  }
);

// Skeleton loader simple y ligero
function ComponentSkeleton() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-cyan-400 text-sm animate-pulse">Cargando...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero se carga inmediatamente (above the fold) */}
      <Hero />

      {/* Componentes lazy loaded con scroll progresivo */}
      <SobreNosotros />
      <Servicios />
      <Clientes />
      <Contacto />
    </>
  );
}
