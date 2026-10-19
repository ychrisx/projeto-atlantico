'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Extend Window interface to include custom functions
declare global {
  interface Window {
    scrollGallery: (direction: number) => void;
    openLightbox: (url: string, type: string) => void;
    closeLightbox: () => void;
  }
}

export default function SobreNosPage() {
  const { t } = useLanguage();
  useEffect(() => {
    // Force-remove any background-image set by compiled CSS (use important)
    try {
      const sobreEl = document.querySelector('.sobre-nos-bg') as HTMLElement | null;
      if (sobreEl) {
        sobreEl.style.setProperty('background-image', 'none', 'important');
        sobreEl.style.setProperty('background-color', '#2b4c7e', 'important');
      }
    } catch (e) {
      // ignore
    }

    const timer = setTimeout(async () => {
      // 1. Slideshow "Sobre Nós"
      const slides = document.querySelectorAll('.slide-img');
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove('opacity-100', 'z-10');
        slides[currentSlide].classList.add('opacity-0', 'z-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove('opacity-0', 'z-0');
        slides[currentSlide].classList.add('opacity-100', 'z-10');
      }, 4000);

      // 3. Carrossel de Parceiros
      const partnersTrack = document.getElementById('partners-track');

      // Lista de logos dos parceiros
      const parceirosLogos = [
        { nome: 'Enercan', arquivo: 'enercan.png' },
        { nome: 'Louis Dreyfus', arquivo: 'louis-dreyfus.png' },
        { nome: 'Water Port', arquivo: 'water-port.png' },
        { nome: 'COPEL', arquivo: 'copel.png' },
        { nome: 'TGG', arquivo: 'tgg.png' },
        { nome: 'Concreato', arquivo: 'concreato.png' },
        { nome: 'Andrade Gutierrez', arquivo: 'andrade-gutierrez.png' },
        { nome: 'Galvão', arquivo: 'galvao.png' },
        { nome: 'Porto Santos', arquivo: 'porto-santos.png' },
        { nome: 'Pref. Santos', arquivo: 'prefeitura-santos.png' },
        { nome: 'SABESP', arquivo: 'sabesp.png' },
        { nome: 'Libra Terminais', arquivo: 'libra-terminais.png' },
        { nome: 'TECON DI', arquivo: 'tecon-di.png' },
        { nome: 'Odebrecht', arquivo: 'odebrecht.png' },
        { nome: 'Petrobras', arquivo: 'petrobras-br.png' }
      ];

      if (partnersTrack) {
        const partnerCards = parceirosLogos.map(parceiro =>
          '<a href="#" target="_blank" style="border:0.2px solid #e2e8f0" class="shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-md flex items-center justify-center p-3 hover:scale-105 transition-transform">' +
            '<img src="/parceiros/' + parceiro.arquivo + '" alt="' + parceiro.nome + '" class="max-w-full max-h-full object-contain">' +
            '</a>'
        ).join('');

        partnersTrack.innerHTML = [false, true]
          .map(isDuplicate =>
            '<div class="partner-set flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6"' +
              (isDuplicate ? ' aria-hidden="true"' : '') +
              '>' + partnerCards + '</div>'
          )
          .join('');

        partnersTrack.querySelectorAll('img').forEach(img => {
          img.addEventListener('error', () => {
            const fallback = document.createElement('span');
            fallback.className = 'text-center text-gray-400 text-xs font-bold';
            fallback.textContent = img.alt;
            img.replaceWith(fallback);
          }, { once: true });
        });
      }

      // 4. Galeria de Imagens - CARREGAR TODAS AS IMAGENS E VÍDEOS
      const galleryTrack = document.getElementById('gallery-track');
      let galleryData: any[] = [];
      
      // Carregar imagens e vídeos reais do JSON
      try {
        const response = await fetch('/data/gallery-data.json');
        const data = await response.json();
        
        console.log('✅ Galeria: Dados carregados', data.estatisticas);
        
        // Coletar TODAS as imagens e vídeos de TODOS os clientes
        if (data && data.clientes) {
          const clientesArray = Object.values(data.clientes);
          
          // Pegar TODAS as imagens e vídeos de cada cliente
          for (const cliente of clientesArray as any[]) {
            if (cliente.imagens) {
              // Garantir que imagens é sempre um array
              const imagensArray = Array.isArray(cliente.imagens) 
                ? cliente.imagens 
                : [cliente.imagens];
              
              if (imagensArray.length > 0) {
                imagensArray.forEach((url: string) => {
                  // Verificar se a URL não está vazia ou inválida
                  if (!url || url.trim() === '' || url === 'null' || url === 'undefined') {
                    console.warn('⚠️ URL inválida ignorada para cliente:', cliente.nome);
                    return;
                  }
                  
                  const lower = url.toLowerCase();
                  if (lower.includes('/images/swiss park/')) return;
                  let type = 'img';
                  
                  // Identificar se é vídeo
                  if (lower.includes('.mp4') || lower.includes('.mpg') || lower.includes('.mpeg') || lower.includes('.mov')) {
                    type = 'vid';
                  }
                  
                  galleryData.push({ 
                    type: type, 
                    url: url,
                    originalUrl: url,
                    cliente: cliente.nome
                  });
                });
              }
            }
          }
          
          // Embaralhar as imagens para variedade
          galleryData.sort(() => Math.random() - 0.5);
          
          console.log('✅ Galeria: ' + galleryData.length + ' itens carregados (imagens e vídeos)');
          
          // Verificar se há imagens suficientes
          if (galleryData.length < 10) {
            console.warn('⚠️ Poucas imagens encontradas, adicionando placeholders');
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar galeria:', error);
        // Se houver erro, não usar fallback - deixar vazio ou usar imagens locais
        console.log('⚠️ Galeria não pôde ser carregada');
      }

      // Keep the gallery still until the visitor navigates it.
      const gallerySetCount = 1;
      console.log('🎨 Gerando a galeria (DOM) com', galleryData.length, 'imagens');

      if (galleryTrack) {
        galleryTrack.innerHTML = '';
        for (let setIndex = 0; setIndex < gallerySetCount; setIndex++) {
          galleryData.forEach(item => {
            const thumbnailUrl = item.type === 'vid'
              ? 'https://via.placeholder.com/260x260/1a2b45/FFFFFF?text=Video'
              : item.url;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'shrink-0 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-[#223A5E] rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg flex items-center justify-center';
            itemDiv.style.border = '0.2px solid #e2e8f0';
            itemDiv.addEventListener('click', () => {
              try { window.openLightbox(item.url, item.type); } catch (e) { console.warn('openLightbox missing', e); }
            });

            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.className = 'w-full h-full object-cover';
            img.alt = 'Trabalho ' + (item.cliente || 'Atlântico');
            img.loading = 'lazy';
            img.onerror = () => {
              console.warn('Imagem indisponível removida da galeria:', item.url);
              itemDiv.remove();
            };
            itemDiv.appendChild(img);

            if (item.type === 'vid') {
              const playWrap = document.createElement('div');
              playWrap.className = 'absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors';
              playWrap.innerHTML = '<i class="fa-solid fa-play text-white/80 text-4xl drop-shadow-md"></i>';
              itemDiv.appendChild(playWrap);
            }

            if (item.cliente) {
              const clienteLabel = document.createElement('div');
              clienteLabel.className = 'absolute bottom-0 left-0 right-0 translate-y-2 opacity-0 bg-gradient-to-t from-[#071426] via-[#0e1a2b]/90 to-transparent p-4 pt-10 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100';
              const labelText = document.createElement('p');
              labelText.className = 'text-white text-sm font-bold truncate drop-shadow-md';
              labelText.textContent = item.cliente;
              clienteLabel.appendChild(labelText);
              itemDiv.appendChild(clienteLabel);
            }

            galleryTrack.appendChild(itemDiv);
          });
        }
      }

      window.scrollGallery = (direction: number) => {
        if (!galleryTrack) return;

        const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
        if (maxScroll <= 0) return;

        const nextScroll = galleryTrack.scrollLeft + direction * Math.min(450, galleryTrack.clientWidth * 0.75);
        if (nextScroll >= maxScroll) {
          galleryTrack.scrollTo({ left: 0, behavior: 'instant' });
        } else if (nextScroll <= 0) {
          galleryTrack.scrollTo({ left: maxScroll, behavior: 'instant' });
        } else {
          galleryTrack.scrollTo({ left: nextScroll, behavior: 'smooth' });
        }
      };

      // 5. Lightbox (Modal da Galeria)
      const lightbox = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      const lbPlay = document.getElementById('lightbox-play');

      (window as any).openLightbox = function(url: string, type: string) {
        if (lbImg && lightbox) {
          (lbImg as HTMLImageElement).src = url;
          if(type === 'vid' && lbPlay) {
            lbPlay.classList.remove('hidden');
          } else if (lbPlay) {
            lbPlay.classList.add('hidden');
          }
          lightbox.classList.remove('hidden');
          lightbox.classList.add('flex');
          document.body.style.overflow = 'hidden';
        }
      };

      (window as any).closeLightbox = function() {
        if (lightbox) {
          lightbox.classList.add('hidden');
          lightbox.classList.remove('flex');
          document.body.style.overflow = 'auto';
        }
      };

      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          if(e.target === lightbox) (window as any).closeLightbox();
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .dropdown-bridge { padding-top: 1.5rem; }
        .fade-img { transition: opacity 1.5s ease-in-out; }
        @keyframes partner-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partner-marquee { animation: partner-marquee 45s linear infinite; }
        .partner-carousel:hover .partner-marquee { animation-play-state: paused; }
        
        /* Animações */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animate-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animate-delay-500 { animation-delay: 0.5s; opacity: 0; }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <Script id="tailwind-config" strategy="beforeInteractive">
        {`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  dark: '#0E1A2B',
                  panel: '#15253F',
                  primary: '#223A5E',
                  accent: '#E19747',
                  light: '#8FB3FF',
                  whiteish: '#F3F6FF'
                },
                fontFamily: {
                  sans: ['Oswald', 'sans-serif'],
                }
              }
            }
          }
        `}
      </Script>

      <div className="bg-dark text-whiteish font-sans overflow-x-hidden relative">
        {/* Background Fixo */}
        <div className="fixed inset-0 z-[-1]">
          <img src="/images/sobre-bg.jpg" alt="Fundo Mar" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[#0a111c]/80 backdrop-blur-[2px]"></div>
        </div>

        {/* HEADER */}
        <header className="fixed top-0 w-full z-50 bg-[#0E1A2B] shadow-lg flex items-center justify-between px-4 md:px-10 py-3 md:py-4 animate-slideDown">
          <nav className="min-w-0 flex-1 overflow-x-auto flex gap-2 md:gap-6 font-bold tracking-wide text-[10px] sm:text-xs md:text-sm lg:text-base uppercase items-center whitespace-nowrap animate-fadeIn animate-delay-100">
              <div className="relative group shrink-0">
                <a href="/#servicos" className="hover:text-accent transition-colors text-white py-2 block">{t.nav.services}</a>
                <div id="desktop-dropdown-menu" className="absolute top-full left-0 hidden md:group-hover:block dropdown-bridge z-50">
                  <div className="w-72 bg-[#15253F] shadow-2xl border border-dark rounded-md overflow-hidden flex flex-col">
                    <a href="/?servico=Recuperação Estrutural#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.structural}</a>
                    <a href="/?servico=Navios e Plataformas#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.ships}</a>
                    <a href="/?servico=Levantamento e Registro#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.survey}</a>
                    <a href="/?servico=Hidroelétricas e Barragens#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.hydroelectric}</a>
                    <a href="/?servico=Inspeção e Vistoria#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.inspection}</a>
                    <a href="/?servico=Dragagem e Sondagem#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.dredging}</a>
                    <a href="/?servico=Resgate e Salvatagem#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.rescue}</a>
                    <a href="/?servico=Mergulho Especializado#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.diving}</a>
                    <a href="/?servico=Dutos e Cabos Submarinos#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium border-b border-dark/50 text-sm uppercase tracking-wide">{t.services.categories.pipelines}</a>
                    <a href="/?servico=Tratamento de Água#servicos" className="dropdown-service-link text-left block w-full px-5 py-3 hover:bg-[#223A5E] hover:text-accent transition-colors font-medium text-sm uppercase tracking-wide">{t.services.categories.water}</a>
                  </div>
                </div>
              </div>
              <a href="/sobre-nos#sobre" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.aboutUs}</a>
              <a href="/sobre-nos#clientes" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.partners}</a>
              <a href="/sobre-nos#galeria" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.gallery}</a>
              <a href="/fale-conosco" className="shrink-0 hover:text-accent transition-colors text-white py-2 block">{t.nav.contactUs}</a>
          </nav>
          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <div className="cursor-pointer hover:opacity-80 transition-opacity animate-fadeIn animate-delay-200" onClick={() => window.location.href='/'}>
              <img src="/images/logo-atlatico-vector.png" alt="Atlântico Logo" className="h-10 md:h-14 object-contain" />
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="pt-24 pb-12 flex flex-col items-center w-full">
          {/* 1. SEÇÃO: SOBRE NÓS */}
          <section id="sobre" className="w-full max-w-[1400px] px-4 md:px-10 mt-8 mb-16">
            <div className="bg-[#1a2b45] inline-block px-6 md:px-8 py-2 rounded-t-xl rounded-br-xl mb-4 shadow-lg border border-primary/50 animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">{t.about.title}</h2>
            </div>

              <div className="sobre-nos-panel rounded-3xl p-6 md:p-10 border border-primary/50 shadow-2xl flex flex-col md:flex-row gap-8 items-center animate-fadeInUp animate-delay-200 hover-lift" style={{backgroundColor: '#2b4c7e'}}>
              <div className="w-full md:w-2/5 h-64 md:h-96 relative rounded-2xl overflow-hidden border-2 border-white/20 shrink-0">
                <div className="absolute top-4 right-4 z-20 w-8 h-8 opacity-70">
                  <img src="/images/logo-atlatico-vector.png" alt="Icon" className="w-full h-full object-contain mix-blend-screen grayscale brightness-200" />
                </div>
                
                <img src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80" className="slide-img fade-img absolute inset-0 w-full h-full object-cover opacity-100 z-10" alt="Slide 1" />
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" className="slide-img fade-img absolute inset-0 w-full h-full object-cover opacity-0 z-0" alt="Slide 2" />
                <img src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80" className="slide-img fade-img absolute inset-0 w-full h-full object-cover opacity-0 z-0" alt="Slide 3" />
              </div>

              <div className="w-full md:w-3/5 text-lg md:text-2xl font-medium leading-relaxed text-whiteish tracking-wide">
                <p className="mb-4">
                  {t.about.paragraph1}
                </p>
                <p className="mb-4">
                  {t.about.paragraph2}
                </p>
                <p>
                  {t.about.paragraph3}
                </p>
              </div>
            </div>
          </section>

          {/* 2. SEÇÃO: CLIENTES */}
          <section id="clientes" className="w-full max-w-[1400px] px-4 md:px-10 mb-16">
            <div className="bg-[#1a2b45] inline-block px-6 md:px-8 py-2 rounded-t-xl rounded-br-xl mb-4 shadow-lg border border-primary/50 animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">{t.clients.title}</h2>
            </div>

            <div className="bg-[#0f172a]/90 rounded-3xl p-6 md:p-10 border border-primary/50 shadow-2xl animate-fadeInUp animate-delay-200">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Lista de Clientes Dinâmica */}
                {Object.entries(t.clients.list).map(([key, client]) => (
                  <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-primary/30">
                    <h3 className="text-accent font-bold text-lg md:text-xl mb-2">{client.name}</h3>
                    <p className="text-gray-300 text-xs md:text-sm">{client.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. SEÇÃO: PARCEIROS */}
          <section className="w-full max-w-[1400px] px-4 md:px-10 mb-16 relative">
            <div className="partner-carousel relative w-full overflow-hidden bg-[#0a111c]/60 py-8 rounded-2xl border border-primary/30 animate-fadeInUp animate-delay-200">
              <div className="h-48 overflow-x-clip overflow-y-visible px-8 py-4">
                <div id="partners-track" className="partner-marquee flex w-max items-center">
                {/* Itens via JS */}
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEÇÃO: GALERIA */}
          <section id="galeria" className="w-full max-w-[1400px] px-4 md:px-10 mb-16 relative">
            <div className="bg-[#1a2b45] inline-block px-6 md:px-8 py-2 rounded-t-xl rounded-br-xl mb-4 shadow-lg border border-primary/50 animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">{t.gallery.title}</h2>
            </div>

            <div className="gallery-carousel relative w-full overflow-hidden mt-4 animate-fadeInUp animate-delay-200">
              <button onClick={() => window.scrollGallery(-1)} aria-label="Imagens anteriores" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-accent transition-colors drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-20 md:w-16 md:h-28">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div id="gallery-track" className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6 overflow-x-auto no-scrollbar w-full py-4 h-[500px] md:h-[600px] items-center px-12 md:px-16">
                {/* Itens injetados via JS */}
              </div>
              <button onClick={() => window.scrollGallery(1)} aria-label="Próximas imagens" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-accent transition-colors drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-20 md:w-16 md:h-28">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer id="footer" className="bg-[#0a1320] py-8 border-t border-primary px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-5xl w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
            <a href="https://maps.google.com/?q=Rua+Bittencourt,+25+Vila+Nova+-+Santos/SP" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors group">
              <i className="fa-solid fa-location-dot text-2xl group-hover:-translate-y-1 transition-transform"></i>
              <div className="leading-tight text-left">
                <p className="font-bold text-base md:text-lg">Rua Bittencourt, 25</p>
                <p className="text-xs md:text-sm text-gray-400">Vila Nova - Santos/SP</p>
              </div>
            </a>
            <a href="tel:+551332212222" className="flex items-center gap-3 hover:text-accent transition-colors group">
              <i className="fa-solid fa-phone text-2xl group-hover:rotate-12 transition-transform"></i>
              <span className="font-bold text-lg md:text-xl">55 13 3221.2222</span>
            </a>
            <a href="mailto:atlanticosts@atlanticosts.com.br" className="flex items-center gap-3 hover:text-accent transition-colors group">
              <i className="fa-solid fa-envelope text-2xl group-hover:-translate-y-1 transition-transform"></i>
              <span className="font-bold text-sm md:text-lg">atlanticosts@atlanticosts.com.br</span>
            </a>
          </div>
          <p className="text-center mt-6 text-sm text-gray-300">{t.footer.administrativeHours}</p>
          <div className="text-center mt-8 text-xs text-gray-500">
            {t.footer.copyright}
          </div>
        </footer>

        {/* LIGHTBOX / MODAL DA GALERIA */}
        <div id="lightbox" className="fixed inset-0 z-[100] bg-black/90 hidden flex-col items-center justify-center p-4 transition-opacity">
          <button onClick={() => (window as any).closeLightbox()} className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-accent text-4xl font-bold z-50">&times;</button>
          
          <div className="bg-[#1c2a3f] p-3 md:p-5 rounded-3xl w-full max-w-5xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            <div className="border-[6px] border-[#e2e8f0] rounded-2xl overflow-hidden relative aspect-video flex items-center justify-center bg-black">
              <img id="lightbox-img" className="w-full h-full object-contain" alt="Lightbox" />
              <i id="lightbox-play" className="fa-solid fa-play text-white/80 text-6xl md:text-8xl absolute hidden drop-shadow-lg cursor-pointer hover:text-white hover:scale-110 transition-transform"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
