// ===== SCENE DATA =====
// All dialogue, choices, and scene definitions live here.
// bg: background image filename (in assets/images/)
// sprite: character sprite filename (in assets/images/)
// speaker: name shown in dialogue box (empty string = no name)
// text: dialogue text (%name% is replaced with player name)
// choices: array of { text, next } — if present, shows choice buttons
// puzzle: puzzle id to trigger — see puzzles.js
// clues: array of clue objects to place in scene
// next: id of next node (used when no choices)
// action: special action string handled by engine

const SCENES = {

  // ── PROLOGUE ──────────────────────────────────────────────────────────────

  prologue_enter: {
    bg: 'bg-dirune.jpg',
    sprite: null,
    speaker: '',
    text: '你推開了那扇門。\n\n暖黃色的光從縫隙中溢出，帶著淡淡的咖啡香氣和某種說不清的溫柔。',
    next: 'prologue_cat_appear'
  },

  prologue_cat_appear: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '一隻貓從吧台後方跳了出來，用一雙琥珀色的眼睛打量著你。',
    next: 'prologue_cat_greet'
  },

  prologue_cat_greet: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵——\n\n你平安無事走過 VESPERA，來到這裡了呢。\n\n歡迎來到 DIRUNE。雖然今天不是營業的日子……',
    next: 'prologue_choices_1'
  },

  prologue_choices_1: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '什麼是 VESPERA？',       next: 'prologue_what_vespera' },
      { text: '你是什麼人……不，什麼貓？', next: 'prologue_who_kaogao' },
      { text: '我收到了冒險者公會的委託，可以請你詳細講講嗎？', next: 'prologue_quest' }
    ]
  },

  prologue_what_vespera: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……VESPERA，是這個異空間的名字。拉丁語，黃昏的意思。\n\n沒有人知道它什麼時候出現，也沒有人知道誤入的契機。唯一確定的是——選擇其中一條路離開，就能回到現實世界。',
    next: 'prologue_vespera_detail'
  },

  prologue_vespera_detail: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '這裡有兩條路。\n\n一盞暖黃的燈，通向 DIRUNE——也就是這裡，白晝之地。\n\n還有一盞幽紫的燈……那條路，從來沒有人進去後成功返回過。',
    next: 'prologue_choices_1_return'
  },

  prologue_choices_1_return: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '你是什麼人……不，什麼貓？', next: 'prologue_who_kaogao' },
      { text: '我收到了冒險者公會的委託，可以請你詳細講講嗎？', next: 'prologue_quest' }
    ]
  },

  prologue_who_kaogao: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '我是貓糕。DIRUNE 的居民之一，算是這裡年紀比較大的那個。\n\n很久以前，我在 VESPERA 迷了路，找不到回去的方法。是 Inu 把我留下來的——他說，這個地方太安靜了，需要一些生氣。\n\n後來他又陸陸續續撿了十幾個像我這樣迷路的孩子。DIRUNE 現在很熱鬧——至少，前陣子還是。',
    next: 'prologue_kaogao_detail'
  },

  prologue_kaogao_detail: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: 'Inu 跟我們每個人都簽了差不多的契約。他負責照顧大家的起居飲食，我們留在 DIRUNE，為這個沉悶的地方增添一些色彩。\n\n……朋友之間的約定，大概就是這樣。\n\n只是現在，他不在了——而且不只他。',
    next: 'prologue_choices_2'
  },

  prologue_choices_2: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '什麼是 VESPERA？',       next: 'prologue_what_vespera_late' },
      { text: '我收到了冒險者公會的委託，可以請你詳細講講嗎？', next: 'prologue_quest' }
    ]
  },

  prologue_what_vespera_late: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……VESPERA，是這個異空間的名字。拉丁語，黃昏的意思。\n\n沒有人知道它什麼時候出現，也沒有人知道誤入的契機。唯一確定的是——選擇其中一條路離開，就能回到現實世界。\n\n這裡有兩條路：暖黃的 DIRUNE，還有那條幽紫的……從來沒有人進去後成功返回的路。',
    next: 'prologue_quest_lead'
  },

  prologue_quest_lead: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '我收到了冒險者公會的委託，可以請你詳細講講嗎？', next: 'prologue_quest' }
    ]
  },

  prologue_quest: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……幾天前，Inu 說他聽到了深處傳來的音樂聲。\n\n那個方向……是幽紫的迷霧。那條從來沒有人回來過的路。',
    next: 'prologue_quest_2'
  },

  prologue_quest_2: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '他說要去調查。我攔不住他。\n\n……然後他就沒有回來了。\n\n更糟的是——有幾個比較年輕的孩子不聽勸，說要去把他拉回來。\n\n他們，也都沒有回來。',
    next: 'prologue_quest_2b'
  },

  prologue_quest_2b: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '我後來才想起來——那幾個孩子，其實平常在 DIRUNE 以外的地方也有打工。\n\n其中有人，偶爾會在夜深的時候從那片紫霧的方向回來……身上帶著一種我從沒聞過的味道。\n\n不是危險的味道。是那種——讓人不自覺多吸一口、然後立刻假裝沒事的味道。\n\n我以為是他們自己的事。現在想想，他們大概早就知道紫霧後面在做什麼生意。',
    next: 'prologue_quest_3'
  },

  prologue_quest_3: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '冒險者公會的人說，你是來找他們的？\n\n（牠從吧台跳下，走到你腳邊。）\n\n……帶我一起去。DIRUNE 剩下的孩子們，需要一個答案。',
    next: 'prologue_to_act1'
  },

  prologue_to_act1: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '（你點了點頭，跟著貓糕走向 DIRUNE 深處。）\n\n遠處，那片幽紫的迷霧靜靜地等待著。',
    next: 'act1_arrive',
    action: 'show_clue_btn'
  },

  // ── ACT 1 ─────────────────────────────────────────────────────────────────

  act1_arrive: {
    bg: 'void',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '你跟著貓糕走出 DIRUNE 的暖黃光，回到 VESPERA 的異空間。\n\n四周沒有牆，也沒有地——只有一片無邊無際的黑。\n\n身後，DIRUNE 那盞暖黃的燈在遠處微微搖曳。前方不遠處，懸浮著一扇沉重的鐵門，門縫透出一絲冷冽的紫光。\n\n門上掛著一把密碼鎖。四個數字。',
    next: 'act1_kaogao_react'
  },

  act1_kaogao_react: {
    bg: 'void',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……這是 Inu 鎖上的。他說，如果有一天他沒有回來，就讓值得信任的人進去找他。\n\n（牠回頭看了一眼那盞遠遠的暖黃燈。）\n\n密碼……我不知道。但他一定在 DIRUNE 裡留下了線索。\n\n我們得回去看看。',
    next: 'act1_explore'
  },

  act1_explore: {
    bg: 'bg-dirune.jpg',
    sprite: null,
    speaker: '',
    text: '你們回到 DIRUNE 內部。\n\n暖黃的燈光下，散落著 Inu 留下的痕跡。\n\n（點擊場景中的物件來尋找線索。）',
    next: 'act1_at_door',
    clues: [
      {
        id: 'clue_collar',
        label: '貓咪的項圈',
        x: '15%', y: '55%',
        found_text: '一個小小的銀色項圈，上面刻著羅馬數字 IV。\n\n（這是 Inu 給每位孩子的編號——項圈上的數字，代表他們是「四月那一批」被收留的。）',
        clue_note: '項圈：IV——「四月」'
      },
      {
        id: 'clue_menu',
        label: '菜單',
        x: '70%', y: '60%',
        found_text: '一份手寫的菜單，角落有一行小字：\n\n「本店招牌特調——XII 號特飲。」\n\n旁邊用鉛筆潦草地寫著：「Inu 說，那是他來到 VESPERA 的第十二天，他決定留下來的日子。」',
        clue_note: '菜單：XII（12）——Inu 留下的「日子」'
      },
      {
        id: 'clue_diary',
        label: '日記本',
        x: '45%', y: '45%',
        found_text: '一本翻開的日記，停在某一頁：\n\n「今天是我在 VESPERA 的第一天，也是我的生日。\n四月，第十二天。」\n\n（頁腳還有一行小字：）\n「我習慣用月日四碼記事——所有我鎖上的東西，都是這個格式。」',
        clue_note: '日記：Inu 生日 4/12，格式 MMDD'
      },
      {
        id: 'clue_clock',
        label: '停止的時鐘',
        x: '82%', y: '35%',
        found_text: '一個掛鐘，指針停在某個位置。\n\n時針指向 IV，分針指向 XII。\n\n鐘面下方貼著一張便條：「時間在這裡沒有意義——但這個瞬間，值得保存。」',
        clue_note: '時鐘：4 點 12 分——同一組數字，三度確認'
      }
    ]
  },

  act1_at_door: {
    bg: 'void',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '你和貓糕帶著線索，再次踏入虛空。\n\n那扇鐵門依然懸浮在原地，紫光從縫隙裡靜靜地透出來，像在等你。\n\n密碼鎖就在你面前——四個數字。',
    next: null,
    puzzle: 'code_lock'
  },

  act1_solved: {
    bg: 'void',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '密碼鎖發出一聲清脆的響聲。\n\n鐵門緩緩開啟，幽紫的迷霧從縫隙中湧出，瞬間吞沒了你身後那盞暖黃的燈。\n\n從更深處，傳來一股沉沉的、遙遠的音樂聲。',
    next: 'act1_enter_mist'
  },

  act1_enter_mist: {
    bg: 'void',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……跟上。\n\n（牠走進那片紫霧，身影逐漸被吞沒。）',
    next: 'act2_enter',
    action: 'transition_purple'
  },

  // ── ACT 2 ─────────────────────────────────────────────────────────────────

  act2_enter: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '迷霧比想像中更深邃。\n\n踏進去的瞬間，四周的聲音像是被棉花塞住——只剩下那股低沉的音樂聲，從更遠的地方傳來。\n\n你停下腳步，等待眼睛適應這片幽紫。',
    next: 'act2_corridor_1'
  },

  act2_corridor_1: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '這裡……跟我想像的不一樣。\n\n空氣裡有什麼東西。不是危險——\n\n是慾望。是那種讓你想伸手、又趕快把手收回去的東西。\n\n你能感覺到嗎？',
    next: 'act2_corridor_choice'
  },

  act2_corridor_choice: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '……有。像是有人在很近的地方，輕輕叫了我的名字。', next: 'act2_corridor_2',  flag: { act2_sense: 'feel' } },
      { text: '只是霧而已。我們要繼續前進。',                       next: 'act2_corridor_2b', flag: { act2_sense: 'numb' } }
    ]
  },

  act2_corridor_2: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……對。是那種讓你想一直往前走的感覺，不管前方有什麼，也不管你白天會不會後悔。\n\n我理解為什麼 Inu 會跟著聲音走了。',
    next: 'act2_clue_intro'
  },

  act2_corridor_2b: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……你說得對。\n\n但「只是霧」這三個字，我以前也對自己說過。\n\n（牠掃了你一眼，沒繼續說下去。）\n\n無論如何，繼續走吧。',
    next: 'act2_clue_intro'
  },

  act2_clue_intro: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '走廊深處，出現了三扇門。\n\n每扇門的旁邊，都刻著一些碎裂的符文——像是某種古老語言的殘片。\n\n牆壁上散落著 Inu 留下的標記。\n\n（點擊牆上的標記，尋找開門的線索。）',
    next: null,
    clues: [
      {
        id: 'clue_wall_left',
        label: '左側牆刻文',
        x: '12%', y: '40%',
        found_text: '牆上用粗糙的筆跡刻著幾行字：\n\n「VESPERA 的循環是：白晝——黃昏——黑夜。\n但在這個走廊，只有一個瞬間是永恆的。\n黃昏之後、黑夜之前——那片短暫的靜謐，才是真正的入口。」',
        clue_note: '牆刻文：入口是黃昏之後、黑夜之前的瞬間'
      },
      {
        id: 'clue_floor_mark',
        label: '地板上的痕跡',
        x: '50%', y: '75%',
        found_text: '地板上有一串腳印，在中間那扇門前停下。\n\nInu 的腳印？\n\n腳印旁邊，用手指在灰塵上寫著：「✦ ——這個符號，在 VESPERA 的語言裡，代表黃昏的星，是白晝與黑夜之間的見證者。」',
        clue_note: '地板痕跡：✦ 是黃昏之星，介於日月之間'
      },
      {
        id: 'clue_door_rune',
        label: '門框上的符文',
        x: '80%', y: '50%',
        found_text: '三扇門的門框上，各自刻著符文說明——字跡很小，幾乎被迷霧侵蝕：\n\n「☽ ——黑夜。萬物沉睡之時。」\n「✦ ——黃昏之星。唯一能見證黎明也能目送黑夜的存在。」\n「☀ ——白晝。萬物甦醒之時。」\n\n你想起了牆上那行字：黃昏之後、黑夜之前。',
        clue_note: '門框符文：☽黑夜 ✦黃昏之星 ☀白晝'
      }
    ],
    puzzle: 'rune_match'
  },

  act2_rune_solved: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '石板上的符文發出微光，牆壁輕輕震動。\n\n……對了。時序排好了。\n\n現在，選出那個「黃昏之際」的符號——就能通過。',
    next: 'act2_kaogao'
  },

  act2_kaogao: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……這些符號，Inu 曾經提過，VESPERA 有自己的語言。\n\n只有按照正確的順序，才能找到前進的路。',
    puzzle: 'symbol_doors'
  },

  act2_solved: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '正確的那扇門發出低沉的共鳴聲，緩緩向內開啟。\n\n迷霧從縫隙中湧出，更濃了，更紫了。',
    next: 'act2_solved_kaogao'
  },

  act2_solved_kaogao: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠凝視著那扇開啟的門，久久沒有動。）\n\n……我聽見了。音樂聲更清晰了。\n\n那是一種慵懶的、誘人的旋律，像是從很深很深的地方傳來。\n\n……Inu。你在那裡嗎。',
    next: 'act2_to_act3'
  },

  act2_to_act3: {
    bg: 'bg-mist-corridor.png',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '（你輕輕碰了碰貓糕的肩膀。）\n\n我們繼續。',
    next: 'act3_enter'
  },

  // ── ACT 3 ─────────────────────────────────────────────────────────────────

  act3_enter: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: '',
    text: '通道的盡頭，是另一扇門。\n\n這扇門與之前的不同——它更高，更沉，門縫中透出幽紫的光，和那股讓人心跳加速的音樂聲。\n\n彷彿只要踏進去，就再也無法假裝這一切是幻覺。',
    next: 'act3_atmosphere'
  },

  act3_atmosphere: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '這裡的空氣……比走廊更重。\n\n像是你的每一個念頭，都會被放大——尤其是那些你白天藏得最緊、最怕被人看見的那種。',
    next: 'act3_atmosphere_choice'
  },

  act3_atmosphere_choice: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: 'Inu 獨自在這裡……他一定很孤獨。', next: 'act3_atmosphere_a', flag: { act3_view: 'empathy' } },
      { text: '這種地方，怎麼可能有人甘願留下來？', next: 'act3_atmosphere_b', flag: { act3_view: 'cynic' } }
    ]
  },

  act3_atmosphere_a: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……也許吧。\n\n但也許，他在這裡看見了什麼，讓他終於不必假裝自己「沒興趣」。\n\n有時候，我們以為自己在找一個人——其實是在找一個能脫掉白天那套衣服的地方。',
    next: 'act3_fragments'
  },

  act3_atmosphere_b: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……也許，對某些人來說——這裡才是真實的。\n\n外面的世界，才是需要假裝沒在意、沒在看、沒有任何「想要」的那個地方。\n\n……Inu 一直不太擅長假裝。',
    next: 'act3_fragments'
  },

  act3_fragments: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……這是 Inu 的字跡。但是——順序亂了。\n\n像是他在進入之前，把自己最深的想法留在了這裡，一道給後來者的訊息，也是一把鑰匙。',
    next: 'act3_fragments_explore'
  },

  act3_fragments_explore: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: '',
    text: '門上的文字在迷霧中微微發光，但順序完全混亂——\n\n像是被什麼力量打散了，需要有人將它們重新拼合，才能讓門感應到完整的心意。\n\n（拖曳碎片，排列出 Inu 進入前的心路歷程。）',
    next: null,
    clues: [
      {
        id: 'clue_act3_note',
        label: '門旁的便條',
        x: '20%', y: '60%',
        found_text: '門旁貼著一張快要被迷霧侵蝕的便條：\n\n「給找到這裡的你——\n\n我留下的話語，是按照我那天的心情寫下的。\n先是聽見了聲音，然後感受到了某種呼喚，然後說服了自己，最後……留下了一道門。\n\n如果你能理解這個順序，門就會為你開啟。\n\n——Inu」',
        clue_note: 'Inu 便條：順序是「聽見→感受→說服自己→留下訊息」'
      }
    ],
    puzzle: 'memory_order'
  },

  act3_solved: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '碎片拼合的瞬間，門上的文字發出耀眼的光芒。\n\n光芒消散後，門緩緩向內開啟。\n\n音樂聲一下子湧了過來——豐盛的，鋪天蓋地的，像是整個宇宙都在為這個瞬間演奏。',
    next: 'act3_solved_reaction'
  },

  act3_solved_reaction: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……原來是這樣。\n\nInu 留下這些話，不只是為了鎖住門。他是在告訴我們：他是**清醒地**走進去的。\n\n那些孩子，可能也是。',
    next: 'act3_kaogao_resolve'
  },

  act3_kaogao_resolve: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '進去之後，可能會看見一些讓你動搖的東西。\n\nNOCTIS 會放大你內心的慾望——它不傷人，但它讓你誠實。\n\n有時候，誠實比傷害更難承受。\n\n……我們還要繼續嗎？',
    next: 'act3_choice_pre'
  },

  act3_choice_pre: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '準備好了。帶路。',         next: 'act3_corridor_enter' },
      { text: '……我們進去吧。一起。',    next: 'act3_corridor_enter' }
    ]
  },

  // ── ACT 3 : 長廊漫步（精神攻擊前的鋪墊） ──────────────────────────────────

  act3_corridor_enter: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '門後是一條長廊。\n\n與之前的走廊不同——這裡沒有迷霧，只有光。\n\n深紫的光，從地板、牆壁、天花板同時滲透出來，溫柔，誘人，像是活的。',
    next: 'act3_corridor_kaogao_1'
  },

  act3_corridor_kaogao_1: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……很漂亮。\n\n但要小心。這個地方，會說話。',
    next: 'act3_corridor_voice_1'
  },

  act3_corridor_voice_1: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: '？？？',
    text: '……你終於來了。\n\n（那聲音不像是從某個方向傳來的——比較像是從牆壁、地板、空氣的每一寸縫隙，同時滲出來。）\n\n我等你很久了。',
    next: 'act3_corridor_kaogao_2'
  },

  act3_corridor_kaogao_2: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '！\n\n（牠的毛瞬間炸了起來，本能地往你身前一站。）\n\n……不對。這裡沒有「人」。\n\n是這個地方在說話。',
    next: 'act3_corridor_voice_2'
  },

  act3_corridor_voice_2: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '貓糕，你還是這麼警覺。\n\n（聲音笑了一下——但那不是嘴在笑，是整條走廊的紫光在笑。）\n\n別緊張嘛。我又不咬人——除非你想。',
    next: 'act3_corridor_voice_2b'
  },

  act3_corridor_voice_2b: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '我只是想讓你們知道——\n\n你們心底那些不敢說出口的念頭、那些連對自己都偽裝成「沒興趣」的渴望，我都聽見了。\n\n每一個。',
    next: 'act3_corridor_player_react'
  },

  act3_corridor_player_react: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '那聲音不是從耳朵進來的。\n\n是順著你的後頸、肩線，然後沿著背脊一路往下滑——像有人的呼吸貼著你的皮膚。\n\n你發現自己的指尖，輕輕地縮了一下。',
    next: 'act3_corridor_voice_3'
  },

  act3_corridor_voice_3: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '你以為我聽到的是「累」嗎？\n\n不是。\n\n我聽到的——是你關燈之後、把臉埋進枕頭裡的那些幻想。',
    next: 'act3_corridor_voice_3b'
  },

  act3_corridor_voice_3b: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '是你刪掉歷史紀錄、清空快取、像沒事人一樣走出房間之前，最後又看了一眼的那段影片。\n\n是你經過某個人身邊、眼神在他鎖骨上停了半秒，然後逼自己看別的地方——那半秒。',
    next: 'act3_corridor_voice_3c'
  },

  act3_corridor_voice_3c: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '（紫光貼上你的後頸，溫的，像有人的呼吸。）\n\n你最害羞的那個癖好、最不敢說出口的那個對象、最怕在熟人面前被認出來的那個版本的你——\n\n正好是我最熟的。',
    next: 'act3_corridor_kaogao_3'
  },

  act3_corridor_kaogao_3: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '別聽。\n\n（牠擋到你面前，琥珀色的眼睛盯著紫光最濃的那一面牆。）\n\n它不會逼你做什麼——它只是把你藏得最深的那個慾望挖出來，放在你面前，然後笑著問你「要不要試試看」。',
    next: 'act3_corridor_kaogao_3b'
  },

  act3_corridor_kaogao_3b: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠回頭，伸手抓住你的手腕。）\n\n%name%，你如果現在點頭——\n\n你今晚就出不去了。',
    next: 'act3_corridor_voice_4'
  },

  act3_corridor_voice_4: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '貓糕，你太緊張了。\n\n（紫光繞過貓糕，從另一邊靠近你。）\n\n%name%，外面那些眼睛——同事的、家人的、認識你的、不認識你的——\n\n看不進來。',
    next: 'act3_corridor_voice_4b'
  },

  act3_corridor_voice_4b: {
    bg: 'bg-noctis-entrance.png',
    sprite: null,
    speaker: 'NOCTIS',
    text: '進了我這扇門之後，沒有人會在白天的路上，對你露出「我知道你昨晚」的眼神。\n\n你想試的姿勢、不敢說出口的對象、試了會臉紅一整個禮拜的那些念頭——\n\n在我這裡，全都不用解釋。',
    next: 'act3_corridor_battle_intro'
  },

  act3_corridor_battle_intro: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠的爪子緊緊抓住你的手腕，琥珀色的眼睛直視著你。）\n\n聽著，%name%。\n\n它說的每一句都是真的。你那些藏起來的念頭是真的，那些害羞是真的。\n\n但這不代表你應該在這裡，被它一句一句拆開。',
    next: 'act3_corridor_battle_intro_b'
  },

  act3_corridor_battle_intro_b: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '我們是來找 Inu 的。\n\n記住這件事——不管它說得多動聽，都記住這件事。',
    next: null,
    action: 'start_whisper_battle'
  },

  act3_corridor_survived: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '聲音消散了。\n\n長廊恢復了寂靜，只剩下那股音樂聲，從更深處傳來。\n\n你發現自己還站著。手心有些濕——但你還在這裡。',
    next: 'act3_corridor_survived_kaogao'
  },

  act3_corridor_survived_kaogao: {
    bg: 'bg-noctis-entrance.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……好。你撐過來了。\n\n那個聲音，說的不是謊話。但它只說了一半。\n\n你心底那些藏起來的東西是真的——但不代表你今晚就一定要交出去。\n\n你可以先看，再決定要不要碰。',
    next: 'act4_enter'
  },

  // ── ACT 4 ─────────────────────────────────────────────────────────────────

  act4_enter: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '你踏入了 NOCTIS。\n\n第一個撞上你的不是燈光，是氣味——酒、汗、皮革沙發、還有某種說不清是香水還是體溫的東西。\n\n低頻的鼓點從地板透上來，像心跳。',
    next: 'act4_enter_b',
    action: 'transition_noctis'
  },

  act4_enter_b: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '紫光是黏的，貼在你的脖子、手腕、襯衫第一顆扣子的位置。\n\n你聽見笑聲。有人在角落輕輕地喘。有人正把酒杯的邊緣，貼上別人的下唇。\n\n沒有人轉頭看你。但你知道——這裡的每一個人，都把你看進去了。',
    next: 'act4_environment'
  },

  act4_environment: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '比我以為的要……熱鬧。\n\n（牠掃了一眼吧台、沙發、半掩的簾子，琥珀色的眼睛沒有任何驚訝。）\n\n喵……我老早就知道這牆後面是什麼。Inu 跟我提過一兩次。',
    next: 'act4_environment_b'
  },

  act4_environment_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '剛才幾個孩子身上的味道，就是這裡的味道——酒和體溫混在一起的那種。\n\n我只是——沒興趣自己進來而已。\n\n但你不是我。你想看，就看清楚他們在這裡做什麼。',
    next: 'act4_inu_appear'
  },

  act4_inu_appear: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '在燈光最深處，有一個人影。\n\n他坐在吧台「客人」那一側，襯衫最上面兩顆扣子是開的，手邊一杯只剩半杯的酒。\n\n那不是 DIRUNE 裡那個永遠站在門口、永遠笑著替別人倒咖啡的 Inu。\n\n是被人替他倒酒的那個 Inu。',
    next: 'act4_inu_appear_b'
  },

  act4_inu_appear_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '他緩緩轉過頭來。\n\n是 Inu。——但又不完全是。',
    next: 'act4_inu_greet'
  },

  act4_inu_greet: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '……你來了。\n\n（他笑了一下。那個笑容比 DIRUNE 裡的更慢、更鬆，眼角還帶一點酒意。）\n\n我就知道，會有人找過來的。只是沒想到，會是這麼快。',
    next: 'act4_kaogao_sees_inu'
  },

  act4_kaogao_sees_inu: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……Inu。\n\n（牠掃了一眼他解開的扣子、桌上的酒、他比平常鬆很多的肩線，沒多說什麼。）\n\nDIRUNE 剩下的孩子們很擔心。\n\n還有——前幾批跑來找你的那些。他們現在在哪？',
    next: 'act4_inu_kaogao_response'
  },

  act4_inu_kaogao_response: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '貓糕……他們很好。\n\n那幾個孩子追過來之後，沒有一個被我趕回去。\n\n（他朝吧台後方輕輕抬了抬下巴。）\n\n他們留下來了——只是換了個招牌，換了套衣服。',
    next: 'act4_inu_kaogao_response_b'
  },

  act4_inu_kaogao_response_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '在 DIRUNE 替客人端咖啡的那個，現在替客人解外套、坐到客人腿邊、在他們耳邊把那杯酒的名字慢慢唸完。\n\n做的還是「陪伴」。只是這裡的陪伴，不必保持距離。\n\n他們，比我還早一步明白這個地方是做什麼生意的。',
    next: 'act4_inu_callback'
  },

  // 動態場景：Inu 根據玩家在 Act2/Act3 的選擇，給出不同的注視
  act4_inu_callback: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    textFn: (flags, name) => {
      if (flags.act3_view === 'empathy' && flags.act2_sense === 'feel') {
        return `${name}……你一路走來，是不是也聽見了什麼？\n\n你說過我「一定很孤獨」——但你進來之後，我看你的眼神。\n\n（他抿了一口酒，視線從你的鎖骨慢慢抬到眼睛。）\n\n那不是來找人的眼神。那是來看的眼神——看這個地方在做什麼，看我變成了誰。`;
      }
      if (flags.act3_view === 'cynic' && flags.act2_sense === 'numb') {
        return `${name}，你是個不容易動搖的人。\n\n從紫霧那邊一路走進來，連長廊的低語都沒能讓你停下。\n\n（他歪頭笑了一下。）\n\n但你「真的」什麼都沒感覺到嗎？\n\n還是說——你只是太習慣替自己找藉口，把那點悸動算進「霧」裡而已。`;
      }
      if (flags.act3_view === 'empathy') {
        return `${name}，你說過我一定很孤獨。\n\n（他輕笑。）\n\n你說對了一半。我曾經是。\n\n但坐在這裡——有人替我倒酒、有人記得我喜歡哪一首、有人不問我為什麼今天解了兩顆扣子——\n\n這個叫做「不孤獨」。`;
      }
      if (flags.act3_view === 'cynic') {
        return `${name}，貓糕跟我說過——你進來之前說「怎麼可能有人甘願留下來」。\n\n（他笑了一下，杯沿在唇邊停了半秒。）\n\n那你現在站在這裡，是來證明你說對了？\n\n還是——來確認一下，你會不會其實也想試一晚這種「有人替你解扣子」的滋味。`;
      }
      return `${name}……\n\n（他的視線在你身上慢慢掃過，沒掩飾。）\n\n你看起來，沒有想像中那麼急著回去。`;
    },
    next: 'act4_dialogue_2'
  },

  act4_dialogue_2: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: '%name%',
    text: 'Inu……你看起來，跟我以前認識的那個你不太一樣。\n\n你還回得去嗎？',
    next: 'act4_inu_response'
  },

  act4_inu_response: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '回去？……我想過。\n\n但你知道嗎，%name%——在 DIRUNE，我永遠站在門口。我給客人倒咖啡、聽他們說話、看他們哭，然後笑著送他們離開。\n\n我不能失態。不能喝多。不能在他們面前，露出半點「我也是個會想要的人」的樣子。',
    next: 'act4_inu_response_b'
  },

  act4_inu_response_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他輕笑了一聲，視線移到吧台另一頭。）\n\n但在這裡——我可以坐在那一側。\n\n讓別人替我解開最上面那顆鈕扣，讓別人替我倒第三杯，讓別人看著我臉紅。\n\n我可以有人摸我的手腕，而不必馬上抽回去。',
    next: 'act4_inu_response_c'
  },

  act4_inu_response_c: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他重新看你，眼神平靜，但眼底有他在 DIRUNE 從來不會讓你看見的那種飢渴。）\n\n%name%，我藏這個，藏了好多好多年。\n\n久到我都快以為，那個會臉紅的我，不是我。',
    next: 'act4_inu_question'
  },

  act4_inu_question: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '你知道嗎，每個人心底都有一個 NOCTIS。\n\n一個你關上門才敢看的、刪掉歷史紀錄才敢留的、不會跟同事提起的——只屬於你的黑夜。\n\n你有嗎？\n\n那個你最害羞的、最不敢承認的、但也最想試的那個版本的自己。',
    next: 'act4_player_choice'
  },

  act4_player_choice: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '',
    choices: [
      { text: '……也許有。但我現在站在這裡，是為了你。', next: 'act4_response_a' },
      { text: 'DIRUNE 還等著你。我們還等著你。',         next: 'act4_response_b' }
    ]
  },

  act4_response_a: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '……為了我。\n\n謝謝你說這句話。\n\n但是——我不確定我準備好回去了。\n\nNOCTIS 快要開放了。我想讓更多人——那些跟我一樣，藏了很多年的人——找到一個地方，把那一面攤開來。\n\n哪怕只有一個晚上。',
    next: 'act4_inu_invite'
  },

  act4_response_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '貓糕……對不起，讓你擔心了。\n\n但是——你明白的，對嗎？\n\n有些東西，光是讓它待在心底，是不夠的。總有一天，你得讓它見光——\n\n哪怕那道光，是紫色的。',
    next: 'act4_inu_invite'
  },

  act4_inu_invite: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: 'VESPERA 一直都太安靜了。\n\nDIRUNE 是白晝，是平靜，是替別人留一杯熱咖啡的地方。\n\n但黑夜——\n\n黑夜是你下班之後解開領帶、把白天那個自己擱在門口、讓另一個你走進來的地方。',
    next: 'act4_inu_invite_b'
  },

  act4_inu_invite_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他向你伸出手，手腕上戴著一條細鏈。）\n\n留下來吧。NOCTIS 即將向所有人開放。\n\n那些你晚上偷偷想的姿勢、白天不敢承認的對象、覺得會讓別人失望的念頭——\n\n進了這扇門，全都不用解釋。',
    next: 'act4_kaogao_react'
  },

  act4_kaogao_react: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……你這傢伙。\n\n（牠盯著 Inu 解開的領口看了一眼，又移開視線。）\n\n好啦好啦。至少——讓我回去告訴 DIRUNE 剩下的孩子們，你們都還好。\n\n至於要不要也過來看看——那是他們自己的事。\n\n喵……不過我猜，會來的不會少。',
    next: 'act4_final_choice'
  },

  act4_final_choice: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '',
    choices: [
      { text: '握住他伸出的手。', next: 'act4_ending' },
      { text: '……我明白了。我會告訴外面的人的。', next: 'act4_ending_2' }
    ]
  },

  // ── Ending A：玩家留下 ───────────────────────────────────────────

  act4_ending: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他握住你的手——不是用力的那種，是邀請的那種。指尖貼在你的手腕內側，皮膚對皮膚，溫的。）\n\n那麼——歡迎。',
    next: 'act4_ending_a_close_pre'
  },

  act4_ending_a_close_pre: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '音樂彷彿認得你似的，輕輕應了一聲，鼓點貼著你的胸口往下沉。',
    next: 'act4_ending_a_kaogao'
  },

  act4_ending_a_kaogao: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……既然你都進到這一步了。\n\n那我得回去看著 DIRUNE 剩下的孩子們——他們還等著聽答案。',
    next: 'act4_ending_a_kaogao_b'
  },

  act4_ending_a_kaogao_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠在你腳邊頓了一下，琥珀色的眼睛抬起來看你。）\n\n你今晚怎麼過、跟誰過、過到幾點——我都不會告訴他們。\n\n哪天你想他們了，記得回來。白天的那個你，DIRUNE 一直留位子。',
    next: 'act4_ending_a_close'
  },

  act4_ending_a_close: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '貓糕的腳步聲漸漸遠去。\n\n紫光收攏在你周圍，音樂變得近——很近，貼著你的後頸。\n\n你伸手解開了第一顆扣子。沒有人轉頭看你——但你知道，每個人都把這個動作看進去了。',
    next: 'act4_ending_a_close_b'
  },

  act4_ending_a_close_b: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '你發現自己第一次，沒有要往哪裡趕。\n\n——黃昏之後，是黑夜。\n而你的黑夜，剛剛開始。',
    next: null,
    action: 'goto_countdown'
  },

  // ── Ending B：玩家回去傳話 ───────────────────────────────────────

  act4_ending_2: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他點了點頭，沒有再勸你。）\n\n好。\n\n那就請你——告訴外面的人，這裡不是失蹤之地。\n\n是「下班之後的那個自己」可以待的地方。',
    next: 'act4_ending_2b'
  },

  act4_ending_2b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '貓糕，你呢？',
    next: 'act4_ending_b_kaogao'
  },

  act4_ending_b_kaogao: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……我留一陣子。\n\n那些先進來的孩子，總該有人陪他們適應這個新招牌——順便確認一下他們有沒有被欺負。',
    next: 'act4_ending_b_kaogao_b'
  },

  act4_ending_b_kaogao_b: {
    bg: 'bg-noctis-inside.png',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠對你眨眨眼。）\n\n你回去的路上，幫我跟 DIRUNE 的孩子們說一聲——別再亂闖了。\n\n想看 Inu 解扣子的，等正式開門再來。\n\n排隊。',
    next: 'act4_ending_b_close'
  },

  act4_ending_b_close: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '%name%',
    text: '你最後看了一眼那片紫光、那條吧台、貓糕坐在 Inu 身邊的剪影。\n\n音樂依然在唱，但這次它不再對你說話。\n\n——也許下次。也許下次你會走進去，把白天那個自己擱在門口。',
    next: 'act4_ending_b_close_b'
  },

  act4_ending_b_close_b: {
    bg: 'bg-noctis-inside.png',
    sprite: null,
    speaker: '',
    text: '你轉身，往來時的方向走去。\n\n身後傳來一陣低低的笑聲——分不清是誰的，也分不清是真的還是這個地方在跟你告別。\n\n——你知道，自己會記得這裡。',
    next: null,
    action: 'goto_countdown'
  },
};
