import React, { useEffect } from 'react';

const AiMikeWidget: React.FC = () => {
  useEffect(() => {
    (window as any).VG_CONFIG = {
      ID: '3jLWEIAuXvHrv3OOLe0w',
      region: 'na',
      render: 'full-width',
      stylesheets: [
        'https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css',
      ],
    };

    const script = document.createElement('script');
    script.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      const container = document.getElementById('VG_OVERLAY_CONTAINER');
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      id="VG_OVERLAY_CONTAINER"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

export default AiMikeWidget;
