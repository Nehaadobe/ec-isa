/* global WebImporter */

/**
 * Parser for tabs-study block
 * 
 * Source: https://nehaadobe.github.io/aml-home/index.html
 * Base Block: tabs
 * 
 * Block Structure (tabs format):
 * - Each row: [Tab Label] | [Tab Content]
 * 
 * Source HTML Pattern:
 * <div class="ssweaverModal" id="AmlHomeSlideStudyDesignModal">
 *   <div class="modalFlexRelativeContainer">
 *     <div class="modalFlexRelativeContent">
 *       <img src="study-modal.png">
 *       <div class="ssweaverScroller">
 *         <img src="study-scroll.png">
 *       </div>
 *       <nav> (Study Design / Baseline tabs) </nav>
 *     </div>
 *   </div>
 * </div>
 * 
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  // Extract study design images and content
  // VALIDATED: Found img elements in modal content in captured DOM
  const modalContent = element.querySelector('.modalFlexRelativeContent') || element;
  
  // Get the study design header image
  const studyHeaderImg = modalContent.querySelector(':scope > img') ||
                          modalContent.querySelector('img:first-of-type');
  
  // Get the scrollable study content
  const scrollerContent = modalContent.querySelector('.ssweaverScroller img') ||
                          modalContent.querySelector('#aml-home-study-study-scroll');
  
  // Get baseline characteristics modal content (if available from sibling modal)
  // VALIDATED: Found #AmlHomeSlideBaselineCharacteristicsModal in captured DOM
  const baselineModal = document.querySelector('#AmlHomeSlideBaselineCharacteristicsModal');
  const baselineImg = baselineModal ? baselineModal.querySelector('img') : null;
  
  // Build cells array matching tabs block structure
  // Format: [Tab Label, Tab Content]
  const cells = [];
  
  // Tab 1: Study Design
  const studyContent = document.createElement('div');
  if (studyHeaderImg) {
    studyContent.appendChild(studyHeaderImg.cloneNode(true));
  }
  if (scrollerContent) {
    studyContent.appendChild(scrollerContent.cloneNode(true));
  }
  cells.push(['Study Design', studyContent]);
  
  // Tab 2: Baseline Characteristics
  if (baselineImg) {
    cells.push(['Baseline Characteristics', baselineImg.cloneNode(true)]);
  }
  
  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Study', cells });
  
  // Replace original element with structured block table
  element.replaceWith(block);
}
