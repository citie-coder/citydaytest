/**
 * Simple client-side bot detection
 * Checks for common automation flags
 */
export const initAntiBot = () => {
    const checkBot = () => {
        const isWebDriver = navigator.webdriver;
        const isHeadless = navigator.userAgent.includes('Headless');
        const isSelenium = window.document.documentElement.getAttribute('selenium');

        if (isWebDriver || isHeadless || isSelenium) {
            console.warn('Automation detected. Access restricted.');
            // Optional: Redirect or block content
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#f0f2f5;color:#333;font-family:sans-serif;"><h1>Access Denied</h1></div>';
            return true;
        }
        return false;
    };

    // Check on load
    checkBot();

    // Periodic check (optional, low frequency)
    setInterval(checkBot, 5000);
};
