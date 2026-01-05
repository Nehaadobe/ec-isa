/* global WebImporter */

/**
 * Transformer for nehaadobe.github.io site cleanup
 * Purpose: Remove interactive elements, modals, navigation, and non-content elements
 * Applies to: nehaadobe.github.io (all templates)
 * Generated: 2026-01-05
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (migration-work/cleaned.html)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove utility headers and navigation
    // EXTRACTED: Found <header id="UtilityHeader"> and <header id="AmlHeader"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#UtilityHeader',
      '#AmlHeader',
      '#AMLHeaderGotoCllHome'
    ]);

    // Remove modal elements
    // EXTRACTED: Found <div class="ssweaverModal"> elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.ssweaverModal',
      '#SSWeaverModalBackdrop'
    ]);

    // Remove ISI drawer
    // EXTRACTED: Found <div class="ssweaverDrawer"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.ssweaverDrawer',
      '#AmlIndicationAndIsiDrawer'
    ]);

    // Remove standalone navigation elements
    // EXTRACTED: Found <nav> elements with prev/next buttons in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'nav'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up empty buttons
    // EXTRACTED: Found many empty <button> elements in captured DOM
    const emptyButtons = element.querySelectorAll('button:empty');
    emptyButtons.forEach(btn => btn.remove());

    // Remove swiper-related elements
    // EXTRACTED: Found swiper notification spans in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.swiper-notification',
      '.swiper-scrollbar'
    ]);
  }
}
