import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow?: any;
  }
}

const AiMikeWidget: React.FC = () => {
  useEffect(() => {
    const LOADER_ID = 'vf-widget-loader';

    const loadVoiceflow = () => {
      // Carga el widget Voiceflow
      window.voiceflow?.chat?.load?.({
        verify: { projectID: '687ff9872dff7e89819d5cbf' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: { url: 'https://runtime-api.voiceflow.com' },
      });

      // 🔹 Abre automáticamente el chat al cargar
      const openChat = () => {
        try {
          window.voiceflow?.chat?.open?.();
        } catch {
          // Reintento en caso de que el widget tarde en inicializar
          setTimeout(openChat, 500);
        }
      };
      openChat();
    };

    // Evita duplicar scripts
    const existing = document.getElementById(LOADER_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.voiceflow?.chat?.load) {
        loadVoiceflow();
      } else {
        existing.addEventListener('load', loadVoiceflow, { once: true });
      }
      return;
    }

    // Inyecta el script del widget
    const script = document.createElement('script');
    script.id = LOADER_ID;
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = loadVoiceflow;
    document.body.appendChild(script);
  }, []);

  return null; // El widget flota, no se renderiza contenido visible
};

export default AiMikeWidget;