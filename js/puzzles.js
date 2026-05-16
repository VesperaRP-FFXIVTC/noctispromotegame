// ===== PUZZLES =====

function showPuzzle(puzzleId, sceneId) {
  const overlay = document.getElementById('puzzle-overlay');
  const container = document.getElementById('puzzle-container');
  overlay.classList.remove('hidden');
  container.innerHTML = '';

  switch (puzzleId) {
    case 'code_lock':    buildCodeLock(container, sceneId); break;
    case 'symbol_doors': buildSymbolDoors(container, sceneId); break;
    case 'memory_order': buildMemoryOrder(container, sceneId); break;
    case 'rune_match':   buildRuneMatch(container, sceneId); break;
  }
}

function closePuzzle() {
  document.getElementById('puzzle-overlay').classList.add('hidden');
  document.getElementById('puzzle-container').innerHTML = '';
}

// ── Puzzle 1: Code Lock (Act 1) ───────────────────────────────────────────────
// Answer: 0412 (Inu's birthday, April 12th)

function buildCodeLock(container, sceneId) {
  container.innerHTML = `
    <div class="puzzle-title">密碼鎖</div>
    <div class="puzzle-desc">
      鐵門上掛著一把四位數的密碼鎖。<br/>
      你收集到的線索或許能幫助你找到答案。
    </div>
    <div class="code-lock">
      <input class="code-digit" id="d0" type="text" maxlength="1" inputmode="numeric" />
      <input class="code-digit" id="d1" type="text" maxlength="1" inputmode="numeric" />
      <input class="code-digit" id="d2" type="text" maxlength="1" inputmode="numeric" />
      <input class="code-digit" id="d3" type="text" maxlength="1" inputmode="numeric" />
    </div>
    <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:0.6rem;">
      <button class="puzzle-btn" onclick="checkCodeLock('${sceneId}')">確認</button>
      <button class="puzzle-btn puzzle-btn-secondary" onclick="showCluesPopup()">查看線索</button>
    </div>
    <div class="puzzle-error" id="lock-error"></div>
    <div id="clues-popup" class="clues-popup hidden">
      <div class="clues-popup-title">已收集的線索</div>
      <div id="clues-popup-list"></div>
      <button class="puzzle-btn" style="margin-top:0.8rem;" onclick="hideCluesPopup()">關閉</button>
    </div>
  `;

  // Auto-advance between digit inputs
  ['d0','d1','d2','d3'].forEach((id, i, arr) => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => {
      el.value = el.value.replace(/[^0-9]/g, '').slice(-1);
      if (el.value && i < arr.length - 1) {
        document.getElementById(arr[i + 1]).focus();
      }
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !el.value && i > 0) {
        document.getElementById(arr[i - 1]).focus();
      }
      if (e.key === 'Enter') checkCodeLock(sceneId);
    });
  });

  document.getElementById('d0').focus();
}

function showCluesPopup() {
  const popup = document.getElementById('clues-popup');
  const list  = document.getElementById('clues-popup-list');
  if (!popup || !list) return;
  list.innerHTML = '';
  if (typeof collectedClues !== 'undefined' && collectedClues.length > 0) {
    collectedClues.forEach(clue => {
      const item = document.createElement('div');
      item.className = 'clues-popup-item';
      item.textContent = '• ' + clue.clue_note;
      list.appendChild(item);
    });
  } else {
    list.innerHTML = '<div class="clues-popup-item" style="opacity:0.5;">還沒有收集到任何線索。</div>';
  }
  popup.classList.remove('hidden');
}

function hideCluesPopup() {
  const popup = document.getElementById('clues-popup');
  if (popup) popup.classList.add('hidden');
}

function checkCodeLock(sceneId) {
  const code = ['d0','d1','d2','d3'].map(id => document.getElementById(id).value).join('');
  const errorEl = document.getElementById('lock-error');

  if (code === '0412') {
    errorEl.style.color = '#2ecc71';
    errorEl.textContent = '咔嗒——密碼正確。';
    setTimeout(() => {
      closePuzzle();
      loadScene('act1_solved');
    }, 1200);
  } else {
    errorEl.style.color = '#e05555';
    errorEl.textContent = '密碼不正確。再試一次。';
    ['d0','d1','d2','d3'].forEach(id => {
      const el = document.getElementById(id);
      el.style.borderColor = '#e05555';
      setTimeout(() => { el.style.borderColor = ''; }, 800);
    });
  }
}

// ── Puzzle 2: Symbol Doors + Rune Clues (Act 2) ───────────────────────────────
// 分兩階段：
// 階段一 (rune_match)：牆上有四組符文對照表殘片，玩家需要找出缺失的符文
// 階段二 (symbol_doors)：用符文知識選出正確的門
//
// 邏輯：VESPERA的符文系統以「時序」排列：日→星→月（白晝→黃昏→黑夜）
// 線索牆上殘缺的符文提示：黃昏之後（月），黑夜之前（日），中間是？（星 ✦）

// ── Act 2 Phase 1: 符文對照謎題 ─────────────────────────────────────────────
const RUNE_CLUES = [
  { symbol: '☽', meaning: '月·黎明之前', hint: '一切開始的地方' },
  { symbol: '☀', meaning: '日·光明之時', hint: '萬物可見的瞬間' },
  { symbol: '✦', meaning: '星·黃昏之際', hint: '介於兩者之間，最短暫的存在' },
];

// 玩家需要從牆上三塊殘缺石板拼湊出正確順序：月 → 星 → 日
// 石板顯示的是打亂的符文+對應的關鍵字，玩家要按「時序」排列

let runeOrder = [];

function buildRuneMatch(container, sceneId) {
  // 打亂順序
  const shuffled = [...RUNE_CLUES].sort(() => Math.random() - 0.5);
  runeOrder = shuffled.map(r => r.symbol);

  container.innerHTML = `
    <div class="puzzle-title">符文殘壁</div>
    <div class="puzzle-desc">
      走廊牆上刻著褪色的符文，旁邊有一行說明：<br/>
      <em style="color:rgba(192,132,252,0.8)">「VESPERA 之語，以時序為序。從日的起點，經黃昏之星，至夜的盡頭，依序排列，方能通行。」</em><br/>
      <span style="font-size:0.8rem;color:rgba(245,234,216,0.5);margin-top:0.5rem;display:block;">拖曳符文石板，排列成正確的時間順序。</span>
    </div>
    <div id="rune-list" style="display:flex;flex-direction:row;gap:1rem;justify-content:center;margin:1.5rem 0;flex-wrap:wrap;"></div>
    <button class="puzzle-btn" onclick="checkRuneOrder('${sceneId}')">確認順序</button>
    <div class="puzzle-error" id="rune-error"></div>
  `;

  renderRuneList(shuffled);
}

function renderRuneList(runes) {
  const list = document.getElementById('rune-list');
  list.innerHTML = '';

  runes.forEach((rune, i) => {
    const item = document.createElement('div');
    item.className = 'rune-item';
    item.dataset.symbol = rune.symbol;
    item.draggable = true;
    item.style.cssText = `
      width: 110px; min-height: 140px;
      background: rgba(0,0,0,0.55);
      border: 1px solid rgba(155,89,182,0.45);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 1rem 0.5rem;
      cursor: grab;
      font-family: 'Noto Serif TC', serif;
      transition: all 0.15s;
      user-select: none;
      text-align: center;
    `;
    item.innerHTML = `
      <div style="font-size:2.4rem;margin-bottom:0.6rem;">${rune.symbol}</div>
      <div style="font-size:0.7rem;color:rgba(192,132,252,0.85);line-height:1.5;">${rune.meaning}</div>
      <div style="font-size:0.65rem;color:rgba(245,234,216,0.4);margin-top:0.4rem;font-style:italic;">${rune.hint}</div>
    `;

    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', rune.symbol);
      item.style.opacity = '0.4';
    });
    item.addEventListener('dragend', () => { item.style.opacity = '1'; });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      item.style.borderColor = 'rgba(192,132,252,0.8)';
    });
    item.addEventListener('dragleave', () => {
      item.style.borderColor = 'rgba(155,89,182,0.45)';
    });
    item.addEventListener('drop', e => {
      e.preventDefault();
      item.style.borderColor = 'rgba(155,89,182,0.45)';
      const fromSymbol = e.dataTransfer.getData('text/plain');
      if (fromSymbol === rune.symbol) return;
      const fromIdx = runeOrder.indexOf(fromSymbol);
      const toIdx   = runeOrder.indexOf(rune.symbol);
      if (fromIdx === -1 || toIdx === -1) return;
      [runeOrder[fromIdx], runeOrder[toIdx]] = [runeOrder[toIdx], runeOrder[fromIdx]];
      const reordered = runeOrder.map(s => RUNE_CLUES.find(r => r.symbol === s));
      renderRuneList(reordered);
    });

    list.appendChild(item);
  });
}

function checkRuneOrder(sceneId) {
  // 正確順序：☀ → ✦ → ☽（日的起點→黃昏→夜的盡頭，與「白晝→黃昏→黑夜」循環一致）
  const correct = ['☀', '✦', '☽'];
  const isCorrect = runeOrder.every((s, i) => s === correct[i]);
  const errorEl = document.getElementById('rune-error');

  if (isCorrect) {
    errorEl.style.color = '#2ecc71';
    errorEl.textContent = '石板上的符文發出微光，牆壁輕輕震動了一下。';
    document.querySelectorAll('.rune-item').forEach(el => {
      el.style.borderColor = 'rgba(160,220,160,0.6)';
    });
    setTimeout(() => {
      closePuzzle();
      loadScene('act2_rune_solved');
    }, 1600);
  } else {
    errorEl.style.color = '#e05555';
    errorEl.textContent = '順序不對。VESPERA 的時序，是從光走向暗的……';
    setTimeout(() => { errorEl.textContent = ''; }, 2000);
  }
}

