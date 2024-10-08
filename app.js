// Updated product list
const productList = {
  "NA1": { itemCode: "40101", name: "FISH CAKE (L)", packingSize: "20'S" },
  "NA2": { itemCode: "40102", name: "FISH CAKE (M)", packingSize: "20'S" },
  "NA3": { itemCode: "40104", name: "FISH CAKE (L) - IMPROVED", packingSize: "20'S" },
  "NA4": { itemCode: "40105", name: "GOLDBAR FRIED FISH CAKE", packingSize: "20'S" },
  "NA5": { itemCode: "40108", name: "SLICED FISH CAKE", packingSize: "1KG" },
  "NA6": { itemCode: "40110", name: "ROUND FISH CAKE", packingSize: "30'S" },
  "NA7": { itemCode: "40113", name: "ABALONE FISH CAKE", packingSize: "20'S" },
  "NA8": { itemCode: "40114", name: "WHITE FISH CAKE - ABALONE", packingSize: "30'S" },
  "NA9": { itemCode: "40115", name: "FRIED LARGE FISH CAKE", packingSize: "20'S" },
  "NA10": { itemCode: "40117", name: "FISH CAKE (L) - BLACK", packingSize: "20'S" },
  "NA11": { itemCode: "40120", name: "SAI DOU FISH CAKE (L)", packingSize: "10'S" },
  "NA12": { itemCode: "40121", name: "SAI DOU FISH CAKE (S)", packingSize: "10'S" },
  "NA13": { itemCode: "40123", name: "HANDMADE VEGETABLE FISHCAKE", packingSize: "10'S" },
  "NA14": { itemCode: "40129", name: "FRIED LARGE FISH CAKE", packingSize: "10'S" },
  "NA15": { itemCode: "40130", name: "FISH CAKE (S)", packingSize: "20'S" },
  "NA16": { itemCode: "40133", name: "SAI DOU FRIED FISH BALL", packingSize: "30'S" },
  "8887151402554": { itemCode: "40201", name: "COOKED FISH BALL (L)", packingSize: "1KG" },
  "NA17": { itemCode: "40305", name: "COOKED FISH BALL (L)", packingSize: "400G" },
  "NA18": { itemCode: "40311", name: "COOKED FISH BALL (M)", packingSize: "1KG" },
  "8887151403407": { itemCode: "40315", name: "COOKED FISH BALL (M)", packingSize: "400G" },
  "8887151403056": { itemCode: "40321", name: "COOKED FISH BALL (S)", packingSize: "1KG" },
  "NA19": { itemCode: "40332", name: "COOKED FISH BALL", packingSize: "200G" },
  "NA20": { itemCode: "40333", name: "FISH BALL", packingSize: "50'S" },
  "NA21": { itemCode: "40700", name: "FRIED FISH CAKE (M)", packingSize: "30'S" },
  "NA22": { itemCode: "40702", name: "GOLDBAR FRIED FISH CAKE", packingSize: "30'S" },
  "NA23": { itemCode: "40707", name: "FRIED FISH BALL", packingSize: "50'S" },
  "NA24": { itemCode: "40139", name: "FISH CAKE (M) - IMPROVED", packingSize: "20'S" },
  "NA25": { itemCode: "40366", name: "FISH BALL (TEOCHEW)", packingSize: "25'S" },
  "NA26": { itemCode: "40381", name: "FISH CAKE (L)", packingSize: "25'S" },
  "NA27": { itemCode: "40334", name: "FRIED FISH BALL", packingSize: "50'S" },
  "NA28": { itemCode: "40335", name: "PREMIUM FRIED FISH BALL 10M", packingSize: "10'S" },
  "8887151402035": { itemCode: "40361", name: "FRIED FISH BALL", packingSize: "1KG" },
  "8887151402554": { itemCode: "40401", name: "WHITE FISH CAKE", packingSize: "5'S" },
  "8887151402608": { itemCode: "40402", name: "FISH CAKE (L)", packingSize: "5'S" },
  "8887151402103": { itemCode: "40202", name: "ROUND FISH CAKE", packingSize: "5'S" },
  "8887151402059": { itemCode: "40204", name: "FRIED LARGE FISH CAKE", packingSize: "3'S" },
  "8887151402615": { itemCode: "40206", name: "SAI DOU FISH CAKE (S)", packingSize: "5'S" },
  "8887151402509": { itemCode: "40313", name: "COOKED FISH BALL (M)", packingSize: "20'S" },
  "8887151502605": { itemCode: "85004", name: "PC FRIED FISH CAKE (L)", packingSize: "3'S" },
  "8887151502636": { itemCode: "85005", name: "PC VEGETABLE FISH CAKE", packingSize: "3'S" },
  "8887151502650": { itemCode: "85007", name: "PC WHITE FISH CAKE", packingSize: "5'S" },
  "NA29": { itemCode: "45041", name: "FISH BALL", packingSize: "30'S" }
};

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const stockCheckBy = document.getElementById('stockCheckBy');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];

  // Populate the table with product data
  for (const [barcode, product] of Object.entries(productList)) {
    const row = productTable.insertRow();
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.packingSize}</td>
      <td><input type="number" min="0" data-barcode="${barcode}"></td>
    `;
  }

  function handleBarcodeScan(barcode) {
    console.log('Scanned barcode:', barcode);
    const product = productList[barcode];
    if (product) {
      console.log('Found product:', product);
      const quantityInput = document.querySelector(`input[data-barcode="${barcode}"]`);
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();
        console.log('Focused on quantity input');
        // Set a timeout to refocus on barcode input after a short delay
        setTimeout(() => {
          barcodeInput.focus();
          console.log('Refocused on barcode input');
        }, 100); // Adjust this delay as needed
      }
    } else {
      showToast('Product not found');
      // Immediately refocus on barcode input if product not found
      barcodeInput.focus();
      console.log('Refocused on barcode input');
    }
    barcodeInput.value = ''; // Clear the input for the next scan
  }

  // Listen for the 'input' event on the barcode input field
  barcodeInput.addEventListener('input', function() {
    const barcode = this.value.trim();
    if (barcode) {
      handleBarcodeScan(barcode);
    }
  });

  // Prevent the dropdown from interfering with scanning
  stockCheckBy.addEventListener('focus', function() {
    barcodeInput.blur(); // Remove focus from barcode input when dropdown is focused
  });

  stockCheckBy.addEventListener('blur', function() {
    // Small delay to allow for dropdown selection before refocusing
    setTimeout(() => barcodeInput.focus(), 100);
  });

  // Ensure barcode input is focused when the page loads
  barcodeInput.focus();

  // Add a global click event listener to refocus on barcode input
  document.addEventListener('click', function(event) {
    if (event.target !== stockCheckBy && event.target !== barcodeInput) {
      barcodeInput.focus();
    }
  });
}

function submitQuantities() {
  const quantities = [];
  const inputs = document.querySelectorAll('input[type="number"]');
  const currentDate = formatDate(new Date());
  const currentTime = formatTime(new Date());
  const stockCheckBy = document.getElementById('stockCheckBy').value;

  if (!stockCheckBy) {
    showToast('Please select who is performing the stock check');
    return;
  }

  inputs.forEach(input => {
    const barcode = input.getAttribute('data-barcode');
    const quantity = input.value.trim();
    if (quantity !== '') {
      const product = productList[barcode];
      quantities.push({
        Date: currentDate,
        Time: currentTime,
        ItemCode: product.itemCode,
        Product: product.name,
        PackingSize: product.packingSize,
        Quantity: parseInt(quantity, 10),
        StockCheckBy: stockCheckBy
      });
    }
  });

  if (quantities.length > 0) {
    showLoadingOverlay();
    sendToGoogleScript(quantities);
  } else {
    showToast('No quantities entered');
  }
}

function refreshApp() {
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput.value = '';
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.value = '';
  });
  document.getElementById('stockCheckBy').value = ''; // Reset the dropdown
  console.log('App refreshed');
  barcodeInput.focus(); // Refocus on the barcode input after refresh
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
}

function updateDateTimeDisplay() {
  const dateDisplay = document.getElementById('currentDate');
  const timeDisplay = document.getElementById('currentTime');
  const now = new Date();
  
  if (dateDisplay) {
    dateDisplay.textContent = formatDate(now);
  }
  
  if (timeDisplay) {
    timeDisplay.textContent = formatTime(now);
  }
}

function showLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = message;
  toast.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

function sendToGoogleScript(data) {
  const url = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
  
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    hideLoadingOverlay();
    showToast('Data submitted successfully!');
    refreshApp();
  })
  .catch(error => {
    console.error('Error:', error);
    hideLoadingOverlay();
    showToast('Error submitting data. Please try again.');
  });
}

// Update the date and time every second
setInterval(updateDateTimeDisplay, 1000);

window.addEventListener('load', () => {
  initScanner();
  updateDateTimeDisplay();
});
