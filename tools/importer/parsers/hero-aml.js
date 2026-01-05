/* global WebImporter */

/**
 * Parser for hero-aml block
 * 
 * Source: https://nehaadobe.github.io/aml-home/index.html
 * Base Block: hero
 * 
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Content (heading, statistics, description)
 * 
 * Source HTML Pattern:
 * <div class="ssweaverSlide active" id="AmlHomeSlide">
 *   <img src="./images/aml-home.png" class="slide">
 * </div>
 * 
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  // Extract background image from slide
  // VALIDATED: Found img.slide in captured DOM
  const bgImage = element.querySelector('img.slide') ||
                  element.querySelector('img') ||
                  element.querySelector('picture img');
  
  // Build cells array matching hero block structure
  const cells = [];
  
  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage.cloneNode(true)]);
  }
  
  // Row 2: Content (extracted from image - in this case the content is baked into the image)
  // For pharmaceutical pages, the hero content is typically a composite image
  // Additional text content would be extracted here if present in DOM
  const heading = element.querySelector('h1, h2, .hero-title');
  const description = element.querySelector('p, .hero-description');
  
  if (heading || description) {
    const contentCell = [];
    if (heading) contentCell.push(heading.cloneNode(true));
    if (description) contentCell.push(description.cloneNode(true));
    cells.push(contentCell);
  }
  
  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero (aml)', cells });
  
  // Replace original element with structured block table
  element.replaceWith(block);
}
