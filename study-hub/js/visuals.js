/* ==========================================================================
   visuals.js — helpers that build the little pictures used in lessons
   (fraction bars, bar models, number lines, area grids, algebra tiles).

   Topic data files call these, e.g.  Visuals.fractionBars([[3, 4]])
   Everything returns an HTML/SVG string.
   ========================================================================== */
(function () {
  'use strict';

  let uid = 0; // unique ids for SVG arrow markers

  /** A stacked fraction:  frac(3, 4)  ->  3 over 4 */
  function frac(n, d) {
    return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`;
  }

  /**
   * Turn  [[3/4]]  in any text into a nicely stacked fraction.
   * Lets question and lesson text stay easy to type.
   */
  function fmt(text) {
    return String(text).replace(/\[\[(-?[\w.]+)\/([\w.]+)\]\]/g, (_, n, d) => frac(n, d));
  }

  /** Rows of fraction bars: fractionBars([[1,2],[2,4]]) shows 1/2 above 2/4. */
  function fractionBars(list) {
    const rows = list.map(([n, d]) => {
      const cells = Array.from({ length: d }, (_, i) => `<span class="fcell${i < n ? ' on' : ''}"></span>`).join('');
      return `<div class="fbar-row"><span class="fbar-label">${frac(n, d)}</span>` +
             `<div class="fbar" style="--cells:${d}">${cells}</div></div>`;
    }).join('');
    return `<div class="visual fbars" role="img" aria-label="Fraction bars">${rows}</div>`;
  }

  /**
   * Bar model made of equal "unit" boxes, in coloured groups.
   *   unitBar([{ n: 3, label: 'Mia', unit: '$4' }, { n: 2, label: 'Jai', unit: '$4' }])
   */
  function unitBar(groups) {
    const html = groups.map((g, i) => {
      const boxes = Array.from({ length: g.n }, () => `<span class="ubox c${i % 4}">${g.unit || ''}</span>`).join('');
      return `<div class="ugroup" style="flex:${g.n}"><div class="ulabel">${g.label || ''}</div><div class="uboxes">${boxes}</div></div>`;
    }).join('');
    return `<div class="visual ubar" role="img" aria-label="Bar model">${html}</div>`;
  }

  /**
   * Number line drawn as SVG.
   *   numberLine({ min:-6, max:6, marks:[{v:-3,label:'start'}], hops:[{from:-3,to:2,label:'+5'}] })
   */
  function numberLine({ min, max, marks = [], hops = [] }) {
    const W = 520, pad = 28, y = 70;
    const step = (W - pad * 2) / (max - min);
    const x = (v) => pad + (v - min) * step;
    const id = `arrow${++uid}`;
    let svg = `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">` +
              `<path d="M0 0 L10 5 L0 10 z" fill="#5b6cff"/></marker></defs>`;
    svg += `<line x1="${pad - 12}" y1="${y}" x2="${W - pad + 12}" y2="${y}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
    for (let v = min; v <= max; v++) {
      const big = v === 0;
      svg += `<line x1="${x(v)}" y1="${y - (big ? 10 : 6)}" x2="${x(v)}" y2="${y + (big ? 10 : 6)}" stroke="currentColor" stroke-width="${big ? 3 : 2}"/>`;
      svg += `<text x="${x(v)}" y="${y + 30}" text-anchor="middle" font-size="15" font-weight="${big ? 800 : 600}" fill="currentColor">${v}</text>`;
    }
    hops.forEach((h) => {
      const x1 = x(h.from), x2 = x(h.to), mid = (x1 + x2) / 2;
      const lift = 22 + Math.min(40, Math.abs(h.to - h.from) * 5);
      svg += `<path d="M${x1} ${y - 6} Q${mid} ${y - 6 - lift * 2} ${x2} ${y - 6}" fill="none" stroke="#5b6cff" stroke-width="3" marker-end="url(#${id})"/>`;
      if (h.label) svg += `<text x="${mid}" y="${y - 12 - lift}" text-anchor="middle" font-size="16" font-weight="800" fill="#4b5cf0">${h.label}</text>`;
    });
    marks.forEach((m) => {
      svg += `<circle cx="${x(m.v)}" cy="${y}" r="8" fill="${m.colour || '#ff7a9c'}" stroke="#1f2a44" stroke-width="2"/>`;
      if (m.label) svg += `<text x="${x(m.v)}" y="${y + 56}" text-anchor="middle" font-size="14" font-weight="800" fill="#1f2a44">${m.label}</text>`;
    });
    return `<div class="visual scroll"><svg viewBox="0 0 ${W} 135" class="svg-line" role="img" aria-label="Number line from ${min} to ${max}">${svg}</svg></div>`;
  }

  /** A w × h grid of unit squares with side labels (for area and perimeter). */
  function areaGrid(w, h, { unit = 'cm' } = {}) {
    const cs = Math.min(40, Math.floor(280 / w)), pad = 40;
    const W = w * cs + pad * 2, H = h * cs + pad * 2;
    let g = `<rect x="${pad}" y="${pad}" width="${w * cs}" height="${h * cs}" fill="#cfe0ff" stroke="#1f2a44" stroke-width="3"/>`;
    for (let i = 1; i < w; i++) g += `<line x1="${pad + i * cs}" y1="${pad}" x2="${pad + i * cs}" y2="${pad + h * cs}" stroke="#1f2a44" stroke-opacity=".35" stroke-width="1.5"/>`;
    for (let j = 1; j < h; j++) g += `<line x1="${pad}" y1="${pad + j * cs}" x2="${pad + w * cs}" y2="${pad + j * cs}" stroke="#1f2a44" stroke-opacity=".35" stroke-width="1.5"/>`;
    g += `<text x="${W / 2}" y="${pad - 12}" text-anchor="middle" font-weight="800" font-size="16" fill="#1f2a44">${w} ${unit}</text>`;
    g += `<text x="${pad - 10}" y="${H / 2 + 5}" text-anchor="end" font-weight="800" font-size="16" fill="#1f2a44">${h} ${unit}</text>`;
    return `<div class="visual scroll"><svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px" role="img" aria-label="Rectangle ${w} by ${h}">${g}</svg></div>`;
  }

  /** A triangle sitting inside the rectangle it is half of. */
  function triangle(base, height, { unit = 'cm' } = {}) {
    const g = `
      <rect x="40" y="30" width="220" height="130" fill="none" stroke="#9aa5c4" stroke-width="2" stroke-dasharray="6 6"/>
      <polygon points="40,160 260,160 110,30" fill="#ffd1dc" stroke="#1f2a44" stroke-width="3" stroke-linejoin="round"/>
      <line x1="110" y1="30" x2="110" y2="160" stroke="#1f2a44" stroke-width="2" stroke-dasharray="5 4"/>
      <text x="150" y="184" text-anchor="middle" font-weight="800" font-size="16" fill="#1f2a44">base = ${base} ${unit}</text>
      <text x="116" y="102" font-weight="800" font-size="16" fill="#1f2a44">height = ${height} ${unit}</text>`;
    return `<div class="visual scroll"><svg viewBox="0 0 300 195" style="max-width:300px" role="img" aria-label="Triangle with base ${base} and height ${height}">${g}</svg></div>`;
  }

  /** An L-shape: a big W × H rectangle with a cw × ch corner missing (top-right). */
  function lShape(W, H, cw, ch, { unit = 'cm' } = {}) {
    const s = Math.min(24, Math.floor(260 / W)), pad = 44;
    const w = W * s, h = H * s, a = cw * s, b = ch * s;
    const pts = `${pad},${pad} ${pad + w - a},${pad} ${pad + w - a},${pad + b} ${pad + w},${pad + b} ${pad + w},${pad + h} ${pad},${pad + h}`;
    const g = `
      <rect x="${pad + w - a}" y="${pad}" width="${a}" height="${b}" fill="none" stroke="#9aa5c4" stroke-width="2" stroke-dasharray="6 5"/>
      <polygon points="${pts}" fill="#c9f2de" stroke="#1f2a44" stroke-width="3" stroke-linejoin="round"/>
      <text x="${pad + w / 2}" y="${pad + h + 26}" text-anchor="middle" font-weight="800" font-size="15" fill="#1f2a44">${W} ${unit}</text>
      <text x="${pad - 10}" y="${pad + h / 2 + 5}" text-anchor="end" font-weight="800" font-size="15" fill="#1f2a44">${H} ${unit}</text>
      <text x="${pad + w - a / 2}" y="${pad - 10}" text-anchor="middle" font-weight="800" font-size="14" fill="#5b6785">${cw} ${unit}</text>
      <text x="${pad + w + 8}" y="${pad + b / 2 + 5}" font-weight="800" font-size="14" fill="#5b6785">${ch} ${unit}</text>`;
    const vw = pad * 2 + w + 36, vh = pad * 2 + h;
    return `<div class="visual scroll"><svg viewBox="0 0 ${vw} ${vh}" style="max-width:${vw}px" role="img" aria-label="L-shaped figure">${g}</svg></div>`;
  }

  /** Algebra tiles: tiles({ x: 2, ones: 3 }) -> [x][x] (1)(1)(1) */
  function tiles({ x = 0, ones = 0 }) {
    return '<span class="tiles">' +
      '<span class="tile tile-x">x</span>'.repeat(x) +
      '<span class="tile tile-one">1</span>'.repeat(ones) + '</span>';
  }

  /** Two "pans" with an equals sign — shows an equation as a balance. */
  function balance(left, right) {
    return `<div class="visual balance"><div class="pan">${left}</div><div class="eq">=</div><div class="pan">${right}</div></div>`;
  }

  window.Visuals = { frac, fmt, fractionBars, unitBar, numberLine, areaGrid, triangle, lShape, tiles, balance };
})();
