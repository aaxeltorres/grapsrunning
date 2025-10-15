import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    voiceflow?: any;
  }
}

const HEADER_PX = 64; 

const AiMikePage: React.FC = () => {
  const navigate = useNavigate();

  // scope de estilos sólo para esta página
  useEffect(() => {
    document.body.classList.add('ai-mike-page');
    return () => document.body.classList.remove('ai-mike-page');
  }, []);

  // full-screen + ocultar launcher
  useEffect(() => {
    const STYLE_ID = 'ai-mike-vf-fullscreen-styles';
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.innerHTML = `
      /* Ocultar cualquier launcher/flotante del widget en esta página */
      body.ai-mike-page .vfrc-launcher,
      body.ai-mike-page [class*="launcher"],
      body.ai-mike-page button[aria-label="Open chat"],
      body.ai-mike-page [data-testid="launcher"] {
        display: none !important;
      }

      /* Forzar el contenedor del chat a ocupar toda el área visible bajo el header */
      body.ai-mike-page .vfrc-widget,
      body.ai-mike-page [class*="vfrc-widget"] {
        position: fixed !important;
        top: ${HEADER_PX}px !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: calc(100vh - ${HEADER_PX}px) !important;
        max-width: none !important;
        max-height: none !important;
        transform: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        z-index: 60 !important;
      }

      /* Asegurar que el contenido interno también estire al 100% */
      body.ai-mike-page .vfrc-widget__chat,
      body.ai-mike-page .vfrc-chat,
      body.ai-mike-page .vfrc-chat--open,
      body.ai-mike-page [class*="widget__chat"] {
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const n = document.getElementById(STYLE_ID);
      if (n?.parentNode) n.parentNode.removeChild(n);
    };
  }, []);

  useEffect(() => {
    // función que aplica estilos inline directamente al nodo (gana a la mayoría de reglas)
    const fitWidgetInline = () => {
      const widget = document.querySelector('.vfrc-widget') as HTMLElement
        || (document.querySelector('[class*="vfrc-widget"]') as HTMLElement);
      if (widget) {
        widget.style.position = 'fixed';
        widget.style.top = `${HEADER_PX}px`;
        widget.style.right = '0';
        widget.style.bottom = '0';
        widget.style.left = '0';
        widget.style.width = '100%';
        widget.style.height = `calc(100vh - ${HEADER_PX}px)`;
        widget.style.maxWidth = 'none';
        widget.style.maxHeight = 'none';
        widget.style.transform = 'none';
        widget.style.borderRadius = '0';
        widget.style.boxShadow = 'none';
        widget.style.margin = '0';
        widget.style.zIndex = '60';
      }
    };

    // abre el chat y reintenta hasta que esté listo
    const openInterval = setInterval(() => {
      try {
        if (window.voiceflow?.chat?.open) {
          window.voiceflow.chat.open();
          fitWidgetInline();
        }
      } catch { /* noop */ }
    }, 250);

    // Observa el DOM por si el widget se re-renderiza y vuelve a ponerse chico
    const obs = new MutationObserver(() => fitWidgetInline());
    obs.observe(document.body, { childList: true, subtree: true });

    // Reaplicar al cambiar el tamaño de la ventana
    const onResize = () => fitWidgetInline();
    window.addEventListener('resize', onResize);

    // limpieza al salir
    return () => {
      clearInterval(openInterval);
      try { window.voiceflow?.chat?.close?.(); } catch { /* noop */ }
      obs.disconnect();
      window.removeEventListener('resize', onResize);
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

      {/* El chat ocupa todo debajo del header; no se renderiza nada más aquí */}
      <main className="flex-1 bg-gray-50" />
    </div>
  );
};

export default AiMikePage;