// ── Act 2 Phase 2: Symbol Doors ───────────────────────────────────────────────
// 玩家已知符文時序，現在選出「黃昏之際」的符號 = ✦

const SYMBOL_DOORS = [
  { symbol: '☽', label: '月', desc: '黎明之前', correct: false },
  { symbol: '✦', label: '星', desc: '黃昏之際', correct: true  },
  { symbol: '☀', label: '日', desc: '光明之時', correct: false }
];

function buildSymbolDoors(container, sceneId) {
  container.innerHTML = `
    <div class="puzzle-title">三扇門</div>
    <div class="puzzle-desc">
      三扇門，各刻著符文。<br/>
      牆角還殘存著剛才石板上的提示：<br/>
      <em style="color:rgba(192,132,252,0.8)">「黃昏之後，黑夜之前，是那片短暫的靜謐。」</em><br/>
      <span style="font-size:0.8rem;color:rgba(245,234,216,0.5);margin-top:0.4rem;display:block;">選擇通往「黃昏之際」的那扇門。</span>
    </div>
    <div class="symbol-doors-row" style="display:flex;gap:1.5rem;justify-content:center;margin:1.5rem 0;">
      ${SYMBOL_DOORS.map((d, i) => `
        <div class="symbol-door" data-idx="${i}" onclick="selectDoor(${i}, '${sceneId}')"
          style="
            width:110px; height:150px;
            background:rgba(0,0,0,0.5);
            border:1px solid rgba(155,89,182,0.4);
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            cursor:pointer; transition:all 0.2s;
            font-size:2.5rem;
          ">
          ${d.symbol}
          <div style="font-size:0.75rem;color:rgba(192,132,252,0.7);margin-top:0.5rem;font-family:'Noto Serif TC',serif;">${d.label}</div>
          <div style="font-size:0.65rem;color:rgba(245,234,216,0.35);margin-top:0.25rem;font-family:'Noto Serif TC',serif;">${d.desc}</div>
        </div>
      `).join('')}
    </div>
    <div class="puzzle-error" id="door-error"></div>
  `;

  document.querySelectorAll('.symbol-door').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.borderColor = 'rgba(192,132,252,0.8)';
      el.style.background = 'rgba(123,79,166,0.15)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.borderColor = 'rgba(155,89,182,0.4)';
      el.style.background = 'rgba(0,0,0,0.5)';
    });
  });
}

function selectDoor(idx, sceneId) {
  const door = SYMBOL_DOORS[idx];
  const errorEl = document.getElementById('door-error');

  if (door.correct) {
    errorEl.style.color = '#2ecc71';
    errorEl.textContent = '門發出低沉的共鳴聲，緩緩開啟。前方，音樂聲更近了。';
    document.querySelectorAll('.symbol-door')[idx].style.borderColor = '#2ecc71';
    setTimeout(() => {
      closePuzzle();
      loadScene('act2_solved');
    }, 1600);
  } else {
    errorEl.style.color = '#e05555';
    errorEl.textContent = door.symbol === '☀'
      ? '這扇門紋絲不動。日的時序，已是過去，不是此刻。'
      : '這扇門紋絲不動。夜的時序，在更深的地方。';
    const el = document.querySelectorAll('.symbol-door')[idx];
    el.style.borderColor = '#e05555';
    setTimeout(() => {
      el.style.borderColor = 'rgba(155,89,182,0.4)';
      errorEl.textContent = '';
    }, 1800);
  }
}

// ── Puzzle 3: Memory Order (Act 3) ────────────────────────────────────────────
// 加強版：7塊碎片（原5塊），增加兩塊干擾碎片，且加入「已排列區」機制
// 玩家需要從7塊碎片中辨別出5塊真正的記憶，並排好順序

const MEMORY_FRAGMENTS = [
  { id: 'm1', text: '「我聽見了音樂聲，從迷霧的深處傳來。』',    order: 1, real: true  },
  { id: 'm2', text: '「那裡有什麼東西在等著我，我能感覺到。」',  order: 2, real: true  },
  { id: 'm3', text: '「也許，有些黑暗，是值得走進去的。」',      order: 3, real: true  },
  { id: 'm4', text: '「如果你看見這些文字，代表你找到了這裡。」',order: 4, real: true  },
  { id: 'm5', text: '「繼續往前走吧。NOCTIS，在等著你。」',      order: 5, real: true  },
  // 干擾碎片已移除
];

let memoryPool = [];    // 待排列的碎片池
let memorySelected = []; // 已選入的順序列表

let memoryHintUsed = false;

function buildMemoryOrder(container, sceneId) {
  // 只保留5塊真實碎片，移除干擾碎片
  memoryPool = [...MEMORY_FRAGMENTS].filter(f => f.real).sort(() => Math.random() - 0.5).map(f => f.id);
  memorySelected = [];
  memoryHintUsed = false;

  container.innerHTML = `
    <div class="puzzle-title">記憶碎片</div>
    <div class="puzzle-desc">
      門上的文字殘缺不全，順序已被迷霧打亂。<br/>
      將 Inu 的記憶依正確的時序排列，方能開門。<br/>
      <em style="color:rgba(192,132,252,0.7);font-size:0.8rem;">（點擊碎片加入排列，再次點擊已選碎片可移除）</em>
    </div>
    <div style="display:flex;gap:1rem;margin:0.8rem 0;align-items:flex-start;flex-wrap:wrap;">
      <div style="flex:1;min-width:200px;">
        <div style="font-size:0.75rem;color:rgba(192,132,252,0.6);margin-bottom:0.4rem;font-family:'Noto Serif TC',serif;">碎片池</div>
        <div id="memory-pool-list" style="display:flex;flex-direction:column;gap:0.4rem;"></div>
      </div>
      <div style="flex:1;min-width:200px;">
        <div style="font-size:0.75rem;color:rgba(192,132,252,0.6);margin-bottom:0.4rem;font-family:'Noto Serif TC',serif;">已選順序 <span id="selected-count" style="color:rgba(245,234,216,0.4);">(0/5)</span></div>
        <div id="memory-selected-list" style="display:flex;flex-direction:column;gap:0.4rem;min-height:60px;border:1px dashed rgba(155,89,182,0.25);padding:0.4rem;"></div>
      </div>
    </div>
    <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:0.6rem;">
      <button class="puzzle-btn" onclick="checkMemoryOrder('${sceneId}')">確認順序</button>
      <button class="puzzle-btn puzzle-btn-secondary" id="memory-hint-btn" onclick="showMemoryHint()">✦ 提示</button>
    </div>
    <div class="puzzle-error" id="memory-error"></div>
    <div id="memory-hint-text" style="display:none;margin-top:0.8rem;padding:0.8rem 1rem;background:rgba(212,168,75,0.07);border:1px solid rgba(212,168,75,0.25);font-family:'Noto Serif TC',serif;font-size:0.85rem;color:rgba(212,168,75,0.9);line-height:1.7;"></div>
  `;

  renderMemoryPool();
  renderMemorySelected();
}

function renderMemoryPool() {
  const list = document.getElementById('memory-pool-list');
  if (!list) return;
  list.innerHTML = '';

  memoryPool.forEach(id => {
    const frag = MEMORY_FRAGMENTS.find(f => f.id === id);
    const item = document.createElement('div');
    item.className = 'memory-item';
    item.dataset.id = id;
    item.style.cssText = `
      background: rgba(0,0,0,0.5);
      border: 1px solid rgba(155,89,182,0.4);
      padding: 0.6rem 0.9rem;
      cursor: pointer;
      font-size: 0.85rem;
      color: ${frag.real ? 'rgba(245,234,216,0.9)' : 'rgba(180,140,200,0.65)'};
      line-height: 1.6;
      font-family: 'Noto Serif TC', serif;
      transition: all 0.15s;
      user-select: none;
    `;
    item.textContent = frag.text;
    item.addEventListener('mouseenter', () => { item.style.borderColor = 'rgba(192,132,252,0.7)'; });
    item.addEventListener('mouseleave', () => { item.style.borderColor = 'rgba(155,89,182,0.4)'; });
    item.onclick = () => selectMemoryFrag(id);
    list.appendChild(item);
  });
}

function renderMemorySelected() {
  const list = document.getElementById('memory-selected-list');
  const count = document.getElementById('selected-count');
  if (!list) return;
  list.innerHTML = '';
  if (count) count.textContent = `(${memorySelected.length}/5)`;

  memorySelected.forEach((id, idx) => {
    const frag = MEMORY_FRAGMENTS.find(f => f.id === id);
    const item = document.createElement('div');
    item.style.cssText = `
      background: rgba(80,30,110,0.4);
      border: 1px solid rgba(192,132,252,0.4);
      padding: 0.5rem 0.8rem;
      cursor: pointer;
      font-size: 0.82rem;
      color: rgba(245,234,216,0.9);
      line-height: 1.5;
      font-family: 'Noto Serif TC', serif;
      transition: all 0.15s;
      display: flex; align-items: center; gap: 0.5rem;
    `;
    item.innerHTML = `<span style="color:rgba(192,132,252,0.5);font-size:0.75rem;min-width:1rem;">${idx+1}.</span>${frag.text}`;
    item.addEventListener('mouseenter', () => { item.style.borderColor = 'rgba(240,100,100,0.6)'; item.style.background = 'rgba(100,20,20,0.3)'; });
    item.addEventListener('mouseleave', () => { item.style.borderColor = 'rgba(192,132,252,0.4)'; item.style.background = 'rgba(80,30,110,0.4)'; });
    item.onclick = () => removeMemoryFrag(id);
    list.appendChild(item);
  });

  if (memorySelected.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'color:rgba(245,234,216,0.2);font-size:0.8rem;padding:0.5rem;font-family:"Noto Serif TC",serif;';
    placeholder.textContent = '點擊左側碎片加入順序……';
    list.appendChild(placeholder);
  }
}

