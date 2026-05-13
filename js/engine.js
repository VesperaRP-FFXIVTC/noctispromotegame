// ===== GAME ENGINE =====

let playerName = '';
let currentScene = null;
let isTyping = false;
let typewriterTimer = null;
let collectedClues = [];
let cluesVisible = false;

// 玩家選擇傾向 flag（影響後續 NOCTIS 低語、Inu 對話）
// act2_sense: 'feel' | 'numb'        — Act2 走廊：感受到慾望 / 只是霧
// act3_view:  'empathy' | 'cynic'    — Act3 入口：Inu 一定很孤獨 / 怎可能甘願留下
const playerFlags = {
  act2_sense: null,
  act3_view:  null,
};

let pendingCountdown = false;

// ── Audio ─────────────────────────────────────────────────────────────────────

const BGM = {
  dirune: new Audio('assets/audio/bgm-dirune.mp3'),
  mist:    new Audio('assets/audio/bgm-mist.mp3'),
  battle:  new Audio('assets/audio/bgm-battle.mp3'),
  noctis:  new Audio('assets/audio/bgm-noctis.mp3'),
};

// Configure all tracks
Object.values(BGM).forEach(track => {
  track.loop = true;
  track.volume = 0;
});

let currentBgm = null;

function playBgm(trackKey) {
  const track = BGM[trackKey];
  if (!track) { console.warn('[BGM] track not found:', trackKey); return; }
  if (currentBgm === track) { console.log('[BGM] already playing:', trackKey); return; }

  console.log('[BGM] switching to:', trackKey);

  // Fade out current track
  if (currentBgm) {
    const oldTrack = currentBgm;
    fadeBgm(oldTrack, oldTrack.volume, 0, 1500, () => {
      oldTrack.pause();
      oldTrack.currentTime = 0;
    });
  }

  // Fade in new track
  currentBgm = track;
  track.currentTime = 0;
  track.volume = 0;
  track.play().then(() => {
    console.log('[BGM] playing OK:', trackKey);
    fadeBgm(track, 0, 0.25, 2000, null);
  }).catch(err => {
    console.error('[BGM] play failed:', trackKey, err);
  });
}

function stopBgm(duration = 1500) {
  if (!currentBgm) return;
  const track = currentBgm;
  currentBgm = null;
  fadeBgm(track, track.volume, 0, duration, () => {
    track.pause();
    track.currentTime = 0;
  });
}

function fadeBgm(track, fromVol, toVol, duration, onDone) {
  const steps = 30;
  const interval = duration / steps;
  const delta = (toVol - fromVol) / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    track.volume = Math.min(1, Math.max(0, fromVol + delta * step));
    if (step >= steps) {
      clearInterval(timer);
      track.volume = toVol;
      if (onDone) onDone();
    }
  }, interval);
}

// ── Entry point ──────────────────────────────────────────────────────────────

function startGame() {
  const input = document.getElementById('player-name');
  const name = input.value.trim();
  if (!name) {
    input.focus();
    input.style.borderColor = '#e05555';
    setTimeout(() => { input.style.borderColor = ''; }, 1000);
    return;
  }
  playerName = name;

  // Unlock all audio tracks on user gesture, then start game
  const unlockPromises = Object.entries(BGM).map(([key, track]) => {
    track.volume = 0;
    return track.play()
      .then(() => { track.pause(); track.currentTime = 0; console.log('[BGM] unlocked:', key); })
      .catch(e => console.log('[BGM] unlock failed:', key, e));
  });

  Promise.allSettled(unlockPromises).then(() => {
    fadeToScreen('screen-game', () => {
      loadScene('prologue_enter');
    });
  });
}

// ── Screen transitions ────────────────────────────────────────────────────────

function fadeToScreen(targetId, callback) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999;opacity:0;transition:opacity 0.6s ease;pointer-events:all;';
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    setTimeout(() => {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      if (callback) callback();
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 700);
    }, 650);
  });
}

// ── Scene loader ──────────────────────────────────────────────────────────────

function loadScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) { console.warn('Scene not found:', sceneId); return; }
  currentScene = sceneId;

  // 動態文字：scene.textFn(flags, name) 可覆寫 scene.text
  if (typeof scene.textFn === 'function') {
    scene.text = scene.textFn(playerFlags, playerName);
  }

  // ── BGM routing ──
  // Prologue + Act 1 = DIRUNE warm piano
  // Act 2 + Act 3    = mist track (add bgm-mist.mp3 later)
  // Act 4            = noctis track (add bgm-noctis.mp3 later)
  if (sceneId.startsWith('prologue') || sceneId.startsWith('act1')) {
    playBgm('dirune');
  } else if (sceneId.startsWith('act2') || sceneId.startsWith('act3')) {
    if (BGM.mist) playBgm('mist'); else stopBgm(2000);
  } else if (sceneId.startsWith('act4')) {
    if (BGM.noctis) playBgm('noctis'); else stopBgm(2000);
  }


  // Background
  if (scene.bg) {
    const bg = document.getElementById('game-bg');
    if (scene.bg === 'void') {
      // 特殊：VESPERA 異空間，純色虛空，不載入圖檔
      bg.style.backgroundImage = 'none';
      bg.style.backgroundColor = '#050308';
    } else {
      bg.style.backgroundImage = `url('assets/images/${scene.bg}')`;
      bg.style.backgroundColor = '';
    }
  }

  // Overlay tint for purple sections
  const overlay = document.getElementById('game-overlay');
  if (sceneId.startsWith('act2') || sceneId.startsWith('act3')) {
    overlay.style.background = 'linear-gradient(to top, rgba(20,5,35,0.8) 0%, rgba(20,5,35,0.2) 60%, transparent 100%)';
  } else if (sceneId.startsWith('act4')) {
    overlay.style.background = 'linear-gradient(to top, rgba(10,0,20,0.85) 0%, rgba(10,0,20,0.3) 60%, transparent 100%)';
  } else {
    overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)';
  }

  // Sprite
  const sprite = document.getElementById('char-sprite');
  if (scene.sprite) {
    sprite.style.backgroundImage = `url('assets/images/${scene.sprite}')`;
    sprite.style.opacity = '1';
  } else {
    sprite.style.opacity = '0';
  }

  // Handle special actions first
  if (scene.action) handleAction(scene.action, scene, sceneId);

  // If clues to place in scene (clues take priority — puzzle triggers after all collected)
  if (scene.clues) {
    placeClues(scene.clues, sceneId);
    showDialogue(scene.speaker, scene.text, null);
    hideDialogueNext();
    return;
  }

  // If puzzle only (no clues), show puzzle overlay after dialogue
  if (scene.puzzle) {
    showDialogue(scene.speaker, scene.text, () => {
      showPuzzle(scene.puzzle, sceneId);
    });
    return;
  }

  // Normal dialogue
  if (scene.choices) {
    showDialogue(scene.speaker, scene.text, () => {
      showChoices(scene.choices);
    });
  } else {
    showDialogue(scene.speaker, scene.text, null);
  }
}

// ── Dialogue ──────────────────────────────────────────────────────────────────

function showDialogue(speaker, text, onComplete) {
  const speakerEl = document.getElementById('speaker-name');
  const textEl = document.getElementById('dialogue-text');
  const nextEl = document.getElementById('dialogue-next');
  const choicesEl = document.getElementById('choices-box');

  choicesEl.classList.add('hidden');
  choicesEl.innerHTML = '';
  nextEl.style.opacity = '0';

  speakerEl.textContent = speaker ? speaker.replace('%name%', playerName) : '';
  textEl.textContent = '';

  const fullText = (text || '').replace(/%name%/g, playerName);

  if (!fullText) {
    if (onComplete) onComplete();
    return;
  }

  isTyping = true;
  let i = 0;
  clearInterval(typewriterTimer);

  typewriterTimer = setInterval(() => {
    textEl.textContent += fullText[i];
    i++;
    if (i >= fullText.length) {
      clearInterval(typewriterTimer);
      isTyping = false;
      nextEl.style.opacity = '1';
      if (onComplete) {
        // Store callback for click-to-advance
        document.getElementById('dialogue-box')._onComplete = onComplete;
      } else {
        document.getElementById('dialogue-box')._onComplete = null;
      }
    }
  }, 30);

  // Store for skip
  document.getElementById('dialogue-box')._fullText = fullText;
  document.getElementById('dialogue-box')._onComplete = null;
  document.getElementById('dialogue-box')._pendingComplete = onComplete;
}

