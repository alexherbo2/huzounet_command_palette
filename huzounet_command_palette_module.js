// html ------------------------------------------------------------------------

const COMMAND_PALETTE_TEMPLATE = document.createElement('template')

COMMAND_PALETTE_TEMPLATE.innerHTML = `
  <dialog id="command_palette" popover>
    <header>
      <input id="palette-input" placeholder="Rechercher">
    </header>
    <main>
      <custom-menu id="palette-menu" hidden>
        <span slot="name">Résultats</span>
      </custom-menu>
      <custom-menu id="menu-commands">
        <span slot="name">Commandes</span>
        <menu-item data-command="toggleDarkMode">Activer le mode jour/nuit</menu-item>
      </custom-menu>
    </main>
  </dialog>
`

document.body.append(
  COMMAND_PALETTE_TEMPLATE.content.firstElementChild
)

// css -------------------------------------------------------------------------

const COMMAND_PALETTE_STYLE_SHEET = document.createElement('style')

COMMAND_PALETTE_STYLE_SHEET.textContent = `
  :root {
    color-scheme: light dark;
    --font-family: system-ui;

    /*
     * macOS color palette
     * https://developer.apple.com/design/human-interface-guidelines/foundations/color#specifications
     */
    --aqua-red-color: #ff3b30;
    --dark-red-color: #ff453a;
    --aqua-orange-color: #ff9500;
    --dark-orange-color: #ff9f0a;
    --aqua-yellow-color: #ffcc00;
    --dark-yellow-color: #ffd60a;
    --aqua-green-color: #28cd41;
    --dark-green-color: #32d74b;
    --aqua-mint-color: #00c7be;
    --dark-mint-color: #66d4cf;
    --aqua-teal-color: #59adc4;
    --dark-teal-color: #6ac4dc;
    --aqua-cyan-color: #55bef0;
    --dark-cyan-color: #5ac8f5;
    --aqua-blue-color: #007aff;
    --dark-blue-color: #0a84ff;
    --aqua-indigo-color: #5856d6;
    --dark-indigo-color: #5e5ce6;
    --aqua-purple-color: #af52de;
    --dark-purple-color: #bf5af2;
    --aqua-pink-color: #ff2d55;
    --dark-pink-color: #ff375f;
    --aqua-brown-color: #a2845e;
    --dark-brown-color: #ac8e68;
    --aqua-gray-color: #8e8e93;
    --dark-gray-color: #98989d;
    --aqua-gray-2-color: #aeaeb2;
    --dark-gray-2-color: #636366;
    --aqua-gray-3-color: #c7c7cc;
    --dark-gray-3-color: #48484a;
    --aqua-gray-4-color: #d1d1d6;
    --dark-gray-4-color: #3a3a3c;
    --aqua-gray-5-color: #e5e5ea;
    --dark-gray-5-color: #2c2c2e;
    --aqua-gray-6-color: #f2f2f7;
    --dark-gray-6-color: #1c1c1e;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --background-color: linear-gradient(90deg, var(--aqua-gray-6-color), var(--aqua-gray-5-color), var(--aqua-gray-6-color));
      --foreground-color: black;
      --scrollbar-thumb-color: var(--aqua-gray-3-color);
      --scrollbar-track-color: var(--aqua-gray-6-color);
      --text-field-background-color: var(--aqua-gray-5-color);
      --placeholder-text-color: #00000040;
      --primary-button-text-color: white;
      --primary-button-background-color: var(--dark-blue-color);
      --primary-button-active-background-color: var(--aqua-blue-color);
      --selected-text-color: white;
      --selected-text-background-color: var(--aqua-blue-color);
      --control-accent-color: var(--aqua-blue-color);
      --label-color: #000000d9;
      --secondary-label-color: #00000080;
      --tertiary-label-color: #00000042;
      --disabled-control-text-color: #00000040;
      --separator-color: #0000001a;
      --shadow-color: #00000059;
      --popover-background-color: var(--aqua-gray-6-color);
      --popover-text-color: #000000d9;
      --popover-border-color: var(--aqua-gray-5-color);
      --tag-pill-background-color: #e8f0fe66;
      --tag-pill-text-color: #174ea6;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: linear-gradient(90deg, var(--dark-gray-5-color), var(--dark-gray-4-color), var(--dark-gray-5-color));
      --foreground-color: white;
      --scrollbar-thumb-color: var(--dark-gray-2-color);
      --scrollbar-track-color: var(--dark-gray-5-color);
      --text-field-background-color: var(--dark-gray-4-color);
      --placeholder-text-color: #ffffff40;
      --primary-button-text-color: white;
      --primary-button-background-color: var(--aqua-blue-color);
      --primary-button-active-background-color: var(--dark-blue-color);
      --selected-text-color: white;
      --selected-text-background-color: var(--dark-blue-color);
      --control-accent-color: var(--dark-blue-color);
      --label-color: #ffffffd9;
      --secondary-label-color: #ffffff8c;
      --tertiary-label-color: #ffffff40;
      --disabled-control-text-color: #ffffff40;
      --separator-color: #ffffff1a;
      --shadow-color: #00000059;
      --popover-background-color: var(--dark-gray-5-color);
      --popover-text-color: #ffffffd9;
      --popover-border-color: var(--dark-gray-4-color);
      --tag-pill-background-color: #2d333b;
      --tag-pill-text-color: #c5d1de;
    }
  }

  #command_palette {
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
    scrollbar-width: none;
    scroll-margin-top: 3rem;
    scroll-padding-top: 3rem;
  }

  #command_palette {
    min-width: 300px;
    max-height: 600px;
    background: var(--background-color);
    color: var(--foreground-color);
    font-family: var(--font-family);
  }

  #command_palette header {
    position: sticky;
    top: 0;
    height: 3rem;
    border-bottom: 1px solid var(--separator-color);
    display: flex;
    flex-direction: column;
  }

  #command_palette header:has(+ main[data-scroll-top="0"]) {
    border-bottom: none;
  }

  #command_palette main {
    overflow: auto;
    scrollbar-width: thin;
    display: flex;
    flex-direction: column;
  }

  #command_palette input {
    border: none;
    background-color: var(--text-field-background-color);
    caret-color: var(--control-accent-color);
    margin: 0.3rem 0.9rem;
    padding: 0.3rem 0.9rem;
    border-radius: 0.3rem;
  }

  #command_palette input::placeholder {
    color: var(--placeholder-text-color);
  }

  #command_palette hr {
    margin: auto;
    width: 90%;
    border: none;
    border-top: 1px solid var(--separator-color);
    margin-block: 0.3rem;
  }

  #command_palette menu-item::part(button),
  #command_palette keyboard-shortcut::part(key),
  #command_palette button,
  #command_palette kbd {
    font-family: inherit;
  }

  #command_palette input:focus,
  #command_palette custom-menu:focus,
  #command_palette menu-item:focus {
    outline: none;
  }

  #command_palette custom-menu {
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  #command_palette custom-menu::part(menu) {
    list-style: none;
    margin-block: 0.3rem;
    padding-inline: 0.3rem;
  }

  #command_palette menu-item::part(item) {
    list-style: none;
  }

  #command_palette custom-menu::part(name) {
    font-size: 90%;
    color: var(--tertiary-label-color);
    margin: 0;
    padding: 0.3rem 0.9rem;
  }

  #command_palette custom-menu:is([hidden="hidden"], [hidden=""]) {
    display: none;
  }

  #command_palette menu-item::part(button) {
    width: 100%;
    border: none;
    background-color: unset;
    color: var(--label-color);
    text-align: start;
    display: flex;
    padding: 0.3rem 0.9rem;
    border-radius: 0.3rem;
    word-break: break-word;
  }

  #command_palette menu-item:is(:hover, :focus, :active)::part(button) {
    background-color: var(--selected-text-background-color);
    color: var(--selected-text-color);
  }

  #command_palette menu-item::part(description) {
    flex: 1;
  }

  #command_palette menu-item::part(shortcuts) {
    display: flex;
    color: var(--tertiary-label-color);
  }

  #command_palette menu-item:is(:hover, :focus, :active)::part(shortcuts) {
    color: var(--selected-text-color);
  }

  #command_palette menu-item.active {
    scroll-margin-top: 3rem;
    scroll-padding-top: 3rem;
  }

  #command_palette menu-item.active::part(button) {
    border: none;
    border-radius: 0;
    box-shadow: -0.3rem 0 var(--control-accent-color);
  }

  #command_palette menu-item.active:is(:hover, :focus, :active)::part(button) {
    background-color: inherit;
    color: inherit;
  }

  #command_palette menu-item.active:is(:hover, :focus, :active)::part(shortcuts) {
    color: var(--tertiary-label-color);
  }

  #command_palette menu-item[disabled] {
    pointer-events: none;
  }

  #command_palette menu-item[disabled]:not(:hover, :focus, :active)::part(button) {
    color: var(--disabled-control-text-color);
  }

  #command_palette keyboard-shortcut + keyboard-shortcut::before {
    content: ",";
  }

  #command_palette #menu-commands menu-item:has(suggestion-item) {
    display: none;
  }

  #command_palette suggestion-item::part(label) {
    padding: 0.1em 0.2em;
    border-radius: 0.3em;
    background-color: var(--tag-pill-background-color);
    color: var(--tag-pill-text-color);
  }

  #command_palette suggestion-item::part(label)::after {
    content: " · ";
  }

  #command_palette suggestion-item::part(domain) {
    display: block;
    color: var(--tertiary-label-color);
  }

  #command_palette[popover]:popover-open {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    margin: auto;
    width: 40%;
    height: 40%;
    background-color: var(--popover-background-color);
    color: var(--popover-text-color);
    border: 1px solid var(--popover-border-color);
    border-radius: 0.6rem;
    box-shadow: 0px 5px 15px var(--shadow-color);
  }

  #command_palette[popover]:popover-open main {
    margin-block: 0.3rem;
    padding: 0.9rem;
  }

  #command_palette[popover]:popover-open :is(h1, h2, h3, h4, h5, h6) {
    margin-inline-start: 0.5rem;
    margin-block-end: 0.3rem;
  }

  #command_palette[popover]:popover-open section {
    margin-block: 0.3rem;
    padding: 0.6rem;
    border: 1px solid var(--separator-color);
    border-radius: 0.3rem;
  }

  #command_palette[popover]:popover-open footer {
    margin-block: 0.3rem;
    padding: 0.9rem;
    border-top: 1px solid var(--separator-color);
    display: flex;
    justify-content: flex-end;
  }

  #command_palette[popover]:popover-open footer button {
    border: none;
    background-color: var(--primary-button-background-color);
    color: var(--primary-button-text-color);
    padding: 0.1rem 0.9rem;
    border-radius: 0.3rem;
  }

  #command_palette[popover]:popover-open footer button:focus {
    outline: none;
  }

  #command_palette[popover]:popover-open footer button:active {
    background-color: var(--primary-button-active-background-color);
  }

  #command_palette :is(header, main):has(+ :popover-open) {
    pointer-events: none;
  }

  #command_palette[popover]:popover-open::backdrop {
    background: var(--background-color);
    opacity: 0.6;
  }
`

document.head.append(
  COMMAND_PALETTE_STYLE_SHEET
)

// database --------------------------------------------------------------------

const HUZOUNET_SUGGESTIONS = [
  { "type": "huzounet", "title": "YouTube", "url": "https://youtube.com/@Huzounet" },
  { "type": "huzounet", "title": "Twitch", "url": "https://twitch.tv/huzounet" },
  { "type": "huzounet", "title": "Discord", "url": "https://discord.com/invite/huz" },
  { "type": "huzounet", "title": "Instagram", "url": "https://instagram.com/huzounet" },
  { "type": "huzounet", "title": "TikTok", "url": "https://tiktok.com/@huzounet" },
  { "type": "huzounet", "title": "Twitter", "url": "https://twitter.com/huzounet" },
]

