document.addEventListener('DOMContentLoaded', () => {
    const selectWrapper = document.getElementById('coin-select-wrapper');
    const trigger = document.getElementById('select-trigger');
    const coinNameDisplay = document.getElementById('selected-coin-name');
    const addressText = document.getElementById('address-text');
    const options = document.querySelectorAll('.option');
    const copyBtn = document.getElementById('copy-btn');
    const themeBtn = document.getElementById('theme-btn');

    // Sprache der aktuellen HTML ermitteln
    const isGerman = document.documentElement.lang === 'de';

    // 1. Dropdown Toggle
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            selectWrapper.classList.toggle('active');
            e.stopPropagation();
        });
    }

    // 2. Auswahl verarbeiten
    options.forEach(option => {
        option.addEventListener('click', () => {
            const address = option.getAttribute('data-addr');
            const name = option.innerText;

            coinNameDisplay.innerText = name;
            addressText.innerText = address;

            selectWrapper.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        selectWrapper.classList.remove('active');
    });

    // 3. Kopier-Logik (Kompakt & Mehrsprachig)
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const text = addressText.innerText;
            
            if (text === "---") {
                copyBtn.innerText = isGerman ? "Zuerst Coin wählen!" : "Select a coin first!";
                copyBtn.style.backgroundColor = "var(--accent-red, #fb4934)";
                setTimeout(() => {
                    copyBtn.innerText = isGerman ? "Adresse kopieren" : "Copy Address";
                    copyBtn.style.backgroundColor = "";
                }, 2000);
                return;
            }

            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerText = isGerman ? "Kopiert!" : "Copied!";
                copyBtn.style.backgroundColor = "var(--accent-green, #b8bb26)";
                
                setTimeout(() => {
                    copyBtn.innerText = isGerman ? "Adresse kopieren" : "Copy Address";
                    copyBtn.style.backgroundColor = "";
                }, 2000);
            });
        });
    }

    // 4. Dark/Light Mode Sync (LocalStorage)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerText = "Dark";
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.innerText = "Light";
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeBtn.innerText = "Dark";
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
