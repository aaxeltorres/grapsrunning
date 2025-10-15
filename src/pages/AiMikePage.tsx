import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AiMikeWidget from '../components/AiMikeWidget';

declare global {
  interface Window {
    voiceflow?: any;
  }
}

// Altura del header (tu Tailwind header h-16 ≈ 64px)
const HEADER_PX = 64;

const AiMikePage: React.FC = () => {
  const navigate = useNavigate();

  // Etiqueta al <body> para aplicar estilos scoped a esta página
  useEffect(() => {
    document.body.classList.add('ai-mike-page');
    return () => {
      document.body.classList.remove('ai-mike-page');
    };
  }, []);

  // Inyecta estilos para: ocultar launcher y forzar full-screen del chat
  useEffect(() => {
    const STYLE_ID = 'ai-mike-vf-fullscreen-styles';
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.innerHTML = `
      /* Scope sólo cuando estamos en AiMikePage */
      body.ai-mike-page .vfrc-launcher { 
        display: none !important; 
      }
      /* Contenedor principal del widget (Voiceflow "widget-next" usa prefijo vfrc-) */
      body.ai-mike-page .vfrc-widget {
        position: fixed !important;
        inset: ${HEADER_PX}px 0 0 0 !important; /* top, right, bottom, left */
        width: 100% !important;
        height: calc(100vh - ${HEADER_PX}px) !important;
        max-height: none !important;
        max-width: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        z-index: 60 !important; /* sobre el contenido, debajo de un modal si lo hubiera */
      }
      /* Asegura que el contenido del chat ocupe todo el alto */
      body.ai-mike-page .vfrc-chat, 
      body.ai-mike-page .vfrc-chat--open, 
      body.ai-mike-page .vfrc-widget__chat {
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const n = document.getElementById(STYLE_ID);
      if (n && n.parentNode) n.parentNode.removeChild(n);
    };
  }, []);

  // Abre el chat automáticamente y reintenta si el SDK no cargó aún
  useEffect(() => {
    const tryOpen = () => {
      try {
        window.voiceflow?.chat?.open?.();
      } catch {
        /* noop */
      }
    };
    tryOpen();
    const id = setInterval(() => {
      if (window.voiceflow?.chat?.open) {
        window.voiceflow.chat.open();
        clearInterval(id);
      }
    }, 250);

    // Al salir de /ai-mike, cerramos el chat para volver al comportamiento normal
    return () => {
      clearInterval(id);
      try {
        window.voiceflow?.chat?.close?.();
      } catch {
        /* noop */
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50" style={{ height: HEADER_PX }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">AI Coach Mike</div>
            </div>
          </div>
        </div>
      </header>

      {/* Montamos el loader del widget aquí por si el usuario entra directo a /ai-mike */}
      <AiMikeWidget />

      {/* El chat ocupa todo debajo del header; no mostramos nada más */}
      <main className="flex-1 bg-gray-50" />
    </div>
  );
};

export default AiMikePage;