function selectMemoryFrag(id) {
  if (memorySelected.includes(id)) return;
  if (memorySelected.length >= 5) {
    const errorEl = document.getElementById('memory-error');
    errorEl.style.color = '#e0a030';
    errorEl.textContent = '最多選取5塊碎片。點擊已選碎片可移除。';
    setTimeout(() => { errorEl.textContent = ''; }, 1800);
    return;
  }
  // 從池子移除
  memoryPool = memoryPool.filter(i => i !== id);
  memorySelected.push(id);
  renderMemoryPool();
  renderMemorySelected();
}

function removeMemoryFrag(id) {
  memorySelected = memorySelected.filter(i => i !== id);
  memoryPool.push(id);
  renderMemoryPool();
  renderMemorySelected();
}

function showMemoryHint() {
  const hintEl = document.getElementById('memory-hint-text');
  const hintBtn = document.getElementById('memory-hint-btn');
  if (!hintEl) return;

  if (memoryHintUsed) {
    // 第二次點擊收起
    hintEl.style.display = 'none';
    memoryHintUsed = false;
    if (hintBtn) hintBtn.textContent = '✦ 提示';
    return;
  }

  // 找出第一塊正確碎片（m1）
  const firstFrag = MEMORY_FRAGMENTS.find(f => f.id === 'm1');
  hintEl.innerHTML = `
    <span style="color:rgba(212,168,75,0.6);font-size:0.75rem;letter-spacing:0.1em;">✦ HINT</span><br/>
    最初的記憶，從「聽見」開始——<br/>
    <span style="color:rgba(245,234,216,0.7);font-style:italic;">${firstFrag.text}</span><br/>
    <span style="font-size:0.75rem;color:rgba(212,168,75,0.5);">這是第一塊。</span>
  `;
  hintEl.style.display = 'block';
  memoryHintUsed = true;
  if (hintBtn) hintBtn.textContent = '✦ 收起提示';
}

function checkMemoryOrder(sceneId) {
  const errorEl = document.getElementById('memory-error');

  if (memorySelected.length < 5) {
    errorEl.style.color = '#e0a030';
    errorEl.textContent = `還需要再選 ${5 - memorySelected.length} 塊碎片。`;
    setTimeout(() => { errorEl.textContent = ''; }, 1800);
    return;
  }

  // 檢查順序，找出第一個錯誤位置給具體提示
  const correct = ['m1','m2','m3','m4','m5'];
  const firstWrong = memorySelected.findIndex((id, i) => id !== correct[i]);

  if (firstWrong !== -1) {
    errorEl.style.color = '#e05555';
    errorEl.textContent = `第 ${firstWrong + 1} 塊的順序不對……再感受一次這段記憶的流向。`;
    setTimeout(() => { errorEl.textContent = ''; }, 2500);
    return;
  }
  // 全部正確
  errorEl.style.color = '#2ecc71';
  errorEl.textContent = '碎片拼合的瞬間，門上的文字發出微弱的光芒……';
  setTimeout(() => {
    closePuzzle();
    loadScene('act3_solved');
  }, 1600);
}

// ── Whisper Battle: 長廊精神攻擊彈幕 (Act 3.5) ───────────────────────────────

let whisperBattleState = null;

const WHISPER_LINES = [
  '那些你關燈之後才敢想的……',
  '歷史紀錄刪掉的那個畫面，我都記得',
  '你最害羞的那個，正好是我最熟的',
  '怕被指責的那個念頭——這裡沒人會指責',
  '外面那些眼睛，看不進來',
  '你藏在心底最深的那個，攤開來吧',
  '假裝沒興趣，是不是很累？',
  '白天的你，跟現在的你，可以是兩個人',
  '沒人會在路上對你露出「我知道你昨晚」的眼神',
  '你那半秒鐘的停留，我都記得',
  '說不出口的，我替你說',
  '你想要的，這裡都允許',
  '你最不敢承認的那個——正好是這裡的常客',
  '解開一顆扣子，又不會死',
  '你已經偷偷想很久了，不是嗎',
  '皮膚對皮膚，又不會少一塊',
  '進來嘛——只是看看',
  '你經過他身邊的那一秒，我替你停下來了',
];

// 根據玩家在 Act2/Act3 的選擇傾向，注入針對性低語
function _wbGetWhisperLines() {
  const lines = [...WHISPER_LINES];
  const flags = (typeof playerFlags !== 'undefined') ? playerFlags : {};
  const name  = (typeof playerName !== 'undefined' && playerName) ? playerName : '你';

  // act2_sense: 玩家承認感受到 → NOCTIS 順著走
  if (flags.act2_sense === 'feel') {
    lines.push(`你已經感覺到了，${name}……`);
    lines.push('既然身體已經回應了，何必再裝呢');
    lines.push('那股催促，是你自己想要的');
    lines.push('你說「有人在很近的地方叫我」——那就是我');
  }
  // act2_sense: 玩家否認 → NOCTIS 揭穿偽裝
  if (flags.act2_sense === 'numb') {
    lines.push(`「只是霧」——${name}，你騙得了貓糕，騙不了我`);
    lines.push('連自己想要什麼都不敢承認');
    lines.push('那才是最累的，不是嗎');
    lines.push('白天那些藉口，這裡用不上');
  }
  // act3_view: 玩家同情 Inu → NOCTIS 把 Inu 當作誘餌
  if (flags.act3_view === 'empathy') {
    lines.push('Inu 在裡面，比你想像的更放鬆');
    lines.push('你要不要也試試「不孤獨」是什麼感覺');
    lines.push('你說過——他一定很孤獨。那就進來陪他啊');
  }
  // act3_view: 玩家質疑 → NOCTIS 反問
  if (flags.act3_view === 'cynic') {
    lines.push('「怎麼可能甘願留下」？你看著好了');
    lines.push('連 Inu 都鬆開了領口');
    lines.push('你那麼篤定外面更好嗎？');
  }

  return lines;
}

// 戰前說明畫面：玩家點擊「準備好了」後才啟動彈幕
// showEasyOption: 玩家剛剛失敗過，提供簡單難度選項
let whisperEasyMode = false;

