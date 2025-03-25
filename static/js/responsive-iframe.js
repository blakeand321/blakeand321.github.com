/**
 * Responsive iFrame Handler
 * This script makes sure the iframe adapts to different screen sizes
 * and handles various user interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const iframe = document.getElementById('responsive-iframe');
    const iframeContainer = document.querySelector('.iframe-container');
    const urlInput = document.getElementById('iframe-url');
    const loadButton = document.getElementById('load-url');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Initialize with responsive behavior
    setupResponsiveIframe();
    
    // Function to set up responsive iframe behavior
    function setupResponsiveIframe() {
        // Initial resize
        resizeIframe();
        
        // Resize on window resize
        window.addEventListener('resize', resizeIframe);
        
        // Resize on orientation change (especially for mobile devices)
        window.addEventListener('orientationchange', resizeIframe);
    }
    
    // Function to resize the iframe
    function resizeIframe() {
        // If we're in a custom size mode, don't auto-resize
        if (iframeContainer.classList.contains('custom-size')) {
            return;
        }
        
        // Calculate available space
        const viewportHeight = window.innerHeight;
        const containerTop = iframeContainer.getBoundingClientRect().top;
        const maxHeight = viewportHeight - containerTop - 20; // 20px bottom margin
        
        // Set container height to maintain aspect ratio while fitting screen
        iframeContainer.style.paddingBottom = `min(56.25%, ${maxHeight}px)`;
        
        // Log resize for debugging
        console.log(`Iframe resized. Width: ${iframe.offsetWidth}px, Height: ${iframe.offsetHeight}px`);
    }
    
    // Handle URL change
    loadButton.addEventListener('click', function() {
        const newUrl = urlInput.value.trim();
        if (newUrl) {
            // Simple validation
            if (newUrl.startsWith('http://') || newUrl.startsWith('https://')) {
                iframe.src = newUrl;
            } else {
                iframe.src = 'https://' + newUrl;
                urlInput.value = 'https://' + newUrl;
            }
        }
    });
    
    // Allow pressing Enter in the URL input
    urlInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            loadButton.click();
        }
    });
    
    // Set up preset buttons
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const width = this.getAttribute('data-width');
            const height = this.getAttribute('data-height');
            
            // If full size (responsive)
            if (width === '100%' && height === '100%') {
                iframeContainer.classList.remove('custom-size');
                iframeContainer.style.width = '100%';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                resizeIframe();
            } 
            // Custom size
            else {
                iframeContainer.classList.add('custom-size');
                iframeContainer.style.width = width;
                iframeContainer.style.height = height;
                iframe.style.width = width;
                iframe.style.height = height;
            }
            
            // Reset all buttons to secondary style
            presetButtons.forEach(btn => btn.classList.remove('btn-primary'));
            presetButtons.forEach(btn => btn.classList.add('btn-secondary'));
            
            // Set this button to primary style
            this.classList.remove('btn-secondary');
            this.classList.add('btn-primary');
        });
    });
    
    // Initially select the "Full" preset
    presetButtons[0].classList.remove('btn-secondary');
    presetButtons[0].classList.add('btn-primary');
    
    // Handle errors in iframe loading
    iframe.addEventListener('error', function() {
        console.error('Error loading iframe content');
        // Could add a visual error indicator here
    });
    
    // Log when iframe is loaded successfully
    iframe.addEventListener('load', function() {
        console.log('Iframe content loaded successfully');
    });
});
