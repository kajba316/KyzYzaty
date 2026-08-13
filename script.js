/* ============================================================
   ТОЙ ЧАКЫРУУ — script.js
   Бардык маалыматты (аты-жөнү, күн, дарек ж.б.) ушул жерден
   өзгөртсөңүз болот — CONFIG объектисин караңыз.
============================================================ */

const CONFIG = {
  eventType: "Кыз Узатуу",
  groomName: "Талант",
  brideName: "Гүлайна",
  monogram: "Т&Г",

  greetingLines: [
    "Кымбатуу туугандар, бөлөктөр,",
    "куда-жекендер, нанасы-женесиндер,",
    "байкелер-эжелер, достор,",
    "жоро-курбулар, жилинтөктөр!"
  ],
  greetingName: "Сүйгөнүм Гүлайнамдын",
  greetingBody: "Кыз узатуу тоюна арналган ак дасторконубуздун кадырлуу конагы болууга чакырабыз!",
  blessingText: "Тойубуздун кадырлуу коногу болуңуздар!",

  eventDateISO: "2026-09-12T18:00:00",
  eventDateShort: "12.09.2026",
  eventDateDisplay: "2026-жылы сентябрь айынын 12и",
  eventTimeDisplay: "18:00",

  venueCity: "Бишкек шаары",
  venueStreet: "Манас проспектиси, 40",
  venueHall: "\u201CАк Үй\u201D банкет залы",

  dowNamesKY: ["Жк","Дш","Шш","Шр","Бш","Жм","Иш"] // Sun..Sat (Кыргызча)
};

function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

/* ------------------------------------------------------------
   1. Populate DOM from CONFIG
------------------------------------------------------------- */
function populateContent(){
  document.title = `Той Чакыруу — ${CONFIG.groomName} & ${CONFIG.brideName}`;

  qs("#sealMono").textContent = CONFIG.monogram;

  qs("#heroNames").innerHTML = `${CONFIG.groomName} &amp; ${CONFIG.brideName}`;
  qs("#heroType").textContent = CONFIG.eventType;
  qs("#heroDate").textContent = CONFIG.eventDateShort;

  qs("#greetingLines").innerHTML = CONFIG.greetingLines.map(l=>`<span class="gline">${l}</span>`).join("");
  qs("#greetingName").textContent = CONFIG.greetingName;
  qs("#greetingBody").textContent = CONFIG.greetingBody;
  qs("#blessingText").innerHTML = CONFIG.blessingText.replace(/\n/g,"<br/>");

  qs("#calendarSub").textContent = `${CONFIG.eventDateDisplay} · саат ${CONFIG.eventTimeDisplay}`;

  qs("#venueCity").textContent = CONFIG.venueCity;
  qs("#venueStreet").textContent = CONFIG.venueStreet;
  qs("#venueHall").textContent = CONFIG.venueHall;
  qs("#hostsNames").textContent = `${CONFIG.groomName} — ${CONFIG.brideName}`;
}

