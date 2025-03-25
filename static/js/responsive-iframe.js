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
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
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
    
    // Handle fullscreen button
    fullscreenBtn.addEventListener('click', function() {
        toggleFullscreen();
    });
    
    // Function to toggle fullscreen mode
    function toggleFullscreen() {
        // Toggle fullscreen class on the container
        iframeContainer.classList.toggle('fullscreen');
        
        // Update the fullscreen button icon
        if (iframeContainer.classList.contains('fullscreen')) {
            // Change to exit fullscreen icon
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                </svg>
            `;
            
            // Disable scrolling on the body when in fullscreen
            document.body.style.overflow = 'hidden';
        } else {
            // Change back to fullscreen icon
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            `;
            
            // Re-enable scrolling on the body
            document.body.style.overflow = '';
        }
        
        // Log the fullscreen state
        console.log(`Fullscreen mode: ${iframeContainer.classList.contains('fullscreen')}`);
    }
    
    // Add escape key listener to exit fullscreen mode
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && iframeContainer.classList.contains('fullscreen')) {
            toggleFullscreen();
        }
    });
});
