/* ============================================================
   VetSy — themeSwitcher.js | Lógica de Control de Temas
   ============================================================ */

const ThemeSwitcher = (() => {
  const STORAGE_KEY = "vetsy-theme";
  const THEMES = {
    dark: "dark",
    light: "light",
    default: "default",
  };

  // Inicializar el tema al cargar la página
  const init = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.default;
    applyTheme(savedTheme);

    // Escuchar cambios del sistema en tiempo real
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (getCurrentTheme() === THEMES.default) {
        applyTheme(THEMES.default);
      }
    });
  };

  // Aplicar tema (Lógica de colores)
  const applyTheme = (themeName) => {
    const root = document.documentElement;
    let themeToRender = themeName;

    // Si es default, detectamos qué prefiere el sistema
    if (themeName === THEMES.default) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      themeToRender = prefersDark ? THEMES.dark : THEMES.light;
    }

    if (themeToRender === THEMES.light) {
      // --- TEMA CLARO ---
      root.style.setProperty("--primary", "#0077b6");
      root.style.setProperty("--primary-dark", "#004e89");
      root.style.setProperty("--primary-light", "#b0e0e6");
      root.style.setProperty("--accent", "#0096c7");
      root.style.setProperty("--accent2", "#00b4d8");
      root.style.setProperty("--sidebar-bg", "#f5f5f5");
      root.style.setProperty("--sidebar-text", "#555555");
      root.style.setProperty("--sidebar-hover", "#e8e8e8");
      root.style.setProperty("--sidebar-active", "#0077b6");
      root.style.setProperty("--header-bg", "#ffffff");
      root.style.setProperty("--bg", "#fafafa");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-card2", "#f5f5f5");
      root.style.setProperty("--border", "#ddd");
      root.style.setProperty("--border-light", "#e8e8e8");
      root.style.setProperty("--text-main", "#222222");
      root.style.setProperty("--text-muted", "#666666");
      root.style.setProperty("--text-light", "#999999");
      root.style.setProperty("--shadow-sm", "0 1px 3px rgba(0,0,0,0.1)");
      root.style.setProperty("--shadow-md", "0 4px 16px rgba(0,0,0,0.08)");
      root.style.setProperty("--shadow-lg", "0 8px 32px rgba(0,0,0,0.12)");
      root.style.setProperty("--glow", "0 0 20px rgba(0,119,182,0.1)");
    } else {
      // --- TEMA OSCURO ---
      root.style.setProperty("--primary", "#00b4d8");
      root.style.setProperty("--primary-dark", "#0077b6");
      root.style.setProperty("--primary-light", "#caf0f8");
      root.style.setProperty("--accent", "#48cae4");
      root.style.setProperty("--accent2", "#90e0ef");
      root.style.setProperty("--sidebar-bg", "#0d1117");
      root.style.setProperty("--sidebar-text", "#8b949e");
      root.style.setProperty("--sidebar-hover", "#161b22");
      root.style.setProperty("--sidebar-active", "#00b4d8");
      root.style.setProperty("--header-bg", "#161b22");
      root.style.setProperty("--bg", "#0d1117");
      root.style.setProperty("--bg-card", "#161b22");
      root.style.setProperty("--bg-card2", "#1c2128");
      root.style.setProperty("--border", "#30363d");
      root.style.setProperty("--border-light", "#21262d");
      root.style.setProperty("--text-main", "#e6edf3");
      root.style.setProperty("--text-muted", "#8b949e");
      root.style.setProperty("--text-light", "#6e7681");
      root.style.setProperty("--shadow-sm", "0 1px 3px rgba(0,0,0,0.4)");
      root.style.setProperty("--shadow-md", "0 4px 16px rgba(0,0,0,0.5)");
      root.style.setProperty("--shadow-lg", "0 8px 32px rgba(0,0,0,0.6)");
      root.style.setProperty("--glow", "0 0 20px rgba(0,180,216,0.15)");
    }

    // Guardar preferencia original (incluyendo "default")
    localStorage.setItem(STORAGE_KEY, themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  };

  const getCurrentTheme = () => localStorage.getItem(STORAGE_KEY) || THEMES.default;

  const cycleTheme = () => {
    const current = getCurrentTheme();
    const order = [THEMES.default, THEMES.light, THEMES.dark];
    const nextIndex = (order.indexOf(current) + 1) % order.length;
    const nextTheme = order[nextIndex];

    applyTheme(nextTheme);
    return nextTheme;
  };

  return { init, applyTheme, getCurrentTheme, cycleTheme, THEMES };
})();

// Auto-ejecución
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ThemeSwitcher.init);
} else {
  ThemeSwitcher.init();
}