function _showBattlePrelude(onReady, showEasyOption) {
  const prelude = document.createElement('div');
  prelude.id = 'wb-prelude';
  prelude.style.cssText = `
    position: fixed; inset: 0; z-index: 199;
    background: linear-gradient(180deg, rgba(3,0,10,0.98) 0%, rgba(15,3,30,0.97) 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-family: 'Noto Serif TC', serif;
    color: rgba(245,234,216,0.9);
    opacity: 0; transition: opacity 0.8s ease;
  `;

  prelude.innerHTML = `
    <div style="
      max-width: 520px; width: 88%;
      text-align: center;
      border: 1px solid rgba(155,89,182,0.3);
      background: rgba(20,5,40,0.6);
      padding: 2.5rem 2rem;
      backdrop-filter: blur(6px);
    ">
      <div style="
        font-size: 0.7rem; letter-spacing: 0.25em;
        color: rgba(192,132,252,0.5); margin-bottom: 1.4rem;
        text-transform: uppercase;
      ">⚠ SYSTEM WARNING</div>

      <div style="
        font-size: 1.15rem; letter-spacing: 0.08em;
        color: rgba(192,132,252,0.95); margin-bottom: 1.2rem;
        line-height: 1.7;
      ">前方偵測到異常精神頻率</div>

      <div style="
        font-size: 0.85rem; line-height: 2;
        color: rgba(245,234,216,0.7); margin-bottom: 2rem;
      ">
        NOCTIS 的迴廊將試圖侵蝕你的意志。<br/>
        你必須撐過誘惑之語的衝擊，才能繼續前進。<br/>
        <span style="color:rgba(212,168,75,0.85);">移動滑鼠</span>閃避彈幕，
        <span style="color:rgba(212,168,75,0.85);">按 F 鍵召喚貓糕</span>清除一切精神擾亂及所有彈幕。<br/>
        <span style="font-size:0.8rem;color:rgba(245,234,216,0.35);">意志力歸零後，黑暗將吞沒你……</span>
      </div>

      <div style="
        display: flex; flex-direction: column; gap: 0.6rem;
        align-items: center;
      ">
        <button id="wb-prelude-start" style="
          background: rgba(155,89,182,0.2);
          border: 1px solid rgba(192,132,252,0.5);
          color: rgba(245,234,216,0.9);
          padding: 0.7rem 2.5rem;
          font-family: 'Noto Serif TC', serif;
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
        ">我已準備好 →</button>
        ${showEasyOption ? `
        <button id="wb-prelude-easy" style="
          background: transparent;
          border: 1px solid rgba(212,168,75,0.45);
          color: rgba(212,168,75,0.85);
          padding: 0.55rem 1.8rem;
          font-family: 'Noto Serif TC', serif;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.3rem;
        ">改用簡單難度（讓貓糕多護一下）</button>
        ` : ''}
        <div style="font-size:0.7rem;color:rgba(245,234,216,0.2);">
          （建議使用耳機）
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(prelude);
  requestAnimationFrame(() => { prelude.style.opacity = '1'; });

  const startBtn = document.getElementById('wb-prelude-start');
  startBtn.addEventListener('mouseenter', () => {
    startBtn.style.background = 'rgba(155,89,182,0.4)';
    startBtn.style.borderColor = 'rgba(192,132,252,0.9)';
    startBtn.style.color = '#fff';
  });
  startBtn.addEventListener('mouseleave', () => {
    startBtn.style.background = 'rgba(155,89,182,0.2)';
    startBtn.style.borderColor = 'rgba(192,132,252,0.5)';
    startBtn.style.color = 'rgba(245,234,216,0.9)';
  });
  startBtn.addEventListener('click', () => {
    prelude.style.opacity = '0';
    setTimeout(() => {
      prelude.remove();
      onReady();
    }, 800);
  });

  if (showEasyOption) {
    const easyBtn = document.getElementById('wb-prelude-easy');
    if (easyBtn) {
      easyBtn.addEventListener('mouseenter', () => {
        easyBtn.style.background = 'rgba(212,168,75,0.18)';
        easyBtn.style.borderColor = 'rgba(212,168,75,0.8)';
        easyBtn.style.color = '#f0d090';
      });
      easyBtn.addEventListener('mouseleave', () => {
        easyBtn.style.background = 'transparent';
        easyBtn.style.borderColor = 'rgba(212,168,75,0.45)';
        easyBtn.style.color = 'rgba(212,168,75,0.85)';
      });
      easyBtn.addEventListener('click', () => {
        whisperEasyMode = true;
        prelude.style.opacity = '0';
        setTimeout(() => {
          prelude.remove();
          onReady();
        }, 800);
      });
    }
  }
}

// 注入 SVG filter + keyframe CSS（只注入一次）
function _wbInjectStyles() {
  if (document.getElementById('wb-styles')) return;
  const style = document.createElement('style');
  style.id = 'wb-styles';
  style.textContent = `
    @keyframes wb-glitch-shift {
      0%   { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
      10%  { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
      20%  { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 1px); }
      30%  { clip-path: inset(10% 0 80% 0); transform: translate(3px, -1px); }
      40%  { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 2px); }
      50%  { clip-path: inset(80% 0 5%  0); transform: translate(2px, 0); }
      60%  { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 1px); }
      70%  { clip-path: inset(60% 0 20% 0); transform: translate(4px, -1px); }
      80%  { clip-path: inset(40% 0 40% 0); transform: translate(-1px, 2px); }
      90%  { clip-path: inset(5%  0 85% 0); transform: translate(1px, 0); }
      100% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
    }
    @keyframes wb-pulse-vignette {
      0%, 100% { opacity: 0.55; }
      50%       { opacity: 0.85; }
    }
    @keyframes wb-chromatic-drift {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(-3px, 1px); }
      50%  { transform: translate(3px, -1px); }
      75%  { transform: translate(-2px, 2px); }
      100% { transform: translate(0, 0); }
    }
    @keyframes wb-screen-shake {
      0%, 100% { transform: translate(0,0) rotate(0deg); }
      15%  { transform: translate(-6px, 3px) rotate(-0.4deg); }
      30%  { transform: translate(5px, -4px) rotate(0.3deg); }
      45%  { transform: translate(-4px, 5px) rotate(-0.2deg); }
      60%  { transform: translate(6px, -2px) rotate(0.4deg); }
      75%  { transform: translate(-3px, 4px) rotate(-0.3deg); }
      90%  { transform: translate(4px, -3px) rotate(0.2deg); }
    }
    @keyframes wb-noise {
      0%   { background-position: 0% 0%; }
      10%  { background-position: -5% -10%; }
      20%  { background-position: -15% 5%; }
      30%  { background-position: 7% -25%; }
      40%  { background-position: 20% 25%; }
      50%  { background-position: -25% 10%; }
      60%  { background-position: 15% 5%; }
      70%  { background-position: 0% 15%; }
      80%  { background-position: 25% 35%; }
      90%  { background-position: -10% 10%; }
      100% { background-position: 0% 0%; }
    }
  `;
  document.head.appendChild(style);

  // SVG filter for turbulence warp
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'wb-svg-filters';
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.cssText = 'position:absolute;pointer-events:none;';
  svg.innerHTML = `
    <defs>
      <filter id="wb-warp" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
        <feTurbulence id="wb-turbulence" type="fractalNoise" baseFrequency="0.015 0.008"
          numOctaves="3" seed="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise"
          id="wb-displace" scale="0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  `;
  document.body.appendChild(svg);
}

