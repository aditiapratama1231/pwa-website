
$(document).ready(function() {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('/service-worker.js');
        } catch {
            throw Error;
        }
    }
});