'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function HeaderWithI18n() {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0E1A2B] shadow-lg flex items-center justify-between px-4 md:px-10 py-3 md:py-4 animate-slideDown">
      <nav className="min-w-0 flex-1 overflow-x-auto flex gap-2 md:gap-6 font-bold tracking-wide text-[10px] sm:text-xs md:text-sm lg:text-base uppercase items-center whitespace-nowrap animate-fadeIn animate-delay-100">
          <div className="relative group shrink-0">
            <Link href="/#servicos" className="hover:text-accent transition-colors text-white py-2 block">{t.nav.services}</Link>
            <div id="desktop-dropdown-menu" className="absolute top-full left-0 hidden md:group-hover:block dropdown-bridge z-50">
              <div className="w-72 bg-[#15253F] shadow-2xl border border-dark rounded-md overflow-hidden flex flex-col">
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.structural}>{t.services.categories.structural}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.ships}>{t.services.categories.ships}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.survey}>{t.services.categories.survey}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.hydroelectric}>{t.services.categories.hydroelectric}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.inspection}>{t.services.categories.inspection}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.dredging}>{t.services.categories.dredging}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.rescue}>{t.services.categories.rescue}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.diving}>{t.services.categories.diving}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide" data-service={t.services.categories.pipelines}>{t.services.categories.pipelines}</button>
                <button className="dropdown-service-link text-left px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium text-sm uppercase tracking-wide" data-service={t.services.categories.water}>{t.services.categories.water}</button>
              </div>
            </div>
          </div>
          <a href="/sobre-nos#sobre" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.aboutUs}</a>
          <a href="/sobre-nos#clientes" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.partners}</a>
          <a href="/sobre-nos#galeria" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.gallery}</a>
          <a href="/fale-conosco" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.contactUs}</a>
      </nav>
      
      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        <LanguageSwitcher />
        <div className="cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center animate-fadeIn animate-delay-200" onClick={() => window.scrollTo(0,0)}>
          <img src="/images/logo-atlatico-vector.png" alt={t.hero.logoAlt} className="h-12 md:h-16 object-contain" />
        </div>
      </div>
    </header>
  );
}
