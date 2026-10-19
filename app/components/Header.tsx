import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] px-4 md:px-6 py-4 flex items-center justify-between gap-3">
      <nav className="flex gap-2 md:gap-6 text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide whitespace-nowrap">
        <a href="/servicos" className="hover:text-cyan-300 transition">Serviços</a>
        <a href="/sobre-nos#sobre" className="hover:text-cyan-300 transition">Sobre Nós</a>
        <a href="/sobre-nos#clientes" className="hover:text-cyan-300 transition">Parceiros</a>
        <a href="/sobre-nos#galeria" className="hover:text-cyan-300 transition">Galeria</a>
        <a href="/fale-conosco" className="hover:text-cyan-300 transition">Fale Conosco</a>
      </nav>
      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg shrink-0">
        <Image
          src="/images/logo-atlatico-vector.png"
          alt="Atlântico Logo"
          width={56}
          height={56}
          className="w-full h-full object-contain"
        />
      </div>
    </header>
  );
}
