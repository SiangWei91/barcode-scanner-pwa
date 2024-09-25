// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Function to initialize PDA scanner
function initScanner() {
    document.addEventListener('keydown', function(event) {
        // Check if it's a scanner button press
        if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
            event.preventDefault(); // Prevent default button behavior
            console.log('Scanner button pressed');
            
            // Clear previous scan results
            document.getElementById('barcodeInput').value = '';
            
            // Focus on the input field when the scan button is pressed
            const input = document.getElementById('barcodeInput');
            if (input) {
                input.focus();
            }
        } else if (event.key === 'Enter') {
            const barcodeInput = document.getElementById('barcodeInput');
            if (barcodeInput && barcodeInput.value) {
                console.log('Scanned barcode:', barcodeInput.value);
                // You can add additional processing here if needed
            }
        }
    });
}

// Initialize the scanner when the page loads
window.addEventListener('load', initScanner);
