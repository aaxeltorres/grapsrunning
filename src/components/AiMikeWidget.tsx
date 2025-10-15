import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow?: any;
  }
}

const AiMikeWidget: React.FC = () => {
  useEffect(() => {
    const LOADER_ID = 'vf-widget-loader';

    const ensureLoaded = () => {
      window.voiceflow?.chat?.load?.({
        verify: { projectID: '687ff9872dff7e89819d5cbf' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: { url: 'https://runtime-api.voiceflow.com' },
      });
      // 👆 No auto-open aquí: el full-screen se maneja en AiMikePage
    };

    const existing = document.getElementById(LOADER_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.voiceflow?.chat?.load) ensureLoaded();
      else existing.addEventListener('load', ensureLoaded, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = LOADER_ID;
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = ensureLoaded;
    document.body.appendChild(script);
  }, []);

  return null; // El widget es flotante, no renderiza nada visible
};

export default AiMikeWidget;
