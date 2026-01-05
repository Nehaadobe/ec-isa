/* global WebImporter */

/**
 * Parser for hero-aml block
 *
 * Source: https://nehaadobe.github.io/aml-home/index.html
 * Base Block: hero
 * Variant: aml
 *
 * Block Structure:
 * - Row 1: Block name header ("Hero (aml)")
 * - Row 2: Main slide image containing clinical data
 *
 * Source HTML Pattern:
 * <div class="ssweaverSlide active" id="AmlHomeSlide">
 *   <img src="./images/..." class="slide">
 * </div>
 *
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  // Extract the main slide image
  // VALIDATED: Found <img class="slide"> inside div.ssweaverSlide in captured DOM
  const slideImage = element.querySelector('img.slide') ||
                     element.querySelector('img');

  // Build cells array matching block structure
  // Hero (aml) expects: image row, then optional content rows
  const cells = [];

  // Row 1: Main slide image
  if (slideImage) {
    cells.push([slideImage]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero (aml)',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
