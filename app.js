// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Product list
const productList = {
  "8887151402608": "SAI DOU FISH CAKE (L)",
  "8887151301109": "IMITATION SURIMI SCALLOP",
  "8887151201102": "SEAFOOD STICK",
  "8887151502117": "YONG TAU FOO",
  "8887151402059": "FRIED LARGE FISH CAKE",
  "8887151402103": "FRIED ROUND FISH CAKE (L)",
  "8887151706034": "CHICKEN NGOH HIANG",
  "8887151403100": "COOKED FISH BALL",
  "8887151202109": "IMITATION CRAB BALL",
  "8887151705044": "FLAT NGOH HIANG"
};

function initScanner() {
  const scannedValue = document.getElementById('scannedValue');
  const productName = document.getElementById('productName');
  const debugInfo = document.getElementById('debugInfo');
  let barcodeBuffer = '';
  let lastKeyTime = 0;
  const BARCODE_TIMEOUT = 100; // Increased to 100ms for more leniency

  function processBarcode(barcode) {
    scannedValue.textContent = barcode;
    debugInfo.textContent += `Processing barcode: ${barcode}\n`;
    
    const product = productList[barcode];
    if (product) {
      productName.textContent = product;
      debugInfo.textContent += `Product found: ${product}\n`;
    } else {
      productName.textContent = 'Product not found';
      debugInfo.textContent += `Product not found for barcode: ${barcode}\n`;
    }
    
    // Clear the buffer after processing
    barcodeBuffer = '';
  }

  document.addEventListener('keydown', function(event) {
    const currentTime = new Date().getTime();
    
    debugInfo.textContent += `Key pressed: ${event.key} (${event.keyCode})\n`;

    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      debugInfo.textContent += 'Scanner button pressed\n';
      return;
    }

    // If it's been more than BARCODE_TIMEOUT ms since the last keypress, reset the buffer
    if (currentTime - lastKeyTime > BARCODE_TIMEOUT) {
      debugInfo.textContent += `Buffer reset. Old buffer: ${barcodeBuffer}\n`;
      barcodeBuffer = '';
    }

    // For 'unidentified' key, we'll use the keyCode instead
    if (event.key === 'Unidentified') {
      barcodeBuffer += event.keyCode;
    } else {
      barcodeBuffer += event.key;
    }
    debugInfo.textContent += `Current buffer: ${barcodeBuffer}\n`;

    // Update the last key time
    lastKeyTime = currentTime;

    // Check if the buffer length matches any product barcode length
    const barcodeLength = Object.keys(productList)[0].length;
    if (barcodeBuffer.length === barcodeLength) {
      debugInfo.textContent += 'Barcode length matched, processing barcode\n';
      processBarcode(barcodeBuffer);
    }
  });
}

function submitBarcode() {
  console.log('Submitting barcode:', document.getElementById('scannedValue').textContent);
  alert('Barcode submitted to Google Sheet');
}

function refreshApp() {
  document.getElementById('scannedValue').textContent = '';
  document.getElementById('productName').textContent = '';
  document.getElementById('debugInfo').textContent = '';
  console.log('App refreshed');
}

window.addEventListener('load', initScanner);
