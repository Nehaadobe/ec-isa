/**
 * Hero block decoration for AML variants
 * Automatically adds CSS classes to content elements
 */

function decorateAmlNav(block) {
  const content = block.querySelector('p');
  if (!content) return;

  const text = content.textContent.trim();

  // Known nav items to parse
  const navItems = ['Efficacy', 'Safety', 'Patient Profiles'];
  let html = '<span class="nav-home">\u2302</span>';

  navItems.forEach((item, index) => {
    if (text.includes(item)) {
      const isActive = index === 0; // Efficacy is active by default
      html += `<span class="nav-btn${isActive ? ' active' : ''}">${item}</span>`;
    }
  });

  content.innerHTML = html;
}

function decorateAmlHero(block) {
  const rows = block.querySelectorAll(':scope > div');

  rows.forEach((row, index) => {
    const content = row.querySelector('div');
    if (!content) return;

    // Row 2: Headlines (index 1)
    if (index === 1) {
      const text = content.textContent.trim();

      let html = '';

      // Look for VENCLEXTA + AZACITIDINE ... WAS PROVEN TO HELP
      if (text.includes('VENCLEXTA')) {
        html += '<span class="headline-teal">VENCLEXTA + AZACITIDINE <span class="headline-gray-inline">WAS PROVEN TO HELP</span></span>';
      }

      // Look for NEWLY DIAGNOSED AML PATIENTS
      if (text.includes('NEWLY DIAGNOSED')) {
        html += '<span class="headline-dark">NEWLY DIAGNOSED AML PATIENTS</span>';
      }

      // Look for LIVE LONGER
      if (text.includes('LIVE LONGER')) {
        html += '<span class="headline-gold">LIVE LONGER</span>';
      }

      if (html) {
        content.innerHTML = html;
      }
    }

    // Row 4: Statistics (index 3)
    if (index === 3) {
      const text = content.textContent.trim();

      // Parse statistics - look for months values with specific patterns
      const venValue = text.match(/VEN\+AZA\s*([\d.]+)\s*months/i);
      // For AZA, look for "vs AZA" or standalone "AZA" followed by number
      const azaValue = text.match(/vs\s*AZA\s*([\d.]+)\s*months/i) || text.match(/\bAZA\s*([\d.]+)\s*months(?!.*VEN)/i);

      // Parse CI values - get both
      const ciMatches = text.match(/95%\s*CI[:\s]*\([^)]+\)/gi) || [];

      if (venValue || azaValue) {
        const p = content.querySelector('p') || content;
        p.innerHTML = `
          <span class="stat-group">
            <span class="stat-inline"><span class="stat-label">VEN+AZA</span> <span class="stat-value">${venValue ? venValue[1] + ' months' : ''}</span></span>
            <span class="stat-ci">${ciMatches[0] || ''}</span>
          </span>
          <span class="stat-vs">vs</span>
          <span class="stat-group">
            <span class="stat-inline"><span class="stat-label">AZA</span> <span class="stat-value">${azaValue ? azaValue[1] + ' months' : ''}</span></span>
            <span class="stat-ci">${ciMatches[1] || ''}</span>
          </span>
        `;
        p.classList.add('stats-row');
      }
    }
  });
}

function decorateAmlButtons(block) {
  const content = block.querySelector('p');
  if (!content) return;

  const text = content.textContent.trim();

  // Split by known button texts
  const buttons = [];

  if (text.includes('National Comprehensive Cancer Network')) {
    buttons.push('National Comprehensive Cancer Network\u00AE (NCCN\u00AE)');
  }
  if (text.includes('Study Design')) {
    buttons.push('Study Design');
  }

  if (buttons.length === 0) {
    buttons.push(text);
  }

  content.innerHTML = buttons.map((btn) => `<span class="action-btn">${btn.trim()}</span>`).join('');
}

function decorateAmlCards(block) {
  const content = block.querySelector('p');
  if (!content) return;

  const text = content.textContent.trim();

  // Known card titles
  const knownCards = [
    'Overall Survival',
    'Remission (CR and CR+CRh)',
    'Transfusion Independence',
    'Early Assessment with Bone Marrow',
  ];

  const cards = [];

  knownCards.forEach((card) => {
    if (text.includes(card)) {
      cards.push(card);
    }
  });

  // If no known cards found, try splitting
  if (cards.length === 0) {
    cards.push(...text.split(/\s{2,}/).filter((c) => c.trim()));
  }

  content.innerHTML = cards.map((card) => `<span class="nav-card">${card.trim()}</span>`).join('');
}

function decorateAmlIsi(block) {
  const rows = block.querySelectorAll(':scope > div');
  let indicationHtml = '';
  let safetyHtml = '';

  rows.forEach((row) => {
    const content = row.querySelector('p') || row.querySelector('div');
    if (!content) return;

    const text = content.textContent.trim();

    // Header row
    if (text.includes('INDICATION AND IMPORTANT SAFETY INFORMATION') && text.length < 100) {
      content.innerHTML = `<span class="isi-header">${text}</span>`;
      return;
    }

    // Indication row
    if (text.startsWith('INDICATION') && !text.includes('IMPORTANT SAFETY')) {
      const indicationText = text.replace(/^INDICATION\s*/i, '');
      indicationHtml = `
        <span class="isi-section-title">INDICATION</span>
        <span class="isi-text">${indicationText}</span>
      `;
      content.innerHTML = `<span class="isi-column-left">${indicationHtml}</span>`;
      return;
    }

    // Important Safety Information row
    if (text.includes('IMPORTANT SAFETY INFORMATION')) {
      const tlsMatch = text.match(/Tumor lysis syndrome[^.]+\./i);
      safetyHtml = `
        <span class="isi-section-title">IMPORTANT SAFETY INFORMATION</span>
        <span class="isi-warning-title">WARNING: TUMOR LYSIS SYNDROME</span>
        <span class="isi-warning-text">${tlsMatch ? tlsMatch[0] : ''}</span>
      `;
      content.innerHTML = `<span class="isi-column-right">${safetyHtml}</span>`;
      return;
    }

    // Contraindications row
    if (text.startsWith('Contraindications')) {
      const contraText = text.replace(/^Contraindications\s*/i, '');
      content.innerHTML = `
        <span class="isi-subsection">Contraindications</span>
        <span class="isi-text">${contraText}</span>
      `;
      return;
    }

    // Tumor Lysis Syndrome row
    if (text.startsWith('Tumor Lysis Syndrome')) {
      const tlsText = text.replace(/^Tumor Lysis Syndrome\s*/i, '');
      content.innerHTML = `
        <span class="isi-subsection">Tumor Lysis Syndrome</span>
        <span class="isi-text">${tlsText}</span>
      `;
      return;
    }

    // Prescribing info link
    if (text.includes('Full Prescribing Information')) {
      content.innerHTML = `<span class="isi-link">${text}</span>`;
    }
  });
}

export default function decorate(block) {
  // Decorate based on variant
  if (block.classList.contains('aml-nav')) {
    decorateAmlNav(block);
  } else if (block.classList.contains('aml-buttons')) {
    decorateAmlButtons(block);
  } else if (block.classList.contains('aml-cards')) {
    decorateAmlCards(block);
  } else if (block.classList.contains('aml-isi')) {
    decorateAmlIsi(block);
  } else if (block.classList.contains('aml')) {
    decorateAmlHero(block);
  }
}