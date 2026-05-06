/* ============================================================
   VetSy — themeEvents.js  |  Manejador de eventos del tema
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggleBtn');
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = ThemeSwitcher.cycleTheme();
      updateThemeIcon(newTheme);
    });
  }

  // Inicializar el icono del tema
  const currentTheme = ThemeSwitcher.getCurrentTheme();
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const icons = {
    dark: '🌙',
    light: '☀️',
    default: '🎨'
  };

  const titles = {
    dark: 'Modo oscuro - Click para cambiar',
    light: 'Modo claro - Click para cambiar',
    default: 'Modo predeterminado - Click para cambiar'
  };

  themeBtn.textContent = icons[theme] || icons.default;
  themeBtn.title = titles[theme] || titles.default;
}

// Escuchar cambios de tema del sistema operativo
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  const current = ThemeSwitcher.getCurrentTheme();
  if (current === 'default') {
    // Re-aplicar para que tome el nuevo color del sistema
    ThemeSwitcher.applyTheme('default'); 
    updateThemeIcon('default');
  }
});