function advanceDialogue() {
  const box = document.getElementById('dialogue-box');

  // If still typing, skip to end
  if (isTyping) {
    clearInterval(typewriterTimer);
    isTyping = false;
    document.getElementById('dialogue-text').textContent = box._fullText || '';
    document.getElementById('dialogue-next').style.opacity = '1';
    if (box._pendingComplete) {
      box._onComplete = box._pendingComplete;
      box._pendingComplete = null;
    }
    return;
  }

  // If choices are showing, don't advance
  if (!document.getElementById('choices-box').classList.contains('hidden')) return;

  // If puzzle is open, don't advance
  if (!document.getElementById('puzzle-overlay').classList.contains('hidden')) return;

  // 倒計時待跳轉：玩家點擊後切到 countdown 畫面
  if (pendingCountdown) {
    pendingCountdown = false;
    stopBgm(2000);
    fadeToScreen('screen-countdown', () => {
      startCountdown();
    });
    return;
  }

  // If clue scene, only block advance when clues remain uncollected
  const scene = SCENES[currentScene];
  if (scene && scene.clues) {
    const remaining = scene.clues.filter(c => !collectedClues.find(cc => cc.id === c.id));
    if (remaining.length > 0) return;
  }

  // Execute stored callback or go to next scene
  if (box._onComplete) {
    const cb = box._onComplete;
    box._onComplete = null;
    cb();
    return;
  }

  if (scene && scene.next) {
    loadScene(scene.next);
  }
}

function hideDialogueNext() {
  document.getElementById('dialogue-next').style.opacity = '0';
}

// ── Choices ───────────────────────────────────────────────────────────────────

function showChoices(choices) {
  const box = document.getElementById('choices-box');
  box.innerHTML = '';
  box.classList.remove('hidden');
  document.getElementById('dialogue-next').style.opacity = '0';

  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text.replace('%name%', playerName);
    btn.onclick = () => {
      // 記錄選擇傾向
      if (choice.flag) {
        Object.assign(playerFlags, choice.flag);
      }
      box.classList.add('hidden');
      loadScene(choice.next);
    };
    box.appendChild(btn);
  });
}

// ── Clue system ───────────────────────────────────────────────────────────────

function placeClues(clues, sceneId) {
  const gameScreen = document.getElementById('screen-game');

  // Remove old clue hotspots
  document.querySelectorAll('.scene-clue-hotspot').forEach(el => el.remove());

  clues.forEach(clue => {
    const hotspot = document.createElement('div');
    hotspot.className = 'scene-clue-hotspot';
    hotspot.dataset.clueId = clue.id;
    hotspot.style.cssText = `
      position: absolute;
      left: ${clue.x}; top: ${clue.y};
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 5;
    `;

    const dot = document.createElement('div');
    dot.style.cssText = `
      width: 22px; height: 22px;
      border-radius: 50%;
      background: rgba(255,210,120,0.95);
      box-shadow: 0 0 18px rgba(255,200,100,0.9), 0 0 32px rgba(212,168,75,0.5);
      border: 2px solid rgba(255,235,180,0.8);
      animation: pulseDot 1.4s ease-in-out infinite;
    `;

    const label = document.createElement('div');
    label.style.cssText = `
      position: absolute; top: 30px; left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem; color: rgba(255,220,160,0.95);
      white-space: nowrap; pointer-events: none;
      font-family: 'Noto Serif TC', serif;
      text-shadow: 0 0 6px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8);
    `;
    label.textContent = clue.label;

    hotspot.appendChild(dot);
    hotspot.appendChild(label);
    gameScreen.appendChild(hotspot);

    hotspot.onclick = () => collectClue(clue, sceneId);
  });

  // Add pulse animation if not already added
  if (!document.getElementById('pulse-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-style';
    style.textContent = `
      @keyframes pulseDot {
        0%, 100% { transform: scale(1); opacity: 0.95; }
        50% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 28px rgba(255,200,100,1), 0 0 50px rgba(212,168,75,0.7); }
      }
    `;
    document.head.appendChild(style);
  }
}

function collectClue(clue, sceneId) {
  if (collectedClues.find(c => c.id === clue.id)) return;

  collectedClues.push(clue);
  updateCluePanel();

  // Show clue found dialogue
  const speakerEl = document.getElementById('speaker-name');
  const textEl = document.getElementById('dialogue-text');
  const nextEl = document.getElementById('dialogue-next');

  speakerEl.textContent = '';
  textEl.textContent = clue.found_text;
  nextEl.style.opacity = '1';

  // 清除打字機狀態，避免 advanceDialogue 誤判為仍在輸出
  isTyping = false;
  clearInterval(typewriterTimer);
  const box = document.getElementById('dialogue-box');
  box._fullText = clue.found_text;
  box._pendingComplete = null;
  box._onComplete = null;

  // Remove hotspot
  const hotspot = document.querySelector(`[data-clue-id="${clue.id}"]`);
  if (hotspot) hotspot.remove();

  // Check if all clues collected
  const scene = SCENES[sceneId];
  if (scene && scene.clues) {
    const remaining = scene.clues.filter(c => !collectedClues.find(cc => cc.id === c.id));
    if (remaining.length === 0) {
      // 所有線索收集完畢，下一次點擊觸發 puzzle 或下一幕
      box._onComplete = () => {
        if (scene.next) {
          loadScene(scene.next);
        } else if (scene.puzzle) {
          showPuzzle(scene.puzzle, sceneId);
        }
      };
    }
  }
}

function updateCluePanel() {
  const list = document.getElementById('clue-list');
  list.innerHTML = '';
  collectedClues.forEach(clue => {
    const item = document.createElement('div');
    item.className = 'clue-item';
    item.textContent = clue.clue_note;
    list.appendChild(item);
  });
}

function toggleClues() {
  const panel = document.getElementById('clue-panel');
  cluesVisible = !cluesVisible;
  panel.classList.toggle('hidden', !cluesVisible);
}

// ── Actions ───────────────────────────────────────────────────────────────────

function handleAction(action, scene, sceneId) {
  switch (action) {
    case 'show_clue_btn':
      document.getElementById('btn-clues').classList.remove('hidden');
      break;
    case 'transition_purple':
      document.getElementById('game-overlay').style.transition = 'background 2s ease';
      break;
    case 'transition_noctis':
      document.getElementById('game-overlay').style.transition = 'background 2s ease';
      break;
    case 'goto_countdown':
      // 不自動跳——等玩家點擊對話框再切到倒計時
      pendingCountdown = true;
      break;
    case 'start_whisper_battle':
      // 等待對話完全顯示完畢後再開始戰鬥
      const startBattle = (isRetry) => {
        document.getElementById('dialogue-box').style.opacity = '0';
        _showBattlePrelude(() => {
          if (BGM.battle) playBgm('battle');
          startWhisperBattle(
            () => {
              stopBgm(1200);
              document.getElementById('dialogue-box').style.opacity = '1';
              loadScene('act3_corridor_survived');
            },
            () => {
              stopBgm(2000);
              document.getElementById('dialogue-box').style.opacity = '1';
              setTimeout(() => startBattle(true), 1000);
            }
          );
        }, isRetry); // 第二次起 prelude 提供「簡單難度」選項
      };

      const waitForDialogue = () => {
        if (isTyping) {
          setTimeout(waitForDialogue, 100);
          return;
        }
        setTimeout(() => startBattle(false), 1500);
      };
      waitForDialogue();
      break;
  }
}

// ── Countdown ─────────────────────────────────────────────────────────────────

// Set your target opening date here (YYYY, MM-1, DD, HH, MM, SS)
const OPENING_DATE = new Date(2026, 4, 29, 23, 0, 0); // 2026-05-29 23:00

function startCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  const diff = OPENING_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    document.getElementById('btn-official').classList.remove('hidden');
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}

