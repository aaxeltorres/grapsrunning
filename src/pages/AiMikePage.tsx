import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    voiceflow?: any;
  }
}

const HEADER_PX = 64; // ajustá si tu header es más alto/bajo

const AiMikePage: React.FC = () => {
  const navigate = useNavigate();

  // Marca body para estilos scoped
  useEffect(() => {
    document.body.classList.add('ai-mike-page');
    return () => document.body.classList.remove('ai-mike-page');
  }, []);

  // Inyecta estilos full-screen y oculta el launcher SOLO en /ai-mike
  useEffect(() => {
    const STYLE_ID = 'ai-mike-vf-fullscreen-styles';
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.innerHTML = `
        body.ai-mike-page .vfrc-launcher { display: none !important; }
        body.ai-mike-page .vfrc-widget {
          position: fixed !important;
          inset: ${HEADER_PX}px 0 0 0 !important; /* top right bottom left */
          width: 100% !important;
          height: calc(100vh - ${HEADER_PX}px) !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          z-index: 60 !important;
        }
        body.ai-mike-page .vfrc-chat,
        body.ai-mike-page .vfrc-chat--open,
        body.ai-mike-page .vfrc-widget__chat {
          height: 100% !important;
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const n = document.getElementById(STYLE_ID);
      if (n?.parentNode) n.parentNode.removeChild(n);
    };
  }, []);

  // Abre el chat, deduplica instancias, limpia al salir
  useEffect(() => {
    const tryOpen = () => {
      // elimina clones de widgets si los hubiera
      const widgets = Array.from(document.querySelectorAll('.vfrc-widget'));
      if (widgets.length > 1) widgets.slice(1).forEach(n => n.parentElement?.removeChild(n));

      try { window.voiceflow?.chat?.open?.(); } catch {}

      // a veces el botón "minimizado" conserva estado: forzamos abierto
      const interval = setInterval(() => {
        if (window.voiceflow?.chat?.open) {
          window.voiceflow.chat.open();
          // vuelvo a asegurar que no aparezcan clones
          const ws = Array.from(document.querySelectorAll('.vfrc-widget'));
          if (ws.length > 1) ws.slice(1).forEach(n => n.parentElement?.removeChild(n));
          clearInterval(interval);
        }
      }, 250);

      return () => clearInterval(interval);
    };

    const cleanup = tryOpen();
    return () => {
      try { window.voiceflow?.chat?.close?.(); } catch {}
      if (typeof cleanup === 'function') cleanup();
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

      {/* El chat ocupa todo el espacio debajo del header */}
      <main className="flex-1 bg-gray-50" />
    </div>
  );
};

export default AiMikePage;
