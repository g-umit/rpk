const textarea = document.getElementById('note');
    const themeSelector = document.getElementById('theme-selector');

    // Lade gespeicherte Notiz und Theme
    textarea.value = localStorage.getItem('note') || '';
    const savedTheme = localStorage.getItem('theme') || 'classic';
    document.body.className = savedTheme;
    themeSelector.value = savedTheme;

    // Speichern beim Tippen
    textarea.addEventListener('input', () => {
      localStorage.setItem('note', textarea.value);
    });

    // Theme wechseln
    themeSelector.addEventListener('change', () => {
      const theme = themeSelector.value;
      document.body.className = theme;
      localStorage.setItem('theme', theme);
    });
