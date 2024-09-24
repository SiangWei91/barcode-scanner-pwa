const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';

async function submitDataToGoogleSheet(barcodeData) {
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                barcode: barcodeData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Data submitted successfully');
        alert('Barcode submitted successfully!');
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting barcode. Please try again.');
    }
}

function focusInput() {
    document.getElementById('barcodeInput').focus();
}

function processBarcode() {
    const barcode = document.getElementById('barcodeInput').value;
    document.getElementById('scannedValue').innerText = barcode;
}

function submitBarcode() {
    const barcode = document.getElementById('scannedValue').innerText;
    if (barcode) {
        submitDataToGoogleSheet(barcode);
    } else {
        alert('Please scan a barcode first.');
    }
}