// ── Keyboard support ──────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const gameScreen = document.getElementById('screen-game');
    if (gameScreen.classList.contains('active')) {
      e.preventDefault();
      advanceDialogue();
    }
  }
});

document.getElementById('player-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') startGame();
});

// ── Mouse click to advance dialogue ──────────────────────────────────────────

document.getElementById('dialogue-box').addEventListener('click', () => {
  advanceDialogue();
});

// ── Skip button (for testing) ─────────────────────────────────────────────────

// Scene order for skipping
const SCENE_SKIP_MAP = {
  // Prologue scenes → skip to Act 1
  prologue_enter:            'act1_arrive',
  prologue_cat_appear:       'act1_arrive',
  prologue_cat_greet:        'act1_arrive',
  prologue_choices_1:        'act1_arrive',
  prologue_what_vespera:     'act1_arrive',
  prologue_vespera_detail:   'act1_arrive',
  prologue_choices_1_return: 'act1_arrive',
  prologue_who_kaogao:       'act1_arrive',
  prologue_kaogao_detail:    'act1_arrive',
  prologue_choices_2:        'act1_arrive',
  prologue_what_vespera_late:'act1_arrive',
  prologue_quest_lead:       'act1_arrive',
  prologue_quest:            'act1_arrive',
  prologue_quest_2:          'act1_arrive',
  prologue_quest_3:          'act1_arrive',
  prologue_to_act1:          'act1_arrive',
  // Act 1 scenes → skip to Act 2
  act1_arrive:               'act2_enter',
  act1_kaogao_react:         'act2_enter',
  act1_explore:              'act2_enter',
  act1_at_door:              'act2_enter',
  act1_solved:               'act2_enter',
  act1_enter_mist:           'act2_enter',
  // Act 2 scenes → skip to Act 3
  act2_enter:                'act3_enter',
  act2_corridor_1:           'act3_enter',
  act2_corridor_choice:      'act3_enter',
  act2_corridor_2:           'act3_enter',
  act2_corridor_2b:          'act3_enter',
  act2_clue_intro:           'act3_enter',
  act2_rune_solved:          'act3_enter',
  act2_kaogao:               'act3_enter',
  act2_solved_kaogao:        'act3_enter',
  act2_to_act3:              'act3_enter',
  act2_solved:               'act3_enter',
  // Act 3 scenes → skip to Act 4
  act3_enter:                'act4_enter',
  act3_atmosphere:           'act4_enter',
  act3_atmosphere_choice:    'act4_enter',
  act3_atmosphere_a:         'act4_enter',
  act3_atmosphere_b:         'act4_enter',
  act3_fragments:            'act4_enter',
  act3_fragments_explore:    'act4_enter',
  act3_solved:               'act4_enter',
  act3_solved_reaction:      'act4_enter',
  act3_kaogao_resolve:       'act4_enter',
  act3_corridor_enter:       'act4_enter',
  act3_corridor_kaogao_1:    'act4_enter',
  act3_corridor_voice_1:     'act4_enter',
  act3_corridor_kaogao_2:    'act4_enter',
  act3_corridor_voice_2:     'act4_enter',
  act3_corridor_voice_2b:    'act4_enter',
  act3_corridor_player_react:'act4_enter',
  act3_corridor_voice_3:     'act4_enter',
  act3_corridor_voice_3b:    'act4_enter',
  act3_corridor_voice_3c:    'act4_enter',
  act3_corridor_kaogao_3:    'act4_enter',
  act3_corridor_kaogao_3b:   'act4_enter',
  act3_corridor_voice_4:     'act4_enter',
  act3_corridor_voice_4b:    'act4_enter',
  act3_corridor_battle_intro:'act4_enter',
  act3_corridor_battle_intro_b:'act4_enter',
  act3_whisper_battle:       'act4_enter',
  act3_corridor_survived:    'act4_enter',
  act3_corridor_survived_kaogao: 'act4_enter',
  act3_enter_noctis:         'act4_enter',
  act3_choice:               'act4_enter',
  // Act 4 scenes → countdown
  act4_enter:                null,
  act4_enter_b:              null,
  act4_environment:          null,
  act4_environment_b:        null,
  act4_inu_appear:           null,
  act4_inu_appear_b:         null,
  act4_inu_greet:            null,
  act4_kaogao_sees_inu:      null,
  act4_inu_kaogao_response:  null,
  act4_inu_kaogao_response_b: null,
  act4_inu_callback:         null,
  act4_dialogue_2:           null,
  act4_inu_response:         null,
  act4_inu_response_b:       null,
  act4_inu_response_c:       null,
  act4_inu_question:         null,
  act4_player_choice:        null,
  act4_response_a:           null,
  act4_response_b:           null,
  act4_inu_invite:           null,
  act4_inu_invite_b:         null,
  act4_kaogao_react:         null,
  act4_final_choice:         null,
  act4_ending:               null,
  act4_ending_a_close_pre:   null,
  act4_ending_a_kaogao:      null,
  act4_ending_a_kaogao_b:    null,
  act4_ending_a_close:       null,
  act4_ending_a_close_b:     null,
  act4_ending_2:             null,
  act4_ending_2b:            null,
  act4_ending_b_kaogao:      null,
  act4_ending_b_kaogao_b:    null,
  act4_ending_b_close:       null,
  act4_ending_b_close_b:     null,
};

function skipToScene() {
  // Close puzzle overlay if open
  const puzzleOverlay = document.getElementById('puzzle-overlay');
  if (!puzzleOverlay.classList.contains('hidden')) {
    puzzleOverlay.classList.add('hidden');
    document.getElementById('puzzle-container').innerHTML = '';
  }
  // Remove clue hotspots if any
  document.querySelectorAll('.scene-clue-hotspot').forEach(el => el.remove());
  // Collect all clues from current scene so puzzle can proceed
  const scene = SCENES[currentScene];
  if (scene && scene.clues) {
    scene.clues.forEach(clue => {
      if (!collectedClues.find(c => c.id === clue.id)) {
        collectedClues.push(clue);
      }
    });
    updateCluePanel();
  }

  const target = SCENE_SKIP_MAP[currentScene];
  if (target) {
    loadScene(target);
  } else {
    // Already at Act 4 or end — go to countdown
    fadeToScreen('screen-countdown', () => {
      startCountdown();
    });
  }
}
