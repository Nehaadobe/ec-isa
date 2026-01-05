/* global WebImporter */

/**
 * Transformer for Venclexta website cleanup
 * Purpose: Remove interactive elements and modals not needed for static content
 * Applies to: nehaadobe.github.io (VENCLEXTA pages)
 * Generated: 2026-01-05
 * 
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - Page structure analysis from page migration workflow
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove utility headers and navigation (handled separately)
    // EXTRACTED: Found in captured DOM <header id="UtilityHeader">
    WebImporter.DOMUtils.remove(element, [
      '#UtilityHeader',
      '#AmlHeader',
      '#AMLHeaderGotoCllHome'
    ]);
    
    // Remove modal backdrops
    // EXTRACTED: Found in captured DOM <div id="SSWeaverModalBackdrop">
    WebImporter.DOMUtils.remove(element, [
      '#SSWeaverModalBackdrop',
      '.ssweaverModal:not(.active)',
      '.ssweaverDrawer'
    ]);
    
    // Remove navigation buttons (prev/next)
    // EXTRACTED: Found <nav> elements with prev/next buttons
    const navElements = element.querySelectorAll('nav');
    navElements.forEach(nav => {
      const buttons = nav.querySelectorAll('button');
      if (buttons.length <= 2) {
        nav.remove();
      }
    });
    
    // Remove swiper/scroller elements
    // EXTRACTED: Found .ssweaverScroller and .swiper-* elements
    WebImporter.DOMUtils.remove(element, [
      '.swiper-scrollbar',
      '.swiper-notification'
    ]);
  }
  
  if (hookName === TransformHook.afterTransform) {
    // Clean up remaining interactive elements
    WebImporter.DOMUtils.remove(element, [
      'script',
      'link',
      'noscript',
      'iframe'
    ]);
    
    // Remove data attributes used for interactivity
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-swiper-slide-index');
    });
  }
}
