const select = document.getElementById('coin-select');
const addressBox = document.getElementById('address-box');
const qrContainer = document.getElementById('qr-container');
const copyBtn = document.getElementById('copy-btn');

function updateCrypto() {
    const selectedOption = select.options[select.selectedIndex];
    const address = selectedOption.getAttribute('data-addr');
    const coin = select.value;

    // Update text box layout
    addressBox.innerText = address;

    // Update QR Code dynamically
    qrContainer.innerHTML = `<img src="https://qrserver.com{coin}:${address}" alt="QR Code">`;
}

function copyAddress() {
    navigator.clipboard.writeText(addressBox.innerText)
        .then(() => {
            alert('Address copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Event Listeners
select.addEventListener('change', updateCrypto);
copyBtn.addEventListener('click', copyAddress);

// Run initial generation on page load
window.addEventListener('DOMContentLoaded', updateCrypto);
