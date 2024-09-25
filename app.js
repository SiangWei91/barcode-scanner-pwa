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
  let barcodeBuffer = '';
  let lastKeyTime = 0;
  const BARCODE_TIMEOUT = 20; // ms

  function processBarcode(barcode) {
    scannedValue.textContent = barcode;
    const product = productList[barcode];
    if (product) {
      productName.textContent = product;
    } else {
      productName.textContent = 'Product not found';
    }
    // Clear the buffer after processing
    barcodeBuffer = '';
  }

  document.addEventListener('keydown', function(event) {
    const currentTime = new Date().getTime();
    
    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      console.log('Scanner button pressed');
      return;
    }

    // If it's been more than BARCODE_TIMEOUT ms since the last keypress, reset the buffer
    if (currentTime - lastKeyTime > BARCODE_TIMEOUT) {
      barcodeBuffer = '';
    }

    // Add the new character to the buffer
    barcodeBuffer += event.key;

    // Update the last key time
    lastKeyTime = currentTime;

    // If the enter key is pressed, process the barcode
    if (event.keyCode === 13) {
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
  console.log('App refreshed');
}

window.addEventListener('load', initScanner);
