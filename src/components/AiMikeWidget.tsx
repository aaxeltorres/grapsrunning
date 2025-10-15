import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow?: any;
    __VF_WIDGET_LOADING__?: boolean;
    __VF_WIDGET_READY__?: boolean;
  }
}

const AiMikeWidget: React.FC = () => {
  useEffect(() => {
    const LOADER_ID = 'vf-widget-loader';

    const loadVF = () => {
      // Si ya hay un widget en el DOM, no vuelvas a inicializar
      if (document.querySelector('.vfrc-widget')) {
        window.__VF_WIDGET_READY__ = true;
        return;
      }
      // Si la lib expone load, inicializamos una vez
      if (window.voiceflow?.chat?.load && !window.__VF_WIDGET_READY__) {
        window.voiceflow.chat.load({
          verify: { projectID: '687ff9872dff7e89819d5cbf' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: { url: 'https://runtime-api.voiceflow.com' },
        });
        window.__VF_WIDGET_READY__ = true;
      }
    };

    // Si ya cargó alguna vez, no hacemos nada
    if (window.__VF_WIDGET_READY__) return;
    if (window.__VF_WIDGET_LOADING__) return;

    // Si el script ya está presente
    const existing = document.getElementById(LOADER_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.voiceflow?.chat?.load) loadVF();
      else existing.addEventListener('load', loadVF, { once: true });
      return;
    }

    // Inyectar script solo una vez
    window.__VF_WIDGET_LOADING__ = true;
    const script = document.createElement('script');
    script.id = LOADER_ID;
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = () => {
      window.__VF_WIDGET_LOADING__ = false;
      loadVF();
    };
    document.body.appendChild(script);
  }, []);

  return null;
};

export default AiMikeWidget;
