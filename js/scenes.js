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
    text: '喵——\n\n你平安無事通過VESPERA了呢。歡迎來到DIRUNE。雖然今天不是營業的日子……',
    next: 'prologue_choices_1'
  },

  prologue_choices_1: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「什麼是VESPERA？」',       next: 'prologue_what_vespera' },
      { text: '「你是什麼人……不，什麼貓？」', next: 'prologue_who_kaogao' },
      { text: '「我收到了冒險者公會的委託，可以請你詳細講講嗎？」', next: 'prologue_quest' }
    ]
  },

  prologue_what_vespera: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠跳上吧台，用爪子輕輕撥了撥一本厚重的筆記本。）\n\nVESPERA，是這個異空間的名字。拉丁語，黃昏的意思。\n\n沒有人知道它什麼時候出現，也沒有人知道誤入的契機。唯一確定的是——選擇其中一條路離開，就能回到現實世界。',
    next: 'prologue_vespera_detail'
  },

  prologue_vespera_detail: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '這裡有兩條路。\n\n一盞暖黃的燈，通向DIRUNE——也就是這裡，白晝之地。\n\n還有一盞幽紫的燈……那條路，從來沒有人進去後成功返回過。',
    next: 'prologue_choices_1_return'
  },

  prologue_choices_1_return: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「你是什麼人……不，什麼貓？」', next: 'prologue_who_kaogao' },
      { text: '「我收到了冒險者公會的委託，可以請你詳細講講嗎？」', next: 'prologue_quest' }
    ]
  },

  prologue_who_kaogao: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '我是貓糕。DIRUNE的居民，也算是這裡的守護者之一。\n\n很久以前，我在VESPERA迷了路，找不到回去的方法。是Inu把我留下來的——他說，這個地方太安靜了，需要一些生氣。',
    next: 'prologue_kaogao_detail'
  },

  prologue_kaogao_detail: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '我們簽了契約。\n\n他負責照顧我的起居飲食，我留在DIRUNE，為這個沉悶的地方增添一些色彩。\n\n……雖然現在，他不在了。',
    next: 'prologue_choices_2'
  },

  prologue_choices_2: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「什麼是VESPERA？」',       next: 'prologue_what_vespera_late' },
      { text: '「我收到了冒險者公會的委託，可以請你詳細講講嗎？」', next: 'prologue_quest' }
    ]
  },

  prologue_what_vespera_late: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\nVESPERA，是這個異空間的名字。拉丁語，黃昏的意思。\n\n沒有人知道它什麼時候出現，也沒有人知道誤入的契機。唯一確定的是——選擇其中一條路離開，就能回到現實世界。\n\n這裡有兩條路：暖黃的DIRUNE，還有那條幽紫的……從來沒有人進去後成功返回的路。',
    next: 'prologue_quest_lead'
  },

  prologue_quest_lead: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「我收到了冒險者公會的委託，可以請你詳細講講嗎？」', next: 'prologue_quest' }
    ]
  },

  prologue_quest: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠的耳朵垂了下來。）\n\n幾天前，Inu說他聽到了深處傳來的音樂聲。\n\n那個方向……是幽紫的迷霧。那條從來沒有人回來過的路。',
    next: 'prologue_quest_2'
  },

  prologue_quest_2: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '他說要去調查。\n\n我攔不住他。\n\n……然後他就沒有回來了。',
    next: 'prologue_quest_3'
  },

  prologue_quest_3: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '冒險者公會的人說，你是來找他的？\n\n（牠從吧台跳下，走向你，在你腳邊停下。）\n\n……帶我一起去。',
    next: 'prologue_to_act1'
  },

  prologue_to_act1: {
    bg: 'bg-dirune.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '（你點了點頭，跟著貓糕走向DIRUNE深處。\n\n遠處，那片幽紫的迷霧靜靜地等待著。）',
    next: 'act1_arrive',
    action: 'show_clue_btn'
  },

  // ── ACT 1 ─────────────────────────────────────────────────────────────────

  act1_arrive: {
    bg: 'bg-mist-door.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '迷霧的入口就在眼前。\n\n一扇沉重的鐵門橫亙在通道前，門上掛著一把密碼鎖。\n\n四個數字。',
    next: 'act1_kaogao_react'
  },

  act1_kaogao_react: {
    bg: 'bg-mist-door.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠用爪子撥了撥密碼鎖。）\n\n這是Inu鎖上的。他說，如果有一天他沒有回來，就讓值得信任的人進去找他。\n\n密碼……我不知道。但他一定留下了線索。',
    next: 'act1_explore'
  },

  act1_explore: {
    bg: 'bg-mist-door.jpg',
    sprite: null,
    speaker: '',
    text: '你環顧四周。\n\nDIRUNE的角落裡，散落著Inu留下的痕跡。\n\n（點擊場景中的物件來尋找線索。）',
    next: null,
    clues: [
      {
        id: 'clue_collar',
        label: '貓咪的項圈',
        x: '15%', y: '55%',
        found_text: '一個小小的銀色項圈，上面刻著羅馬數字 IV。\n\n（貓糕的項圈？還是其他貓咪的？）',
        clue_note: '項圈上的羅馬數字：IV'
      },
      {
        id: 'clue_menu',
        label: '菜單',
        x: '70%', y: '60%',
        found_text: '一份手寫的菜單，角落有一行小字：\n\n「本店招牌特調，以開店紀念日命名——I號特調」\n\n旁邊用鉛筆潦草地寫著：「記得，是第一個月的第一天。」',
        clue_note: '菜單備注：開店紀念日是某月的第一天（I）'
      },
      {
        id: 'clue_diary',
        label: '日記本',
        x: '45%', y: '45%',
        found_text: '一本翻開的日記，停在某一頁：\n\n「今天是我在VESPERA的第一天，也是我的生日。\n四月，第十二天。\n\n不知道為什麼，這個地方讓我覺得……像是命中注定。」',
        clue_note: '日記：Inu的生日是四月十二日'
      },
      {
        id: 'clue_clock',
        label: '停止的時鐘',
        x: '82%', y: '35%',
        found_text: '一個掛鐘，指針停在某個位置。\n\n時針指向 XII，分針指向 II。\n\n鐘面下方貼著一張便條：「時間在這裡沒有意義，但數字永遠誠實。」',
        clue_note: '時鐘：XII 和 II（12和2？還是0和2？）'
      }
    ],
    puzzle: 'code_lock'
  },

  act1_solved: {
    bg: 'bg-mist-door.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '密碼鎖發出一聲清脆的響聲。\n\n鐵門緩緩開啟，幽紫的迷霧從縫隙中湧出，帶著一股沉沉的、遙遠的音樂聲。',
    next: 'act1_enter_mist'
  },

  act1_enter_mist: {
    bg: 'bg-mist-door.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠深吸一口氣，然後邁步走入迷霧。）\n\n跟上。',
    next: 'act2_enter',
    action: 'transition_purple'
  },

  // ── ACT 2 ─────────────────────────────────────────────────────────────────

  act2_enter: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '迷霧比想像中更深邃。\n\n踏進去的瞬間，四周的聲音像是被棉花塞住——只剩下那股低沉的音樂聲，從更遠的地方傳來。\n\n你停下腳步，等待眼睛適應這片幽紫。',
    next: 'act2_corridor_1'
  },

  act2_corridor_1: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠輕輕踩著地面，每一步都謹慎而緩慢。）\n\n這裡……跟我想像的不一樣。\n\n空氣裡有什麼東西。不是危險——是慾望。\n\n（牠的尾巴輕輕搖了搖。）\n\n你能感覺到嗎？',
    next: 'act2_corridor_choice'
  },

  act2_corridor_choice: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「……有。像是音樂在催促你走向某個地方。」', next: 'act2_corridor_2' },
      { text: '「只是霧而已。我們要繼續前進。」',           next: 'act2_corridor_2b' }
    ]
  },

  act2_corridor_2: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……對。\n\n（牠停下來，側耳傾聽。）\n\n是那種讓你想一直往前走的感覺。不管前方有什麼。\n\n我理解為什麼Inu會跟著聲音走了。',
    next: 'act2_clue_intro'
  },

  act2_corridor_2b: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠用一種有些複雜的眼神看著你。）\n\n你說得對。\n\n但如果你真的什麼都感覺不到……也許，這個地方對你來說還太早。\n\n（牠的尾巴搖了搖。）\n\n無論如何，繼續走吧。',
    next: 'act2_clue_intro'
  },

  act2_clue_intro: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '走廊深處，出現了三扇門。\n\n每扇門的旁邊，都刻著一些碎裂的符文——像是某種古老語言的殘片。\n\n牆壁上散落著Inu留下的標記。\n\n（點擊牆上的標記，尋找開門的線索。）',
    next: null,
    clues: [
      {
        id: 'clue_wall_left',
        label: '左側牆刻文',
        x: '12%', y: '40%',
        found_text: '牆上用粗糙的筆跡刻著幾行字：\n\n「VESPERA的循環是：白晝——黃昏——黑夜。\n但在這個走廊，只有一個瞬間是永恆的。\n黃昏之後、黑夜之前——那片短暫的靜謐，才是真正的入口。」',
        clue_note: '牆刻文：入口是黃昏之後、黑夜之前的瞬間'
      },
      {
        id: 'clue_floor_mark',
        label: '地板上的痕跡',
        x: '50%', y: '75%',
        found_text: '地板上有一串腳印，在中間那扇門前停下。\n\nInu的腳印？\n\n腳印旁邊，用手指在灰塵上寫著：「✦ ——這個符號，在VESPERA的語言裡，代表黃昏的星，是白晝與黑夜之間的見證者。」',
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
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（石板上的符文發出微光，牆壁輕輕震動。）\n\n……對了。\n\n（牠瞇起眼睛，看著三扇門。）\n\n時序排好了。現在，選出那個「黃昏之際」的符號——就能通過。',
    next: 'act2_kaogao'
  },

  act2_kaogao: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠在三扇門前踱步，若有所思。）\n\n這些符號……Inu曾經提過，VESPERA有自己的語言。\n\n只有按照正確的順序，才能找到前進的路。',
    puzzle: 'symbol_doors'
  },

  act2_solved: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '正確的那扇門發出低沉的共鳴聲，緩緩向內開啟。\n\n迷霧從縫隙中湧出，更濃了，更紫了。',
    next: 'act2_solved_kaogao'
  },

  act2_solved_kaogao: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠凝視著那扇開啟的門，久久沒有動。）\n\n……我聽見了。\n\n音樂聲更清晰了。那是一種慵懶的、誘人的旋律，像是從很深很深的地方傳來。\n\n（牠低聲說，像是在對自己說話。）\n\n……Inu。你在那裡嗎。',
    next: 'act2_to_act3'
  },

  act2_to_act3: {
    bg: 'bg-mist-corridor.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '（你輕輕碰了碰貓糕的肩膀。）\n\n「我們繼續。」',
    next: 'act3_enter'
  },

  // ── ACT 3 ─────────────────────────────────────────────────────────────────

  act3_enter: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '',
    text: '通道的盡頭，是另一扇門。\n\n這扇門與之前的不同——它更高，更沉，門縫中透出幽紫的光，和那股讓人心跳加速的音樂聲。\n\n彷彿只要踏進去，就再也無法假裝這一切是幻覺。',
    next: 'act3_atmosphere'
  },

  act3_atmosphere: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠在你腳邊停下，仰頭看著那扇巨大的門。）\n\n這裡的空氣……比走廊更重。\n\n像是你的每一個念頭，都會被放大——那些你不敢承認的東西，在這裡都藏不住。',
    next: 'act3_atmosphere_choice'
  },

  act3_atmosphere_choice: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「Inu獨自在這裡……他一定很孤獨。」', next: 'act3_atmosphere_a' },
      { text: '「這種地方，怎麼可能有人甘願留下來？」', next: 'act3_atmosphere_b' }
    ]
  },

  act3_atmosphere_a: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……也許吧。\n\n但也許，他在這裡看見了某些東西，讓他不再感到孤獨。\n\n（牠的聲音變得更輕。）\n\n有時候，我們以為自己在找一個人——其實是在找一個能讓自己真實存在的地方。',
    next: 'act3_fragments'
  },

  act3_atmosphere_b: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠沉默了一會兒。）\n\n也許，對某些人來說——這裡反而是真實的。\n\n外面的世界，才是需要偽裝的地方。\n\n（牠凝視著門縫中透出的紫光。）\n\n……Inu從來不善於偽裝。',
    next: 'act3_fragments'
  },

  act3_fragments: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '喵……\n\n（牠盯著門上的文字，耳朵微微顫動。）\n\n這是Inu的字跡。但是……順序亂了。\n\n像是他在進入之前，把自己最深的想法留在了這裡——一道給後來者的訊息，也是一把鑰匙。',
    next: 'act3_fragments_explore'
  },

  act3_fragments_explore: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '',
    text: '門上的文字在迷霧中微微發光，但順序完全混亂——\n\n像是被什麼力量打散了，需要有人將它們重新拼合，才能讓門感應到完整的心意。\n\n（拖曳碎片，排列出Inu進入前的心路歷程。）',
    next: null,
    clues: [
      {
        id: 'clue_act3_note',
        label: '門旁的便條',
        x: '20%', y: '60%',
        found_text: '門旁貼著一張快要被迷霧侵蝕的便條：\n\n「給找到這裡的你——\n\n我留下的話語，是按照我那天的心情寫下的。\n先是聽見了聲音，然後感受到了某種呼喚，然後說服了自己，最後……留下了一道門。\n\n如果你能理解這個順序，門就會為你開啟。\n\n——Inu」',
        clue_note: 'Inu便條：順序是「聽見→感受→說服自己→留下訊息」'
      }
    ],
    puzzle: 'memory_order'
  },

  act3_solved: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '碎片拼合的瞬間，門上的文字發出耀眼的光芒。\n\n光芒消散後，門緩緩向內開啟。\n\n音樂聲一下子湧了過來——豐盛的，鋪天蓋地的，像是整個宇宙都在為這個瞬間演奏。',
    next: 'act3_corridor_enter'
  },

  // ── ACT 3 : 長廊漫步（精神攻擊前的鋪墊） ──────────────────────────────────

  act3_corridor_enter: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '門後是一條長廊。\n\n與之前的走廊不同——這裡沒有迷霧，只有光。\n\n深紫的光，從地板、牆壁、天花板同時滲透出來，溫柔，誘人，像是活的。',
    next: 'act3_corridor_kaogao_1'
  },

  act3_corridor_kaogao_1: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠輕輕踩上去，腳下的光隨著步伐微微盪漾。）\n\n……很漂亮。\n\n（牠的耳朵豎起，警覺地左右掃視。）\n\n但要小心。這個地方，會說話。',
    next: 'act3_corridor_voice_1'
  },

  act3_corridor_voice_1: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '？？？',
    text: '……你終於來了。\n\n我等你很久了。',
    next: 'act3_corridor_kaogao_2'
  },

  act3_corridor_kaogao_2: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '！\n\n（牠猛然豎起毛，低吼了一聲。）\n\n什麼人——',
    next: 'act3_corridor_voice_2'
  },

  act3_corridor_voice_2: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '？？？',
    text: '不必緊張。我沒有惡意。\n\n……我只是想讓你知道——\n\n你心底那個疲憊的聲音，我聽見了。\n\n你是不是也累了？一直努力，一直假裝，一直向前……',
    next: 'act3_corridor_player_react'
  },

  act3_corridor_player_react: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '（那個聲音鑽進你的耳朵，像是溫熱的水——）\n\n你感覺到某種奇異的鬆動，從胸口深處開始蔓延。',
    next: 'act3_corridor_voice_3'
  },

  act3_corridor_voice_3: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '？？？',
    text: '在這裡，不需要再撐著了。\n\n把那些你不敢放下的東西，都交給我。\n\nNOCTIS，會替你保管。\n\n……永遠。',
    next: 'act3_corridor_kaogao_3'
  },

  act3_corridor_kaogao_3: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '別聽！\n\n（牠一下子衝到你面前，用爪子抓住你的手。）\n\n這是NOCTIS在試探你——它用你心底最柔軟的地方說話。\n\n你如果現在放棄，你就出不去了！',
    next: 'act3_corridor_voice_4'
  },

  act3_corridor_voice_4: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: null,
    speaker: '？？？',
    text: '貓糕，你太緊張了。\n\n出去？為什麼要出去？\n\n外面有什麼好的——責任？義務？那些讓你永遠無法真正休息的東西？\n\n在這裡，只有你自己。\n\n只有現在。',
    next: 'act3_corridor_battle_intro'
  },

  act3_corridor_battle_intro: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠的手緊緊握住你，琥珀色的眼睛直視著你。）\n\n聽著，%name%。\n\n這些話——每一句都是真的。你的疲憊是真的，你的迷惘是真的。\n\n但這不代表你應該消失在這裡。\n\n（牠深吸一口氣。）\n\n我們是來找Inu的。記住這件事。不管它說什麼，都記住這件事。',
    next: null,
    action: 'start_whisper_battle'
  },

  act3_corridor_survived: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '聲音消散了。\n\n長廊恢復了寂靜，只剩下那股音樂聲，從更深處傳來。\n\n你發現自己還站著。手心有些濕——但你還在這裡。',
    next: 'act3_corridor_survived_kaogao'
  },

  act3_corridor_survived_kaogao: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠鬆開你的手，輕輕呼出一口氣。）\n\n……好。你撐過來了。\n\n（牠回頭看了一眼漸漸暗淡的走廊。）\n\n那個聲音，說的不是謊話。\n\n但它只說了一半。\n\n（牠轉向你。）\n\n疲憊的另一半，是還在乎。如果你真的什麼都不在乎，它就說不進你心裡了。',
    next: 'act3_solved_reaction'
  },

  act3_solved_reaction: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠愣了一下，然後慢慢地深呼吸。）\n\n……原來是這樣。\n\nInu留下這些話，不只是為了鎖住門。\n\n他是在告訴我們：他是清醒地走進去的。\n\n（牠的眼神變得複雜。）\n\n那麼，我們還要繼續嗎？',
    next: 'act3_enter_noctis'
  },

  act3_enter_noctis: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '%name%',
    text: '「當然。我們來這裡，就是為了找到他。」\n\n（貓糕看了你很長一段時間。）',
    next: 'act3_kaogao_resolve'
  },

  act3_kaogao_resolve: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……好。\n\n（牠輕輕搖了搖頭，然後站直了身體。）\n\n進去之後，可能會看見一些讓你動搖的東西。\n\nNOCTIS會放大你內心的慾望——它不傷人，但它讓你誠實。\n\n有時候，誠實比傷害更難承受。',
    next: 'act3_choice'
  },

  act3_choice: {
    bg: 'bg-noctis-entrance.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「準備好了。帶路。」', next: 'act4_enter' },
      { text: '「……我們進去吧。一起。」', next: 'act4_enter' }
    ]
  },

  // ── ACT 4 ─────────────────────────────────────────────────────────────────

  act4_enter: {
    bg: 'bg-noctis-inside.jpg',
    sprite: null,
    speaker: '',
    text: '你踏入了NOCTIS。\n\n音樂聲包裹著你，如同一雙溫柔的手。\n\n燈光是深邃的紫與金，在空氣中緩緩流動。\n\n這裡比你想像的更……美麗。也更真實。',
    next: 'act4_environment',
    action: 'transition_noctis'
  },

  act4_environment: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '（牠在你身邊輕輕踱步，眼睛掃視著四周。）\n\n比我以為的要……溫柔。\n\n沒有惡意，沒有陷阱。\n\n只是……慾望。所有人心底最深處的那種。',
    next: 'act4_inu_appear'
  },

  act4_inu_appear: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '在燈光最深處，有一個人影。\n\n他背對著你，站在音樂聲最濃密的地方，像是整個空間的中心。\n\n然後，他轉過身來。\n\n是Inu。\n\n——但又不完全是。',
    next: 'act4_inu_greet'
  },

  act4_inu_greet: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '……你來了。\n\n（他微微一笑，那笑容裡有什麼東西不太一樣——更放鬆，也更危險。）\n\n我就知道，會有人找過來的。\n\n只是沒想到，會是這麼快。',
    next: 'act4_kaogao_sees_inu'
  },

  act4_kaogao_sees_inu: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……Inu。\n\n（牠的聲音很輕，但裡面有某種東西在顫抖。）\n\n你知不知道，你讓我等了多久。',
    next: 'act4_inu_kaogao_response'
  },

  act4_inu_kaogao_response: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '貓糕……\n\n（他的表情軟化了一瞬。）\n\n對不起。\n\n但是……你看到了嗎？這個地方。\n\n（他向四周環視，眼神裡有一種說不清的光。）\n\n我找到了我一直在找的東西。',
    next: 'act4_dialogue_2'
  },

  act4_dialogue_2: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: '%name%',
    text: '「Inu……大家都很擔心你。你要回去嗎？」',
    next: 'act4_inu_response'
  },

  act4_inu_response: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '回去？\n\n（他輕笑了一聲，但那笑聲裡沒有惡意。）\n\n……我想過。\n\n但NOCTIS讓我看見了一些東西。一些我一直藏著的東西。\n\n在外面，我是DIRUNE的守護者，是所有人的後盾。\n\n在這裡……我只是我自己。',
    next: 'act4_inu_question'
  },

  act4_inu_question: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他走近了幾步，停在你面前。）\n\n你知道嗎，每個人心底都有一個NOCTIS。\n\n一個不需要假裝、不需要解釋的地方。\n\n你有嗎？\n\n那個只屬於你的黑夜？',
    next: 'act4_player_choice'
  },

  act4_player_choice: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '',
    choices: [
      { text: '「……也許有。但我現在在這裡，是為了你。」', next: 'act4_response_a' },
      { text: '「DIRUNE也需要你。貓糕也需要你。」',       next: 'act4_response_b' }
    ]
  },

  act4_response_a: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '……為了我。\n\n（他沉默了一會兒，然後緩緩地呼出一口氣。）\n\n謝謝你說這句話。\n\n但是……我不確定我準備好了回去。\n\n（他轉過身，看著那片燈光。）\n\nNOCTIS快要開放了。我想讓更多人找到屬於他們的黑夜。',
    next: 'act4_inu_invite'
  },

  act4_response_b: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '貓糕……\n\n（他的眼神落在貓糕身上，有什麼東西在那個視線裡融化了。）\n\n對不起，讓你擔心了。\n\n（他深吸一口氣。）\n\n但是……你明白的，對嗎？\n\n（他的聲音變輕了。）\n\n有些事，只有親自走進去，才能知道答案。',
    next: 'act4_inu_invite'
  },

  act4_inu_invite: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '你知道嗎，VESPERA一直都太安靜了。\n\nDIRUNE是白晝，是平靜，是療癒。\n\n但黑夜……黑夜才是真正的自由。\n\n（他向你伸出手。）\n\n留下來吧。NOCTIS，即將向所有人開放。\n\n讓更多人找到屬於他們的那片黑夜。',
    next: 'act4_kaogao_react'
  },

  act4_kaogao_react: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-kaogao.png',
    speaker: '貓糕',
    text: '……\n\n（牠沉默了很長一段時間，然後輕輕地靠在Inu的腿邊。）\n\n你這個大笨蛋。\n\n（牠的聲音很小，但每個字都很清晰。）\n\n……但也許，你找到的東西，是對的。',
    next: 'act4_final_choice'
  },

  act4_final_choice: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: '',
    text: '',
    choices: [
      { text: '（握住他伸出的手。）', next: 'act4_ending' },
      { text: '「……我明白了。我會告訴外面的人的。」', next: 'act4_ending_2' }
    ]
  },

  act4_ending: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '黃昏之後，是黑夜。\n\n黑夜之後……是更深的黑夜。\n\n但深處有光。\n\n（他的笑容在燈光中漸漸清晰，音樂聲越來越響，越來越豐盛。）\n\nNOCTIS，歡迎你。\n\n——2026.05.29，我們等你。',
    next: null,
    action: 'goto_countdown'
  },

  act4_ending_2: {
    bg: 'bg-noctis-inside.jpg',
    sprite: 'sprite-inu-noctis.png',
    speaker: 'Inu',
    text: '（他微微點頭，那個笑容比剛才更溫柔。）\n\n謝謝你走到這裡。\n\n（他轉向那片燈光與音樂。）\n\n告訴他們——黑夜不可怕。\n\n真正可怕的，是從未允許自己停留其中。\n\nNOCTIS，等著所有準備好的人。\n\n——2026.05.29，我們等你。',
    next: null,
    action: 'goto_countdown'
  }
};
