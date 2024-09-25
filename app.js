// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Updated product list
const productList = {
  "8887151402608": { itemCode: "20500", name: "SAI DOU FISH CAKE (L)", packingSize: "10pcs" },
  "8887151301109": { itemCode: "20400", name: "IMITATION SURIMI SCALLOP", packingSize: "20pcs" },
  "8887151201102": { itemCode: "20300", name: "SEAFOOD STICK", packingSize: "30pcs" },
  "8887151502117": { itemCode: "20100", name: "YONG TAU FOO", packingSize: "40pcs" },
  "8887151402059": { itemCode: "10500", name: "FRIED LARGE FISH CAKE", packingSize: "20pcs" },
  "8887151402103": { itemCode: "10300", name: "FRIED ROUND FISH CAKE (L)", packingSize: "40pcs" },
  "8887151706034": { itemCode: "10200", name: "CHICKEN NGOH HIANG", packingSize: "10pcs" },
  "8887151403100": { itemCode: "90000", name: "COOKED FISH BALL", packingSize: "50pcs" },
  "8887151202109": { itemCode: "90010", name: "IMITATION CRAB BALL", packingSize: "20pcs" },
  "8887151110107": { itemCode: "90020", name: "FRESH FISH BALL", packingSize: "40pkt x 500g" },
  "8887151705044": { itemCode: "90030", name: "FLAT NGOH HIANG", packingSize: "1kg x 10pkt" }
};

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  let scanTimeout;
  let isScanning = true;

  // Populate the table with product data
  for (const [barcode, product] of Object.entries(productList)) {
    const row = productTable.insertRow();
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.packingSize}</td>
      <td><input type="number" min="0" data-barcode="${barcode}"></td>
    `;
  }

  function updateProduct() {
    const barcode = barcodeInput.value;
    const product = productList[barcode];
    if (product) {
      const quantityInput = document.querySelector(`input[data-barcode="${barcode}"]`);
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();
        isScanning = false;
      }
      // Clear the input after a short delay
      setTimeout(() => {
        barcodeInput.value = '';
      }, 100);
    } else {
      alert('Product not found');
      barcodeInput.value = '';
      focusOnBarcodeInput();
    }
  }

  function focusOnBarcodeInput() {
    isScanning = true;
    barcodeInput.focus();
  }

  barcodeInput.addEventListener('input', function() {
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(updateProduct, 100); // Delay of 100ms
  });

  // Improved scanner button handling
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      console.log('Scanner button pressed');
      focusOnBarcodeInput();
    }
  });

  // Handle focus events
  document.addEventListener('focus', function(event) {
    if (event.target.type === 'number') {
      isScanning = false;
    } else if (event.target === barcodeInput) {
      isScanning = true;
    }
  }, true);

  // Handle click events
  document.addEventListener('click', function(event) {
    if (event.target === barcodeInput) {
      focusOnBarcodeInput();
    } else if (event.target.type === 'number') {
      isScanning = false;
    }
  }, true);

  // Continuously check and set focus to barcode input when in scanning mode
  setInterval(() => {
    if (isScanning && document.activeElement !== barcodeInput) {
      barcodeInput.focus();
    }
  }, 100);

  // Initially focus on barcode input
  focusOnBarcodeInput();
}

function submitQuantities() {
  const quantities = {};
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    const barcode = input.getAttribute('data-barcode');
    const quantity = input.value.trim();
    if (quantity !== '') {
      quantities[barcode] = parseInt(quantity, 10);
    }
  });
  console.log('Submitting quantities:', quantities);
  alert('Quantities submitted');
}

function refreshApp() {
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput.value = '';
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.value = '';
  });
  console.log('App refreshed');
  focusOnBarcodeInput();
}

window.addEventListener('load', initScanner);
