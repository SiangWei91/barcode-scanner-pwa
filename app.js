// Google Sheets script URL
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';

// Product list storage
let productList = {};

// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Function to submit data to Google Sheet
async function submitDataToGoogleSheet(barcodeData, productName) {
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                barcode: barcodeData,
                productName: productName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Data submitted successfully');
        alert('Barcode and product name submitted successfully!');
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data. Please try again.');
    }
}

// Function to process scanned barcode
function processBarcode(barcode) {
    console.log('Processing barcode:', barcode);
    const productName = productList[barcode] || 'Product not found';
    console.log('Found product name:', productName);
    
    const scannedValueElement = document.getElementById('scannedValue');
    const productNameElement = document.getElementById('productName');
    const barcodeInputElement = document.getElementById('barcodeInput');
    
    if (scannedValueElement && productNameElement && barcodeInputElement) {
        scannedValueElement.innerText = barcode;
        productNameElement.innerText = productName;
        barcodeInputElement.value = barcode;
        console.log('Updated DOM elements:', {
            scannedValue: scannedValueElement.innerText,
            productName: productNameElement.innerText,
            barcodeInput: barcodeInputElement.value
        });
    } else {
        console.error('Could not find required elements in the DOM');
    }
}

// Function to submit barcode data
function submitBarcode() {
    const barcode = document.getElementById('scannedValue').innerText;
    const productName = document.getElementById('productName').innerText;
    if (barcode) {
        submitDataToGoogleSheet(barcode, productName);
    } else {
        alert('Please scan a barcode first.');
    }
}

// Function to load product list
async function loadProductList() {
    try {
        const response = await fetch('/barcode-scanner-pwa/productList.json', {
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem('productList', JSON.stringify(data));
        productList = data;
        console.log('Loaded and stored new product list:', productList);
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
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
            document.getElementById('scannedValue').innerText = '';
            document.getElementById('productName').innerText = '';
            document.getElementById('barcodeInput').value = '';
            
            // Focus on the input field when the scan button is pressed
            const input = document.getElementById('barcodeInput');
            if (input) {
                input.focus();
            }
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
    console.log('Product list after initialization:', productList);
    initScanner(); // Initialize the PDA scanner functionality
}

// Call initApp when the page loads
window.addEventListener('load', initApp);
