document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
    updateTideGauge();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Tide gauge (signature scroll indicator) ---------- */
  const tideWater = document.getElementById('tideWater');
  function updateTideGauge() {
    const doc = document.documentElement;
    const scrolled = window.scrollY;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? Math.min(100, (scrolled / max) * 100) : 0;
    if (tideWater) tideWater.style.height = pct + '%';
  }

  /* ---------- Mobile nav drawer ---------- */
  const burger = document.getElementById('menuBurger');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll cue ---------- */
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Ambient ocean sound toggle ---------- */
  const soundToggle = document.getElementById('soundToggle');
  const oceanAudio = document.getElementById('oceanAudio');
  soundToggle.addEventListener('click', () => {
    const isOn = soundToggle.getAttribute('aria-pressed') === 'true';
    if (!isOn) {
      oceanAudio.volume = 0.35;
      oceanAudio.play().catch(() => {
        /* Audio file missing or blocked — fail silently.
           Add assets/ocean-waves.mp3 to enable ambience. */
      });
      soundToggle.setAttribute('aria-pressed', 'true');
    } else {
      oceanAudio.pause();
      soundToggle.setAttribute('aria-pressed', 'false');
    }
  });

  /* ---------- Interactive menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('is-active');
    });
  });

});

















/* ---------- Make Menu Items Clickable with High-Res Online Images ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Target menu items, but exclude feature headers so tab clicks work correctly
  const menuItems = document.querySelectorAll('.menu-list li, .card--special');

  const exactDrinkImages = {
    // Special Hot Drinks
    "classic spanish latte": "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop",
    "moana pecan latte": "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
    "salted caramel latte": "https://images.unsplash.com/photo-1599390053950-89bc4415fa9d?q=80&w=800&auto=format&fit=crop",
    "mocha dark chocolate": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    "white chocolate mocha": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    "turkish coffee double": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    "nutella hot chocolate": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=800&auto=format&fit=crop",
    "french vanilla coffee": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",

    // Espresso & Classics
    "espresso single": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop",
    "espresso double": "https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop",
    "macchiato": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop",
    "americano": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    "cortado": "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop",
    "cappuccino": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop",
    "flat white": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop",
    "caffè latte": "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop",

    // Filter & Manual Brew
    "v60 drip coffee": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    "chemex brew": "https://images.unsplash.com/photo-1517668808822-9e428824603b?q=80&w=800&auto=format&fit=crop",

    // Iced Coffee & Cold Brew
    "iced spanish latte": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    "iced pecan latte": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
    "iced pistachio latte": "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=800&auto=format&fit=crop",

    // Matcha & Refreshers
    "iced matcha latte": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop",
    "blue lagoon mojito": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",

    // Desserts
    "belgian chocolate waffle": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=800&auto=format&fit=crop"
  };

  function getDrinkOnlineImage(name) {
    if (!name) return 'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=800&auto=format&fit=crop';
    const cleanName = name.toLowerCase().trim();

    if (exactDrinkImages[cleanName]) {
      return exactDrinkImages[cleanName];
    }

    if (cleanName.includes('pecan')) return 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('spanish')) return 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('pistachio')) return 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('matcha')) return 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('v60') || cleanName.includes('drip')) return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('iced') || cleanName.includes('cold brew')) return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('espresso') || cleanName.includes('cortado') || cleanName.includes('macchiato')) return 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('waffle') || cleanName.includes('cake')) return 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=800&auto=format&fit=crop';
    if (cleanName.includes('mojito') || cleanName.includes('soda') || cleanName.includes('juice')) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop';

    return 'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=800&auto=format&fit=crop';
  }

  menuItems.forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      let name = '', price = '', desc = '';

      if (item.classList.contains('card--special')) {
        name = item.querySelector('h3')?.innerText || item.querySelector('.h3')?.innerText || '';
        price = item.querySelector('.price')?.innerText || '';
        desc = item.querySelector('p')?.innerText || '';
      } else {
        name = item.querySelector('.li-row span')?.innerText || item.querySelector('span')?.innerText || '';
        price = item.querySelector('.li-row b')?.innerText || item.querySelector('b')?.innerText || '';
        desc = item.querySelector('.desc')?.innerText || '';
      }

      const drinkImgUrl = getDrinkOnlineImage(name);

      const queryParams = new URLSearchParams({
        name: name.trim(),
        price: price.trim(),
        desc: desc.trim(),
        img: drinkImgUrl
      });

      window.location.href = `drink.html?${queryParams.toString()}`;
    });
  });
});










































/* ---------- Interactive menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active state from all tabs and hide all panels
      tabs.forEach(t => { 
        t.classList.remove('is-active'); 
        t.setAttribute('aria-selected', 'false'); 
      });
      panels.forEach(p => p.classList.remove('is-active'));

      // Activate clicked tab
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Show targeted panel matching data-tab attribute
      const targetPanelId = 'panel-' + tab.dataset.tab;
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
      }
    });
  });