const DOFUSBOOK_SUGGESTIONS = [
  { "type": "dofusbook", "title": "CASUNAK 120", "url": "https://d-bk.net/fr/d/oBUT" },
  { "type": "dofusbook", "title": "CRA AIR 165", "url": "https://d-bk.net/fr/d/1BHRL" },
  { "type": "dofusbook", "title": "CRA AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IQz" },
  { "type": "dofusbook", "title": "CRA AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IQp" },
  { "type": "dofusbook", "title": "CRA AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IQU" },
  { "type": "dofusbook", "title": "CRA AIR PVM 20", "url": "https://d-bk.net/fr/d/15YgL" },
  { "type": "dofusbook", "title": "CRA AIR PVM 50", "url": "https://d-bk.net/fr/d/15Ygt" },
  { "type": "dofusbook", "title": "CRA AMRO 120", "url": "https://d-bk.net/fr/d/x9If" },
  { "type": "dofusbook", "title": "CRA DO POU 120", "url": "https://d-bk.net/fr/d/1B128" },
  { "type": "dofusbook", "title": "CRA DO POU ÉQUILIBRÉ 199 LOW COST", "url": "https://d-bk.net/fr/d/19mQx" },
  { "type": "dofusbook", "title": "CRA DO POU ÉQUILIBRÉ 199 MEDIUM", "url": "https://d-bk.net/fr/d/19mR2" },
  { "type": "dofusbook", "title": "CRA DO POU ÉQUILIBRÉ 199 PREMIUM", "url": "https://d-bk.net/fr/d/19mRD" },
  { "type": "dofusbook", "title": "CRA DO POU LOW COST PVP 200", "url": "https://d-bk.net/fr/d/17bZq" },
  { "type": "dofusbook", "title": "CRA DO POU MEDIUM PVP 200", "url": "https://d-bk.net/fr/d/17bZt" },
  { "type": "dofusbook", "title": "CRA DO POU PREMIUM PVP 200", "url": "https://d-bk.net/fr/d/17bZv" },
  { "type": "dofusbook", "title": "CRA DO POU ROXX 199 LOW COST", "url": "https://d-bk.net/fr/d/19mQb" },
  { "type": "dofusbook", "title": "CRA DO POU ROXX 199 MEDIUM", "url": "https://d-bk.net/fr/d/19mQl" },
  { "type": "dofusbook", "title": "CRA DO POU ROXX 199 PREMIUM", "url": "https://d-bk.net/fr/d/19mQm" },
  { "type": "dofusbook", "title": "CRA EAU 165", "url": "https://d-bk.net/fr/d/xlnM" },
  { "type": "dofusbook", "title": "CRA FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15IQ3" },
  { "type": "dofusbook", "title": "CRA FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IQ0" },
  { "type": "dofusbook", "title": "CRA FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IPy" },
  { "type": "dofusbook", "title": "CRA FEU LOW COST  ROXX", "url": "https://d-bk.net/fr/d/q1Pq" },
  { "type": "dofusbook", "title": "CRA FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150dB" },
  { "type": "dofusbook", "title": "CRA FEU MEDIUM  ROXX", "url": "https://d-bk.net/fr/d/q1Q8" },
  { "type": "dofusbook", "title": "CRA FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150mb" },
  { "type": "dofusbook", "title": "CRA FEU PREMIUM  ROXX", "url": "https://d-bk.net/fr/d/q1QR" },
  { "type": "dofusbook", "title": "CRA FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150mc" },
  { "type": "dofusbook", "title": "CRA FEU PVM 110", "url": "https://d-bk.net/fr/d/15YhC" },
  { "type": "dofusbook", "title": "CRA FEU PVM 130", "url": "https://d-bk.net/fr/d/15YhF" },
  { "type": "dofusbook", "title": "CRA FEU PVM 160", "url": "https://d-bk.net/fr/d/15YhK" },
  { "type": "dofusbook", "title": "CRA FEU PVM 180", "url": "https://d-bk.net/fr/d/15YhL" },
  { "type": "dofusbook", "title": "CRA FEU PVM 199", "url": "https://d-bk.net/fr/d/15YhM" },
  { "type": "dofusbook", "title": "CRA FEU PVM 20", "url": "https://d-bk.net/fr/d/1BGBR" },
  { "type": "dofusbook", "title": "CRA FEU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15YhN" },
  { "type": "dofusbook", "title": "CRA FEU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15YhO" },
  { "type": "dofusbook", "title": "CRA FEU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15YhP" },
  { "type": "dofusbook", "title": "CRA FEU PVM 50", "url": "https://d-bk.net/fr/d/1BGBS" },
  { "type": "dofusbook", "title": "CRA FEU PVM 80", "url": "https://d-bk.net/fr/d/15YhB" },
  { "type": "dofusbook", "title": "CRA FEU-AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/150hy" },
  { "type": "dofusbook", "title": "CRA FEU-AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150hn" },
  { "type": "dofusbook", "title": "CRA FEU-AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150hd" },
  { "type": "dofusbook", "title": "CRA FEU/EAU 120", "url": "https://d-bk.net/fr/d/1B1bf" },
  { "type": "dofusbook", "title": "CRA MULTI 199 LOW COST PVP", "url": "https://d-bk.net/fr/d/18Jcd" },
  { "type": "dofusbook", "title": "CRA MULTI 199 MEDIUM PVP", "url": "https://d-bk.net/fr/d/18JcT" },
  { "type": "dofusbook", "title": "CRA MULTI 199 PREMIUM PVP", "url": "https://d-bk.net/fr/d/18JcP" },
  { "type": "dofusbook", "title": "CRA MULTI 199", "url": "https://d-bk.net/fr/d/16dtk" },
  { "type": "dofusbook", "title": "CRA MULTI PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/tsfL" },
  { "type": "dofusbook", "title": "CRA MULTI PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Yhi" },
  { "type": "dofusbook", "title": "CRA MULTI PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Yhp" },
  { "type": "dofusbook", "title": "CRA MULTI ROXX LOW COST", "url": "https://d-bk.net/fr/d/19tZR" },
  { "type": "dofusbook", "title": "CRA MULTI ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19tZU" },
  { "type": "dofusbook", "title": "CRA MULTI ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19tZZ" },
  { "type": "dofusbook", "title": "CRA TERRE 120", "url": "https://d-bk.net/fr/d/1B125" },
  { "type": "dofusbook", "title": "CRA TERRE 165", "url": "https://d-bk.net/fr/d/xlnQ" },
  { "type": "dofusbook", "title": "CRA TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15IP3" },
  { "type": "dofusbook", "title": "CRA TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IP2" },
  { "type": "dofusbook", "title": "CRA TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IP1" },
  { "type": "dofusbook", "title": "CRA TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150hG" },
  { "type": "dofusbook", "title": "CRA TERRE LOW COST", "url": "https://d-bk.net/fr/d/q1OB" },
  { "type": "dofusbook", "title": "CRA TERRE MEDIUM  ROXX", "url": "https://d-bk.net/fr/d/q1OX" },
  { "type": "dofusbook", "title": "CRA TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150h4" },
  { "type": "dofusbook", "title": "CRA TERRE PREMIUM  ROXX", "url": "https://d-bk.net/fr/d/q1Y5" },
  { "type": "dofusbook", "title": "CRA TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iVd" },
  { "type": "dofusbook", "title": "ECA AIR 120", "url": "https://d-bk.net/fr/d/14Tth" },
  { "type": "dofusbook", "title": "ECA AIR 165", "url": "https://d-bk.net/fr/d/1BHV6" },
  { "type": "dofusbook", "title": "ECA EAU 165", "url": "https://d-bk.net/fr/d/xlni" },
  { "type": "dofusbook", "title": "ECA EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15Hhf" },
  { "type": "dofusbook", "title": "ECA EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15HhZ" },
  { "type": "dofusbook", "title": "ECA EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15HfR" },
  { "type": "dofusbook", "title": "ECA EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/14zmX" },
  { "type": "dofusbook", "title": "ECA EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14zmO" },
  { "type": "dofusbook", "title": "ECA EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iUR" },
  { "type": "dofusbook", "title": "ECA EAU PVM 110", "url": "https://d-bk.net/fr/d/15WqI" },
  { "type": "dofusbook", "title": "ECA EAU PVM 130", "url": "https://d-bk.net/fr/d/15Wr3" },
  { "type": "dofusbook", "title": "ECA EAU PVM 160", "url": "https://d-bk.net/fr/d/15WrF" },
  { "type": "dofusbook", "title": "ECA EAU PVM 180", "url": "https://d-bk.net/fr/d/15WrV" },
  { "type": "dofusbook", "title": "ECA EAU PVM 199", "url": "https://d-bk.net/fr/d/15Wrm" },
  { "type": "dofusbook", "title": "ECA EAU PVM 20", "url": "https://d-bk.net/fr/d/15WpN" },
  { "type": "dofusbook", "title": "ECA EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15Ws1" },
  { "type": "dofusbook", "title": "ECA EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15WsO" },
  { "type": "dofusbook", "title": "ECA EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15WsZ" },
  { "type": "dofusbook", "title": "ECA EAU PVM 50", "url": "https://d-bk.net/fr/d/15WpY" },
  { "type": "dofusbook", "title": "ECA EAU PVM 80", "url": "https://d-bk.net/fr/d/15Wq0" },
  { "type": "dofusbook", "title": "ECA FEU  165", "url": "https://d-bk.net/fr/d/xlnp" },
  { "type": "dofusbook", "title": "ECA FEU 120", "url": "https://d-bk.net/fr/d/q8CO" },
  { "type": "dofusbook", "title": "ECA FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15HRi" },
  { "type": "dofusbook", "title": "ECA FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15HRd" },
  { "type": "dofusbook", "title": "ECA FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15HRa" },
  { "type": "dofusbook", "title": "ECA FEU LOW COST  ROXX", "url": "https://d-bk.net/fr/d/q1Wo" },
  { "type": "dofusbook", "title": "ECA FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150VZ" },
  { "type": "dofusbook", "title": "ECA FEU MEDIUM  ROXX", "url": "https://d-bk.net/fr/d/q1Wt" },
  { "type": "dofusbook", "title": "ECA FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150VD" },
  { "type": "dofusbook", "title": "ECA FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iUK" },
  { "type": "dofusbook", "title": "ECA FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/qOyd" },
  { "type": "dofusbook", "title": "ECA FEU PVM 110", "url": "https://d-bk.net/fr/d/15XPk" },
  { "type": "dofusbook", "title": "ECA FEU PVM 130", "url": "https://d-bk.net/fr/d/15XQ1" },
  { "type": "dofusbook", "title": "ECA FEU PVM 160", "url": "https://d-bk.net/fr/d/15XRq" },
  { "type": "dofusbook", "title": "ECA FEU PVM 180", "url": "https://d-bk.net/fr/d/15XS2" },
  { "type": "dofusbook", "title": "ECA FEU PVM 199", "url": "https://d-bk.net/fr/d/15XSH" },
  { "type": "dofusbook", "title": "ECA FEU PVM 20", "url": "https://d-bk.net/fr/d/15XOP" },
  { "type": "dofusbook", "title": "ECA FEU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15XSr" },
  { "type": "dofusbook", "title": "ECA FEU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15XTE" },
  { "type": "dofusbook", "title": "ECA FEU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15XU3" },
  { "type": "dofusbook", "title": "ECA FEU PVM 50", "url": "https://d-bk.net/fr/d/15XOU" },
  { "type": "dofusbook", "title": "ECA FEU PVM 80", "url": "https://d-bk.net/fr/d/15XOj" },
  { "type": "dofusbook", "title": "ECA TERRE  120", "url": "https://d-bk.net/fr/d/o1xz" },
  { "type": "dofusbook", "title": "ECA TERRE 165", "url": "https://d-bk.net/fr/d/uF4Y" },
  { "type": "dofusbook", "title": "ECA TERRE COST", "url": "https://d-bk.net/fr/d/15HfK" },
  { "type": "dofusbook", "title": "ECA TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/14znq" },
  { "type": "dofusbook", "title": "ECA TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14znh" },
  { "type": "dofusbook", "title": "ECA TERRE MEDIUM", "url": "https://d-bk.net/fr/d/15Heg" },
  { "type": "dofusbook", "title": "ECA TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iU2" },
  { "type": "dofusbook", "title": "ECA TERRE PREMIUM", "url": "https://d-bk.net/fr/d/15HdS" },
  { "type": "dofusbook", "title": "ECA TERRE ROXX LOW COST", "url": "https://d-bk.net/fr/d/19sJn" },
  { "type": "dofusbook", "title": "ECA TERRE ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19sKD" },
  { "type": "dofusbook", "title": "ECA TERRE ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19sKN" },
  { "type": "dofusbook", "title": "EIN TERRE PVM 80", "url": "https://d-bk.net/fr/d/1Asiu" },
  { "type": "dofusbook", "title": "ELIO AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15J4t" },
  { "type": "dofusbook", "title": "ELIO AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J4n" },
  { "type": "dofusbook", "title": "ELIO AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J49" },
  { "type": "dofusbook", "title": "ELIO AIR ÉQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19ohK" },
  { "type": "dofusbook", "title": "ELIO AIR ÉQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19ohN" },
  { "type": "dofusbook", "title": "ELIO AIR ÉQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19ohO" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 110", "url": "https://d-bk.net/fr/d/15aKu" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 130", "url": "https://d-bk.net/fr/d/15aKv" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 160", "url": "https://d-bk.net/fr/d/15aL1" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 180", "url": "https://d-bk.net/fr/d/15aL3" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 199", "url": "https://d-bk.net/fr/d/15aL4" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 20", "url": "https://d-bk.net/fr/d/15aKq" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aL5" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aL6" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aL7" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 50", "url": "https://d-bk.net/fr/d/15aKr" },
  { "type": "dofusbook", "title": "ELIO AIR PVM 80", "url": "https://d-bk.net/fr/d/15aKt" },
  { "type": "dofusbook", "title": "ELIO AIR ROXX LOW COST", "url": "https://d-bk.net/fr/d/19ohz" },
  { "type": "dofusbook", "title": "ELIO AIR ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19oiA" },
  { "type": "dofusbook", "title": "ELIO AIR ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19oiF" },
  { "type": "dofusbook", "title": "ELIO AIR/DO POU 165", "url": "https://d-bk.net/fr/d/1BHVk" },
  { "type": "dofusbook", "title": "ELIO EAU 165", "url": "https://d-bk.net/fr/d/xlo1" },
  { "type": "dofusbook", "title": "ELIO EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15J3K" },
  { "type": "dofusbook", "title": "ELIO EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J3I" },
  { "type": "dofusbook", "title": "ELIO EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J3D" },
  { "type": "dofusbook", "title": "ELIO EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150mX" },
  { "type": "dofusbook", "title": "ELIO EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/vcE1" },
  { "type": "dofusbook", "title": "ELIO EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150mU" },
  { "type": "dofusbook", "title": "ELIO EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/vcEL" },
  { "type": "dofusbook", "title": "ELIO EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/14vj0" },
  { "type": "dofusbook", "title": "ELIO EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/vcEe" },
  { "type": "dofusbook", "title": "ELIO FEU 120", "url": "https://d-bk.net/fr/d/o1yS" },
  { "type": "dofusbook", "title": "ELIO FEU 165", "url": "https://d-bk.net/fr/d/1BHVi" },
  { "type": "dofusbook", "title": "ELIO FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15J1b" },
  { "type": "dofusbook", "title": "ELIO FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J1Y" },
  { "type": "dofusbook", "title": "ELIO FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J1Q" },
  { "type": "dofusbook", "title": "ELIO FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150mj" },
  { "type": "dofusbook", "title": "ELIO FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150mg" },
  { "type": "dofusbook", "title": "ELIO FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150me" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 110 LOW COST", "url": "https://d-bk.net/fr/d/18Fqx" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 130 LOW COST", "url": "https://d-bk.net/fr/d/18FrB" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 160 LOW COST", "url": "https://d-bk.net/fr/d/18FrT" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 180 LOW COST", "url": "https://d-bk.net/fr/d/18Fra" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 199 LOW COST", "url": "https://d-bk.net/fr/d/18Frg" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 20 LOW COST", "url": "https://d-bk.net/fr/d/18Fpp" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/18Frr" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/18Frx" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/18Fry" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 50 LOW COST", "url": "https://d-bk.net/fr/d/18FqA" },
  { "type": "dofusbook", "title": "ELIO FEU PVM 80 LOW COST", "url": "https://d-bk.net/fr/d/18FqY" },
  { "type": "dofusbook", "title": "ELIO TERRE 165", "url": "https://d-bk.net/fr/d/xloB" },
  { "type": "dofusbook", "title": "ELIO TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15J3p" },
  { "type": "dofusbook", "title": "ELIO TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J3n" },
  { "type": "dofusbook", "title": "ELIO TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J3j" },
  { "type": "dofusbook", "title": "ENI AIR 120", "url": "https://d-bk.net/fr/d/1B12p" },
  { "type": "dofusbook", "title": "ENI AIR 165", "url": "https://d-bk.net/fr/d/1BHTN" },
  { "type": "dofusbook", "title": "ENI AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IJR" },
  { "type": "dofusbook", "title": "ENI AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IJP" },
  { "type": "dofusbook", "title": "ENI AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IJM" },
  { "type": "dofusbook", "title": "ENI AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/150Yr" },
  { "type": "dofusbook", "title": "ENI AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150Yp" },
  { "type": "dofusbook", "title": "ENI AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150Yo" },
  { "type": "dofusbook", "title": "ENI AIR PVM 110", "url": "https://d-bk.net/fr/d/15XVJ" },
  { "type": "dofusbook", "title": "ENI AIR PVM 130", "url": "https://d-bk.net/fr/d/15XVg" },
  { "type": "dofusbook", "title": "ENI AIR PVM 160", "url": "https://d-bk.net/fr/d/15XVi" },
  { "type": "dofusbook", "title": "ENI AIR PVM 180", "url": "https://d-bk.net/fr/d/15XVj" },
  { "type": "dofusbook", "title": "ENI AIR PVM 199", "url": "https://d-bk.net/fr/d/15XVk" },
  { "type": "dofusbook", "title": "ENI AIR PVM 20", "url": "https://d-bk.net/fr/d/15XUX" },
  { "type": "dofusbook", "title": "ENI AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15XVp" },
  { "type": "dofusbook", "title": "ENI AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15XVt" },
  { "type": "dofusbook", "title": "ENI AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15XVv" },
  { "type": "dofusbook", "title": "ENI AIR PVM 50", "url": "https://d-bk.net/fr/d/15XVH" },
  { "type": "dofusbook", "title": "ENI AIR PVM 80", "url": "https://d-bk.net/fr/d/15XVI" },
  { "type": "dofusbook", "title": "ENI EAU 120", "url": "https://d-bk.net/fr/d/1B12q" },
  { "type": "dofusbook", "title": "ENI EAU 165", "url": "https://d-bk.net/fr/d/xloN" },
  { "type": "dofusbook", "title": "ENI EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15IKp" },
  { "type": "dofusbook", "title": "ENI EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IL7" },
  { "type": "dofusbook", "title": "ENI EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IKK" },
  { "type": "dofusbook", "title": "ENI EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150YA" },
  { "type": "dofusbook", "title": "ENI EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/129oo" },
  { "type": "dofusbook", "title": "ENI EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150Y1" },
  { "type": "dofusbook", "title": "ENI EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/129oq" },
  { "type": "dofusbook", "title": "ENI EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iUp" },
  { "type": "dofusbook", "title": "ENI EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/129os" },
  { "type": "dofusbook", "title": "ENI EAU PVM 110", "url": "https://d-bk.net/fr/d/15Y7D" },
  { "type": "dofusbook", "title": "ENI EAU PVM 130", "url": "https://d-bk.net/fr/d/15Y7E" },
  { "type": "dofusbook", "title": "ENI EAU PVM 160", "url": "https://d-bk.net/fr/d/15Y7F" },
  { "type": "dofusbook", "title": "ENI EAU PVM 180", "url": "https://d-bk.net/fr/d/15Y7G" },
  { "type": "dofusbook", "title": "ENI EAU PVM 199", "url": "https://d-bk.net/fr/d/15Y7H" },
  { "type": "dofusbook", "title": "ENI EAU PVM 20", "url": "https://d-bk.net/fr/d/15Y6t" },
  { "type": "dofusbook", "title": "ENI EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15Y7J" },
  { "type": "dofusbook", "title": "ENI EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Y7L" },
  { "type": "dofusbook", "title": "ENI EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Y7N" },
  { "type": "dofusbook", "title": "ENI EAU PVM 50", "url": "https://d-bk.net/fr/d/15Y7A" },
  { "type": "dofusbook", "title": "ENI EAU PVM 80", "url": "https://d-bk.net/fr/d/15Y7C" },
  { "type": "dofusbook", "title": "ENI FEU 120", "url": "https://d-bk.net/fr/d/q8DH" },
  { "type": "dofusbook", "title": "ENI FEU 165", "url": "https://d-bk.net/fr/d/1BHSn" },
  { "type": "dofusbook", "title": "ENI FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15IIO" },
  { "type": "dofusbook", "title": "ENI FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IIN" },
  { "type": "dofusbook", "title": "ENI FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IIJ" },
  { "type": "dofusbook", "title": "ENI FEU 200 PVM LOW COST", "url": "https://d-bk.net/fr/d/15eKp" },
  { "type": "dofusbook", "title": "ENI FEU 200 PVM MEDIUM", "url": "https://d-bk.net/fr/d/15eKq" },
  { "type": "dofusbook", "title": "ENI FEU 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15eKt" },
  { "type": "dofusbook", "title": "ENI FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150Yh" },
  { "type": "dofusbook", "title": "ENI FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/12qO9" },
  { "type": "dofusbook", "title": "ENI FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150Yf" },
  { "type": "dofusbook", "title": "ENI FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/12qOA" },
  { "type": "dofusbook", "title": "ENI FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iUc" },
  { "type": "dofusbook", "title": "ENI FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/12qOB" },
  { "type": "dofusbook", "title": "ENI FEU PVM 110", "url": "https://d-bk.net/fr/d/15eLJ" },
  { "type": "dofusbook", "title": "ENI FEU PVM 130", "url": "https://d-bk.net/fr/d/15eLL" },
  { "type": "dofusbook", "title": "ENI FEU PVM 160", "url": "https://d-bk.net/fr/d/15eLM" },
  { "type": "dofusbook", "title": "ENI FEU PVM 180", "url": "https://d-bk.net/fr/d/15eLN" },
  { "type": "dofusbook", "title": "ENI FEU PVM 199", "url": "https://d-bk.net/fr/d/15eLO" },
  { "type": "dofusbook", "title": "ENI FEU PVM 20", "url": "https://d-bk.net/fr/d/15eLF" },
  { "type": "dofusbook", "title": "ENI FEU PVM 50", "url": "https://d-bk.net/fr/d/15eLH" },
  { "type": "dofusbook", "title": "ENI FEU PVM 80", "url": "https://d-bk.net/fr/d/15eLI" },
  { "type": "dofusbook", "title": "ENI TERRE 165", "url": "https://d-bk.net/fr/d/xloJ" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 110", "url": "https://d-bk.net/fr/d/1Asiv" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 130", "url": "https://d-bk.net/fr/d/1Asiy" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 160", "url": "https://d-bk.net/fr/d/1Asj0" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 180", "url": "https://d-bk.net/fr/d/1AsjE" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 199", "url": "https://d-bk.net/fr/d/1Asjp" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 20", "url": "https://d-bk.net/fr/d/1Asiq" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/1Asjr" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/1Asjs" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/1Asjt" },
  { "type": "dofusbook", "title": "ENI TERRE PVM 50", "url": "https://d-bk.net/fr/d/1Asir" },
  { "type": "dofusbook", "title": "ENI TERRE PVP LOWCOST 200", "url": "https://d-bk.net/fr/d/1Axhk" },
  { "type": "dofusbook", "title": "ENI TERRE PVP MEDIUM 200", "url": "https://d-bk.net/fr/d/1Axhl" },
  { "type": "dofusbook", "title": "ENI TERRE PVP PREMIUM 200", "url": "https://d-bk.net/fr/d/1Axhm" },
  { "type": "dofusbook", "title": "ENU 200 TERRE LOW COST", "url": "https://d-bk.net/fr/d/15Gol" },
  { "type": "dofusbook", "title": "ENU AIR 120", "url": "https://d-bk.net/fr/d/o1z2" },
  { "type": "dofusbook", "title": "ENU AIR 165", "url": "https://d-bk.net/fr/d/1BHUs" },
  { "type": "dofusbook", "title": "ENU AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15GqW" },
  { "type": "dofusbook", "title": "ENU AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15GqS" },
  { "type": "dofusbook", "title": "ENU AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gpl" },
  { "type": "dofusbook", "title": "ENU AIR 200 PVP LOW COST", "url": "https://d-bk.net/fr/d/1A2M9" },
  { "type": "dofusbook", "title": "ENU AIR 200 PVP MEDIUM", "url": "https://d-bk.net/fr/d/1A2MA" },
  { "type": "dofusbook", "title": "ENU AIR 200 PVP PREMIUM", "url": "https://d-bk.net/fr/d/1A2MB" },
  { "type": "dofusbook", "title": "ENU AIR LOW COST 2 ROXX", "url": "https://d-bk.net/fr/d/q3ei" },
  { "type": "dofusbook", "title": "ENU AIR MEDIUM 2 ROXX", "url": "https://d-bk.net/fr/d/q3jq" },
  { "type": "dofusbook", "title": "ENU AIR PREMIUM 2 ROXX", "url": "https://d-bk.net/fr/d/q3k6" },
  { "type": "dofusbook", "title": "ENU EAU 120", "url": "https://d-bk.net/fr/d/oBcy" },
  { "type": "dofusbook", "title": "ENU EAU 165", "url": "https://d-bk.net/fr/d/uOh6" },
  { "type": "dofusbook", "title": "ENU EAU 200 PVP LOW COST", "url": "https://d-bk.net/fr/d/1A2LB" },
  { "type": "dofusbook", "title": "ENU EAU 200 PVP MEDIUM", "url": "https://d-bk.net/fr/d/1A2Ll" },
  { "type": "dofusbook", "title": "ENU EAU 200 PVP PREMIUM", "url": "https://d-bk.net/fr/d/1A2Ly" },
  { "type": "dofusbook", "title": "ENU EAU COOP  MEDIUM ROXX", "url": "https://d-bk.net/fr/d/151La" },
  { "type": "dofusbook", "title": "ENU EAU COOP LOW COST ROXX", "url": "https://d-bk.net/fr/d/151Lh" },
  { "type": "dofusbook", "title": "ENU EAU COOP PREMIUM ROXX", "url": "https://d-bk.net/fr/d/1BHy8" },
  { "type": "dofusbook", "title": "ENU EAU ÉQUILIBRÉ 199 LOW COST", "url": "https://d-bk.net/fr/d/19nZZ" },
  { "type": "dofusbook", "title": "ENU EAU EQUILIBRÉ 199 MEDIUM", "url": "https://d-bk.net/fr/d/19nZb" },
  { "type": "dofusbook", "title": "ENU EAU EQUILIBRÉ 199 PREMIUM", "url": "https://d-bk.net/fr/d/19nZe" },
  { "type": "dofusbook", "title": "ENU EAU PVM 110", "url": "https://d-bk.net/fr/d/15VSC" },
  { "type": "dofusbook", "title": "ENU EAU PVM 130", "url": "https://d-bk.net/fr/d/15VTU" },
  { "type": "dofusbook", "title": "ENU EAU PVM 160", "url": "https://d-bk.net/fr/d/15VTn" },
  { "type": "dofusbook", "title": "ENU EAU PVM 180", "url": "https://d-bk.net/fr/d/15VTq" },
  { "type": "dofusbook", "title": "ENU EAU PVM 199", "url": "https://d-bk.net/fr/d/15VU0" },
  { "type": "dofusbook", "title": "ENU EAU PVM 20", "url": "https://d-bk.net/fr/d/15VRM" },
  { "type": "dofusbook", "title": "ENU EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15VUB" },
  { "type": "dofusbook", "title": "ENU EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15VUY" },
  { "type": "dofusbook", "title": "ENU EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15VUf" },
  { "type": "dofusbook", "title": "ENU EAU PVM 50", "url": "https://d-bk.net/fr/d/15VRT" },
  { "type": "dofusbook", "title": "ENU EAU PVM 80", "url": "https://d-bk.net/fr/d/15VRl" },
  { "type": "dofusbook", "title": "ENU EAU/RET LOW COST PVM 200", "url": "https://d-bk.net/fr/d/17Zz6" },
  { "type": "dofusbook", "title": "ENU EAU/RET MEDIUM PVM 200", "url": "https://d-bk.net/fr/d/17ZzB" },
  { "type": "dofusbook", "title": "ENU EAU/RET PREMIUM PVM 200", "url": "https://d-bk.net/fr/d/17ZzF" },
  { "type": "dofusbook", "title": "ENU FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/151MS" },
  { "type": "dofusbook", "title": "ENU FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q1fr" },
  { "type": "dofusbook", "title": "ENU FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/151MO" },
  { "type": "dofusbook", "title": "ENU FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/151MK" },
  { "type": "dofusbook", "title": "ENU FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q1gK" },
  { "type": "dofusbook", "title": "ENU MULTI 199 EQUILIBRÉ  LOW COST", "url": "https://d-bk.net/fr/d/19nYW" },
  { "type": "dofusbook", "title": "ENU MULTI 199 EQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19nYo" },
  { "type": "dofusbook", "title": "ENU MULTI 199 EQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19nYt" },
  { "type": "dofusbook", "title": "ENU MULTI PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/19G7h" },
  { "type": "dofusbook", "title": "ENU MULTI PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/19G7k" },
  { "type": "dofusbook", "title": "ENU MULTI PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/19G7n" },
  { "type": "dofusbook", "title": "ENU TERRE 165", "url": "https://d-bk.net/fr/d/1BHUr" },
  { "type": "dofusbook", "title": "ENU TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15God" },
  { "type": "dofusbook", "title": "ENU TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gnu" },
  { "type": "dofusbook", "title": "ENU TERRE LOW COST CHAD 199", "url": "https://d-bk.net/fr/d/161pm" },
  { "type": "dofusbook", "title": "ENU TERRE LOW COST ROXX", "url": "https://d-bk.net/fr/d/sO0R" },
  { "type": "dofusbook", "title": "ENU TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/161pu" },
  { "type": "dofusbook", "title": "ENU TERRE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/sO0S" },
  { "type": "dofusbook", "title": "ENU TERRE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/sO0U" },
  { "type": "dofusbook", "title": "ENU TERRE PREMUM CHAD", "url": "https://d-bk.net/fr/d/161q5" },
  { "type": "dofusbook", "title": "ENUTROF EAU/RET 199", "url": "https://d-bk.net/fr/d/16hH4" },
  { "type": "dofusbook", "title": "ENUTROF FEU 120", "url": "https://d-bk.net/fr/d/14vDg" },
  { "type": "dofusbook", "title": "ENUTROF FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15GnO" },
  { "type": "dofusbook", "title": "ENUTROF FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gmo" },
  { "type": "dofusbook", "title": "ENUTROF FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gl4" },
  { "type": "dofusbook", "title": "FECA AIR 120", "url": "https://d-bk.net/fr/d/1B14L" },
  { "type": "dofusbook", "title": "FECA AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15FCw" },
  { "type": "dofusbook", "title": "FECA AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15FCo" },
  { "type": "dofusbook", "title": "FECA AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15G04" },
  { "type": "dofusbook", "title": "FECA AIR CRIT PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15RpO" },
  { "type": "dofusbook", "title": "FECA AIR CRIT PVM MEDIUM", "url": "https://d-bk.net/fr/d/15V0j" },
  { "type": "dofusbook", "title": "FECA AIR CRIT PVM PREMIUM", "url": "https://d-bk.net/fr/d/15V15" },
  { "type": "dofusbook", "title": "FECA AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/12CFZ" },
  { "type": "dofusbook", "title": "FECA AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/12CFa" },
  { "type": "dofusbook", "title": "FECA AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/12CFb" },
  { "type": "dofusbook", "title": "FECA AMRO 200 LOW COST", "url": "https://d-bk.net/fr/d/15JNl" },
  { "type": "dofusbook", "title": "FECA AMRO 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JNb" },
  { "type": "dofusbook", "title": "FECA AMRO 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JMP" },
  { "type": "dofusbook", "title": "FECA EAU 120", "url": "https://d-bk.net/fr/d/tWgF" },
  { "type": "dofusbook", "title": "FECA EAU 165", "url": "https://d-bk.net/fr/d/xloS" },
  { "type": "dofusbook", "title": "FECA EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/14xZg" },
  { "type": "dofusbook", "title": "FECA EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q1iz" },
  { "type": "dofusbook", "title": "FECA EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14xXw" },
  { "type": "dofusbook", "title": "FECA EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q1j1" },
  { "type": "dofusbook", "title": "FECA EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iQT" },
  { "type": "dofusbook", "title": "FECA EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q1j5" },
  { "type": "dofusbook", "title": "FECA EAU PVM 110", "url": "https://d-bk.net/fr/d/15OOh" },
  { "type": "dofusbook", "title": "FECA EAU PVM 130", "url": "https://d-bk.net/fr/d/15OPA" },
  { "type": "dofusbook", "title": "FECA EAU PVM 160", "url": "https://d-bk.net/fr/d/15OPa" },
  { "type": "dofusbook", "title": "FECA EAU PVM 180", "url": "https://d-bk.net/fr/d/15OPp" },
  { "type": "dofusbook", "title": "FECA EAU PVM 199", "url": "https://d-bk.net/fr/d/15OQ7" },
  { "type": "dofusbook", "title": "FECA EAU PVM 20", "url": "https://d-bk.net/fr/d/1AsmR" },
  { "type": "dofusbook", "title": "FECA EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15RnH" },
  { "type": "dofusbook", "title": "FECA EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Rnr" },
  { "type": "dofusbook", "title": "FECA EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15RoG" },
  { "type": "dofusbook", "title": "FECA EAU PVM 50", "url": "https://d-bk.net/fr/d/1AsmS" },
  { "type": "dofusbook", "title": "FECA EAU PVM 80", "url": "https://d-bk.net/fr/d/1AsmU" },
  { "type": "dofusbook", "title": "FECA EAU/FEU RET LOW COST PVM", "url": "https://d-bk.net/fr/d/17ZyU" },
  { "type": "dofusbook", "title": "FECA EAU/FEU RET MEDIUM PVM", "url": "https://d-bk.net/fr/d/17ZyY" },
  { "type": "dofusbook", "title": "FECA EAU/FEU RET PREMIUM PVM", "url": "https://d-bk.net/fr/d/17Zyb" },
  { "type": "dofusbook", "title": "FECA FEU 120", "url": "https://d-bk.net/fr/d/1B145" },
  { "type": "dofusbook", "title": "FECA FEU CRIT 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15V2G" },
  { "type": "dofusbook", "title": "FECA FEU CRIT PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15V1y" },
  { "type": "dofusbook", "title": "FECA FEU CRIT PVM LOW COST", "url": "https://d-bk.net/fr/d/15V1R" },
  { "type": "dofusbook", "title": "FECA FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/14xbc" },
  { "type": "dofusbook", "title": "FECA FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14xbK" },
  { "type": "dofusbook", "title": "FECA FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12uBi" },
  { "type": "dofusbook", "title": "FECA FEU SOIN 200 LOW COST", "url": "https://d-bk.net/fr/d/15FB2" },
  { "type": "dofusbook", "title": "FECA FEU SOIN 200 MEDIUM", "url": "https://d-bk.net/fr/d/15FAw" },
  { "type": "dofusbook", "title": "FECA FEU SOIN 200 PREMIUM", "url": "https://d-bk.net/fr/d/15FAR" },
  { "type": "dofusbook", "title": "FECA MULTI 199 PVM LOW COST", "url": "https://d-bk.net/fr/d/18kMh" },
  { "type": "dofusbook", "title": "FECA MULTI LOW COST PVM 200", "url": "https://d-bk.net/fr/d/17Zy5" },
  { "type": "dofusbook", "title": "FECA MULTI LOW COST PVP 200", "url": "https://d-bk.net/fr/d/17Zy0" },
  { "type": "dofusbook", "title": "FECA MULTI MEDIUM PVM 200", "url": "https://d-bk.net/fr/d/17Zy7" },
  { "type": "dofusbook", "title": "FECA MULTI MEDIUM PVP 200", "url": "https://d-bk.net/fr/d/17Zxr" },
  { "type": "dofusbook", "title": "FECA MULTI PREMIUM PVM 200", "url": "https://d-bk.net/fr/d/17Zy9" },
  { "type": "dofusbook", "title": "FECA MULTI PREMIUM PVP 200", "url": "https://d-bk.net/fr/d/17K4h" },
  { "type": "dofusbook", "title": "FECA NEUTRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15F99" },
  { "type": "dofusbook", "title": "FECA NEUTRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15F8z" },
  { "type": "dofusbook", "title": "FECA NEUTRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15F8a" },
  { "type": "dofusbook", "title": "FECA SOIN 120", "url": "https://d-bk.net/fr/d/oEqM" },
  { "type": "dofusbook", "title": "FECA TERRE LOW COST", "url": "https://d-bk.net/fr/d/q1kU" },
  { "type": "dofusbook", "title": "FECA TERRE MEDIUM", "url": "https://d-bk.net/fr/d/q1kG" },
  { "type": "dofusbook", "title": "FECA TERRE PREMIUM", "url": "https://d-bk.net/fr/d/q1kr" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 110", "url": "https://d-bk.net/fr/d/15Ngy" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 130", "url": "https://d-bk.net/fr/d/15Nhd" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 160", "url": "https://d-bk.net/fr/d/15Nhh" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 180", "url": "https://d-bk.net/fr/d/15Nhz" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 199", "url": "https://d-bk.net/fr/d/15NiC" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 20", "url": "https://d-bk.net/fr/d/15Nfk" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 50", "url": "https://d-bk.net/fr/d/15Nfr" },
  { "type": "dofusbook", "title": "FECA TERRE PVM 80", "url": "https://d-bk.net/fr/d/15Ng3" },
  { "type": "dofusbook", "title": "FECA TERRE/CAC 120", "url": "https://d-bk.net/fr/d/o1zU" },
  { "type": "dofusbook", "title": "FECA YOUYETTE 165", "url": "https://d-bk.net/fr/d/xlof" },
  { "type": "dofusbook", "title": "FECA YOUYETTE 200 LOW COST", "url": "https://d-bk.net/fr/d/15F9u" },
  { "type": "dofusbook", "title": "FECA YOUYETTE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15F9k" },
  { "type": "dofusbook", "title": "FECA YOUYETTE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15F9I" },
  { "type": "dofusbook", "title": "FORGE  FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/1A2MH" },
  { "type": "dofusbook", "title": "FORGE FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/1A2ML" },
  { "type": "dofusbook", "title": "FORGE FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/1A2MO" },
  { "type": "dofusbook", "title": "FORGE FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/19sPg" },
  { "type": "dofusbook", "title": "FORGE FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/19sPs" },
  { "type": "dofusbook", "title": "FORGE FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/19sPz" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 110", "url": "https://d-bk.net/fr/d/1BGBb" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 130", "url": "https://d-bk.net/fr/d/1BGBc" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 160", "url": "https://d-bk.net/fr/d/1BGBd" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 180", "url": "https://d-bk.net/fr/d/1BGBe" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 199", "url": "https://d-bk.net/fr/d/1BGBf" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 20", "url": "https://d-bk.net/fr/d/1BGBW" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/1BGBh" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/1BGBi" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/1BGBj" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 50", "url": "https://d-bk.net/fr/d/1BGBX" },
  { "type": "dofusbook", "title": "FORGE FEU PVM 80", "url": "https://d-bk.net/fr/d/1BGBa" },
  { "type": "dofusbook", "title": "FORGE TERRE-EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150nT" },
  { "type": "dofusbook", "title": "FORGE TERRE-EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150nO" },
  { "type": "dofusbook", "title": "FORGE TERRE-EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iZf" },
  { "type": "dofusbook", "title": "FORGELANCE AIR 165", "url": "https://d-bk.net/fr/d/xnPz" },
  { "type": "dofusbook", "title": "FORGELANCE AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15JIh" },
  { "type": "dofusbook", "title": "FORGELANCE AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JId" },
  { "type": "dofusbook", "title": "FORGELANCE AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JIY" },
  { "type": "dofusbook", "title": "FORGELANCE AIR DO POU 120", "url": "https://d-bk.net/fr/d/woAT" },
  { "type": "dofusbook", "title": "FORGELANCE AIR DO POU 165", "url": "https://d-bk.net/fr/d/wj2D" },
  { "type": "dofusbook", "title": "FORGELANCE AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/wvCA" },
  { "type": "dofusbook", "title": "FORGELANCE AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/wvCD" },
  { "type": "dofusbook", "title": "FORGELANCE AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/wvCF" },
  { "type": "dofusbook", "title": "FORGELANCE AIR/DO POU LOW COST", "url": "https://d-bk.net/fr/d/15Mfw" },
  { "type": "dofusbook", "title": "FORGELANCE AIR/DO POU MEDIUM", "url": "https://d-bk.net/fr/d/15Mfv" },
  { "type": "dofusbook", "title": "FORGELANCE AIR/DO POU PREMIUM", "url": "https://d-bk.net/fr/d/15Mfa" },
  { "type": "dofusbook", "title": "FORGELANCE EAU 120", "url": "https://d-bk.net/fr/d/14vDq" },
  { "type": "dofusbook", "title": "FORGELANCE EAU 165", "url": "https://d-bk.net/fr/d/159XO" },
  { "type": "dofusbook", "title": "FORGELANCE EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/wvCJ" },
  { "type": "dofusbook", "title": "FORGELANCE EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/wvCS" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/wvCV" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 110", "url": "https://d-bk.net/fr/d/15aRs" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 130", "url": "https://d-bk.net/fr/d/15aRt" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 160", "url": "https://d-bk.net/fr/d/15aRu" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 180", "url": "https://d-bk.net/fr/d/15aRv" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 199", "url": "https://d-bk.net/fr/d/15aRw" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 20", "url": "https://d-bk.net/fr/d/15aRo" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aTQ" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aTd" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aTf" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 50", "url": "https://d-bk.net/fr/d/15aRq" },
  { "type": "dofusbook", "title": "FORGELANCE EAU PVM 80", "url": "https://d-bk.net/fr/d/15aRr" },
  { "type": "dofusbook", "title": "FORGELANCE FEU 120", "url": "https://d-bk.net/fr/d/1B13A" },
  { "type": "dofusbook", "title": "FORGELANCE FEU 165", "url": "https://d-bk.net/fr/d/1BHUD" },
  { "type": "dofusbook", "title": "FORGELANCE FEU ÉQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19sPL" },
  { "type": "dofusbook", "title": "FORGELANCE FEU ÉQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19sPM" },
  { "type": "dofusbook", "title": "FORGELANCE FEU ÉQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19sPO" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE EAU 120", "url": "https://d-bk.net/fr/d/14vDv" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/161BT" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/161BU" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/161BV" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 110", "url": "https://d-bk.net/fr/d/1AtJO" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 130", "url": "https://d-bk.net/fr/d/1AtJP" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 160", "url": "https://d-bk.net/fr/d/1AtJR" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 180", "url": "https://d-bk.net/fr/d/1AtJU" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 199", "url": "https://d-bk.net/fr/d/1AtJX" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 20", "url": "https://d-bk.net/fr/d/1AtJK" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/1AtJY" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/1AtJZ" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/1AtJb" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 50", "url": "https://d-bk.net/fr/d/1AtJM" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE PVM 80", "url": "https://d-bk.net/fr/d/1AtJN" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE/EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15JI6" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE/EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JHr" },
  { "type": "dofusbook", "title": "FORGELANCE TERRE/EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JHL" },
  { "type": "dofusbook", "title": "FORGELANCE YOUYETTE 165", "url": "https://d-bk.net/fr/d/1BHUB" },
  { "type": "dofusbook", "title": "HUPPER AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15JCi" },
  { "type": "dofusbook", "title": "HUPPER AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JCe" },
  { "type": "dofusbook", "title": "HUPPER AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JCY" },
  { "type": "dofusbook", "title": "HUPPER DO CRIT PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aPc" },
  { "type": "dofusbook", "title": "HUPPER DO CRIT PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aPe" },
  { "type": "dofusbook", "title": "HUPPER DO CRIT PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aPf" },
  { "type": "dofusbook", "title": "HUPPER DO POU 200 LOW COST", "url": "https://d-bk.net/fr/d/15J8o" },
  { "type": "dofusbook", "title": "HUPPER DO POU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J8m" },
  { "type": "dofusbook", "title": "HUPPER DO POU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J7i" },
  { "type": "dofusbook", "title": "HUPPER DO POU ÉQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19j6V" },
  { "type": "dofusbook", "title": "HUPPER DO POU ÉQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19j6y" },
  { "type": "dofusbook", "title": "HUPPER DO POU ÉQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19j7T" },
  { "type": "dofusbook", "title": "HUPPER EAU 165", "url": "https://d-bk.net/fr/d/uEFg" },
  { "type": "dofusbook", "title": "HUPPER EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15J7X" },
  { "type": "dofusbook", "title": "HUPPER EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J7Q" },
  { "type": "dofusbook", "title": "HUPPER EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J7L" },
  { "type": "dofusbook", "title": "HUPPER EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150mo" },
  { "type": "dofusbook", "title": "HUPPER EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/1BHyc" },
  { "type": "dofusbook", "title": "HUPPER EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iZF" },
  { "type": "dofusbook", "title": "HUPPER FEU 165", "url": "https://d-bk.net/fr/d/xlpG" },
  { "type": "dofusbook", "title": "HUPPER FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15JBF" },
  { "type": "dofusbook", "title": "HUPPER FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JAc" },
  { "type": "dofusbook", "title": "HUPPER FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J90" },
  { "type": "dofusbook", "title": "HUPPER FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/qpLH" },
  { "type": "dofusbook", "title": "HUPPER FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/qpLc" },
  { "type": "dofusbook", "title": "HUPPER FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/qpLn" },
  { "type": "dofusbook", "title": "HUPPER TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15J75" },
  { "type": "dofusbook", "title": "HUPPER TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15J6l" },
  { "type": "dofusbook", "title": "HUPPER TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15J5k" },
  { "type": "dofusbook", "title": "HUPPER TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150mx" },
  { "type": "dofusbook", "title": "HUPPER TERRE LOW COST ROXX", "url": "https://d-bk.net/fr/d/tJDN" },
  { "type": "dofusbook", "title": "HUPPER TERRE MEDIUM 199 ROXX", "url": "https://d-bk.net/fr/d/tJDS" },
  { "type": "dofusbook", "title": "HUPPER TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150mu" },
  { "type": "dofusbook", "title": "HUPPER TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iZ2" },
  { "type": "dofusbook", "title": "HUPPER TERRE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/tJDk" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 110", "url": "https://d-bk.net/fr/d/15aMp" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 130", "url": "https://d-bk.net/fr/d/15aNB" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 160", "url": "https://d-bk.net/fr/d/15aNQ" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 180", "url": "https://d-bk.net/fr/d/15aNt" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 199", "url": "https://d-bk.net/fr/d/15aOW" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 20", "url": "https://d-bk.net/fr/d/15aLe" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aP3" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aPC" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aPU" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 50", "url": "https://d-bk.net/fr/d/15aLh" },
  { "type": "dofusbook", "title": "HUPPER TERRE PVM 80", "url": "https://d-bk.net/fr/d/15aMH" },
  { "type": "dofusbook", "title": "HUPPERMAGE AMRO FEU 120", "url": "https://d-bk.net/fr/d/rJoh" },
  { "type": "dofusbook", "title": "HUPPERMAGE EAU 120", "url": "https://d-bk.net/fr/d/1B14R" },
  { "type": "dofusbook", "title": "HUPPERMAGE FEU 120", "url": "https://d-bk.net/fr/d/pf5q" },
  { "type": "dofusbook", "title": "HUPPERMAGE FEU/AIR 120", "url": "https://d-bk.net/fr/d/1B14O" },
  { "type": "dofusbook", "title": "HUPPERMAGE TERRE 120", "url": "https://d-bk.net/fr/d/pf5h" },
  { "type": "dofusbook", "title": "IOP AIR 120", "url": "https://d-bk.net/fr/d/1B11r" },
  { "type": "dofusbook", "title": "IOP AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IO7" },
  { "type": "dofusbook", "title": "IOP AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IO6" },
  { "type": "dofusbook", "title": "IOP AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IO5" },
  { "type": "dofusbook", "title": "IOP AIR EBENE LOW COST ROXX", "url": "https://d-bk.net/fr/d/11FTX" },
  { "type": "dofusbook", "title": "IOP AIR EBENE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/11FTa" },
  { "type": "dofusbook", "title": "IOP AIR EBENE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/11FTb" },
  { "type": "dofusbook", "title": "IOP AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/150ZY" },
  { "type": "dofusbook", "title": "IOP AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150ZS" },
  { "type": "dofusbook", "title": "IOP AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150Z3" },
  { "type": "dofusbook", "title": "IOP AIR PVM 110", "url": "https://d-bk.net/fr/d/1AsiH" },
  { "type": "dofusbook", "title": "IOP AIR PVM 130", "url": "https://d-bk.net/fr/d/1AsiI" },
  { "type": "dofusbook", "title": "IOP AIR PVM 160", "url": "https://d-bk.net/fr/d/1AsiK" },
  { "type": "dofusbook", "title": "IOP AIR PVM 180", "url": "https://d-bk.net/fr/d/1AsiM" },
  { "type": "dofusbook", "title": "IOP AIR PVM 199", "url": "https://d-bk.net/fr/d/1AsiP" },
  { "type": "dofusbook", "title": "IOP AIR PVM 20", "url": "https://d-bk.net/fr/d/15YBc" },
  { "type": "dofusbook", "title": "IOP AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/1AsiT" },
  { "type": "dofusbook", "title": "IOP AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/1AsiU" },
  { "type": "dofusbook", "title": "IOP AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/1AsiW" },
  { "type": "dofusbook", "title": "IOP AIR PVM 50", "url": "https://d-bk.net/fr/d/15YBs" },
  { "type": "dofusbook", "title": "IOP AIR PVM 80", "url": "https://d-bk.net/fr/d/1AsiG" },
  { "type": "dofusbook", "title": "IOP BROUTURE 120", "url": "https://d-bk.net/fr/d/1B11y" },
  { "type": "dofusbook", "title": "IOP CONQUÊTE/CAC 165", "url": "https://d-bk.net/fr/d/wLKi" },
  { "type": "dofusbook", "title": "IOP DO POU LOW COST PVP 200", "url": "https://d-bk.net/fr/d/1Axg0" },
  { "type": "dofusbook", "title": "IOP DO POU LOW COST", "url": "https://d-bk.net/fr/d/19lFG" },
  { "type": "dofusbook", "title": "IOP DO POU MEDIUM PVP 200", "url": "https://d-bk.net/fr/d/1Axg3" },
  { "type": "dofusbook", "title": "IOP DO POU MEDIUM", "url": "https://d-bk.net/fr/d/19lF8" },
  { "type": "dofusbook", "title": "IOP DO POU PREMIUM PVP 200", "url": "https://d-bk.net/fr/d/1AxgB" },
  { "type": "dofusbook", "title": "IOP DO POU PREMIUM", "url": "https://d-bk.net/fr/d/12jH1" },
  { "type": "dofusbook", "title": "IOP DO POU ROXX LOW COST", "url": "https://d-bk.net/fr/d/19tZc" },
  { "type": "dofusbook", "title": "IOP DO POU ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19tZe" },
  { "type": "dofusbook", "title": "IOP DO POU ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19tZk" },
  { "type": "dofusbook", "title": "IOP EAU 120", "url": "https://d-bk.net/fr/d/14vDP" },
  { "type": "dofusbook", "title": "IOP EAU 165", "url": "https://d-bk.net/fr/d/1BHQi" },
  { "type": "dofusbook", "title": "IOP EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15INk" },
  { "type": "dofusbook", "title": "IOP EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15INd" },
  { "type": "dofusbook", "title": "IOP EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15INT" },
  { "type": "dofusbook", "title": "IOP EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150aH" },
  { "type": "dofusbook", "title": "IOP EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2Bk" },
  { "type": "dofusbook", "title": "IOP EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150ao" },
  { "type": "dofusbook", "title": "IOP EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q2C6" },
  { "type": "dofusbook", "title": "IOP EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iVC" },
  { "type": "dofusbook", "title": "IOP EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2D3" },
  { "type": "dofusbook", "title": "IOP FEU 120", "url": "https://d-bk.net/fr/d/q8Eo" },
  { "type": "dofusbook", "title": "IOP FEU/CAC 199 LOW COST", "url": "https://d-bk.net/fr/d/16bWp" },
  { "type": "dofusbook", "title": "IOP FEU/CAC 199 MEDIUM", "url": "https://d-bk.net/fr/d/16bWY" },
  { "type": "dofusbook", "title": "IOP FEU/CAC 199 PREMIUM", "url": "https://d-bk.net/fr/d/16bWF" },
  { "type": "dofusbook", "title": "IOP POOLACHE LOW COST ROXX", "url": "https://d-bk.net/fr/d/v1P5" },
  { "type": "dofusbook", "title": "IOP POOLACHE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/v1Pd" },
  { "type": "dofusbook", "title": "IOP POOLACHE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/v1Po" },
  { "type": "dofusbook", "title": "IOP PUGILAT LOW COST CHAD", "url": "https://d-bk.net/fr/d/150bH" },
  { "type": "dofusbook", "title": "IOP PUGILAT MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150bE" },
  { "type": "dofusbook", "title": "IOP PUGILAT PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iVR" },
  { "type": "dofusbook", "title": "IOP TERRE 120", "url": "https://d-bk.net/fr/d/tWky" },
  { "type": "dofusbook", "title": "IOP TERRE 165", "url": "https://d-bk.net/fr/d/xmNs" },
  { "type": "dofusbook", "title": "IOP TERRE PUGI 200 LOW COST", "url": "https://d-bk.net/fr/d/15IMJ" },
  { "type": "dofusbook", "title": "IOP TERRE PUGI 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IMD" },
  { "type": "dofusbook", "title": "IOP TERRE PUGI 200 PREMIUM", "url": "https://d-bk.net/fr/d/15ILp" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 110", "url": "https://d-bk.net/fr/d/15YBx" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 130", "url": "https://d-bk.net/fr/d/15YBy" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 160", "url": "https://d-bk.net/fr/d/15YBz" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 180", "url": "https://d-bk.net/fr/d/15YC2" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 199", "url": "https://d-bk.net/fr/d/15YC3" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 20", "url": "https://d-bk.net/fr/d/1Asfv" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15YC5" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15YC6" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15YC9" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 50", "url": "https://d-bk.net/fr/d/1Asfz" },
  { "type": "dofusbook", "title": "IOP TERRE PVM 80", "url": "https://d-bk.net/fr/d/15YBv" },
  { "type": "dofusbook", "title": "IOP TERRE REINE 199 LOW COST", "url": "https://d-bk.net/fr/d/19lEx" },
  { "type": "dofusbook", "title": "IOP TERRE REINE 199 MEDIUM", "url": "https://d-bk.net/fr/d/19lEz" },
  { "type": "dofusbook", "title": "IOP TERRE REINE 199 PREMIUM", "url": "https://d-bk.net/fr/d/19lF2" },
  { "type": "dofusbook", "title": "IOP TERRE/CAC 120", "url": "https://d-bk.net/fr/d/o1zw" },
  { "type": "dofusbook", "title": "OSA AIR 120", "url": "https://d-bk.net/fr/d/o2zy" },
  { "type": "dofusbook", "title": "OSA AIR 130 PVM", "url": "https://d-bk.net/fr/d/15VAp" },
  { "type": "dofusbook", "title": "OSA AIR 160 PVM", "url": "https://d-bk.net/fr/d/15VOl" },
  { "type": "dofusbook", "title": "OSA AIR 165", "url": "https://d-bk.net/fr/d/uOiG" },
  { "type": "dofusbook", "title": "OSA AIR 180 PVM", "url": "https://d-bk.net/fr/d/15VPR" },
  { "type": "dofusbook", "title": "OSA AIR 199 PVM", "url": "https://d-bk.net/fr/d/15VPd" },
  { "type": "dofusbook", "title": "OSA AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gjz" },
  { "type": "dofusbook", "title": "OSA AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gjq" },
  { "type": "dofusbook", "title": "OSA AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15GjZ" },
  { "type": "dofusbook", "title": "OSA AIR 200 PVM LOW COST", "url": "https://d-bk.net/fr/d/15VQ5" },
  { "type": "dofusbook", "title": "OSA AIR 200 PVM MEDIUM", "url": "https://d-bk.net/fr/d/15VQa" },
  { "type": "dofusbook", "title": "OSA AIR 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15VQl" },
  { "type": "dofusbook", "title": "OSA AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/14xkP" },
  { "type": "dofusbook", "title": "OSA AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2Hf" },
  { "type": "dofusbook", "title": "OSA AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14xju" },
  { "type": "dofusbook", "title": "OSA AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q2Hz" },
  { "type": "dofusbook", "title": "OSA AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iRT" },
  { "type": "dofusbook", "title": "OSA AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2IR" },
  { "type": "dofusbook", "title": "OSA AIR PVM 110", "url": "https://d-bk.net/fr/d/15VAP" },
  { "type": "dofusbook", "title": "OSA AIR PVM 20", "url": "https://d-bk.net/fr/d/15V3e" },
  { "type": "dofusbook", "title": "OSA AIR PVM 50", "url": "https://d-bk.net/fr/d/15V3y" },
  { "type": "dofusbook", "title": "OSA AIR PVM 80", "url": "https://d-bk.net/fr/d/15V5T" },
  { "type": "dofusbook", "title": "OSA EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2G7" },
  { "type": "dofusbook", "title": "OSA EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q3rT" },
  { "type": "dofusbook", "title": "OSA EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2GV" },
  { "type": "dofusbook", "title": "OSA FEU 165", "url": "https://d-bk.net/fr/d/1BHUI" },
  { "type": "dofusbook", "title": "OSA FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gj7" },
  { "type": "dofusbook", "title": "OSA FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Giu" },
  { "type": "dofusbook", "title": "OSA FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15GiH" },
  { "type": "dofusbook", "title": "OSA FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/14xlS" },
  { "type": "dofusbook", "title": "OSA FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14ysZ" },
  { "type": "dofusbook", "title": "OSA FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iSE" },
  { "type": "dofusbook", "title": "OSA TERRE LOW COST 200", "url": "https://d-bk.net/fr/d/15wZ0" },
  { "type": "dofusbook", "title": "OSA TERRE MEDIUM 200", "url": "https://d-bk.net/fr/d/15wYw" },
  { "type": "dofusbook", "title": "OSA TERRE PREMIUM 200", "url": "https://d-bk.net/fr/d/15wT6" },
  { "type": "dofusbook", "title": "OUGI AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15JFD" },
  { "type": "dofusbook", "title": "OUGI AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JF9" },
  { "type": "dofusbook", "title": "OUGI AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JF6" },
  { "type": "dofusbook", "title": "OUGI AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aRN" },
  { "type": "dofusbook", "title": "OUGI AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aRP" },
  { "type": "dofusbook", "title": "OUGI AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aRQ" },
  { "type": "dofusbook", "title": "OUGI EAU 165", "url": "https://d-bk.net/fr/d/1BHTw" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 110", "url": "https://d-bk.net/fr/d/15aQj" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 130", "url": "https://d-bk.net/fr/d/15aQk" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 160", "url": "https://d-bk.net/fr/d/15aQl" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 180", "url": "https://d-bk.net/fr/d/15aQn" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 199", "url": "https://d-bk.net/fr/d/15aQo" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 20", "url": "https://d-bk.net/fr/d/15aQb" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aQp" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aQq" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aQr" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 50", "url": "https://d-bk.net/fr/d/15aQf" },
  { "type": "dofusbook", "title": "OUGI EAU PVM 80", "url": "https://d-bk.net/fr/d/15aQi" },
  { "type": "dofusbook", "title": "OUGI EAU ROXX LOW COST", "url": "https://d-bk.net/fr/d/19tZM" },
  { "type": "dofusbook", "title": "OUGI EAU ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19tZN" },
  { "type": "dofusbook", "title": "OUGI EAU ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19tZP" },
  { "type": "dofusbook", "title": "OUGI FEU 165", "url": "https://d-bk.net/fr/d/1BHU1" },
  { "type": "dofusbook", "title": "OUGI FEU 200 PVP LOW COST", "url": "https://d-bk.net/fr/d/1A1hn" },
  { "type": "dofusbook", "title": "OUGI FEU 200 PVP MEDIUM", "url": "https://d-bk.net/fr/d/1A1iU" },
  { "type": "dofusbook", "title": "OUGI FEU 200 PVP PREMIUM", "url": "https://d-bk.net/fr/d/1A1ij" },
  { "type": "dofusbook", "title": "OUGI FEU ÉQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19okW" },
  { "type": "dofusbook", "title": "OUGI FEU ÉQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19okY" },
  { "type": "dofusbook", "title": "OUGI FEU ÉQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19okb" },
  { "type": "dofusbook", "title": "OUGI FEU ROXX LOW COST", "url": "https://d-bk.net/fr/d/19tZJ" },
  { "type": "dofusbook", "title": "OUGI FEU ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19tZK" },
  { "type": "dofusbook", "title": "OUGI FEU ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19tZL" },
  { "type": "dofusbook", "title": "OUGI TERRE 165", "url": "https://d-bk.net/fr/d/xnPT" },
  { "type": "dofusbook", "title": "OUGI TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15JF0" },
  { "type": "dofusbook", "title": "OUGI TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JEy" },
  { "type": "dofusbook", "title": "OUGI TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JEt" },
  { "type": "dofusbook", "title": "OUGINAK EAU 120", "url": "https://d-bk.net/fr/d/12n1b" },
  { "type": "dofusbook", "title": "OUGINAK EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15JH6" },
  { "type": "dofusbook", "title": "OUGINAK EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15JH3" },
  { "type": "dofusbook", "title": "OUGINAK EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15JH1" },
  { "type": "dofusbook", "title": "OUGINAK EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150nE" },
  { "type": "dofusbook", "title": "OUGINAK EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150nF" },
  { "type": "dofusbook", "title": "OUGINAK EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150nH" },
  { "type": "dofusbook", "title": "OUGINAK FEU 120", "url": "https://d-bk.net/fr/d/o21N" },
  { "type": "dofusbook", "title": "OUGINAK FEU/DO POU PVP LOW COST 200", "url": "https://d-bk.net/fr/d/1AxiD" },
  { "type": "dofusbook", "title": "OUGINAK FEU/DO POU PVP MEDIUM 200", "url": "https://d-bk.net/fr/d/1AxiQ" },
  { "type": "dofusbook", "title": "OUGINAK FEU/DO POU PVP PREMIUM 200", "url": "https://d-bk.net/fr/d/1AxiU" },
  { "type": "dofusbook", "title": "OUGINAK TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150nB" },
  { "type": "dofusbook", "title": "OUGINAK TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150n8" },
  { "type": "dofusbook", "title": "OUGINAK TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150n6" },
  { "type": "dofusbook", "title": "PANDA AIR 120", "url": "https://d-bk.net/fr/d/ugHd" },
  { "type": "dofusbook", "title": "PANDA AIR 165", "url": "https://d-bk.net/fr/d/xmyg" },
  { "type": "dofusbook", "title": "PANDA AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IXA" },
  { "type": "dofusbook", "title": "PANDA AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IX9" },
  { "type": "dofusbook", "title": "PANDA AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IX7" },
  { "type": "dofusbook", "title": "PANDA AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2JA" },
  { "type": "dofusbook", "title": "PANDA AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/sO0p" },
  { "type": "dofusbook", "title": "PANDA AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/sO0t" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 110", "url": "https://d-bk.net/fr/d/15YjI" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 130", "url": "https://d-bk.net/fr/d/15YjK" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 160", "url": "https://d-bk.net/fr/d/15YjL" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 180", "url": "https://d-bk.net/fr/d/15YjM" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 199", "url": "https://d-bk.net/fr/d/15YjN" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 20", "url": "https://d-bk.net/fr/d/15YjF" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15YjO" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15YjP" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15YjQ" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 50", "url": "https://d-bk.net/fr/d/15YjG" },
  { "type": "dofusbook", "title": "PANDA AIR PVM 80", "url": "https://d-bk.net/fr/d/15YjH" },
  { "type": "dofusbook", "title": "PANDA EAU 165", "url": "https://d-bk.net/fr/d/xmyZ" },
  { "type": "dofusbook", "title": "PANDA EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/ujS6" },
  { "type": "dofusbook", "title": "PANDA EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/ujS8" },
  { "type": "dofusbook", "title": "PANDA EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/ujSA" },
  { "type": "dofusbook", "title": "PANDA FEU 120", "url": "https://d-bk.net/fr/d/o205" },
  { "type": "dofusbook", "title": "PANDA FEU 165", "url": "https://d-bk.net/fr/d/11IhZ" },
  { "type": "dofusbook", "title": "PANDA FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150im" },
  { "type": "dofusbook", "title": "PANDA FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150ij" },
  { "type": "dofusbook", "title": "PANDA FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iWl" },
  { "type": "dofusbook", "title": "PANDA FEU/CRIT 200 LOW COST", "url": "https://d-bk.net/fr/d/15IWE" },
  { "type": "dofusbook", "title": "PANDA FEU/CRIT 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IWC" },
  { "type": "dofusbook", "title": "PANDA FEU/CRIT 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IVz" },
  { "type": "dofusbook", "title": "PANDA FEU/SOIN 200 LOW COST", "url": "https://d-bk.net/fr/d/15IVw" },
  { "type": "dofusbook", "title": "PANDA FEU/SOIN 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IVv" },
  { "type": "dofusbook", "title": "PANDA FEU/SOIN 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IVt" },
  { "type": "dofusbook", "title": "PANDA TANK 199", "url": "https://d-bk.net/fr/d/16jdM" },
  { "type": "dofusbook", "title": "PANDA TANK LOW COST", "url": "https://d-bk.net/fr/d/tySQ" },
  { "type": "dofusbook", "title": "PANDA TANK MEDIUM", "url": "https://d-bk.net/fr/d/tySk" },
  { "type": "dofusbook", "title": "PANDA TANK PREMIUM", "url": "https://d-bk.net/fr/d/tySt" },
  { "type": "dofusbook", "title": "PANDA TERRE 165", "url": "https://d-bk.net/fr/d/1BHVd" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15IWw" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IWp" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IWO" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 PVM LOW COST", "url": "https://d-bk.net/fr/d/15ePv" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 PVM MEDIUM", "url": "https://d-bk.net/fr/d/15ePy" },
  { "type": "dofusbook", "title": "PANDA TERRE 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15eQ0" },
  { "type": "dofusbook", "title": "PANDA TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150j3" },
  { "type": "dofusbook", "title": "PANDA TERRE LOW COST ROXX", "url": "https://d-bk.net/fr/d/10SGW" },
  { "type": "dofusbook", "title": "PANDA TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150iy" },
  { "type": "dofusbook", "title": "PANDA TERRE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/10SGf" },
  { "type": "dofusbook", "title": "PANDA TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iX6" },
  { "type": "dofusbook", "title": "PANDA TERRE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/10SGk" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 110", "url": "https://d-bk.net/fr/d/15eQw" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 130", "url": "https://d-bk.net/fr/d/15eR1" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 160", "url": "https://d-bk.net/fr/d/15eR2" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 180", "url": "https://d-bk.net/fr/d/15eR3" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 199", "url": "https://d-bk.net/fr/d/15eR7" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 20", "url": "https://d-bk.net/fr/d/15eQr" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 50", "url": "https://d-bk.net/fr/d/15eQt" },
  { "type": "dofusbook", "title": "PANDA TERRE PVM 80", "url": "https://d-bk.net/fr/d/15eQu" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 110", "url": "https://d-bk.net/fr/d/1AzUx" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 130", "url": "https://d-bk.net/fr/d/1AzUy" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 160", "url": "https://d-bk.net/fr/d/1AzUz" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 180", "url": "https://d-bk.net/fr/d/1AzV0" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 199", "url": "https://d-bk.net/fr/d/1AzV1" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 20", "url": "https://d-bk.net/fr/d/1AzUu" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/1AzWG" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/1AzWH" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/1AzWI" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 50", "url": "https://d-bk.net/fr/d/1AzUv" },
  { "type": "dofusbook", "title": "PANDAWA EAU PVM 80", "url": "https://d-bk.net/fr/d/1AzUw" },
  { "type": "dofusbook", "title": "ROUB TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15a82" },
  { "type": "dofusbook", "title": "ROUB TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15a8T" },
  { "type": "dofusbook", "title": "ROUB TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15a9J" },
  { "type": "dofusbook", "title": "ROUBLAD FEU 120", "url": "https://d-bk.net/fr/d/1B14x" },
  { "type": "dofusbook", "title": "ROUBLARD AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/12qOF" },
  { "type": "dofusbook", "title": "ROUBLARD AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/12qOG" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/12qOH" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 110", "url": "https://d-bk.net/fr/d/15Yja" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 130", "url": "https://d-bk.net/fr/d/15Yjb" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 160", "url": "https://d-bk.net/fr/d/15Yjc" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 180", "url": "https://d-bk.net/fr/d/15Yjd" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 199", "url": "https://d-bk.net/fr/d/15Yje" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 20", "url": "https://d-bk.net/fr/d/15YjX" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15Yjg" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Yji" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Yjj" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 50", "url": "https://d-bk.net/fr/d/15YjY" },
  { "type": "dofusbook", "title": "ROUBLARD AIR PVM 80", "url": "https://d-bk.net/fr/d/15YjZ" },
  { "type": "dofusbook", "title": "ROUBLARD FEU 165", "url": "https://d-bk.net/fr/d/1BHW0" },
  { "type": "dofusbook", "title": "ROUBLARD FEU/SOIN 200 LOW COST", "url": "https://d-bk.net/fr/d/15KEM" },
  { "type": "dofusbook", "title": "ROUBLARD FEU/SOIN 200 MEDIUM", "url": "https://d-bk.net/fr/d/15KEL" },
  { "type": "dofusbook", "title": "ROUBLARD FEU/SOIN 200 PREMIUM", "url": "https://d-bk.net/fr/d/15KEI" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE 120", "url": "https://d-bk.net/fr/d/1B14s" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE 165", "url": "https://d-bk.net/fr/d/xmzr" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15KEC" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15KE7" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15KDV" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150jm" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/12iXK" },
  { "type": "dofusbook", "title": "ROUBLARD TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/150jj" },
  { "type": "dofusbook", "title": "SACRI AIR 120", "url": "https://d-bk.net/fr/d/1B12u" },
  { "type": "dofusbook", "title": "SACRI AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IVA" },
  { "type": "dofusbook", "title": "SACRI AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IV9" },
  { "type": "dofusbook", "title": "SACRI AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IV8" },
  { "type": "dofusbook", "title": "SACRI AMRO FEU 120", "url": "https://d-bk.net/fr/d/rJp9" },
  { "type": "dofusbook", "title": "SACRI EAU  165", "url": "https://d-bk.net/fr/d/xnRf" },
  { "type": "dofusbook", "title": "SACRI EAU 110 PVM", "url": "https://d-bk.net/fr/d/15Yim" },
  { "type": "dofusbook", "title": "SACRI EAU 120", "url": "https://d-bk.net/fr/d/1B12v" },
  { "type": "dofusbook", "title": "SACRI EAU 130 PVM", "url": "https://d-bk.net/fr/d/15Yin" },
  { "type": "dofusbook", "title": "SACRI EAU 160 PVM", "url": "https://d-bk.net/fr/d/15Yio" },
  { "type": "dofusbook", "title": "SACRI EAU 180 PVM", "url": "https://d-bk.net/fr/d/15Yip" },
  { "type": "dofusbook", "title": "SACRI EAU 199 PVM", "url": "https://d-bk.net/fr/d/15Yiq" },
  { "type": "dofusbook", "title": "SACRI EAU 20 PVM", "url": "https://d-bk.net/fr/d/15YiO" },
  { "type": "dofusbook", "title": "SACRI EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/15IVW" },
  { "type": "dofusbook", "title": "SACRI EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IVU" },
  { "type": "dofusbook", "title": "SACRI EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IVS" },
  { "type": "dofusbook", "title": "SACRI EAU 200 PVM LOW COST", "url": "https://d-bk.net/fr/d/15Yir" },
  { "type": "dofusbook", "title": "SACRI EAU 200 PVM MEDIUM", "url": "https://d-bk.net/fr/d/15Yis" },
  { "type": "dofusbook", "title": "SACRI EAU 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15Yit" },
  { "type": "dofusbook", "title": "SACRI EAU 50 PVM", "url": "https://d-bk.net/fr/d/15Yih" },
  { "type": "dofusbook", "title": "SACRI EAU 80 PVM", "url": "https://d-bk.net/fr/d/15Yil" },
  { "type": "dofusbook", "title": "SACRI EAU LOW COST CHAD", "url": "https://d-bk.net/fr/d/18Kty" },
  { "type": "dofusbook", "title": "SACRI EAU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2OW" },
  { "type": "dofusbook", "title": "SACRI EAU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/18Ku1" },
  { "type": "dofusbook", "title": "SACRI EAU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q2Oa" },
  { "type": "dofusbook", "title": "SACRI EAU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/18Ku2" },
  { "type": "dofusbook", "title": "SACRI EAU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2Of" },
  { "type": "dofusbook", "title": "SACRI EBENE LOW COST ROXX", "url": "https://d-bk.net/fr/d/zmgK" },
  { "type": "dofusbook", "title": "SACRI EBENE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/10dBp" },
  { "type": "dofusbook", "title": "SACRI EBENE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/zmgy" },
  { "type": "dofusbook", "title": "SACRI FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15ITr" },
  { "type": "dofusbook", "title": "SACRI FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15ITO" },
  { "type": "dofusbook", "title": "SACRI FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15ISY" },
  { "type": "dofusbook", "title": "SACRI FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150ia" },
  { "type": "dofusbook", "title": "SACRI FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150iS" },
  { "type": "dofusbook", "title": "SACRI FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12rjC" },
  { "type": "dofusbook", "title": "SACRI TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15IUs" },
  { "type": "dofusbook", "title": "SACRI TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IUq" },
  { "type": "dofusbook", "title": "SACRI TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IUn" },
  { "type": "dofusbook", "title": "SACRI TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150iH" },
  { "type": "dofusbook", "title": "SACRI TERRE LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2OC" },
  { "type": "dofusbook", "title": "SACRI TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150iE" },
  { "type": "dofusbook", "title": "SACRI TERRE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q2OK" },
  { "type": "dofusbook", "title": "SACRI TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iWY" },
  { "type": "dofusbook", "title": "SACRI TERRE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2OO" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 110", "url": "https://d-bk.net/fr/d/15eMl" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 130", "url": "https://d-bk.net/fr/d/15eMo" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 160", "url": "https://d-bk.net/fr/d/15eMp" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 180", "url": "https://d-bk.net/fr/d/15eMq" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 199", "url": "https://d-bk.net/fr/d/15eMr" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 20", "url": "https://d-bk.net/fr/d/15eMd" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15eMs" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15ePB" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15ePg" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 50", "url": "https://d-bk.net/fr/d/15eMi" },
  { "type": "dofusbook", "title": "SACRI TERRE PVM 80", "url": "https://d-bk.net/fr/d/15eMk" },
  { "type": "dofusbook", "title": "SACRI YOUYETTE 165", "url": "https://d-bk.net/fr/d/xn0C" },
  { "type": "dofusbook", "title": "SACRIEUR TANK PVP LOW COST 200", "url": "https://d-bk.net/fr/d/1Axgj" },
  { "type": "dofusbook", "title": "SACRIEUR TANK PVP MEDIUM 200", "url": "https://d-bk.net/fr/d/1Axh2" },
  { "type": "dofusbook", "title": "SACRIEUR TANK PVP PREMIUM 200", "url": "https://d-bk.net/fr/d/1AxhM" },
  { "type": "dofusbook", "title": "SACRIEUR TERRE/CAC 120", "url": "https://d-bk.net/fr/d/o20L" },
  { "type": "dofusbook", "title": "SADI EAU 120", "url": "https://d-bk.net/fr/d/1B14p" },
  { "type": "dofusbook", "title": "SADI EAU 200 PVP LOW COST", "url": "https://d-bk.net/fr/d/1A7r7" },
  { "type": "dofusbook", "title": "SADI EAU 200 PVP MEDIUM", "url": "https://d-bk.net/fr/d/1A7r9" },
  { "type": "dofusbook", "title": "SADI EAU 200 PVP PREMIUM", "url": "https://d-bk.net/fr/d/1A7rA" },
  { "type": "dofusbook", "title": "SADI EAU EQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19iks" },
  { "type": "dofusbook", "title": "SADI EAU EQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19iky" },
  { "type": "dofusbook", "title": "SADI EAU EQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19ikz" },
  { "type": "dofusbook", "title": "SADI EAU ROXX LOW COST", "url": "https://d-bk.net/fr/d/19lAm" },
  { "type": "dofusbook", "title": "SADI EAU ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19lAz" },
  { "type": "dofusbook", "title": "SADI EAU ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19lB4" },
  { "type": "dofusbook", "title": "SADI FEU 120", "url": "https://d-bk.net/fr/d/1B14r" },
  { "type": "dofusbook", "title": "SADI FEU 165", "url": "https://d-bk.net/fr/d/1BHVq" },
  { "type": "dofusbook", "title": "SADI FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/1BHWH" },
  { "type": "dofusbook", "title": "SADI FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/1BHWJ" },
  { "type": "dofusbook", "title": "SADI FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/1BHWK" },
  { "type": "dofusbook", "title": "SADI FEU ÉQUILIBRÉ 199 LOW COST", "url": "https://d-bk.net/fr/d/19imW" },
  { "type": "dofusbook", "title": "SADI FEU ÉQUILIBRÉ 199 MEDIUM", "url": "https://d-bk.net/fr/d/19img" },
  { "type": "dofusbook", "title": "SADI FEU ÉQUILIBRÉ 199 PREMIUM", "url": "https://d-bk.net/fr/d/19imi" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 110", "url": "https://d-bk.net/fr/d/19ilA" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 130", "url": "https://d-bk.net/fr/d/19ilF" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 160", "url": "https://d-bk.net/fr/d/19ilG" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 180", "url": "https://d-bk.net/fr/d/19ilJ" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 199", "url": "https://d-bk.net/fr/d/19ilM" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 20", "url": "https://d-bk.net/fr/d/19hMI" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 200", "url": "https://d-bk.net/fr/d/19ilZ" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 50", "url": "https://d-bk.net/fr/d/19hMJ" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST PVM 80", "url": "https://d-bk.net/fr/d/19il2" },
  { "type": "dofusbook", "title": "SADI FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/19lAP" },
  { "type": "dofusbook", "title": "SADI FEU MEDIUM PVM 200", "url": "https://d-bk.net/fr/d/19ilq" },
  { "type": "dofusbook", "title": "SADI FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/19lAU" },
  { "type": "dofusbook", "title": "SADI FEU PREMIUM PVM 200", "url": "https://d-bk.net/fr/d/19im2" },
  { "type": "dofusbook", "title": "SADI FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/19lAd" },
  { "type": "dofusbook", "title": "SADI FEU/EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/1A7sc" },
  { "type": "dofusbook", "title": "SADI FEU/EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/1A7sV" },
  { "type": "dofusbook", "title": "SADI FEU/EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/1A7sR" },
  { "type": "dofusbook", "title": "SADI TERRE 165", "url": "https://d-bk.net/fr/d/1BHVt" },
  { "type": "dofusbook", "title": "SADI TERRE 200 PVP LOW COST", "url": "https://d-bk.net/fr/d/1A7ri" },
  { "type": "dofusbook", "title": "SADI TERRE 200 PVP MEDIUM", "url": "https://d-bk.net/fr/d/1A7rj" },
  { "type": "dofusbook", "title": "SADI TERRE 200 PVP PREMIUM", "url": "https://d-bk.net/fr/d/1A7rl" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/1A7rz" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/1A7s5" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/1A7s8" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU ÉQUILIBRÉ 199 LOW COST", "url": "https://d-bk.net/fr/d/19j8E" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU ÉQUILIBRÉ 199 MEDIUM", "url": "https://d-bk.net/fr/d/19j8a" },
  { "type": "dofusbook", "title": "SADI TERRE/EAU ÉQUILIBRÉ 199 PREMIUM", "url": "https://d-bk.net/fr/d/19j8r" },
  { "type": "dofusbook", "title": "SRAM AIR 165", "url": "https://d-bk.net/fr/d/1BHTa" },
  { "type": "dofusbook", "title": "SRAM AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gs3" },
  { "type": "dofusbook", "title": "SRAM AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Grw" },
  { "type": "dofusbook", "title": "SRAM AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gr1" },
  { "type": "dofusbook", "title": "SRAM AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/14ytc" },
  { "type": "dofusbook", "title": "SRAM AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/rT8D" },
  { "type": "dofusbook", "title": "SRAM AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14ytW" },
  { "type": "dofusbook", "title": "SRAM AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/rT8y" },
  { "type": "dofusbook", "title": "SRAM AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iT1" },
  { "type": "dofusbook", "title": "SRAM AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/rT9b" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 110", "url": "https://d-bk.net/fr/d/15WHf" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 130", "url": "https://d-bk.net/fr/d/15WML" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 160", "url": "https://d-bk.net/fr/d/15WQy" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 180", "url": "https://d-bk.net/fr/d/15WiM" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 199", "url": "https://d-bk.net/fr/d/15Wj0" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 20", "url": "https://d-bk.net/fr/d/15WCx" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15Wje" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Wk5" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15WkI" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 50", "url": "https://d-bk.net/fr/d/15WFG" },
  { "type": "dofusbook", "title": "SRAM AIR PVM 80", "url": "https://d-bk.net/fr/d/15WGo" },
  { "type": "dofusbook", "title": "SRAM EAU 200 LOW COST", "url": "https://d-bk.net/fr/d/1A1jd" },
  { "type": "dofusbook", "title": "SRAM EAU 200 MEDIUM", "url": "https://d-bk.net/fr/d/1A1je" },
  { "type": "dofusbook", "title": "SRAM EAU 200 PREMIUM", "url": "https://d-bk.net/fr/d/1A1jf" },
  { "type": "dofusbook", "title": "SRAM EAU LOW COST 199", "url": "https://d-bk.net/fr/d/17Zxi" },
  { "type": "dofusbook", "title": "SRAM EAU MEDIUM 199", "url": "https://d-bk.net/fr/d/17Zxj" },
  { "type": "dofusbook", "title": "SRAM EAU PREMIUM 199", "url": "https://d-bk.net/fr/d/17Zxk" },
  { "type": "dofusbook", "title": "SRAM FEU 165", "url": "https://d-bk.net/fr/d/uOtc" },
  { "type": "dofusbook", "title": "SRAM FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gt4" },
  { "type": "dofusbook", "title": "SRAM FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gt3" },
  { "type": "dofusbook", "title": "SRAM FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gt2" },
  { "type": "dofusbook", "title": "SRAM FEU LOW COST CHAD", "url": "https://d-bk.net/fr/d/14ytA" },
  { "type": "dofusbook", "title": "SRAM FEU LOW COST ROXX", "url": "https://d-bk.net/fr/d/q2P1" },
  { "type": "dofusbook", "title": "SRAM FEU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14yt7" },
  { "type": "dofusbook", "title": "SRAM FEU MEDIUM ROXX", "url": "https://d-bk.net/fr/d/q2P2" },
  { "type": "dofusbook", "title": "SRAM FEU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12xyL" },
  { "type": "dofusbook", "title": "SRAM FEU PREMIUM ROXX", "url": "https://d-bk.net/fr/d/q2P3" },
  { "type": "dofusbook", "title": "SRAM FEU/SOIN 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gsc" },
  { "type": "dofusbook", "title": "SRAM FEU/SOIN 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gsb" },
  { "type": "dofusbook", "title": "SRAM FEU/SOIN 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gsa" },
  { "type": "dofusbook", "title": "SRAM RESEAU LOW COST 199 ROXX", "url": "https://d-bk.net/fr/d/19kR6" },
  { "type": "dofusbook", "title": "SRAM RESEAU MEDIUM 199 ROXX", "url": "https://d-bk.net/fr/d/19kQg" },
  { "type": "dofusbook", "title": "SRAM RESEAU PREMIUM 199 ROXX", "url": "https://d-bk.net/fr/d/xFIl" },
  { "type": "dofusbook", "title": "SRAM TERRE 120", "url": "https://d-bk.net/fr/d/o20U" },
  { "type": "dofusbook", "title": "SRAM TERRE 165", "url": "https://d-bk.net/fr/d/xnJs" },
  { "type": "dofusbook", "title": "SRAM TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/14ysv" },
  { "type": "dofusbook", "title": "SRAM TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14ysr" },
  { "type": "dofusbook", "title": "SRAM TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iTR" },
  { "type": "dofusbook", "title": "SRAM TERRE/CAC 200 LOW COST", "url": "https://d-bk.net/fr/d/15Gtx" },
  { "type": "dofusbook", "title": "SRAM TERRE/CAC 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gtv" },
  { "type": "dofusbook", "title": "SRAM TERRE/CAC 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gts" },
  { "type": "dofusbook", "title": "SRAM TERRE/DISTANCE 200 LOW COST", "url": "https://d-bk.net/fr/d/15GuC" },
  { "type": "dofusbook", "title": "SRAM TERRE/DISTANCE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Gu9" },
  { "type": "dofusbook", "title": "SRAM TERRE/DISTANCE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Gu5" },
  { "type": "dofusbook", "title": "STEAM MULTI PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15aIN" },
  { "type": "dofusbook", "title": "STEAM MULTI PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15aIs" },
  { "type": "dofusbook", "title": "STEAM MULTI PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15aJu" },
  { "type": "dofusbook", "title": "STEAM TERRE PVM 130", "url": "https://d-bk.net/fr/d/15aDF" },
  { "type": "dofusbook", "title": "STEAM TERRE PVM 160", "url": "https://d-bk.net/fr/d/15aEC" },
  { "type": "dofusbook", "title": "STEAM TERRE PVM 180", "url": "https://d-bk.net/fr/d/15aGA" },
  { "type": "dofusbook", "title": "STEAM TERRE PVM 199", "url": "https://d-bk.net/fr/d/15aH7" },
  { "type": "dofusbook", "title": "STEAMER AIR DO POU 120", "url": "https://d-bk.net/fr/d/1B13y" },
  { "type": "dofusbook", "title": "STEAMER AIR LOW COST 200 PVP", "url": "https://d-bk.net/fr/d/17Zyn" },
  { "type": "dofusbook", "title": "STEAMER AIR LOW COST CHAD", "url": "https://d-bk.net/fr/d/19lYs" },
  { "type": "dofusbook", "title": "STEAMER AIR MEDIUM 200 PVP", "url": "https://d-bk.net/fr/d/17Zyo" },
  { "type": "dofusbook", "title": "STEAMER AIR MEDIUM CHAD", "url": "https://d-bk.net/fr/d/19lZ2" },
  { "type": "dofusbook", "title": "STEAMER AIR PREMIUM 200 PVP", "url": "https://d-bk.net/fr/d/17Zyr" },
  { "type": "dofusbook", "title": "STEAMER AIR PREMIUM CHAD", "url": "https://d-bk.net/fr/d/19lZ7" },
  { "type": "dofusbook", "title": "STEAMER DO POU 120", "url": "https://d-bk.net/fr/d/1B13w" },
  { "type": "dofusbook", "title": "STEAMER DO POU 165", "url": "https://d-bk.net/fr/d/xnMI" },
  { "type": "dofusbook", "title": "STEAMER DO POU CHAD 199 LOW COST", "url": "https://d-bk.net/fr/d/19lX3" },
  { "type": "dofusbook", "title": "STEAMER DO POU CHAD 199 MEDIUM", "url": "https://d-bk.net/fr/d/19lX9" },
  { "type": "dofusbook", "title": "STEAMER DO POU CHAD 199 PREMIUM", "url": "https://d-bk.net/fr/d/19lXP" },
  { "type": "dofusbook", "title": "STEAMER DO POU LOW COST PVP 200", "url": "https://d-bk.net/fr/d/17Zyg" },
  { "type": "dofusbook", "title": "STEAMER DO POU MEDIUM PVP 200", "url": "https://d-bk.net/fr/d/17Zyj" },
  { "type": "dofusbook", "title": "STEAMER DO POU PREMIUM PVP 200", "url": "https://d-bk.net/fr/d/17Zyk" },
  { "type": "dofusbook", "title": "STEAMER DO POU ROXX 199 LOW COST", "url": "https://d-bk.net/fr/d/19lXV" },
  { "type": "dofusbook", "title": "STEAMER DO POU ROXX 199 MEDIUM", "url": "https://d-bk.net/fr/d/19lXa" },
  { "type": "dofusbook", "title": "STEAMER DO POU ROXX 199 PREMIUM", "url": "https://d-bk.net/fr/d/19lXj" },
  { "type": "dofusbook", "title": "STEAMER EAU 120", "url": "https://d-bk.net/fr/d/1B140" },
  { "type": "dofusbook", "title": "STEAMER EAU 165", "url": "https://d-bk.net/fr/d/1BHVG" },
  { "type": "dofusbook", "title": "STEAMER EAU ÉQUILIBRÉ LOW COST", "url": "https://d-bk.net/fr/d/19lYB" },
  { "type": "dofusbook", "title": "STEAMER EAU ÉQUILIBRÉ MEDIUM", "url": "https://d-bk.net/fr/d/19lYC" },
  { "type": "dofusbook", "title": "STEAMER EAU ÉQUILIBRÉ PREMIUM", "url": "https://d-bk.net/fr/d/19lYD" },
  { "type": "dofusbook", "title": "STEAMER EAU ROXX LOW COST", "url": "https://d-bk.net/fr/d/19tSC" },
  { "type": "dofusbook", "title": "STEAMER EAU ROXX MEDIUM", "url": "https://d-bk.net/fr/d/19lYR" },
  { "type": "dofusbook", "title": "STEAMER EAU ROXX PREMIUM", "url": "https://d-bk.net/fr/d/19lYS" },
  { "type": "dofusbook", "title": "STEAMER FEU LOW COST PVP 200", "url": "https://d-bk.net/fr/d/17bbG" },
  { "type": "dofusbook", "title": "STEAMER FEU MEDIUM PVP 200", "url": "https://d-bk.net/fr/d/17bbI" },
  { "type": "dofusbook", "title": "STEAMER FEU PREMIUM PVP 200", "url": "https://d-bk.net/fr/d/17bbK" },
  { "type": "dofusbook", "title": "STEAMER FEU/CRIT 120", "url": "https://d-bk.net/fr/d/1B141" },
  { "type": "dofusbook", "title": "STEAMER MULTI 200 LOW COST", "url": "https://d-bk.net/fr/d/u1o2" },
  { "type": "dofusbook", "title": "STEAMER MULTI 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IY5" },
  { "type": "dofusbook", "title": "STEAMER MULTI 200 PREMIUM", "url": "https://d-bk.net/fr/d/u1kw" },
  { "type": "dofusbook", "title": "STEAMER MULTI PVM 200 LOW COST 2", "url": "https://d-bk.net/fr/d/15aKQ" },
  { "type": "dofusbook", "title": "STEAMER MULTI PVM 200 MEDIUM 2", "url": "https://d-bk.net/fr/d/15aKb" },
  { "type": "dofusbook", "title": "STEAMER MULTI PVM 200 PREMIUM 2", "url": "https://d-bk.net/fr/d/15aKd" },
  { "type": "dofusbook", "title": "STEAMER TERRE 165", "url": "https://d-bk.net/fr/d/1BHVD" },
  { "type": "dofusbook", "title": "STEAMER TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15IzM" },
  { "type": "dofusbook", "title": "STEAMER TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IzE" },
  { "type": "dofusbook", "title": "STEAMER TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15Ixz" },
  { "type": "dofusbook", "title": "STEAMER TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/150mQ" },
  { "type": "dofusbook", "title": "STEAMER TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150mP" },
  { "type": "dofusbook", "title": "STEAMER TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iY9" },
  { "type": "dofusbook", "title": "STEAMER TERRE PVM 110", "url": "https://d-bk.net/fr/d/15aCX" },
  { "type": "dofusbook", "title": "STEAMER TERRE PVM 20", "url": "https://d-bk.net/fr/d/15aAV" },
  { "type": "dofusbook", "title": "STEAMER TERRE PVM 50", "url": "https://d-bk.net/fr/d/15aAs" },
  { "type": "dofusbook", "title": "STEAMER TERRE PVM 80", "url": "https://d-bk.net/fr/d/15aAu" },
  { "type": "dofusbook", "title": "XELOR AIR 110 PVM", "url": "https://d-bk.net/fr/d/15WmO" },
  { "type": "dofusbook", "title": "XELOR AIR 130 PVM", "url": "https://d-bk.net/fr/d/15WmP" },
  { "type": "dofusbook", "title": "XELOR AIR 160 PVM", "url": "https://d-bk.net/fr/d/15WmR" },
  { "type": "dofusbook", "title": "XELOR AIR 180 PVM", "url": "https://d-bk.net/fr/d/15WmS" },
  { "type": "dofusbook", "title": "XELOR AIR 199 PVM", "url": "https://d-bk.net/fr/d/15WmT" },
  { "type": "dofusbook", "title": "XELOR AIR 20 PVM", "url": "https://d-bk.net/fr/d/15WmY" },
  { "type": "dofusbook", "title": "XELOR AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15HRE" },
  { "type": "dofusbook", "title": "XELOR AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15HR9" },
  { "type": "dofusbook", "title": "XELOR AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15HQW" },
  { "type": "dofusbook", "title": "XELOR AIR 200 PVM LOW COST", "url": "https://d-bk.net/fr/d/15WoM" },
  { "type": "dofusbook", "title": "XELOR AIR 200 PVM MEDIUM", "url": "https://d-bk.net/fr/d/15WoX" },
  { "type": "dofusbook", "title": "XELOR AIR 200 PVM PREMIUM", "url": "https://d-bk.net/fr/d/15WpE" },
  { "type": "dofusbook", "title": "XELOR AIR 50 PVM", "url": "https://d-bk.net/fr/d/15Wm6" },
  { "type": "dofusbook", "title": "XELOR AIR 80 PVM", "url": "https://d-bk.net/fr/d/15WmC" },
  { "type": "dofusbook", "title": "XELOR ÉQUILIBRÉ TERRE FEU LOW COST", "url": "https://d-bk.net/fr/d/19sQm" },
  { "type": "dofusbook", "title": "XELOR ÉQUILIBRÉ TERRE FEU MEDIUM", "url": "https://d-bk.net/fr/d/19sQq" },
  { "type": "dofusbook", "title": "XELOR ÉQUILIBRÉ TERRE FEU PREMIUM", "url": "https://d-bk.net/fr/d/19sQt" },
  { "type": "dofusbook", "title": "XELOR FEU-EAU 110", "url": "https://d-bk.net/fr/d/14u5y" },
  { "type": "dofusbook", "title": "XELOR LOW COST CHAD", "url": "https://d-bk.net/fr/d/14zMa" },
  { "type": "dofusbook", "title": "XELOR TERRE 120", "url": "https://d-bk.net/fr/d/rJpa" },
  { "type": "dofusbook", "title": "XELOR TERRE 165", "url": "https://d-bk.net/fr/d/uOtp" },
  { "type": "dofusbook", "title": "XELOR TERRE 199 LOW COST ROXX", "url": "https://d-bk.net/fr/d/10SFY" },
  { "type": "dofusbook", "title": "XELOR TERRE 199 MEDIUM ROXX", "url": "https://d-bk.net/fr/d/10SG6" },
  { "type": "dofusbook", "title": "XELOR TERRE 199 PREMIUM ROXX", "url": "https://d-bk.net/fr/d/10SGM" },
  { "type": "dofusbook", "title": "XELOR TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15HP3" },
  { "type": "dofusbook", "title": "XELOR TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15HP1" },
  { "type": "dofusbook", "title": "XELOR TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15HOS" },
  { "type": "dofusbook", "title": "XELOR TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/14zMO" },
  { "type": "dofusbook", "title": "XELOR TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iTh" },
  { "type": "dofusbook", "title": "XELOR TERRE-FEU 120", "url": "https://d-bk.net/fr/d/14u4h" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU 165", "url": "https://d-bk.net/fr/d/1BHW5" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU 200 LOW COST", "url": "https://d-bk.net/fr/d/15HQ5" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU 200 MEDIUM", "url": "https://d-bk.net/fr/d/15HPx" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU 200 PREMIUM", "url": "https://d-bk.net/fr/d/15HP7" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU LOW COST", "url": "https://d-bk.net/fr/d/158cZ" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU MEDIUM", "url": "https://d-bk.net/fr/d/158cN" },
  { "type": "dofusbook", "title": "XELOR TERRE/FEU PREMIUM", "url": "https://d-bk.net/fr/d/158Zu" },
  { "type": "dofusbook", "title": "ZOBAL AGI PVM 180", "url": "https://d-bk.net/fr/d/15ZTK" },
  { "type": "dofusbook", "title": "ZOBAL AGI PVM 199", "url": "https://d-bk.net/fr/d/15ZUW" },
  { "type": "dofusbook", "title": "ZOBAL AGI PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15ZV6" },
  { "type": "dofusbook", "title": "ZOBAL AGI PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15ZVh" },
  { "type": "dofusbook", "title": "ZOBAL AGI PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15ZW3" },
  { "type": "dofusbook", "title": "ZOBAL AIR 120", "url": "https://d-bk.net/fr/d/1B14Z" },
  { "type": "dofusbook", "title": "ZOBAL AIR 200 LOW COST", "url": "https://d-bk.net/fr/d/15IXo" },
  { "type": "dofusbook", "title": "ZOBAL AIR 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IXl" },
  { "type": "dofusbook", "title": "ZOBAL AIR 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IXk" },
  { "type": "dofusbook", "title": "ZOBAL AIR LOW COST ROXX", "url": "https://d-bk.net/fr/d/tuFT" },
  { "type": "dofusbook", "title": "ZOBAL AIR MEDIUM ROXX", "url": "https://d-bk.net/fr/d/tuFc" },
  { "type": "dofusbook", "title": "ZOBAL AIR PREMIUM ROXX", "url": "https://d-bk.net/fr/d/tuFh" },
  { "type": "dofusbook", "title": "ZOBAL AIR/CRIT LOW COST CHAD", "url": "https://d-bk.net/fr/d/150kX" },
  { "type": "dofusbook", "title": "ZOBAL AIR/CRIT MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150kP" },
  { "type": "dofusbook", "title": "ZOBAL AIR/CRIT PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iXa" },
  { "type": "dofusbook", "title": "ZOBAL DO POU 165", "url": "https://d-bk.net/fr/d/uEFB" },
  { "type": "dofusbook", "title": "ZOBAL DO POU 200  PREMIUM", "url": "https://d-bk.net/fr/d/u2nE" },
  { "type": "dofusbook", "title": "ZOBAL DO POU 200 LOW COST", "url": "https://d-bk.net/fr/d/15IXV" },
  { "type": "dofusbook", "title": "ZOBAL DO POU 200 MEDIUM", "url": "https://d-bk.net/fr/d/u2nC" },
  { "type": "dofusbook", "title": "ZOBAL DO POU LOW COST CHAD", "url": "https://d-bk.net/fr/d/150k6" },
  { "type": "dofusbook", "title": "ZOBAL DO POU MEDIUM CHAD", "url": "https://d-bk.net/fr/d/150k4" },
  { "type": "dofusbook", "title": "ZOBAL DO POU PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12jHO" },
  { "type": "dofusbook", "title": "ZOBAL EAU/DO POU 120", "url": "https://d-bk.net/fr/d/1B14X" },
  { "type": "dofusbook", "title": "ZOBAL POOLACHE LOW COST ROXX", "url": "https://d-bk.net/fr/d/1BI0D" },
  { "type": "dofusbook", "title": "ZOBAL POOLACHE MEDIUM ROXX", "url": "https://d-bk.net/fr/d/1BI0H" },
  { "type": "dofusbook", "title": "ZOBAL POOLACHE PREMIUM ROXX", "url": "https://d-bk.net/fr/d/1BI0J" },
  { "type": "dofusbook", "title": "ZOBAL TANK 200 LOW COST", "url": "https://d-bk.net/fr/d/1AyJ4" },
  { "type": "dofusbook", "title": "ZOBAL TANK 200 MEDIUM", "url": "https://d-bk.net/fr/d/1AyJ7" },
  { "type": "dofusbook", "title": "ZOBAL TANK 200 PREMIUM", "url": "https://d-bk.net/fr/d/1AyJA" },
  { "type": "dofusbook", "title": "ZOBAL TEROIDE 200 LOW COST", "url": "https://d-bk.net/fr/d/15Mcx" },
  { "type": "dofusbook", "title": "ZOBAL TEROIDE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15Mck" },
  { "type": "dofusbook", "title": "ZOBAL TEROIDE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15McB" },
  { "type": "dofusbook", "title": "ZOBAL TERRE 165", "url": "https://d-bk.net/fr/d/uOu4" },
  { "type": "dofusbook", "title": "ZOBAL TERRE 200 LOW COST", "url": "https://d-bk.net/fr/d/15IXg" },
  { "type": "dofusbook", "title": "ZOBAL TERRE 200 MEDIUM", "url": "https://d-bk.net/fr/d/15IXf" },
  { "type": "dofusbook", "title": "ZOBAL TERRE 200 PREMIUM", "url": "https://d-bk.net/fr/d/15IXe" },
  { "type": "dofusbook", "title": "ZOBAL TERRE LOW COST CHAD", "url": "https://d-bk.net/fr/d/151Rk" },
  { "type": "dofusbook", "title": "ZOBAL TERRE MEDIUM CHAD", "url": "https://d-bk.net/fr/d/151Rh" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PREMIUM CHAD", "url": "https://d-bk.net/fr/d/12iXV" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 110", "url": "https://d-bk.net/fr/d/15ZEq" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 130", "url": "https://d-bk.net/fr/d/15ZEr" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 160", "url": "https://d-bk.net/fr/d/15ZEu" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 180", "url": "https://d-bk.net/fr/d/15ZEx" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 199", "url": "https://d-bk.net/fr/d/15ZEy" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 20", "url": "https://d-bk.net/fr/d/15ZA4" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 200 LOW COST", "url": "https://d-bk.net/fr/d/15ZF0" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 200 MEDIUM", "url": "https://d-bk.net/fr/d/15ZF1" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 200 PREMIUM", "url": "https://d-bk.net/fr/d/15ZF2" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 50", "url": "https://d-bk.net/fr/d/15ZEg" },
  { "type": "dofusbook", "title": "ZOBAL TERRE PVM 80", "url": "https://d-bk.net/fr/d/15ZEn" },
  { "type": "dofusbook", "title": "ZOBAL TERRE/CAC 120", "url": "https://d-bk.net/fr/d/o20r" },
]

const GLOBAL_BINDINGS = [
  { "command": "openCommandPalette", "key": { "ctrlKey": true, "code": "KeyU" } },
  { "command": "openCommandPalette", "key": { "ctrlKey": true, "code": "KeyK" } },
  { "command": "openCommandPalette", "key": { "metaKey": true, "code": "KeyK" } },
  { "command": "toggleDarkMode", "key": { "ctrlKey": true, "code": "KeyY" } },
]

const GLOBAL_ACTIONS = [
  { "name": "openCommandPalette", "fun": openCommandPalette },
  { "name": "toggleDarkMode", "fun": toggleDarkMode },
]

const PALETTE_BINDINGS = [
  { "command": "selectNextItem", "key": { "code": "ArrowDown" } },
  { "command": "selectNextItem", "key": { "ctrlKey": true, "code": "KeyN" } },
  { "command": "selectNextItem", "key": { "code": "Tab" } },
  { "command": "selectPreviousItem", "key": { "code": "ArrowUp" } },
  { "command": "selectPreviousItem", "key": { "ctrlKey": true, "code": "KeyP" } },
  { "command": "selectPreviousItem", "key": { "shiftKey": true, "code": "Tab" } },
  { "command": "activateSelectedItem", "key": { "code": "Enter" } },
  { "command": "movePageDown", "key": { "code": "PageDown" } },
  { "command": "movePageDown", "key": { "ctrlKey": true, "code": "KeyD" } },
  { "command": "movePageUp", "key": { "code": "PageUp" } },
  { "command": "movePageUp", "key": { "ctrlKey": true, "code": "KeyU" } },
  { "command": "closeCommandPalette", "key": { "code": "Escape" } },
  { "command": "closeCommandPalette", "key": { "ctrlKey": true, "code": "KeyC" } },
]

const PALETTE_ACTIONS = [
  { "name": "selectNextItem", "fun": selectNextItem },
  { "name": "selectPreviousItem", "fun": selectPreviousItem },
  { "name": "activateSelectedItem", "fun": activateSelectedItem },
  { "name": "movePageDown", "fun": movePageDown },
  { "name": "movePageUp", "fun": movePageUp },
  { "name": "closeCommandPalette", "fun": closeCommandPalette },
]

function openCommandPalette(cx) {
  cx.commandPaletteElement.showPopover()
}

function closeCommandPalette(cx) {
  cx.paletteInputElement.value = ''
  cx.paletteInputElement.dispatchEvent(
    new InputEvent('input', {
      inputType: 'deleteContentBackward'
    })
  )
  cx.commandPaletteElement.hidePopover()
}

function selectNextItem(cx) {
  const activeElement = cx.paletteMenuElement.querySelector('menu-item.active')
  if (
    activeElement instanceof MenuItem &&
    activeElement.nextElementSibling instanceof MenuItem
  ) {
    activeElement.classList.remove('active')
    activeElement.nextElementSibling.classList.add('active')
    activeElement.nextElementSibling.scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
      inline: 'nearest'
    })
  }
}

function selectPreviousItem(cx) {
  const activeElement = cx.paletteMenuElement.querySelector('menu-item.active')
  if (
    activeElement instanceof MenuItem &&
    activeElement.previousElementSibling instanceof MenuItem
  ) {
    activeElement.classList.remove('active')
    activeElement.previousElementSibling.classList.add('active')
    activeElement.previousElementSibling.scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
      inline: 'nearest'
    })
  }
}

function activateSelectedItem(cx) {
  const activeElement = cx.paletteMenuElement.querySelector('menu-item.active')
  if (activeElement instanceof MenuItem) {
    activeElement.click()
  }
}

function movePageDown(cx) {
  scroller.scrollBy(
    cx.mainElement,
    0,
    window.innerHeight * 0.9
  )
}

function movePageUp(cx) {
  scroller.scrollBy(
    cx.mainElement,
    0,
    window.innerHeight * -0.9
  )
}

function toggleDarkMode() {
  document.querySelector('button:has(svg.lucide-sun, svg.lucide-moon)').click()
}

// scroller.js -----------------------------------------------------------------

class Scroller {
  static SHORT_THROW_FRAME_CALIBRATION = [0.2, 0.2, 0.2, 0.2, 0.2]
  static LONG_THROW_FRAME_CALIBRATION = [0.001, 0.002, 0.003, 0.004, 0.99]

  constructor() {
    this.animationFrameMap = new Map
  }

  scrollBy(scrollingElement, deltaX, deltaY) {
    const frameCalibration = (
      Math.abs(deltaX) > window.innerWidth ||
      Math.abs(deltaY) > window.innerHeight
    )
      ? Scroller.LONG_THROW_FRAME_CALIBRATION
      : Scroller.SHORT_THROW_FRAME_CALIBRATION

    if (this.animationFrameMap.has(scrollingElement)) {
      const animationFrame = this.animationFrameMap.get(scrollingElement)
      window.cancelAnimationFrame(animationFrame)
    }

    scrollingElement.scrollBy({
      left: Math.sign(deltaX),
      top: Math.sign(deltaY),
      behavior: 'instant'
    })

    const scrollPerformer = (frameCount, frameLimit) => {
      if (frameCount < frameLimit) {
        const calibration = frameCalibration[frameCount]
        scrollingElement.scrollBy({
          left: Math.sign(deltaX) * Math.ceil(Math.abs(deltaX) * calibration),
          top: Math.sign(deltaY) * Math.ceil(Math.abs(deltaY) * calibration),
          behavior: 'instant'
        })
        const animationFrame = window.requestAnimationFrame(() => {
          scrollPerformer(frameCount + 1, frameLimit)
        })
        this.animationFrameMap.set(scrollingElement, animationFrame)
      } else {
        this.animationFrameMap.delete(scrollingElement)
      }
    }

    window.requestAnimationFrame(() => {
      scrollPerformer(0, frameCalibration.length)
    })
  }

  scrollTo(scrollingElement, scrollLeft, scrollTop) {
    this.scrollBy(
      scrollingElement,
      scrollLeft - scrollingElement.scrollLeft,
      scrollTop - scrollingElement.scrollTop
    )
  }
}

// keymap.js -------------------------------------------------------------------

class Keymap extends Map {
  get(keyboardEvent) {
    return super.get(
      keySequence(
        keyboardEvent
      )
    )
  }

  set(keyboardEvent, value) {
    return super.set(
      keySequence(
        keyboardEvent
      ),
      value
    )
  }

  has(keyboardEvent) {
    return super.has(
      keySequence(
        keyboardEvent
      )
    )
  }
}

const keySequence = ({
  ctrlKey = false,
  altKey = false,
  shiftKey = false,
  metaKey = false,
  code
}) => Symbol.for([
  ctrlKey,
  altKey,
  shiftKey,
  metaKey,
  code
])

// components/CustomMenu.js ----------------------------------------------------

const CUSTOM_MENU_TEMPLATE = document.createElement('template')

CUSTOM_MENU_TEMPLATE.innerHTML = `
  <h6 part="name">
    <slot name="name">Menu Items</slot>
  </h6>
  <ul part="menu">
    <slot></slot>
  </ul>
`

class CustomMenu extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({
      mode: 'open'
    })

    this.shadowRoot.append(
      CUSTOM_MENU_TEMPLATE.content.cloneNode(true)
    )

    this.keymap = new Keymap

    this.addEventListener('keydown', this.onKeyDown)
  }

  connectedCallback() {
    this.tabIndex = 0
  }

  replaceMenuItems(menuItemElements) {
    this.clearMenuItems()
    this.append(...menuItemElements)
  }

  clearMenuItems() {
    const slotElement = this.shadowRoot.querySelector('slot:not([name])')
    for (const slottedElement of slotElement.assignedElements()) {
      slottedElement.remove()
    }
  }

  addKeyboardShortcut(keyboardEvent, menuItem) {
    this.keymap.set(keyboardEvent, menuItem)
  }

  onKeyDown(keyboardEvent) {
    if (this.keymap.has(keyboardEvent)) {
      const menuItem = this.keymap.get(keyboardEvent)
      menuItem.focus()
      menuItem.click()
      keyboardEvent.preventDefault()
    }
  }
}

customElements.define('custom-menu', CustomMenu)

// components/MenuItem.js ------------------------------------------------------

const MENU_ITEM_TEMPLATE = document.createElement('template')

MENU_ITEM_TEMPLATE.innerHTML = `
  <li part="item">
    <button part="button">
      <span part="description">
        <slot></slot>
      </span>
      <span part="shortcuts">
        <slot name="shortcut"></slot>
      </span>
    </button>
  </li>
`

class MenuItem extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({
      mode: 'open'
    })

    this.shadowRoot.append(
      MENU_ITEM_TEMPLATE.content.cloneNode(true)
    )

    this.slotElements = this.shadowRoot.querySelectorAll('slot')
  }

  connectedCallback() {
    this.tabIndex = 0
  }

  get description() {
    return this.slotElements[0]
      .assignedNodes()
      .reduce((textContent, node) =>
        textContent.concat(node.textContent), ''
      )
  }

  addKeyboardShortcut(keyboardEvent) {
    const keyboardShortcutElement = document.createElement('keyboard-shortcut')
    keyboardShortcutElement.slot = 'shortcut'
    Object.assign(keyboardShortcutElement.dataset, keyboardEvent)
    this.append(keyboardShortcutElement)
    this.parentElement.addKeyboardShortcut(keyboardEvent, this)
  }
}

customElements.define('menu-item', MenuItem)

const keyDisplay = {
  ctrlKey: '⌃',
  altKey: '⌥',
  shiftKey: '⇧',
  metaKey: '⌘'
}

// components/KeyboardShortcut.js ----------------------------------------------

const KEYBOARD_SHORTCUT_TEMPLATE = document.createElement('template')

KEYBOARD_SHORTCUT_TEMPLATE.innerHTML = `
  <kbd part="key">
    <slot name="ctrlKey"></slot>
    <slot name="altKey"></slot>
    <slot name="shiftKey"></slot>
    <slot name="metaKey"></slot>
    <slot name="code"></slot>
  </kbd>
`

class KeyboardShortcut extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({
      mode: 'open'
    })

    this.shadowRoot.append(
      KEYBOARD_SHORTCUT_TEMPLATE.content.cloneNode(true)
    )

    this.slotElements = this.shadowRoot.querySelectorAll('slot')
  }

  connectedCallback() {
    for (const slotElement of this.slotElements) {
      for (const slottedElement of slotElement.assignedElements()) {
        slottedElement.remove()
      }
    }

    if (this.dataset.ctrlKey) {
      this.addKey('ctrlKey', 'Control', keyDisplay.ctrlKey)
    }

    if (this.dataset.altKey) {
      this.addKey('altKey', 'Alt', keyDisplay.altKey)
    }

    if (this.dataset.shiftKey) {
      this.addKey('shiftKey', 'Shift', keyDisplay.shiftKey)
    }

    if (this.dataset.metaKey) {
      this.addKey('metaKey', 'Meta', keyDisplay.metaKey)
    }

    this.addKey('code', null, this.dataset.code)
  }

  addKey(slot, label, content) {
    const keyElement = document.createElement('kbd')
    keyElement.slot = slot
    keyElement.ariaLabel = label
    keyElement.textContent = content
    this.append(keyElement)
  }
}

customElements.define('keyboard-shortcut', KeyboardShortcut)

// components/SuggestionItem.js ------------------------------------------------

const SUGGESTION_ITEM_TEMPLATE = document.createElement('template')

SUGGESTION_ITEM_TEMPLATE.innerHTML = `
  <span part="label">
    <slot name="label"></slot>
  </span>
  <span part="title">
    <slot name="title"></slot>
  </span>
  <span part="domain">
    <slot name="domain"></slot>
  </span>
`

class SuggestionItem extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({
      mode: 'open'
    })

    this.shadowRoot.append(
      SUGGESTION_ITEM_TEMPLATE.content.cloneNode(true)
    )

    this.slotElements = this.shadowRoot.querySelectorAll('slot')
  }

  connectedCallback() {
    for (const slotElement of this.slotElements) {
      for (const slottedElement of slotElement.assignedElements()) {
        slottedElement.remove()
      }
    }

    const labelElement = document.createElement('span')
    labelElement.slot = 'label'
    labelElement.textContent = this.dataset.label

    const titleElement = document.createElement('span')
    titleElement.slot = 'title'
    titleElement.textContent = this.dataset.title

    const domainElement = document.createElement('span')
    domainElement.slot = 'domain'
    domainElement.textContent = this.dataset.domain

    this.append(labelElement, ' ', titleElement, ' ', domainElement)
  }
}

customElements.define('suggestion-item', SuggestionItem)

// string_matcher.js -----------------------------------------------------------

const segmenter = new Intl.Segmenter([], {
  granularity: 'word'
})

class StringMatcher {
  constructor(query) {
    this.queryList = tokenize(query)
  }

  matches(string) {
    const stringList = tokenize(string)
    return this.queryList.every((query) =>
      stringList.some((string) =>
        string.startsWith(query)
      )
    )
  }
}

function normalize(string) {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

function tokenize(string) {
  return Array
    .from(
      segmenter.segment(
        normalize(string).toLowerCase()
      )
    )
    .filter((segment) =>
      segment.isWordLike
    )
    .map((segment) =>
      segment.segment
    )
}

// input_handler.js ------------------------------------------------------------

class InputHandler {
  actions = new Map
  keymap = new Keymap

  constructor(eventTarget) {
    this.eventTarget = eventTarget
  }

  start() {
    this.eventTarget.addEventListener(
      'keydown',
      this.onKeyDown.bind(this)
    )
  }

  onKeyDown(keyboardEvent) {
    if (this.keymap.has(keyboardEvent)) {
      const actionName = this.keymap.get(keyboardEvent)
      if (this.actions.has(actionName)) {
        this.actions.get(actionName)(this.context)
      }
      suppressEvent(keyboardEvent)
    }
  }

  onStateSync({
    actions,
    shortcuts,
    context,
  }) {
    for (const { name, fun } of actions) {
      this.actions.set(name, fun)
    }
    for (const { key, command } of shortcuts) {
      this.keymap.set(key, command)
    }
    this.context = context
  }

  onCommand(commandName) {
    if (this.actions.has(commandName)) {
      this.actions.get(commandName)(this.context)
    }
  }
}

function suppressEvent(event) {
  event.preventDefault()
  event.stopImmediatePropagation()
}

// utils.js --------------------------------------------------------------------

function debounce(callback, delay) {
  let timeoutId
  return (...params) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...params)
    }, delay)
  }
}

function debounceAnimationFrame(callback) {
  let animationFrame
  return (...params) => {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = window.requestAnimationFrame(() => {
      callback(...params)
    })
  }
}

// main.js ---------------------------------------------------------------------

const INPUT_DEBOUNCE_DELAY = 50
const MAX_CANDIDATE_RESULTS = 25

const SuggestionType = {
  Huzounet: 'huzounet',
  Dofusbook: 'dofusbook',
}

const suggestionLabels = new Map([
  [SuggestionType.Huzounet, 'HUZOUNET'],
  [SuggestionType.Dofusbook, 'DOFUSBOOK'],
])

const commandPaletteElement = document.getElementById('command_palette')
const mainElement = commandPaletteElement.querySelector('main')
const paletteInputElement = document.getElementById('palette-input')
const paletteMenuElement = document.getElementById('palette-menu')
const menuElement = document.getElementById('menu-commands')
const menuItemElements = menuElement.getElementsByTagName('menu-item')

const scroller = new Scroller

const inputHandler = new InputHandler(
  window
)

inputHandler.onStateSync({
  actions: GLOBAL_ACTIONS,
  shortcuts: GLOBAL_BINDINGS,
  context: {
    commandPaletteElement,
  }
})

const paletteInputHandler = new InputHandler(
  paletteInputElement
)

paletteInputHandler.onStateSync({
  actions: PALETTE_ACTIONS,
  shortcuts: PALETTE_BINDINGS,
  context: {
    mainElement,
    menuElement,
    commandPaletteElement,
    paletteInputElement,
    paletteMenuElement,
  }
})

for (const menuItemElement of menuItemElements) {
  menuItemElement.addEventListener('click', () => {
    inputHandler.onCommand(
      menuItemElement.dataset.command
    )
    commandPaletteElement.hidePopover()
  })
}

for (const { key, command } of GLOBAL_BINDINGS) {
  const menuItemElement = menuElement.querySelector(`[data-command="${command}"]`)
  if (menuItemElement) {
    menuItemElement.addKeyboardShortcut(key)
  }
}

function onFocus(focusEvent) {
  onSuggestionSync(HUZOUNET_SUGGESTIONS, suggestionLabels)
  onSuggestionSync(DOFUSBOOK_SUGGESTIONS, suggestionLabels)
}

function onInput(inputEvent) {
  const candidates = Array.from(menuItemElements, (menuItemElement, index) => ({
    id: index,
    string: menuItemElement.description
  }))
  updateMatches(inputEvent.target.value, candidates, menuItemElements)
}

function updateMatches(query, candidates, elements) {
  if (query === '') {
    paletteMenuElement.setAttribute('hidden', '')
    paletteMenuElement.clearMenuItems()
  } else {
    const string_matcher = new StringMatcher(query)
    const filteredCandidates = candidates
      .filter((candidate) =>
        string_matcher.matches(candidate.string)
      )
      .slice(0, MAX_CANDIDATE_RESULTS)
    if (filteredCandidates.length > 0) {
      const menuItemElements = filteredCandidates.map((candidate) => {
        const commandElement = elements[candidate.id]
        const menuItemElement = commandElement.cloneNode(true)
        menuItemElement.addEventListener('click', () => {
          commandElement.focus()
          commandElement.click()
        })
        return menuItemElement
      })
      menuItemElements[0].classList.add('active')
      paletteMenuElement.removeAttribute('hidden')
      paletteMenuElement.replaceMenuItems(menuItemElements)
    } else {
      const menuItemElement = document.createElement('menu-item')
      menuItemElement.setAttribute('disabled', '')
      menuItemElement.textContent = 'Aucun résultat trouvé'

      paletteMenuElement.removeAttribute('hidden')
      paletteMenuElement.replaceMenuItems([menuItemElement])
    }
  }
}

function onPointerOver(pointerEvent) {
  const menuItemElement = pointerEvent.target.closest('menu-item')
  if (
    menuItemElement &&
    !menuItemElement.classList.contains('active')
  ) {
    const activeMenuItemElement = paletteMenuElement.querySelector('menu-item.active')
    activeMenuItemElement.classList.remove('active')
    menuItemElement.classList.add('active')
  }
}

function onSuggestionSync(suggestions, suggestionLabels) {
  const menuItemElements = suggestions.map((suggestion) => {
    const menuItemElement = document.createElement('menu-item')
    const suggestionElement = document.createElement('suggestion-item')
    suggestionElement.dataset.label = suggestionLabels.get(suggestion.type)
    suggestionElement.dataset.title = suggestion.title
    suggestionElement.dataset.domain = suggestion.url
    menuItemElement.addEventListener('click', () => {
      onSuggestionActivated(suggestion)
    })
    menuItemElement.append(suggestionElement)
    return menuItemElement
  })
  menuElement.append(...menuItemElements)
}

function activateSuggestion(suggestion) {
  switch (suggestion.type) {
    case SuggestionType.Huzounet:
      window.location.assign(suggestion.url)
      break

    case SuggestionType.Dofusbook:
      window.open(suggestion.url)
      break

    default:
      console.error(
        'Activation not yet implemented for suggestions of type: "%s"',
        suggestion.type
      )
  }
}

function onSuggestionActivated(suggestion) {
  activateSuggestion(suggestion)
}

paletteInputElement.addEventListener('focus', onFocus, {
  once: true
})

paletteInputElement.addEventListener('input', debounce(
  onInput,
  INPUT_DEBOUNCE_DELAY
))

paletteMenuElement.addEventListener('pointerover', onPointerOver)

mainElement.addEventListener('scroll', debounceAnimationFrame(() => {
  mainElement.dataset.scrollTop = mainElement.scrollTop
}))

mainElement.dataset.scrollTop = 0

inputHandler.start()
paletteInputHandler.start()
