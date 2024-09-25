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
  "8887151110107": "FRESH FISH BALL",
  "8887151705044": "FLAT NGOH HIANG"
};

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const scannedValue = document.getElementById('scannedValue');
  const productName = document.getElementById('productName');
  let scanTimeout;

  function updateProduct() {
    const barcode = barcodeInput.value;
    scannedValue.textContent = barcode;
    const product = productList[barcode];
    if (product) {
      productName.textContent = product;
      // Clear the input after a short delay
      setTimeout(() => {
        barcodeInput.value = '';
        barcodeInput.focus();
      }, 100);
    } else {
      productName.textContent = 'Product not found';
    }
  }

  barcodeInput.addEventListener('input', function() {
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(updateProduct, 100); // Delay of 100ms
  });

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      console.log('Scanner button pressed');
      barcodeInput.focus();
    }
  });
}

function submitBarcode() {
  console.log('Submitting barcode:', document.getElementById('scannedValue').textContent);
  alert('Barcode submitted to Google Sheet');
}

function refreshApp() {
  document.getElementById('barcodeInput').value = '';
  document.getElementById('scannedValue').textContent = '';
  document.getElementById('productName').textContent = '';
  console.log('App refreshed');
}

window.addEventListener('load', initScanner);