/* ------------------------------------------------------------
   2. Ambient falling petals
------------------------------------------------------------- */
function spawnPetals(container, count){
  if(!container) return;
  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.className = "petal";
    const size = 6 + Math.random()*8;
    p.style.left = Math.random()*100 + "%";
    p.style.setProperty("--drift", (Math.random()*60-30)+"px");
    p.style.animationDuration = (9 + Math.random()*10) + "s";
    p.style.animationDelay = (Math.random()*10) + "s";
    p.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 10 10">
      <path d="M5,0 C7,2 10,3 5,10 C0,3 3,2 5,0Z" fill="${Math.random()>.5 ? '#bea893' : '#7a5419'}" opacity="${(0.35+Math.random()*0.45).toFixed(2)}"/>
    </svg>`;
    container.appendChild(p);
  }
}

/* ------------------------------------------------------------
   3. Intro screen open interaction
------------------------------------------------------------- */
function initEnvelope(){
  const seal = qs("#waxSeal");
  const envWrap = qs("#envelopeWrap");
  const envScreen = qs("#envelopeScreen");
  const mainInv = qs("#mainInvitation");
  const flash = qs("#lightBurst");
  if(!seal || !envWrap || !envScreen || !mainInv) return;

  seal.addEventListener("click", ()=>{
    if(seal.classList.contains("cracked")) return;
    seal.classList.add("cracked");

    try{ tryPlayMusic(); }catch(e){ /* ignore */ }

    setTimeout(()=>{
      envWrap.classList.add("opening");
      if(flash) flash.classList.add("flash");
    }, 260);

    setTimeout(()=>{
      envScreen.classList.add("closing");
    }, 560);

    setTimeout(()=>{
      envScreen.classList.add("hidden");
      mainInv.classList.remove("hidden");
      requestAnimationFrame(()=>mainInv.classList.add("show"));
      initScrollReveal();
      setTimeout(()=>{ const ht = qs(".hero-text"); if(ht) ht.classList.add("in"); }, 250);
    }, 1350);
  });
}

/* ------------------------------------------------------------
   4. Countdown timer
------------------------------------------------------------- */
function initCountdown(){
  const target = new Date(CONFIG.eventDateISO).getTime();
  const els = { d: qs("#cdDays"), h: qs("#cdHours"), m: qs("#cdMin"), s: qs("#cdSec") };
  if(!els.d || !els.h || !els.m || !els.s) return;
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const day = Math.floor(diff/86400000); diff -= day*86400000;
    const hr  = Math.floor(diff/3600000); diff -= hr*3600000;
    const min = Math.floor(diff/60000); diff -= min*60000;
    const sec = Math.floor(diff/1000);
    els.d.textContent = String(day).padStart(2,"0");
    els.h.textContent = String(hr).padStart(2,"0");
    els.m.textContent = String(min).padStart(2,"0");
    els.s.textContent = String(sec).padStart(2,"0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ------------------------------------------------------------
   5. Calendar grid
------------------------------------------------------------- */
function initCalendar(){
  const date = new Date(CONFIG.eventDateISO);
  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();

  const grid = qs("#calendarGrid");
  if(!grid) return;
  grid.innerHTML = "";
  CONFIG.dowNamesKY.forEach(d=>{
    const el = document.createElement("div");
    el.className = "cal-dow";
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  for(let i=0;i<firstDow;i++){
    const el = document.createElement("div");
    el.className = "cal-day empty";
    grid.appendChild(el);
  }
  for(let day=1; day<=daysInMonth; day++){
    const el = document.createElement("div");
    el.className = "cal-day" + (day===eventDay ? " is-event" : "");
    el.textContent = day;
    grid.appendChild(el);
  }
}

/* ------------------------------------------------------------
   6. Photo carousel — лента бегает сама по себе (чистый CSS,
      animation: carousel-scroll). Тут только пауза по тапу,
      чтобы на телефоне можно было спокойно рассмотреть фото.
------------------------------------------------------------- */
function initPhotoCarousel(){
  const viewport = qs(".photo-carousel-viewport");
  if(!viewport) return;
  viewport.addEventListener("touchstart", ()=>viewport.classList.add("paused"), { passive:true });
  viewport.addEventListener("touchend", ()=>{
    setTimeout(()=>viewport.classList.remove("paused"), 1200);
  }, { passive:true });
}

/* ------------------------------------------------------------
   7. Scroll reveal
------------------------------------------------------------- */
function initScrollReveal(){
  const items = qsa(".reveal:not(.in)");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold:.15 });
  items.forEach(i=>io.observe(i));
}

/* ------------------------------------------------------------
   8. Background music toggle
------------------------------------------------------------- */
function tryPlayMusic(){
  try{
    const audio = qs("#bgAudio");
    if(!audio) return;
    const p = audio.play();
    if(p && typeof p.catch === "function") p.catch(()=>{ /* autoplay blocked or no file yet — ignore */ });
  }catch(e){ /* ignore */ }
}
function initMusicToggle(){
  const audio = qs("#bgAudio");
  const btn = qs("#musicBtnFloat");
  if(!audio || !btn) return;
  btn.addEventListener("click", ()=>{
    if(audio.paused){ audio.play().catch(()=>{}); } else { audio.pause(); }
  });
  audio.addEventListener("play", updateMusicIcon);
  audio.addEventListener("pause", updateMusicIcon);
  audio.addEventListener("error", updateMusicIcon);
  updateMusicIcon();
}
function updateMusicIcon(){
  const audio = qs("#bgAudio");
  const btn = qs("#musicBtnFloat");
  if(!audio || !btn) return;
  btn.classList.toggle("muted", audio.paused);
}

/* ------------------------------------------------------------
   INIT
------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  const steps = [
    populateContent,
    ()=>spawnPetals(qs("#petalsLayer"), 16),
    initEnvelope,
    initCalendar,
    initCountdown,
    initPhotoCarousel,
    initMusicToggle
  ];
  steps.forEach(fn=>{
    try{ fn(); }catch(e){ console.error("Init step failed:", fn.name, e); }
  });
});
// тест