import '@/services/i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

import { getSettings } from '@/services/cmds';
import { getSystemCurrentTheme } from '@/services/api';
import { applyTheme } from './lib/utils';
import { Themes } from './types';

/**
 * Get user settings data & system theme in advance.
 * Can solve the view flickering caused by refresh (caused by theme).
 * This would have increased the delay in loading the first screen.
 * However, thanks to the powerful performance of `rust`, the time consumption is within an acceptable range.
 * The delay is always within `15ms` (in development).
 */
(async () => {
  const [settings, sysTheme] = await Promise.all([
    getSettings(),
    getSystemCurrentTheme(),
  ]);

  // Set the theme in advance to prevent flickering.
  applyTheme(settings.theme !== Themes.System ? settings.theme : sysTheme);

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App settings={settings} sysTheme={sysTheme} />
    </StrictMode>,
  );
})();
