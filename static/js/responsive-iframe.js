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
    const quickLinkButtons = document.querySelectorAll('.quick-link-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const htmlElement = document.documentElement;
    const addBookmarkBtn = document.getElementById('add-bookmark-btn');
    const bookmarksContainer = document.getElementById('bookmarks-container');
    const noBookmarksMessage = document.getElementById('no-bookmarks-message');
    
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
    
    // Set up quick link buttons
    quickLinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                iframe.src = url;
                urlInput.value = url;
                
                // Visual feedback - highlight the clicked button
                quickLinkButtons.forEach(btn => {
                    btn.classList.remove('btn-info');
                    btn.classList.add('btn-outline-info');
                });
                this.classList.remove('btn-outline-info');
                this.classList.add('btn-info');
                
                console.log(`Quick link clicked: ${url}`);
            }
        });
    });
    
    // Initially highlight the first quick link if it matches the current iframe URL
    const initialUrl = iframe.src;
    const matchingQuickLink = Array.from(quickLinkButtons).find(btn => 
        btn.getAttribute('data-url') === initialUrl
    );
    
    if (matchingQuickLink) {
        matchingQuickLink.classList.remove('btn-outline-info');
        matchingQuickLink.classList.add('btn-info');
    }
    
    // Theme Switcher functionality
    
    // Function to get preferred color scheme from system
    function getPreferredColorScheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Function to set theme
    function setTheme(theme) {
        // Save theme preference to localStorage
        if (theme === 'auto') {
            localStorage.removeItem('preferred-theme');
            theme = getPreferredColorScheme(); 
        } else {
            localStorage.setItem('preferred-theme', theme);
        }
        
        // Apply theme to the HTML element
        htmlElement.setAttribute('data-bs-theme', theme);
        
        // Update bootstrap CSS link if needed
        const bootstrapCss = document.getElementById('bootstrap-css');
        const currentTheme = bootstrapCss.href.includes('dark') ? 'dark' : 'light';
        
        if ((theme === 'dark' && currentTheme !== 'dark') || 
            (theme === 'light' && currentTheme !== 'light')) {
            // Switch CSS file based on theme
            if (theme === 'dark') {
                bootstrapCss.href = 'https://cdn.replit.com/agent/bootstrap-agent-dark-theme.min.css';
            } else {
                bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
        }
        
        // Update button active states
        themeButtons.forEach(btn => {
            btn.classList.remove('active', 'btn-primary');
            btn.classList.add('btn-outline-primary');
            if (btn.getAttribute('data-theme') === (theme === getPreferredColorScheme() ? 'auto' : theme)) {
                btn.classList.add('active', 'btn-primary');
                btn.classList.remove('btn-outline-primary');
            }
        });
        
        console.log(`Theme set to: ${theme}`);
    }
    
    // Set up theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
        });
    });
    
    // Initialize theme from saved preference or system preference
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // No saved preference, use auto (system preference)
        setTheme('auto');
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Only respond to system changes if we're in auto mode
            if (!localStorage.getItem('preferred-theme')) {
                setTheme(event.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Bookmarks Functionality
    
    // Function to load bookmarks from localStorage
    function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('iframe-bookmarks') || '[]');
        renderBookmarks(bookmarks);
    }
    
    // Function to save bookmarks to localStorage
    function saveBookmarks(bookmarks) {
        localStorage.setItem('iframe-bookmarks', JSON.stringify(bookmarks));
        renderBookmarks(bookmarks);
    }
    
    // Function to render bookmarks in the container
    function renderBookmarks(bookmarks) {
        // Clear existing bookmarks
        while (bookmarksContainer.firstChild) {
            if (bookmarksContainer.firstChild === noBookmarksMessage) {
                break;
            }
            bookmarksContainer.removeChild(bookmarksContainer.firstChild);
        }
        
        // Show or hide the "no bookmarks" message
        if (bookmarks.length === 0) {
            noBookmarksMessage.style.display = 'block';
        } else {
            noBookmarksMessage.style.display = 'none';
            
            // Create a container for the bookmarks
            const bookmarksList = document.createElement('div');
            bookmarksList.className = 'bookmark-list';
            
            // Add each bookmark
            bookmarks.forEach((bookmark, index) => {
                const bookmarkEl = createBookmarkElement(bookmark, index);
                bookmarksList.appendChild(bookmarkEl);
            });
            
            // Insert all bookmarks at once for better performance
            bookmarksContainer.insertBefore(bookmarksList, noBookmarksMessage);
        }
    }
    
    // Function to create a bookmark element
    function createBookmarkElement(bookmark, index) {
        const bookmarkEl = document.createElement('div');
        bookmarkEl.className = 'bookmark-item d-flex align-items-center p-2 mb-2 border rounded';
        
        // Create favicon if possible
        let faviconHtml = '';
        try {
            const url = new URL(bookmark.url);
            faviconHtml = `
                <img src="${url.origin}/favicon.ico" class="bookmark-favicon me-2" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktYm9va21hcmsiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTIgMmEyIDIgMCAwIDEgMi0yaDhhMiAyIDAgMCAxIDIgMnYxMy41YS41LjUgMCAwIDEtLjc3Ny40MTZMOCAxMy4xMDFsLTUuMjIzIDIuODE1QS41LjUgMCAwIDEgMiAxNS41VjJ6bTItMWExIDEgMCAwIDAtMSAxdjEyLjU2Nmw0LjcyMy0yLjQ4MmEuNS41IDAgMCAxIC41NTQgMEwxMyAxNC41NjZWMmExIDEgMCAwIDAtMS0xSDR6Ii8+PC9zdmc+'" 
                     width="16" height="16" alt="favicon">
            `;
        } catch (e) {
            faviconHtml = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark me-2" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg>
            `;
        }
        
        // Create the bookmark content
        bookmarkEl.innerHTML = `
            <div class="flex-shrink-0">
                ${faviconHtml}
            </div>
            <div class="bookmark-title flex-grow-1 text-truncate" title="${bookmark.title}">
                ${bookmark.title}
            </div>
            <div class="bookmark-actions ms-2">
                <button class="btn btn-sm btn-outline-primary load-bookmark-btn me-1" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-bookmark-btn" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Add event listeners
        const loadBtn = bookmarkEl.querySelector('.load-bookmark-btn');
        const deleteBtn = bookmarkEl.querySelector('.delete-bookmark-btn');
        
        loadBtn.addEventListener('click', () => {
            loadBookmark(index);
        });
        
        deleteBtn.addEventListener('click', () => {
            deleteBookmark(index);
        });
        
        // Make the title also clickable
        const titleEl = bookmarkEl.querySelector('.bookmark-title');
        titleEl.addEventListener('click', () => {
            loadBookmark(index);
        });
        titleEl.style.cursor = 'pointer';
        
        return bookmarkEl;
    }
    
    // Function to add a new bookmark
    function addBookmark() {
        // Get the current iframe URL and title
        const url = iframe.src;
        
        // Get title from the iframe URL
        let title = '';
        try {
            const urlObj = new URL(url);
            title = urlObj.hostname.replace('www.', '');
        } catch (e) {
            title = url;
        }
        
        // Create the bookmark object
        const bookmark = {
            url: url,
            title: title,
            added: new Date().toISOString()
        };
        
        // Get existing bookmarks
        const bookmarks = JSON.parse(localStorage.getItem('iframe-bookmarks') || '[]');
        
        // Check if this URL is already bookmarked
        const existingIndex = bookmarks.findIndex(b => b.url === url);
        
        if (existingIndex === -1) {
            // Add to the beginning of the array
            bookmarks.unshift(bookmark);
            saveBookmarks(bookmarks);
            
            // Show success notification
            showNotification('Bookmark added successfully', 'success');
        } else {
            showNotification('This page is already bookmarked', 'warning');
        }
    }
    
    // Function to load a bookmark
    function loadBookmark(index) {
        const bookmarks = JSON.parse(localStorage.getItem('iframe-bookmarks') || '[]');
        if (bookmarks[index]) {
            iframe.src = bookmarks[index].url;
            urlInput.value = bookmarks[index].url;
        }
    }
    
    // Function to delete a bookmark
    function deleteBookmark(index) {
        const bookmarks = JSON.parse(localStorage.getItem('iframe-bookmarks') || '[]');
        if (bookmarks[index]) {
            const deleted = bookmarks.splice(index, 1);
            saveBookmarks(bookmarks);
            showNotification(`Removed bookmark: ${deleted[0].title}`, 'danger');
        }
    }
    
    // Function to show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.maxWidth = '300px';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-in-out';
        
        // Add to the document
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add event listener to the Add Bookmark button
    addBookmarkBtn.addEventListener('click', addBookmark);
    
    // Load bookmarks on page load
    loadBookmarks();
    
    // Add event delegation for bookmark actions
    bookmarksContainer.addEventListener('click', function(e) {
        // Find closest button if a child element was clicked
        const loadBtn = e.target.closest('.load-bookmark-btn');
        const deleteBtn = e.target.closest('.delete-bookmark-btn');
        
        if (loadBtn) {
            const index = parseInt(loadBtn.getAttribute('data-index'), 10);
            loadBookmark(index);
        } else if (deleteBtn) {
            const index = parseInt(deleteBtn.getAttribute('data-index'), 10);
            deleteBookmark(index);
        }
    });
});
