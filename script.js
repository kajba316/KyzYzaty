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
  blessingText: "Тойымыздун кадырлуу конагы болуңуздар!",

  // ISO formatted datetime — countdown, calendar highlight, hero date ушундан эсептелет
  eventDateISO: "2026-09-12T18:00:00",
  eventDateShort: "12.09.2026",
  eventDateDisplay: "2026-жылы сентябрь айынын 12и",
  eventTimeDisplay: "18:00",

  venueCity: "Бишкек шаары",
  venueStreet: "Манас проспектиси, 40",
  venueHall: "\u201CАк Үй\u201D банкет залы",
  mapQuery: "Манас проспектиси 40, Бишкек",

  phoneDisplay: "+996 700 00 00 00",
  phoneWhatsapp: "996700000000",
  instagram: "@kyz.uzatuu.invite",

  photos: {
    hero: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    mid:  "https://images.pexels.com/photos/33425290/pexels-photo-33425290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    bottom: "https://images.pexels.com/photos/27697807/pexels-photo-27697807.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
      "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
      "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
      "https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
      "https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg?auto=compress&cs=tinysrgb&h=500&w=500"
    ]
  },

  monthNamesKY: ["ЖАНУАР","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ","СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ"],
  dowNamesKY: ["Жк","Дш","Шш","Шр","Бш","Жм","Иш"] // Sun..Sat short (Кыргызча)
};

function qs(sel){ return document.querySelector(sel); }

/* ------------------------------------------------------------
   1. Populate DOM from CONFIG
------------------------------------------------------------- */
function populateContent(){
  document.title = `Той Чакыруу — ${CONFIG.groomName} & ${CONFIG.brideName}`;

  qs("#sealMono").textContent = CONFIG.monogram;

  qs("#heroImg").src = CONFIG.photos.hero;
  qs("#heroNames").innerHTML = `${CONFIG.groomName} &amp; ${CONFIG.brideName}`;
  qs("#heroType").textContent = CONFIG.eventType;
  qs("#heroDate").textContent = CONFIG.eventDateShort;

  qs("#greetingLines").innerHTML = CONFIG.greetingLines.map(l=>`<span class="gline">${l}</span>`).join("");
  qs("#greetingName").textContent = CONFIG.greetingName;
  qs("#greetingBody").textContent = CONFIG.greetingBody;
  qs("#blessingText").innerHTML = CONFIG.blessingText.replace(/\n/g,"<br/>");

  qs("#midImg").src = CONFIG.photos.mid;
  qs("#bottomImg").src = CONFIG.photos.bottom;

  qs("#calendarSub").textContent = `${CONFIG.eventDateDisplay} · саат ${CONFIG.eventTimeDisplay}`;

  qs("#venueCity").textContent = CONFIG.venueCity;
  qs("#venueStreet").textContent = CONFIG.venueStreet;
  qs("#venueHall").textContent = CONFIG.venueHall;
  qs("#hostsNames").textContent = `${CONFIG.groomName} — ${CONFIG.brideName}`;

  const mapQ = encodeURIComponent(CONFIG.mapQuery);
  qs("#mapLink").href = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
  qs("#mapFrame").src = `https://maps.google.com/maps?q=${mapQ}&z=15&output=embed`;

  qs("#contactPhoneLink").textContent = CONFIG.phoneDisplay;
  qs("#contactPhoneLink").href = `tel:${CONFIG.phoneDisplay.replace(/\s+/g,"")}`;
  qs("#contactInstagram").textContent = CONFIG.instagram;
  qs("#contactInstagram").href = `https://instagram.com/${CONFIG.instagram.replace("@","")}`;
  qs("#waLink").href = `https://wa.me/${CONFIG.phoneWhatsapp}`;
  qs("#contactPhoneIcon").href = `tel:${CONFIG.phoneDisplay.replace(/\s+/g,"")}`;

  const rsvpMsg = encodeURIComponent(
    `Ассалоому алейкум! Мен ${CONFIG.groomName} менен ${CONFIG.brideName} эжейдин "${CONFIG.eventType}" тоюна баруумду ырастагым келет.`
  );
  qs("#rsvpBtn").href = `https://wa.me/${CONFIG.phoneWhatsapp}?text=${rsvpMsg}`;

  // gallery
  const gal = qs("#galleryGrid");
  gal.innerHTML = "";
  CONFIG.photos.gallery.forEach((src,i)=>{
    const div = document.createElement("div");
    div.className = "gallery-item reveal";
    div.innerHTML = `<img src="${src}" alt="Той сүрөтү ${i+1}" loading="lazy"/>`;
    div.addEventListener("click", ()=>openLightbox(src));
    gal.appendChild(div);
  });
}

/* ------------------------------------------------------------
   2. Ambient falling petals
------------------------------------------------------------- */
function spawnPetals(container, count){
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
   3. Intro screen open interaction (tap emblem -> fade into card)
------------------------------------------------------------- */
function initEnvelope(){
  const seal = qs("#waxSeal");
  const envWrap = qs("#envelopeWrap");
  const envScreen = qs("#envelopeScreen");
  const mainInv = qs("#mainInvitation");
  const flash = qs("#lightBurst");

  seal.addEventListener("click", ()=>{
    if(seal.classList.contains("cracked")) return;
    seal.classList.add("cracked");
    tryPlayMusic();

    setTimeout(()=>{
      envWrap.classList.add("opening");
      flash.classList.add("flash");
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
   5. Calendar grid (highlights event day, dotted ring like the video)
------------------------------------------------------------- */
function initCalendar(){
  const date = new Date(CONFIG.eventDateISO);
  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();

  const grid = qs("#calendarGrid");
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
   6. Gallery lightbox
------------------------------------------------------------- */
function initLightbox(){
  qs("#lightboxClose").addEventListener("click", closeLightbox);
  qs("#lightboxOverlay").addEventListener("click", (e)=>{
    if(e.target.id === "lightboxOverlay") closeLightbox();
  });
}
function openLightbox(src){
  qs("#lightboxImg").src = src;
  qs("#lightboxOverlay").classList.add("open");
}
function closeLightbox(){
  qs("#lightboxOverlay").classList.remove("open");
}

/* ------------------------------------------------------------
   7. Scroll reveal — ornaments & sections fade+rise into view
------------------------------------------------------------- */
function initScrollReveal(){
  const items = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold:.15 });
  items.forEach(i=>io.observe(i));
}

/* ------------------------------------------------------------
   8. Background music toggle
   Place your own royalty-free track at ./music/background.mp3
------------------------------------------------------------- */
function tryPlayMusic(){
  qs("#bgAudio").play().catch(()=>{ /* autoplay may be blocked until user gesture — button still works */ });
}
function initMusicToggle(){
  const audio = qs("#bgAudio");
  qs("#musicBtnFloat").addEventListener("click", ()=>{
    if(audio.paused){ audio.play().catch(()=>{}); } else { audio.pause(); }
  });
  audio.addEventListener("play", updateMusicIcon);
  audio.addEventListener("pause", updateMusicIcon);
  audio.addEventListener("error", updateMusicIcon);
  updateMusicIcon();
}
function updateMusicIcon(){
  qs("#musicBtnFloat").classList.toggle("muted", qs("#bgAudio").paused);
}

/* ------------------------------------------------------------
   INIT
------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  populateContent();
  spawnPetals(qs("#petalsLayer"), 16);
  initEnvelope();
  initCountdown();
  initCalendar();
  initLightbox();
  initMusicToggle();
});