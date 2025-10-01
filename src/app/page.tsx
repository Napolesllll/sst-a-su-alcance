import { Hero } from "../components/Hero";
import { Servicios } from "../components/Servicios";
import { Clientes } from "../components/Clientes";
import { Contacto } from "../components/Contacto";
import SobreNosotros from "@/components/SobreNosotros";

export default function Home() {
  return (
    <>
      <Hero />
      <SobreNosotros />
      <Servicios />
      <Clientes />
      <Contacto />
    </>
  );
}
