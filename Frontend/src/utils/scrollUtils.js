// Utility functions for smooth scrolling

/**
 * Scrolls smoothly to an element by its ID with an optional offset
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - The offset from the top (default: 80px for navbar)
 * @param {number} duration - Duration of scroll in milliseconds (default: 800ms)
 */
export const scrollToElement = (elementId, offset = 80, duration = 800) => {
    const element = document.getElementById(elementId);

    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        smoothScrollTo(offsetPosition, duration);
    }
};

/**
 * Scrolls to the top of the page smoothly
 * @param {number} duration - Duration of scroll in milliseconds (default: 800ms)
 */
export const scrollToTop = (duration = 800) => {
    smoothScrollTo(0, duration);
};

/**
 * Scrolls to the home section
 * @param {number} duration - Duration of scroll in milliseconds (default: 800ms)
 */
export const scrollToHome = (duration = 800) => {
    // Try to scroll to home section first, fallback to top
    const homeElement = document.getElementById('home');
    if (homeElement) {
        scrollToElement('home', 0, duration);
    } else {
        scrollToTop(duration);
    }
};

/**
 * Scrolls to a category section by category name
 * @param {string} categoryName - The name of the category to scroll to
 * @param {number} offset - The offset from the top (default: 80px for navbar)
 * @param {number} duration - Duration of scroll in milliseconds (default: 800ms)
 */
export const scrollToCategory = (categoryName, offset = 80, duration = 800) => {
    const categoryId = `category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
    scrollToElement(categoryId, offset, duration);
};

/**
 * Custom smooth scroll function with easing
 * @param {number} targetPosition - The target scroll position
 * @param {number} duration - Duration of scroll in milliseconds
 */
const smoothScrollTo = (targetPosition, duration = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };

    requestAnimationFrame(animateScroll);
};

/**
 * Gets the category ID from category name
 * @param {string} categoryName - The name of the category
 * @returns {string} The formatted category ID
 */
export const getCategoryId = (categoryName) => {
    return `category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
};
