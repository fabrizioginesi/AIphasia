(async function () {
  const [ontoData, graphsData] = await Promise.all([
    fetch('data/ontology-data.json').then(r => r.json()),
    fetch('data/graphs-data.json').then(r => r.json())
  ]);

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.12});
  revealEls.forEach(el => io.observe(el));
  
  const navLinks = document.querySelectorAll('#navlinks a');
  const sections = document.querySelectorAll('section[id]');
  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const link = document.querySelector(`#navlinks a[href="#${e.target.id}"]`);
      if (!link) return;
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin: '-40% 0px -55% 0px', threshold: 0});
  sections.forEach(s => spyIo.observe(s));
  
  const subnavLinks = document.querySelectorAll('.subnav a');
  const subnavTargets = document.querySelectorAll('#onto-hinge, #onto-definitions, #onto-model, #onto-patterns');
  const subSpyIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const link = document.querySelector(`.subnav a[href="#${e.target.id}"]`);
      if (!link) return;
      if (e.isIntersecting) {
        subnavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin: '-15% 0px -70% 0px', threshold: 0});
  subnavTargets.forEach(s => subSpyIo.observe(s));
  
  document.querySelectorAll('.gap-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.textContent = isOpen ? 'Hide' : 'Where it falls short';
    });
  });
  
  // ---- Ontology interactive diagrams ----
  function itemRow(item) {
    const label = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener">${item.name}<span class="link-icon">&#8599;</span></a>`
      : `<span>${item.name}</span>`;
    const right = item.n !== undefined ? `<span class="onto-meta">n=${item.n}</span>`
                : item.h !== undefined ? `<span class="onto-meta">h=${item.h}</span>`
                : item.note ? `<span class="onto-note">${item.note}</span>` : '';
    return `<div class="onto-item">${label}${right}</div>`;
  }
  
  document.getElementById('list-aitool').innerHTML = ontoData.tools.map(itemRow).join('');
  document.getElementById('list-subtype').innerHTML = ontoData.subtypes.map(itemRow).join('');
  document.getElementById('list-evidence').innerHTML = ontoData.evidence.map(itemRow).join('');
  document.getElementById('list-limitation').innerHTML = ontoData.limitations.map(itemRow).join('');
  document.getElementById('list-effectsize').innerHTML = ontoData.meta.map(itemRow).join('');
  document.getElementById('list-pool').innerHTML = ontoData.pools.map(itemRow).join('');
  document.getElementById('list-comparison').innerHTML = ontoData.comparison.map(itemRow).join('');
  document.getElementById('list-patterns').innerHTML = ontoData.patterns.map(itemRow).join('');
  document.getElementById('list-negcq').innerHTML = ontoData.negativeCQs.map(itemRow).join('');
  
  document.querySelectorAll('.tleaf-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.open(href, '_blank', 'noopener');
    });
  });
  
  document.querySelectorAll('.node-click').forEach(node => {
    node.addEventListener('click', () => {
      const panelId = node.getAttribute('data-panel');
      const panel = document.getElementById(panelId);
      const svg = node.closest('svg');
      const wasOpen = panel.classList.contains('open');
      svg.querySelectorAll('.node-click').forEach(n => n.classList.remove('active'));
      svg.parentElement.querySelectorAll('.onto-panel').forEach(p => p.classList.remove('open'));
      if (!wasOpen) { panel.classList.add('open'); node.classList.add('active'); }
    });
    node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); } });
  });
  
  // ---- Taxonomy tree ----
  const treeData = {"broca": {"name": "Broca", "desc": "Effortful, halting, agrammatic speech with comprehension relatively preserved. Lesion in the left frontal region around Broca's area.", "url": "https://en.wikipedia.org/wiki/Broca%27s_aphasia", "tools": [{"name": "AphasiaScripts", "url": "https://pubs.asha.org/doi/abs/10.1044/1058-0360%282008/003%29"}, {"name": "Careful Whisper, an interpretable pipeline for aphasia voice biomarkers", "url": "https://arxiv.org/pdf/2308.01327"}, {"name": "Constant Therapy", "url": "https://constanttherapyhealth.com/science/"}, {"name": "Neural machine translation of aphasic sentences into fluent sentences", "url": "https://aclanthology.org/2022.clib-1.20/"}, {"name": "RehabilitIA", "url": "https://link.springer.com/chapter/10.1007/978-3-032-35390-0_13"}, {"name": "Semi immersive virtual reality conversational therapy", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7428879/"}, {"name": "Verb Network Strengthening Treatment (VNeST), a computerised teletherapy version", "url": "https://tactustherapy.com/vnest-verb-network-strengthening-app/"}, {"name": "iTalkBetter", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11056404/"}]}, "wernicke": {"name": "Wernicke", "desc": "Fluent, well formed but often meaningless speech, with poor comprehension. Lesion in the posterior left temporal lobe.", "url": "https://en.wikipedia.org/wiki/Wernicke%27s_aphasia", "tools": [{"name": "Automatic identification of paraphasia targets using an LLM", "url": "https://pubs.asha.org/doi/10.1044/2023_JSLHR-23-00306"}, {"name": "Careful Whisper, an interpretable pipeline for aphasia voice biomarkers", "url": "https://arxiv.org/pdf/2308.01327"}, {"name": "Seq2seq model for automatic paraphasia detection", "url": "https://arxiv.org/pdf/2312.10518"}]}, "global": {"name": "Global", "desc": "The most severe form: both production and comprehension are profoundly impaired.", "url": "https://en.wikipedia.org/wiki/Global_aphasia", "tools": [{"name": "Careful Whisper, an interpretable pipeline for aphasia voice biomarkers", "url": "https://arxiv.org/pdf/2308.01327"}]}, "conduction": {"name": "Conduction", "desc": "Fluent speech and good comprehension, but repeating words or sentences is severely impaired.", "url": "https://en.wikipedia.org/wiki/Conduction_aphasia", "tools": [{"name": "Automatic identification of paraphasia targets using an LLM", "url": "https://pubs.asha.org/doi/10.1044/2023_JSLHR-23-00306"}, {"name": "P300 visual paradigm BCI for aphasia rehabilitation", "url": "https://www.scitepress.org/Papers/2025/142995/142995.pdf"}, {"name": "Seq2seq model for automatic paraphasia detection", "url": "https://arxiv.org/pdf/2312.10518"}, {"name": "Verb Network Strengthening Treatment (VNeST), a computerised teletherapy version", "url": "https://tactustherapy.com/vnest-verb-network-strengthening-app/"}]}, "tmotor": {"name": "Transcortical Motor", "desc": "Nonfluent like Broca's aphasia, but repetition is preserved.", "url": "https://en.wikipedia.org/wiki/Transcortical_motor_aphasia", "tools": []}, "tsensory": {"name": "Transcortical Sensory", "desc": "Fluent speech and poor comprehension like Wernicke's aphasia, but repetition is intact.", "url": "https://en.wikipedia.org/wiki/Transcortical_sensory_aphasia", "tools": []}, "tmixed": {"name": "Transcortical Mixed", "desc": "Production and comprehension both collapse while repetition survives, sometimes as empty echoing. Also called isolation syndrome.", "url": "https://en.wikipedia.org/wiki/Mixed_transcortical_aphasia", "tools": []}, "anomic": {"name": "Anomic", "desc": "The mildest form: persistent trouble finding the right word, with fluency and comprehension almost normal.", "url": "https://en.wikipedia.org/wiki/Anomic_aphasia", "tools": [{"name": "Careful Whisper, an interpretable pipeline for aphasia voice biomarkers", "url": "https://arxiv.org/pdf/2308.01327"}, {"name": "Computerised Speech and Language Therapy (CSLT), the Big CACTUS trial", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10731555/"}, {"name": "Constant Therapy", "url": "https://constanttherapyhealth.com/science/"}, {"name": "P300 visual paradigm BCI for aphasia rehabilitation", "url": "https://www.scitepress.org/Papers/2025/142995/142995.pdf"}, {"name": "RehabilitIA", "url": "https://link.springer.com/chapter/10.1007/978-3-032-35390-0_13"}, {"name": "Semi immersive virtual reality conversational therapy", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7428879/"}, {"name": "Verb Network Strengthening Treatment (VNeST), a computerised teletherapy version", "url": "https://tactustherapy.com/vnest-verb-network-strengthening-app/"}, {"name": "iTalkBetter", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11056404/"}]}, "svppa": {"name": "Semantic variant PPA", "desc": "Progressive loss of word meaning. Speech stays fluent but grows empty. Linked to anterior temporal atrophy.", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6993834/", "tools": [{"name": "Automatic transcription (Whisper) classifying Primary Progressive Aphasia", "url": "https://www.medrxiv.org/content/10.64898/2026.02.24.26346981.full.pdf"}]}, "nfvppa": {"name": "Nonfluent / agrammatic variant PPA", "desc": "Effortful, agrammatic speech with motor speech errors. Linked to left frontal and insular atrophy.", "url": "https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2018.00692/full", "tools": [{"name": "Automatic transcription (Whisper) classifying Primary Progressive Aphasia", "url": "https://www.medrxiv.org/content/10.64898/2026.02.24.26346981.full.pdf"}]}, "lvppa": {"name": "Logopenic variant PPA", "desc": "Slowed speech with frequent word finding pauses and poor sentence repetition. Often tied to Alzheimer pathology.", "url": "https://alzres.biomedcentral.com/articles/10.1186/s13195-016-0185-y", "tools": [{"name": "Automatic transcription (Whisper) classifying Primary Progressive Aphasia", "url": "https://www.medrxiv.org/content/10.64898/2026.02.24.26346981.full.pdf"}]}, "atypical": {"name": "Atypical / unclassified PPA", "desc": "Cases that fit none of the three canonical variants cleanly, a category the literature only settled on recently.", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6993834/", "tools": []}};
  document.querySelectorAll('.tleaf-node').forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-key');
      const d = treeData[key];
      const panel = document.getElementById('tree-panel');
      const body = document.getElementById('tree-panel-body');
      const wasActive = node.classList.contains('active');
      document.querySelectorAll('.tleaf-node').forEach(n => n.classList.remove('active'));
      if (wasActive) { panel.classList.remove('open'); return; }
      node.classList.add('active');
      const toolsHtml = d.tools.length
        ? '<div class="onto-list-title">' + d.tools.length + ' AI tool' + (d.tools.length>1?'s':'') + ' targeting this subtype</div><div class="onto-list">' +
          d.tools.map(t => t.url
            ? '<div class="onto-item"><a href="' + t.url + '" target="_blank" rel="noopener">' + t.name + '<span class="link-icon">&#8599;</span></a></div>'
            : '<div class="onto-item"><span>' + t.name + '</span></div>').join('') + '</div>'
        : '<div class="tree-zero">No tool in the graph targets this subtype.</div>';
      body.innerHTML = '<div class="tree-detail"><h4>' + d.name + '</h4><p class="tree-desc">' + d.desc + '</p>' +
        '<a class="tree-lit" href="' + d.url + '" target="_blank" rel="noopener">Read the clinical literature &#8599;</a>' + toolsHtml + '</div>';
      panel.classList.add('open');
    });
    node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); } });
  });
  
  function studyRow(t) { return t.url ? `<div class="onto-item"><a href="${t.url}" target="_blank" rel="noopener">${t.name}<span class="link-icon">&#8599;</span></a></div>` : `<div class="onto-item"><span>${t.name}</span></div>`; }
  function openGraphPanel(panelId, listId, items, emptyLabel) {
    const panel = document.getElementById(panelId); const list = document.getElementById(listId);
    list.innerHTML = items && items.length ? items.map(studyRow).join('') : `<div class="onto-item"><span>${emptyLabel || 'No tool in the graph matches this.'}</span></div>`;
    panel.classList.add('open');
  }
  document.querySelectorAll('.gbar[data-chart]').forEach(bar => {
    bar.addEventListener('click', () => {
      const chart = bar.getAttribute('data-chart'); const key = bar.getAttribute('data-key');
      const group = bar.closest('.chart-card, .cq');
      group.querySelectorAll('.gbar').forEach(b => b.classList.remove('active'));
      bar.classList.add('active');
      if (chart === 'evidence') openGraphPanel('panel-evidence','list-panel-evidence', graphsData.evidence[key]);
      else if (chart === 'growth') openGraphPanel('panel-growth','list-panel-growth', graphsData.growth[key], 'No tool released this year.');
      else if (chart === 'modality') openGraphPanel('panel-modality','list-panel-modality', graphsData.modality[key], 'No tool addresses this modality.');
      else if (chart === 'subtype') openGraphPanel('panel-subtype','list-panel-subtype', graphsData.subtypes[key], 'No tool targets this subtype.');
      else if (chart === 'undiff') openGraphPanel('panel-undiff','list-panel-undiff', graphsData.undiff);
    });
    bar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bar.click(); } });
  });
  
  // ---- Zoom & pan for the "model, topic by topic" diagrams ----
  // Design note: the diagram's natural (unscaled) size is never cached. It is always derived
  // on demand from the wrapper's current rendered box divided by the current scale, so there is
  // no "measured too early / measured while hidden" class of bug. At rest (scale 1, x 0, y 0) the
  // transform is the identity: the diagram renders exactly as plain width:100%/height:auto would,
  // so nothing is ever cropped by default.
  function makeZoomPan(container, svgEl, onZoomChange) {
    const wrapper = document.createElement('div');
    wrapper.className = 'zoom-pan-inner';
    svgEl.parentNode.insertBefore(wrapper, svgEl);
    wrapper.appendChild(svgEl);
  
    let scale = 1, x = 0, y = 0, dragging = false, startX, startY, startTX, startTY;
    let dragNatW = 0, dragNatH = 0;
    const minScale = 1, maxScale = 8;
  
    function apply() { wrapper.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
  
    function naturalSize() {
      const r = wrapper.getBoundingClientRect();
      return { w: r.width / scale, h: r.height / scale };
    }
  
    function clampWith(natW, natH) {
      const rect = container.getBoundingClientRect();
      const contentW = natW * scale, contentH = natH * scale;
      x = contentW <= rect.width ? (rect.width - contentW) / 2 : Math.min(0, Math.max(rect.width - contentW, x));
      y = contentH <= rect.height ? (rect.height - contentH) / 2 : Math.min(0, Math.max(rect.height - contentH, y));
    }
  
    function markInteracted() { container.classList.add('interacted'); }
  
    function setZoom(newScale) {
      container.classList.toggle('zoomed', newScale > minScale + 0.01);
      if (onZoomChange) onZoomChange(newScale);
    }
  
    function zoomAt(clientX, clientY, factor) {
      const rect = container.getBoundingClientRect();
      const { w: natW, h: natH } = naturalSize();
      const px = clientX - rect.left, py = clientY - rect.top;
      const newScale = Math.min(maxScale, Math.max(minScale, scale * factor));
      if (newScale === scale) return;
      x = px - (px - x) * (newScale / scale);
      y = py - (py - y) * (newScale / scale);
      scale = newScale;
      clampWith(natW, natH);
      apply();
      setZoom(scale);
    }
  
    function reset() {
      scale = 1; x = 0; y = 0;
      apply();
      setZoom(scale);
    }
  
    apply();
  
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      markInteracted();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.16 : 1 / 1.16);
    }, { passive: false });
  
    container.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('.model-topic-toolbar')) return;
      const n = naturalSize();
      dragNatW = n.w; dragNatH = n.h;
      dragging = true;
      container.setPointerCapture(e.pointerId);
      startX = e.clientX; startY = e.clientY; startTX = x; startTY = y;
      container.classList.add('grabbing', 'panning');
    });
    container.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      if (Math.abs(e.clientX - startX) > 2 || Math.abs(e.clientY - startY) > 2) markInteracted();
      x = startTX + (e.clientX - startX);
      y = startTY + (e.clientY - startY);
      clampWith(dragNatW, dragNatH);
      apply();
    });
    function endDrag() {
      dragging = false;
      container.classList.remove('grabbing', 'panning');
    }
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointerleave', endDrag);
    container.addEventListener('dblclick', (e) => {
      if (e.target.closest('.model-topic-toolbar')) return;
      markInteracted();
      reset();
    });
  
    window.addEventListener('resize', reset);
  
    return {
      zoomIn: () => { markInteracted(); const r = container.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.45); },
      zoomOut: () => { markInteracted(); const r = container.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 1.45); },
      reset: () => { markInteracted(); reset(); },
      getScale: () => scale
    };
  }
  
  function addDiagramToolbar(container, controls, onExpand) {
    const bar = document.createElement('div');
    bar.className = 'model-topic-toolbar';
    bar.innerHTML = '<button type="button" data-act="out" title="Zoom out" aria-label="Zoom out">−</button>' +
      '<span class="zoom-readout">100%</span>' +
      '<button type="button" data-act="in" title="Zoom in" aria-label="Zoom in">+</button>' +
      '<div class="toolbar-sep"></div>' +
      '<button type="button" data-act="reset" title="Fit to view" aria-label="Fit to view">⛶</button>' +
      (onExpand ? '<button type="button" data-act="expand" title="Expand full-screen" aria-label="Expand full-screen">⤢</button>' : '');
    container.appendChild(bar);
    const readout = bar.querySelector('.zoom-readout');
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('button'); if (!btn) return;
      const act = btn.getAttribute('data-act');
      if (act === 'in') controls.zoomIn();
      else if (act === 'out') controls.zoomOut();
      else if (act === 'reset') controls.reset();
      else if (act === 'expand' && onExpand) onExpand();
    });
    return (scale) => { readout.textContent = Math.round(scale * 100) + '%'; };
  }
  
  function addDiagramHint(container) {
    const hint = document.createElement('div');
    hint.className = 'model-topic-hint';
    hint.textContent = 'scroll to zoom · drag to explore';
    container.appendChild(hint);
  }
  
  const diagramLightbox = document.createElement('div');
  diagramLightbox.className = 'diagram-lightbox';
  diagramLightbox.innerHTML = '<div class="diagram-lightbox-inner"><button type="button" class="diagram-lightbox-close" aria-label="Close">✕</button>' +
    '<div class="diagram-lightbox-title"></div><div class="model-topic-svg diagram-lightbox-svg"></div></div>';
  document.body.appendChild(diagramLightbox);
  const diagramLightboxTitle = diagramLightbox.querySelector('.diagram-lightbox-title');
  function closeDiagramLightbox() {
    diagramLightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    diagramLightbox.querySelector('.diagram-lightbox-svg').innerHTML = '';
  }
  diagramLightbox.querySelector('.diagram-lightbox-close').addEventListener('click', closeDiagramLightbox);
  diagramLightbox.addEventListener('click', (e) => { if (e.target === diagramLightbox) closeDiagramLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && diagramLightbox.classList.contains('open')) closeDiagramLightbox(); });
  
  document.querySelectorAll('.model-topic-svg').forEach(container => {
    const svgEl = container.querySelector('svg');
    if (!svgEl) return;
    const title = container.closest('.model-topic') ? container.closest('.model-topic').querySelector('h4').textContent : '';
    let updateReadout = null;
    const controls = makeZoomPan(container, svgEl, (s) => { if (updateReadout) updateReadout(s); });
    updateReadout = addDiagramToolbar(container, controls, () => {
      const oldHost = diagramLightbox.querySelector('.diagram-lightbox-svg');
      const newHost = document.createElement('div');
      newHost.className = 'model-topic-svg diagram-lightbox-svg';
      oldHost.replaceWith(newHost);
      newHost.appendChild(svgEl.cloneNode(true));
      diagramLightboxTitle.textContent = title;
      diagramLightbox.classList.add('open');
      document.body.classList.add('lightbox-open');
      // the lightbox must already be visible (display:flex) before measuring,
      // otherwise the hidden container reports zero size and panning breaks.
      let bigReadout = null;
      const bigControls = makeZoomPan(newHost, newHost.querySelector('svg'), (s) => { if (bigReadout) bigReadout(s); });
      bigReadout = addDiagramToolbar(newHost, bigControls, null);
      addDiagramHint(newHost);
    });
    addDiagramHint(container);
  });})();