function startWhisperBattle(onWin, onLose) {
  _wbInjectStyles();

  const overlay = document.createElement('div');
  overlay.id = 'whisper-battle-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 200;
    background: linear-gradient(180deg, rgba(5,0,15,0.97) 0%, rgba(20,5,40,0.95) 100%);
    overflow: hidden; cursor: none;
    font-family: 'Noto Serif TC', serif;
  `;

  overlay.innerHTML = `
    <!-- 背景雜訊層（精神侵蝕質感） -->
    <div id="wb-noise-layer" style="
      position:absolute; inset:0; pointer-events:none; z-index:1; opacity:0;
      background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22turbulence%22 baseFrequency=%220.65%22 numOctaves=%224%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.4%22/></svg>');
      animation: wb-noise 0.15s steps(1) infinite;
      mix-blend-mode: overlay;
    "></div>

    <!-- 漸進式暗化暈映（意志消耗） -->
    <div id="wb-vignette" style="
      position:absolute; inset:0; pointer-events:none; z-index:2; opacity:0;
      background: radial-gradient(ellipse at center,
        transparent 30%,
        rgba(20,0,40,0.4) 60%,
        rgba(10,0,25,0.85) 100%);
      transition: opacity 1.2s ease;
    "></div>

    <!-- 色差層A（紅偏移） -->
    <div id="wb-chroma-r" style="
      position:absolute; inset:0; pointer-events:none; z-index:3; opacity:0;
      background: linear-gradient(135deg, rgba(180,20,60,0.12) 0%, transparent 50%, rgba(180,20,60,0.08) 100%);
      mix-blend-mode: screen;
      transition: opacity 0.8s;
    "></div>

    <!-- 色差層B（藍偏移） -->
    <div id="wb-chroma-b" style="
      position:absolute; inset:0; pointer-events:none; z-index:3; opacity:0;
      background: linear-gradient(315deg, rgba(20,60,180,0.12) 0%, transparent 50%, rgba(20,60,180,0.08) 100%);
      mix-blend-mode: screen;
      transition: opacity 0.8s;
    "></div>

    <!-- Glitch 複製層（殘影） -->
    <div id="wb-glitch-ghost" style="
      position:absolute; inset:0; pointer-events:none; z-index:4; opacity:0;
      background: inherit;
    "></div>

    <!-- 扭曲內容包裝層（套用 SVG warp filter） -->
    <div id="wb-warp-layer" style="position:absolute;inset:0;z-index:5;">

      <!-- 長廊背景線條 -->
      <div id="wb-corridor" style="
        position:absolute; inset:0;
        background:
          repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(155,89,182,0.06) 50px),
          linear-gradient(180deg, transparent 60px, rgba(100,50,150,0.04) 100%);
      "></div>

      <!-- 彈幕容器 -->
      <div id="wb-bullets" style="position:absolute;inset:0;pointer-events:none;"></div>

      <!-- 玩家護盾 -->
      <div id="wb-player" style="
        position:absolute;
        width:48px; height:48px; border-radius:50%;
        background:radial-gradient(circle, rgba(245,234,216,0.95) 0%, rgba(192,132,252,0.45) 60%, transparent 100%);
        border:2px solid rgba(245,234,216,0.7);
        box-shadow:0 0 14px rgba(192,132,252,0.6);
        pointer-events:none;
        display:flex; align-items:center; justify-content:center;
        font-size:1.1rem;
        transition: box-shadow 0.1s;
      ">✦</div>

      <!-- 貓糕護盾特效層 -->
      <div id="wb-shield-aura" style="
        position:absolute; border-radius:50%;
        width:90px; height:90px;
        background:radial-gradient(circle, rgba(212,168,75,0.3) 0%, rgba(212,168,75,0.1) 50%, transparent 70%);
        border:1.5px solid rgba(212,168,75,0.5);
        box-shadow: 0 0 20px rgba(212,168,75,0.3);
        pointer-events:none; opacity:0;
        transition:opacity 0.3s;
      "></div>

    </div><!-- /wb-warp-layer -->

    <!-- UI層（不受扭曲影響） -->
    <div id="wb-ui" style="position:absolute;inset:0;pointer-events:none;z-index:15;">

      <!-- 狀態列 -->
      <div id="wb-status" style="
        position:absolute; top:16px; left:50%; transform:translateX(-50%);
        display:flex; gap:1.8rem; align-items:center;
        background:rgba(0,0,0,0.4); padding:8px 20px; border-radius:20px;
        backdrop-filter:blur(4px);
        pointer-events:none;
      ">
        <div style="color:rgba(192,132,252,0.9);font-size:0.9rem;letter-spacing:0.05em;">
          意志力：<span id="wb-will">❤❤❤</span>
        </div>
        <div style="color:rgba(245,234,216,0.5);font-size:0.8rem;">
          <span id="wb-progress-text">前進中……</span>
        </div>
      </div>

      <!-- 進度條 -->
      <div style="
        position:absolute; bottom:0; left:0; right:0; height:5px;
        background:rgba(155,89,182,0.2);
      ">
        <div id="wb-progress-bar" style="
          height:100%; width:0%;
          background:linear-gradient(90deg, rgba(192,132,252,0.7), rgba(212,168,75,0.9));
          transition:width 0.3s;
          box-shadow: 0 0 8px rgba(192,132,252,0.5);
        "></div>
      </div>

      <!-- 訊息提示 -->
      <div id="wb-message" style="
        position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
        color:rgba(192,132,252,0.85); font-size:0.85rem; pointer-events:none;
        opacity:0; transition:opacity 0.4s;
        text-shadow: 0 0 10px rgba(192,132,252,0.5);
        white-space:nowrap;
      "></div>

    </div><!-- /wb-ui -->

    <!-- 貓糕按鈕（UI層外，需要 pointer-events） -->
    <div id="wb-kaogao-btn" style="
      position:absolute; bottom:70px; right:28px;
      width:100px; height:100px; border-radius:50%;
      background:radial-gradient(circle, rgba(212,168,75,0.2) 0%, rgba(212,168,75,0.05) 100%);
      border:2px solid rgba(212,168,75,0.6);
      box-shadow: 0 0 16px rgba(212,168,75,0.25);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      cursor:pointer; z-index:20; transition:all 0.2s;
      font-family:'Noto Serif TC',serif;
      color:rgba(212,168,75,0.9);
      text-align:center; line-height:1.6;
      user-select:none;
    ">
      <div style="font-size:2rem;">🐾</div>
      <div style="font-size:0.75rem;">呼喚貓糕</div>
      <div id="wb-shield-count" style="font-size:0.65rem;color:rgba(212,168,75,0.6);">×3</div>
    </div>
  `;

  document.body.appendChild(overlay);

  const W = window.innerWidth;
  const H = window.innerHeight;

  whisperBattleState = {
    px: W / 2, py: H * 0.75,
    will: whisperEasyMode ? 8 : 5,
    initialWill: whisperEasyMode ? 8 : 5,
    shieldsLeft: whisperEasyMode ? 6 : 4,
    easy: whisperEasyMode,
    shieldActive: false,
    shieldTimer: null,
    invincible: false,
    invincibleTimer: null,
    progress: 0,
    progressTimer: null,
    bulletTimer: null,
    waveTimer: null,
    glitchTimer: null,
    active: true,
    onWin, onLose,
  };

  _wbSetPlayerPos(W / 2, H * 0.75);
  _wbUpdateCorruption(0); // 初始無效果

  // 同步意志力與貓糕次數的初始 UI
  const willEl0 = document.getElementById('wb-will');
  if (willEl0) willEl0.textContent = '❤'.repeat(whisperBattleState.will);
  const countEl0 = document.getElementById('wb-shield-count');
  if (countEl0) countEl0.textContent = '×' + whisperBattleState.shieldsLeft;

  overlay.addEventListener('mousemove', e => {
    if (!whisperBattleState.active) return;
    whisperBattleState.px = e.clientX;
    whisperBattleState.py = e.clientY;
    _wbSetPlayerPos(e.clientX, e.clientY);
    if (whisperBattleState.shieldActive) _wbSetShieldPos(e.clientX, e.clientY);
  });

  overlay.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!whisperBattleState.active) return;
    const t = e.touches[0];
    whisperBattleState.px = t.clientX;
    whisperBattleState.py = t.clientY;
    _wbSetPlayerPos(t.clientX, t.clientY);
    if (whisperBattleState.shieldActive) _wbSetShieldPos(t.clientX, t.clientY);
  }, { passive: false });

  // 鍵盤快捷鍵：F 鍵呼喚貓糕
  const keyHandler = (e) => {
    if (!whisperBattleState || !whisperBattleState.active) return;
    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      _wbActivateShield();
    }
  };
  document.addEventListener('keydown', keyHandler);
  whisperBattleState.keyHandler = keyHandler; // 儲存以便清理

  document.getElementById('wb-kaogao-btn').addEventListener('click', _wbActivateShield);

  whisperBattleState.progressTimer = setInterval(_wbTickProgress, 200);
  _wbStartWave(1);

  _wbShowMessage('NOCTIS 的聲音試圖侵蝕你的意志……');
  setTimeout(() => _wbShowMessage('移動滑鼠閃避誘惑之語，按 F 鍵呼喚貓糕獲得護盾'), 2800);
}

function _wbSetPlayerPos(x, y) {
  const el = document.getElementById('wb-player');
  if (el) { el.style.left = (x - 24) + 'px'; el.style.top = (y - 24) + 'px'; }
}

function _wbSetShieldPos(x, y) {
  const el = document.getElementById('wb-shield-aura');
  if (el) { el.style.left = (x - 45) + 'px'; el.style.top = (y - 45) + 'px'; }
}

function _wbShowMessage(text) {
  const el = document.getElementById('wb-message');
  if (!el) return;
  el.textContent = text;
  el.style.opacity = '1';
  setTimeout(() => { if (el) el.style.opacity = '0'; }, 2200);
}

// 核心：根據受傷程度更新畫面侵蝕效果
// damage = 0(完好) → 1(輕傷) → 2(重傷) → 3(崩潰)
function _wbUpdateCorruption(damage) {
  const noiseLayer  = document.getElementById('wb-noise-layer');
  const vignette    = document.getElementById('wb-vignette');
  const chromaR     = document.getElementById('wb-chroma-r');
  const chromaB     = document.getElementById('wb-chroma-b');
  const warpLayer   = document.getElementById('wb-warp-layer');
  const turbulence  = document.getElementById('wb-turbulence');
  const displace    = document.getElementById('wb-displace');

  // 程度 0：乾淨
  if (damage === 0) {
    if (noiseLayer) noiseLayer.style.opacity = '0';
    if (vignette)   vignette.style.opacity   = '0';
    if (chromaR)    chromaR.style.opacity    = '0';
    if (chromaB)    chromaB.style.opacity    = '0';
    if (warpLayer)  warpLayer.style.filter   = 'none';
    if (displace)   displace.setAttribute('scale', '0');
    return;
  }

  // 程度 1：輕微——雜訊浮現，暗角出現
  if (damage === 1) {
    if (noiseLayer) noiseLayer.style.opacity = '0.18';
    if (vignette)   vignette.style.opacity   = '0.4';
    if (chromaR)    chromaR.style.opacity    = '0.3';
    if (chromaB)    chromaB.style.opacity    = '0.3';
    if (warpLayer)  warpLayer.style.filter   = 'blur(0.4px) contrast(1.05)';
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.012 0.006');
    if (displace)   displace.setAttribute('scale', '8');
    return;
  }

  // 程度 2：明顯——扭曲加深，色差分離，螢幕輕微搖晃
  if (damage === 2) {
    if (noiseLayer) noiseLayer.style.opacity = '0.35';
    if (vignette)   vignette.style.opacity   = '0.7';
    if (chromaR)    chromaR.style.opacity    = '0.6';
    if (chromaB)    chromaB.style.opacity    = '0.6';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(0.8px) contrast(1.1)';
      warpLayer.style.animation = 'wb-chromatic-drift 3s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.025 0.015');
    if (displace)   displace.setAttribute('scale', '22');
    // 讓暗角也脈動
    if (vignette)   vignette.style.animation = 'wb-pulse-vignette 2s ease-in-out infinite';
    return;
  }

  // 程度 3（崩潰預備）：強烈 glitch，畫面撕裂
  if (damage >= 3) {
    if (noiseLayer) noiseLayer.style.opacity = '0.55';
    if (vignette)   vignette.style.opacity   = '0.9';
    if (chromaR)    chromaR.style.opacity    = '1';
    if (chromaB)    chromaB.style.opacity    = '1';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(1.5px) contrast(1.2) saturate(1.4)';
      warpLayer.style.animation = 'wb-screen-shake 0.25s ease-in-out infinite, wb-chromatic-drift 1.5s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.05 0.03');
    if (displace)   displace.setAttribute('scale', '45');
    if (vignette)   vignette.style.animation = 'wb-pulse-vignette 0.8s ease-in-out infinite';
  }
}

// 受擊瞬間：觸發短暫 glitch 閃爍
function _wbGlitchFlash() {
  const warpLayer  = document.getElementById('wb-warp-layer');
  const chromaR    = document.getElementById('wb-chroma-r');
  const chromaB    = document.getElementById('wb-chroma-b');
  const displace   = document.getElementById('wb-displace');

  // 瞬間拉高扭曲
  if (displace) {
    const currentScale = parseInt(displace.getAttribute('scale') || '0');
    displace.setAttribute('scale', currentScale + 50);
    setTimeout(() => {
      if (displace) displace.setAttribute('scale', currentScale);
    }, 350);
  }

  // 色差閃爍
  const origR = chromaR ? chromaR.style.opacity : '0';
  const origB = chromaB ? chromaB.style.opacity : '0';
  if (chromaR) chromaR.style.opacity = '1';
  if (chromaB) chromaB.style.opacity = '1';
  setTimeout(() => {
    if (chromaR) chromaR.style.opacity = origR;
    if (chromaB) chromaB.style.opacity = origB;
  }, 400);

  // 畫面短震
  const overlay = document.getElementById('whisper-battle-overlay');
  if (overlay) {
    overlay.style.animation = 'wb-screen-shake 0.3s ease-in-out';
    setTimeout(() => { if (overlay) overlay.style.animation = ''; }, 300);
  }
}

function _wbActivateShield() {
  const s = whisperBattleState;
  if (!s || !s.active || s.shieldsLeft <= 0 || s.shieldActive) return;
  s.shieldsLeft--;
  s.shieldActive = true;

  const countEl = document.getElementById('wb-shield-count');
  if (countEl) countEl.textContent = '×' + s.shieldsLeft;

  // 清除所有彈幕
  // 清理子彈池和 rAF
  if (_wbRafId) { cancelAnimationFrame(_wbRafId); _wbRafId = null; }
  _wbBulletPool = [];

  const bulletsContainer = document.getElementById('wb-bullets');
  if (bulletsContainer) {
    const bullets = bulletsContainer.querySelectorAll('div');
    bullets.forEach(bullet => {
      bullet.style.transition = 'opacity 0.3s, transform 0.3s';
      bullet.style.opacity = '0';
      bullet.style.transform = 'scale(0.5)';
      setTimeout(() => bullet.remove(), 300);
    });
  }

  // 金色光環特效
  const aura = document.getElementById('wb-shield-aura');
  if (aura) {
    aura.style.opacity = '1';
    aura.style.width = '150px';
    aura.style.height = '150px';
    _wbSetShieldPos(s.px, s.py);
  }

  // 清除扭曲效果（貓糕的聲音讓意識清醒）
  const warpLayer = document.getElementById('wb-warp-layer');
  if (warpLayer) {
    const savedFilter = warpLayer.style.filter;
    const savedAnim   = warpLayer.style.animation;
    warpLayer.style.filter    = 'brightness(1.2) saturate(0.8)';
    warpLayer.style.animation = 'none';

    s.shieldTimer = setTimeout(() => {
      s.shieldActive = false;
      if (aura) {
        aura.style.opacity = '0';
        aura.style.width = '90px';
        aura.style.height = '90px';
      }
      if (warpLayer) {
        warpLayer.style.filter    = savedFilter;
        warpLayer.style.animation = savedAnim;
      }
      if (s.shieldsLeft === 0) _wbShowMessage('貓糕的聲音已經用盡了……只能靠自己了。');
    }, 2000);
  }

  _wbShowEpicMessage('喵——！');
  setTimeout(() => _wbShowMessage('彈幕被清除了！'), 500);

  const btn = document.getElementById('wb-kaogao-btn');
  if (btn) {
    btn.style.opacity = '0.35';
    btn.style.pointerEvents = 'none';
    // 8秒冷卻
    let cd = 8;
    const cdInterval = setInterval(() => {
      cd--;
      const cdEl = document.getElementById('wb-shield-count');
      if (cd > 0 && cdEl) cdEl.textContent = `冷卻 ${cd}s`;
      if (cd <= 0) {
        clearInterval(cdInterval);
        if (btn && s.shieldsLeft > 0) {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
          if (cdEl) cdEl.textContent = '×' + s.shieldsLeft;
        } else if (btn) {
          btn.style.opacity = '0.25';
          if (cdEl) cdEl.textContent = '用盡';
        }
      }
    }, 1000);
  }
}

function _wbTickProgress() {
  const s = whisperBattleState;
  if (!s || !s.active) return;
  s.progress = Math.min(100, s.progress + 0.194);
  const bar = document.getElementById('wb-progress-bar');
  if (bar) bar.style.width = s.progress + '%';

  const textEl = document.getElementById('wb-progress-text');
  if (textEl) {
    if      (s.progress < 17)  textEl.textContent = '前進中……';
    else if (s.progress < 34)  textEl.textContent = '它開始注意到你了……';
    else if (s.progress < 50)  textEl.textContent = '還有一半……';
    else if (s.progress < 65)  textEl.textContent = '快到了……';
    else if (s.progress < 80)  textEl.textContent = '再撐一下……！';
    else if (s.progress < 95)  textEl.textContent = '即將突破……！';
    else                       textEl.textContent = '就是現在——！';
  }

  if (s.progress >= 24  && !s._mid24)  { s._mid24  = true; _wbShowMessage('音樂變了——它在試探你……'); }
  if (s.progress >= 50  && !s._mid50)  { s._mid50  = true; _wbShowMessage('一半了——你還記得為什麼來這裡嗎？'); }
  if (s.progress >= 75  && !s._mid75)  { s._mid75  = true; _wbShowMessage('貓糕在你身後！再撐住！'); }
  if (s.progress >= 90  && !s._mid90)  { s._mid90  = true; _wbShowMessage('出口就在前方——！'); }
  if (s.progress >= 100) _wbEndBattle(true);
}

function _wbStartWave(wave) {
  const s = whisperBattleState;
  if (!s || !s.active) return;

  // 配合 Doppleganger 音樂結構 (1:43 總長)
  // Wave 1: 0-18s   鋼琴獨奏，平穩
  // Wave 2: 18-25s  伴奏加入，緊張感
  // Wave 3: 25-35s  電吉他，搖滾元素
  // Wave 4: 35-43s  鼓點加入
  // Wave 5: 43-52s  人聲吟唱
  // Wave 6: 52-78s  緊湊鋼琴獨奏（長段落）
  // Wave 7: 78-103s 最終高潮，電吉他回歸

  const waveConfig = [
    { duration: 18000, interval: 1100, speed: 0.7,  aimed: 0,    burst: 0,    burstFreq: 0,    isRest: false }, // Wave 1: 0-18s 平穩鋼琴
    { duration: 7000,  interval: 850,  speed: 0.9,  aimed: 0.15, burst: 0,    burstFreq: 0,    isRest: false }, // Wave 2: 18-25s 伴奏加入
    { duration: 10000, interval: 680,  speed: 1.05, aimed: 0.28, burst: 0.12, burstFreq: 10000, isRest: false }, // Wave 3: 25-35s 電吉他
    { duration: 8000,  interval: 550,  speed: 1.2,  aimed: 0.36, burst: 0.2,  burstFreq: 7500, isRest: false }, // Wave 4: 35-43s 鼓點
    { duration: 4000,  interval: 0,    speed: 0,    aimed: 0,    burst: 0,    burstFreq: 0,    isRest: true  }, // Wave 5: 43-47s 休息波次
    { duration: 5000,  interval: 480,  speed: 1.3,  aimed: 0.42, burst: 0.24, burstFreq: 6500, isRest: false }, // Wave 6: 47-52s 人聲
    { duration: 26000, interval: 420,  speed: 1.45, aimed: 0.46, burst: 0.28, burstFreq: 5000, isRest: false }, // Wave 7: 52-78s 緊湊鋼琴
    { duration: 4000,  interval: 0,    speed: 0,    aimed: 0,    burst: 0,    burstFreq: 0,    isRest: true  }, // Wave 8: 78-82s 休息波次
    { duration: 21000, interval: 340,  speed: 1.6,  aimed: 0.52, burst: 0.36, burstFreq: 4000, isRest: false }, // Wave 9: 82-103s 最終高潮
  ];

  const config = waveConfig[wave - 1];
  if (!config) return;

  // 休息波次：顯示 NOCTIS 的嘲諷對話
  if (config.isRest) {
    const restDialogues = [
      '你還在掙扎？\n\n真可愛。\n\n你以為你能走到最後嗎？',
      '感覺到了嗎？\n\n那股疲憊……\n\n放棄吧，這裡沒有人會責怪你。',
    ];
    const dialogueIndex = wave === 5 ? 0 : 1;
    _wbShowRestDialogue(restDialogues[dialogueIndex], config.duration);

    s.waveTimer = setTimeout(() => {
      _wbStartWave(wave + 1);
    }, config.duration);
    return;
  }

  // 簡單難度：彈幕變慢、間隔變寬、指向/散射機率減半
  const easy = s.easy;
  const interval = easy ? config.interval * 1.5 : config.interval;
  const speed = easy ? config.speed * 0.7 : config.speed;
  const aimedRate = easy ? config.aimed * 0.5 : config.aimed;
  const burstRate = easy ? config.burst * 0.5 : config.burst;
  const burstFreq = easy ? config.burstFreq * 1.5 : config.burstFreq;

  // 波次警告
  if (wave > 1 && !config.isRest) {
    const waveNames = [
      '',
      '它開始低語……',
      '誘惑之語，加深了……',
      '',
      '節奏在加速……',
      '它知道你的名字……',
      '',
      '你的抵抗在消融……',
      '最後一道防線——！',
      ''
    ];
    _wbShowMessage(waveNames[wave] || `—— 第 ${wave} 波 ——`);
  }

  s.bulletTimer = setInterval(() => {
    if (!s.active) return;
    _wbSpawnBullet(speed, wave);
    // 指向性彈幕
    if (Math.random() < aimedRate) _wbSpawnAimedBullet(speed * 0.85);
    // 散射彈幕
    if (Math.random() < burstRate) _wbSpawnBurst(speed * 0.7);
  }, interval);

  // 定期散射彈幕（從 Wave 3 開始）
  if (burstFreq > 0) {
    s.burstInterval = setInterval(() => {
      if (!s.active) return;
      _wbSpawnBurst(speed * 0.75);
    }, burstFreq);
  }

  // 隨波次增加視覺扭曲效果
  _wbApplyWaveCorruption(wave);

  if (wave < 9) {
    s.waveTimer = setTimeout(() => {
      clearInterval(s.bulletTimer);
      if (s.burstInterval) clearInterval(s.burstInterval);
      _wbStartWave(wave + 1);
    }, config.duration);
  }
}

function _wbSpawnBullet(speed, wave) {
  const s = whisperBattleState;
  const container = document.getElementById('wb-bullets');
  if (!container || !s.active) return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const _lines = _wbGetWhisperLines();
  const text = _lines[Math.floor(Math.random() * _lines.length)];

  const side = Math.floor(Math.random() * 4);
  let startX, startY, dirX, dirY;
  switch(side) {
    case 0: startX = Math.random()*W; startY = -30;   dirX = (Math.random()-0.5)*0.6; dirY = speed; break;
    case 1: startX = -130;  startY = Math.random()*H; dirX = speed; dirY = (Math.random()-0.5)*0.6; break;
    case 2: startX = W+20;  startY = Math.random()*H; dirX = -speed; dirY = (Math.random()-0.5)*0.6; break;
    case 3: startX = Math.random()*W; startY = H+10;  dirX = (Math.random()-0.5)*0.6; dirY = -speed*0.8; break;
  }

  // 高波次彈幕顏色更紅（侵蝕感）
  const r = Math.min(255, 192 + wave * 8);
  const g = Math.max(80,  132 - wave * 10);
  const alpha = 0.55 + Math.random() * 0.35;

  const bullet = document.createElement('div');
  bullet.style.cssText = `
    position:absolute;
    font-size:${0.78 + Math.random() * 0.35}rem;
    color:rgba(${r},${g},252,${alpha});
    white-space:nowrap;
    font-family:'Noto Serif TC',serif;
    text-shadow: 0 0 10px rgba(155,89,182,0.7), 2px 0 0 rgba(180,20,60,0.3), -2px 0 0 rgba(20,60,180,0.3);
    pointer-events:none;
    left:${startX}px; top:${startY}px;
  `;
  bullet.textContent = text;
  container.appendChild(bullet);

  _wbMoveBullet(bullet, startX, startY, dirX, dirY, 1.5, s);
}

function _wbSpawnAimedBullet(speed) {
  const s = whisperBattleState;
  const container = document.getElementById('wb-bullets');
  if (!container || !s.active) return;

  const W = window.innerWidth;
  const H = window.innerHeight;

  // 從最近的邊緣生成，直接朝玩家飛去
  const side = Math.floor(Math.random() * 4);
  let startX, startY;
  switch(side) {
    case 0: startX = Math.random()*W; startY = -30;  break;
    case 1: startX = -130; startY = Math.random()*H; break;
    case 2: startX = W+20; startY = Math.random()*H; break;
    case 3: startX = Math.random()*W; startY = H+10; break;
  }

  const dx = s.px - startX;
  const dy = s.py - startY;
  const dist = Math.sqrt(dx*dx + dy*dy) || 1;
  const dirX = (dx/dist) * speed;
  const dirY = (dy/dist) * speed;

  const _lines = _wbGetWhisperLines();
  const text = _lines[Math.floor(Math.random() * _lines.length)];
  const bullet = document.createElement('div');
  bullet.style.cssText = `
    position:absolute;
    font-size:0.72rem;
    color:rgba(240,100,180,0.8);
    white-space:nowrap;
    font-family:'Noto Serif TC',serif;
    text-shadow: 0 0 12px rgba(240,100,180,0.6), 3px 0 0 rgba(180,20,60,0.5), -3px 0 0 rgba(20,60,180,0.4);
    pointer-events:none;
    left:${startX}px; top:${startY}px;
  `;
  bullet.textContent = '→ ' + text;
  document.getElementById('wb-bullets').appendChild(bullet);

  _wbMoveBullet(bullet, startX, startY, dirX, dirY, 1.8, s);
}

function _wbSpawnBurst(speed) {
  const s = whisperBattleState;
  const container = document.getElementById('wb-bullets');
  if (!container || !s.active) return;

  // 8方向包圍，從玩家周圍 300px 處向玩家收縮
  const count = 8;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = 300;
    const startX = s.px + Math.cos(angle) * r;
    const startY = s.py + Math.sin(angle) * r;
    const dirX = -Math.cos(angle) * speed;
    const dirY = -Math.sin(angle) * speed;

    const _lines = _wbGetWhisperLines();
    const text = '……' + _lines[Math.floor(Math.random() * _lines.length)];
    const bullet = document.createElement('div');
    bullet.style.cssText = `
      position:absolute;
      font-size:0.65rem;
      color:rgba(200,150,255,0.6);
      white-space:nowrap;
      font-family:'Noto Serif TC',serif;
      text-shadow: 0 0 8px rgba(155,89,182,0.8);
      pointer-events:none;
      left:${startX}px; top:${startY}px;
    `;
    bullet.textContent = text;
    container.appendChild(bullet);

    _wbMoveBullet(bullet, startX, startY, dirX, dirY, 1.2, s);
  }
}

// 全域子彈池，統一用單一 rAF 管理
let _wbBulletPool = [];
let _wbRafId = null;

function _wbStartLoop() {
  if (_wbRafId) return;
  function loop() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const s = whisperBattleState;
    const alive = [];

    for (let i = 0; i < _wbBulletPool.length; i++) {
      const b = _wbBulletPool[i];
      if (!b.el.parentNode || !s || !s.active) {
        if (b.el.parentNode) b.el.remove();
        continue;
      }

      b.lifetime += 16;
      if (b.lifetime >= 7000) {
        b.el.style.opacity = '0';
        setTimeout(() => b.el.remove(), 500);
        continue;
      }

      b.x += b.dx * b.mult;
      b.y += b.dy * b.mult;
      b.el.style.left = b.x + 'px';
      b.el.style.top  = b.y + 'px';

      // 碰撞偵測
      const ddx = b.x - s.px;
      const ddy = b.y - s.py;
      if (Math.sqrt(ddx*ddx + ddy*ddy) < 24) {
        if (s.shieldActive) {
          b.el.style.opacity = '0';
          setTimeout(() => b.el.remove(), 250);
          continue;
        } else if (!s.invincible) {
          _wbHitPlayer();
          b.el.style.opacity = '0';
          setTimeout(() => b.el.remove(), 200);
          continue;
        }
      }

      // 出界
      if (b.x < -250 || b.x > W+250 || b.y < -150 || b.y > H+150) {
        b.el.remove();
        continue;
      }

      alive.push(b);
    }

    _wbBulletPool = alive;

    if (_wbBulletPool.length > 0 && s && s.active) {
      _wbRafId = requestAnimationFrame(loop);
    } else {
      _wbRafId = null;
    }
  }
  _wbRafId = requestAnimationFrame(loop);
}

function _wbMoveBullet(bullet, startX, startY, dirX, dirY, multiplier, s) {
  // 把子彈加入統一管理池
  _wbBulletPool.push({
    el: bullet,
    x: startX, y: startY,
    dx: dirX, dy: dirY,
    mult: multiplier,
    lifetime: 0
  });
  _wbStartLoop();
}

function _wbHitPlayer() {
  const s = whisperBattleState;
  if (!s || !s.active || s.invincible) return;

  s.will--;
  s.invincible = true;
  // damage level：用比例正規化到 0-4，避免 easy 模式的多血量打亂視覺侵蝕
  const initWill = s.initialWill || 5;
  const damage = Math.min(4, Math.ceil(((initWill - s.will) / initWill) * 4));

  // 清空所有彈幕
  const bulletsContainer = document.getElementById('wb-bullets');
  if (bulletsContainer) {
    const bullets = bulletsContainer.querySelectorAll('div');
    bullets.forEach(bullet => {
      if (bullet._moveInterval) {
        clearInterval(bullet._moveInterval);
        bullet._moveInterval = null;
      }
      bullet.style.transition = 'opacity 0.3s';
      bullet.style.opacity = '0';
      setTimeout(() => bullet.remove(), 300);
    });
  }

  // 更新侵蝕視覺
  _wbUpdateCorruption(damage);
  _wbGlitchFlash();

  // 玩家閃爍
  const playerEl = document.getElementById('wb-player');
  if (playerEl) {
    playerEl.style.background = 'radial-gradient(circle, rgba(240,60,80,0.95) 0%, rgba(192,50,100,0.4) 60%, transparent 100%)';
    playerEl.style.boxShadow  = '0 0 24px rgba(240,60,80,0.9)';
    setTimeout(() => {
      if (playerEl) {
        playerEl.style.background = 'radial-gradient(circle, rgba(245,234,216,0.95) 0%, rgba(192,132,252,0.45) 60%, transparent 100%)';
        playerEl.style.boxShadow  = '0 0 14px rgba(192,132,252,0.6)';
      }
    }, 700);
  }

  // 更新意志力顯示
  const willEl = document.getElementById('wb-will');
  if (willEl) willEl.textContent = '❤'.repeat(Math.max(0, s.will)) + '🖤'.repeat((s.initialWill || 5) - Math.max(0, s.will));

  const hitMessages = [
    '記住，我們是來找 Inu 的……！',
    '喵！別聽那些聲音——',
    '……你要撐住！',
    '不要放棄……！',
    '最後一次機會了……！',
  ];
  _wbShowEpicMessage(hitMessages[damage - 1] || '……不要放棄');

  s.invincibleTimer = setTimeout(() => { s.invincible = false; }, 2000);

  if (s.will <= 0) setTimeout(() => _wbEndBattle(false), 500);
}

function _wbEndBattle(won) {
  const s = whisperBattleState;
  if (!s || !s.active) return;
  s.active = false;

  clearInterval(s.progressTimer);
  clearInterval(s.bulletTimer);
  clearTimeout(s.waveTimer);
  clearTimeout(s.shieldTimer);
  clearTimeout(s.invincibleTimer);
  if (s.burstInterval) clearInterval(s.burstInterval);
  if (s.glitchInterval) clearInterval(s.glitchInterval);
  if (s.keyHandler) document.removeEventListener('keydown', s.keyHandler);

  const overlay = document.getElementById('whisper-battle-overlay');

  if (won) {
    // 勝利：逐漸清除所有扭曲，畫面恢復
    _wbUpdateCorruption(0);
    const warpLayer = document.getElementById('wb-warp-layer');
    if (warpLayer) { warpLayer.style.filter = 'brightness(1.1)'; warpLayer.style.animation = 'none'; }
    if (overlay) {
      overlay.style.transition = 'background 1.2s';
      overlay.style.background = 'linear-gradient(180deg, rgba(5,0,15,0.95) 0%, rgba(50,20,90,0.92) 100%)';
    }
    _wbShowMessage('你穿越了誘惑的長廊。意志，依然完整。');
    setTimeout(() => {
      if (overlay) overlay.remove();
      whisperBattleState = null;
      if (s.onWin) s.onWin();
    }, 2000);
  } else {
    // 失敗：全面崩潰，然後重新挑戰
    _wbUpdateCorruption(3);
    if (overlay) {
      overlay.style.transition = 'background 2s';
      overlay.style.background = 'linear-gradient(180deg, rgba(30,5,50,0.99) 0%, rgba(80,20,120,0.98) 100%)';
    }
    _wbShowMessage('……意志崩潰了。');
    setTimeout(() => {
      _wbShowEpicMessage('當精神即將崩潰時，召喚貓糕，回想起自己的目的。');
    }, 2500);
    setTimeout(() => {
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          whisperBattleState = null;
          // 重新開始戰鬥
          if (s.onLose) s.onLose();
        }, 800);
      }
    }, 5500);
  }
}
// 隨波次增加的視覺扭曲效果（獨立於受傷系統）
function _wbApplyWaveCorruption(wave) {
  const noiseLayer  = document.getElementById('wb-noise-layer');
  const vignette    = document.getElementById('wb-vignette');
  const chromaR     = document.getElementById('wb-chroma-r');
  const chromaB     = document.getElementById('wb-chroma-b');
  const warpLayer   = document.getElementById('wb-warp-layer');
  const turbulence  = document.getElementById('wb-turbulence');
  const displace    = document.getElementById('wb-displace');
  const overlay     = document.getElementById('whisper-battle-overlay');

  // Wave 1: 乾淨，無扭曲
  if (wave === 1) {
    if (noiseLayer) noiseLayer.style.opacity = '0';
    if (vignette)   vignette.style.opacity   = '0.1';
    if (chromaR)    chromaR.style.opacity    = '0';
    if (chromaB)    chromaB.style.opacity    = '0';
    if (warpLayer)  warpLayer.style.filter   = 'none';
    if (displace)   displace.setAttribute('scale', '0');
  }

  // Wave 2: 輕微雜訊
  if (wave === 2) {
    if (noiseLayer) noiseLayer.style.opacity = '0.12';
    if (vignette)   vignette.style.opacity   = '0.25';
    if (chromaR)    chromaR.style.opacity    = '0.15';
    if (chromaB)    chromaB.style.opacity    = '0.15';
    if (warpLayer)  warpLayer.style.filter   = 'blur(0.3px)';
    if (displace)   displace.setAttribute('scale', '3');
  }

  // Wave 3: 色差開始出現
  if (wave === 3) {
    if (noiseLayer) noiseLayer.style.opacity = '0.2';
    if (vignette)   vignette.style.opacity   = '0.35';
    if (chromaR)    chromaR.style.opacity    = '0.3';
    if (chromaB)    chromaB.style.opacity    = '0.3';
    if (warpLayer)  warpLayer.style.filter   = 'blur(0.5px) contrast(1.05)';
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.01 0.005');
    if (displace)   displace.setAttribute('scale', '8');

    // 短暫閃爍黑屏
    _wbBlackFlash(150);
  }

  // Wave 4: 扭曲加深
  if (wave === 4) {
    if (noiseLayer) noiseLayer.style.opacity = '0.28';
    if (vignette)   vignette.style.opacity   = '0.5';
    if (chromaR)    chromaR.style.opacity    = '0.45';
    if (chromaB)    chromaB.style.opacity    = '0.45';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(0.7px) contrast(1.08)';
      warpLayer.style.animation = 'wb-chromatic-drift 4s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.018 0.01');
    if (displace)   displace.setAttribute('scale', '15');

    // 畫面短暫反轉
    _wbInvertFlash(200);
  }

  // Wave 5: 明顯扭曲，暗角脈動
  if (wave === 5) {
    if (noiseLayer) noiseLayer.style.opacity = '0.38';
    if (vignette)   {
      vignette.style.opacity = '0.65';
      vignette.style.animation = 'wb-pulse-vignette 2.5s ease-in-out infinite';
    }
    if (chromaR)    chromaR.style.opacity    = '0.6';
    if (chromaB)    chromaB.style.opacity    = '0.6';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(1px) contrast(1.12)';
      warpLayer.style.animation = 'wb-chromatic-drift 3s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.025 0.015');
    if (displace)   displace.setAttribute('scale', '25');

    // 模糊脈衝
    _wbBlurPulse();
  }

  // Wave 6: 強烈扭曲，畫面開始搖晃
  if (wave === 6) {
    if (noiseLayer) noiseLayer.style.opacity = '0.48';
    if (vignette)   {
      vignette.style.opacity = '0.75';
      vignette.style.animation = 'wb-pulse-vignette 1.8s ease-in-out infinite';
    }
    if (chromaR)    chromaR.style.opacity    = '0.75';
    if (chromaB)    chromaB.style.opacity    = '0.75';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(1.3px) contrast(1.15) saturate(1.2)';
      warpLayer.style.animation = 'wb-screen-shake 0.4s ease-in-out infinite, wb-chromatic-drift 2s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.035 0.022');
    if (displace)   displace.setAttribute('scale', '35');

    // 黑屏閃爍 + 反轉
    _wbBlackFlash(200);
    setTimeout(() => _wbInvertFlash(180), 3000);
  }

  // Wave 7: 極限崩潰，所有效果最大化
  if (wave === 7) {
    if (noiseLayer) noiseLayer.style.opacity = '0.6';
    if (vignette)   {
      vignette.style.opacity = '0.85';
      vignette.style.animation = 'wb-pulse-vignette 1s ease-in-out infinite';
    }
    if (chromaR)    chromaR.style.opacity    = '0.9';
    if (chromaB)    chromaB.style.opacity    = '0.9';
    if (warpLayer)  {
      warpLayer.style.filter = 'url(#wb-warp) blur(1.8px) contrast(1.2) saturate(1.4)';
      warpLayer.style.animation = 'wb-screen-shake 0.25s ease-in-out infinite, wb-chromatic-drift 1.2s ease-in-out infinite';
    }
    if (turbulence) turbulence.setAttribute('baseFrequency', '0.05 0.035');
    if (displace)   displace.setAttribute('scale', '50');

    // 持續閃爍效果
    _wbContinuousGlitch();
  }
}

// 短暫黑屏閃爍
function _wbBlackFlash(duration) {
  const overlay = document.getElementById('whisper-battle-overlay');
  if (!overlay) return;

  const flash = document.createElement('div');
  flash.style.cssText = `
    position: absolute; inset: 0; z-index: 100;
    background: #000;
    opacity: 0;
    pointer-events: none;
    transition: opacity ${duration/2}ms ease;
  `;
  overlay.appendChild(flash);

  requestAnimationFrame(() => {
    flash.style.opacity = '0.95';
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), duration/2);
    }, duration/2);
  });
}

// 畫面反轉閃爍
function _wbInvertFlash(duration) {
  const warpLayer = document.getElementById('wb-warp-layer');
  if (!warpLayer) return;

  const originalFilter = warpLayer.style.filter;
  warpLayer.style.filter = (originalFilter || '') + ' invert(1)';

  setTimeout(() => {
    warpLayer.style.filter = originalFilter;
  }, duration);
}

// 模糊脈衝
function _wbBlurPulse() {
  const warpLayer = document.getElementById('wb-warp-layer');
  if (!warpLayer) return;

  const originalFilter = warpLayer.style.filter;
  warpLayer.style.filter = (originalFilter || '') + ' blur(8px)';

  setTimeout(() => {
    warpLayer.style.filter = originalFilter;
  }, 300);
}

// 持續 glitch 效果（Wave 7）
function _wbContinuousGlitch() {
  const s = whisperBattleState;
  if (!s || !s.active) return;

  const glitchInterval = setInterval(() => {
    if (!s || !s.active) {
      clearInterval(glitchInterval);
      return;
    }

    const rand = Math.random();
    if (rand < 0.3) {
      _wbBlackFlash(100);
    } else if (rand < 0.5) {
      _wbInvertFlash(120);
    } else if (rand < 0.7) {
      _wbBlurPulse();
    }
  }, 2500);

  // 儲存 interval ID 以便清理
  if (s) s.glitchInterval = glitchInterval;
}

// 史詩級訊息顯示（金色，畫面中央）
function _wbShowEpicMessage(text) {
  const overlay = document.getElementById('whisper-battle-overlay');
  if (!overlay) return;

  const epicMsg = document.createElement('div');
  epicMsg.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 150;
    font-family: 'Noto Serif TC', serif;
    font-size: 1.3rem;
    line-height: 2;
    color: rgba(212, 168, 75, 0.95);
    text-align: center;
    text-shadow: 
      0 0 20px rgba(212, 168, 75, 0.8),
      0 0 40px rgba(212, 168, 75, 0.5),
      0 0 60px rgba(212, 168, 75, 0.3);
    max-width: 80%;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.8s ease;
    pointer-events: none;
    letter-spacing: 0.1em;
  `;
  epicMsg.textContent = text;
  overlay.appendChild(epicMsg);

  requestAnimationFrame(() => {
    epicMsg.style.opacity = '1';
  });

  setTimeout(() => {
    epicMsg.style.opacity = '0';
    setTimeout(() => epicMsg.remove(), 800);
  }, 2500);
}

// 休息波次：顯示 NOCTIS 的對話
function _wbShowRestDialogue(text, duration) {
  const overlay = document.getElementById('whisper-battle-overlay');
  if (!overlay) return;

  const dialogue = document.createElement('div');
  dialogue.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 120;
    font-family: 'Noto Serif TC', serif;
    font-size: 1.4rem;
    line-height: 2.2;
    color: rgba(192, 132, 252, 0.95);
    text-align: center;
    text-shadow: 
      0 0 30px rgba(192, 132, 252, 0.9),
      0 0 60px rgba(192, 132, 252, 0.6),
      0 0 90px rgba(192, 132, 252, 0.3);
    max-width: 70%;
    padding: 3rem;
    opacity: 0;
    transition: opacity 1s ease;
    pointer-events: none;
    letter-spacing: 0.15em;
    white-space: pre-line;
  `;
  dialogue.textContent = text;
  overlay.appendChild(dialogue);

  requestAnimationFrame(() => {
    dialogue.style.opacity = '1';
  });

  setTimeout(() => {
    dialogue.style.opacity = '0';
    setTimeout(() => dialogue.remove(), 1000);
  }, duration - 1000);
}
