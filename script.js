document.addEventListener('DOMContentLoaded', () => {
    const selectWrapper = document.getElementById('coin-select-wrapper');
    const trigger = document.getElementById('select-trigger');
    const coinNameDisplay = document.getElementById('selected-coin-name');
    const addressText = document.getElementById('address-text');
    const options = document.querySelectorAll('.option');
    const copyBtn = document.getElementById('copy-btn');

    // 1. Toggle Menu Slide
    trigger.addEventListener('click', (e) => {
        selectWrapper.classList.toggle('active');
        e.stopPropagation(); // Prevents immediate closing
    });

    // 2. Handle Selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            const address = option.getAttribute('data-addr');
            const name = option.innerText;

            // Update UI
            coinNameDisplay.innerText = name;
            addressText.innerText = address;

            // Close Menu
            selectWrapper.classList.remove('active');
        });
    });

    // 3. Close menu if user clicks anywhere outside
    document.addEventListener('click', () => {
        selectWrapper.classList.remove('active');
    });

    // 4. Copy Logic
    copyBtn.addEventListener('click', () => {
        const text = addressText.innerText;
        
        if (text === "---") {
            copyBtn.innerText = "Select a coin first!";
            copyBtn.style.backgroundColor = "var(--red)";
            copyBtn.style.boxShadow = "0 0 15px rgba(243, 139, 168, 0.4)";
            setTimeout(() => {
                copyBtn.innerText = "Copy Address";
                copyBtn.style.backgroundColor = "";
                copyBtn.style.boxShadow = "0 0 15px rgba(203, 166, 247, 0.4)";
            }, 2000);
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            const originalText = "Copy Address";
            copyBtn.innerText = "Copied!";
            copyBtn.style.backgroundColor = "var(--green)";
            copyBtn.style.boxShadow = "0 0 15px rgba(166, 227, 161, 0.4)";
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = "";
                copyBtn.style.boxShadow = "0 0 15px rgba(203, 166, 247, 0.4)";
            }, 2000);
        });
    });
});
