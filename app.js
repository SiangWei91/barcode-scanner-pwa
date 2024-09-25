// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Product list storage
let productList = {};

// Function to load product list
async function loadProductList() {
    try {
        const response = await fetch('/barcode-scanner-pwa/productList.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productList = await response.json();
        console.log('Loaded product list:', productList);
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
    }
}

// Function to process scanned barcode
function processBarcode(barcode) {
    console.log('Processing barcode:', barcode);
    const productName = productList[barcode] || 'Product not found';
    console.log('Found product name:', productName);
    
    const scannedValueElement = document.getElementById('scannedValue');
    const productNameElement = document.getElementById('productName');
    
    if (scannedValueElement && productNameElement) {
        scannedValueElement.innerText = barcode;
        productNameElement.innerText = productName;
    } else {
        console.error('Could not find required elements in the DOM');
    }
}

// Function to initialize PDA scanner
function initScanner() {
    document.addEventListener('keydown', function(event) {
        // Check if it's a scanner button press
        if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
            event.preventDefault(); // Prevent default button behavior
            console.log('Scanner button pressed');
            
            // Clear previous scan results
            const barcodeInput = document.getElementById('barcodeInput');
            if (barcodeInput) {
                barcodeInput.value = '';
                barcodeInput.focus();
            }
            
            document.getElementById('scannedValue').innerText = '';
            document.getElementById('productName').innerText = '';
        } else if (event.key === 'Enter') {
            const barcodeInput = document.getElementById('barcodeInput');
            if (barcodeInput && barcodeInput.value) {
                processBarcode(barcodeInput.value);
            }
        }
    });
}

// Function to initialize the app
async function initApp() {
    await loadProductList();
    initScanner();
}

// Initialize the app when the page loads
window.addEventListener('load', initApp);
