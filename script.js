document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const resultSpan = document.getElementById('barcodeResult');

    if ('BarcodeDetector' in window) {
        const barcodeDetector = new BarcodeDetector();

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                    scanBarcodes();
                };
            })
            .catch(err => {
                console.error("Error accessing the camera:", err);
            });

        function scanBarcodes() {
            barcodeDetector.detect(video)
                .then(barcodes => {
                    if (barcodes.length > 0) {
                        resultSpan.textContent = barcodes[0].rawValue;
                    } else {
                        resultSpan.textContent = "None";
                    }
                    requestAnimationFrame(scanBarcodes);
                })
                .catch(err => {
                    console.error("Barcode detection error:", err);
                    requestAnimationFrame(scanBarcodes);
                });
        }
    } else {
        console.error('Barcode Detection API is not supported by this browser');
        resultSpan.textContent = "Barcode Detection not supported";
    }
});