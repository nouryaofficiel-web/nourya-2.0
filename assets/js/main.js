/* ═══════════════════════════════════════════════════════
   NOURYA — JavaScript principal
   ═══════════════════════════════════════════════════════ */

// ─── LOADER ───
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 1800);
});

// Curseur natif du système — pas de curseur custom

// ─── NAV & SCROLL PROGRESS ───
const $nav = document.getElementById('nav');
const $progress = document.getElementById('scroll-progress');

function onScroll() {
  // Nav solid
  $nav.classList.toggle('solid', scrollY > 40);

  // Barre de progression
  const scrolled = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  $progress.style.width = Math.min(scrolled, 100) + '%';

  // Nav links actifs
  updateActiveNav();

  // Parallax hero
  updateParallax();
}

window.addEventListener('scroll', onScroll, { passive: true });

// ─── ACTIVE NAV LINKS ───
const NAV_SECTIONS = ['accueil', 'boutique', 'coffrets', 'diy', 'rituels', 'ingredients', 'histoire'];

function updateActiveNav() {
  const y = scrollY + 100;
  NAV_SECTIONS.forEach(id => {
    const sec = document.getElementById(id);
    const link = document.querySelector(`.nlinks a[href="#${id}"]`);
    if (!sec || !link) return;
    const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
    link.classList.toggle('active', active);
  });
}

// ─── PARALLAX HERO ───
function updateParallax() {
  if (scrollY >= window.innerHeight) return;
  const y = scrollY;
  const glow = document.querySelector('.hero-glow');
  const glowR = document.querySelector('.hero-glow-rose');
  const bigN = document.querySelector('.hero-big-n');
  if (glow) glow.style.transform = `translate(-50%, calc(-50% + ${y * 0.12}px))`;
  if (glowR) glowR.style.transform = `translateY(${y * 0.08}px)`;
  if (bigN) bigN.style.transform = `translate(-50%, calc(-50% + ${y * 0.06}px))`;
}

// ─── BUBBLES ───
(()=>{
  const container = document.getElementById('bubbles');
  const colors = ['rgba(201,147,58,.06)','rgba(233,197,192,.08)','rgba(201,147,58,.04)','rgba(243,218,214,.06)'];
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 80 + 20;
    b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[i%4]};animation-duration:${12+Math.random()*18}s;animation-delay:${Math.random()*10}s;border-radius:50%;`;
    container.appendChild(b);
  }
})();

// ─── PETALS ───
(()=>{
  const f = document.getElementById('petal-field');
  const shapes = [
    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="7" rx="3.5" ry="6" fill="rgba(233,197,192,.55)"/></svg>`,
    `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="6" rx="3" ry="5.5" fill="rgba(243,218,214,.5)"/></svg>`,
    `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><ellipse cx="5" cy="5" rx="2.5" ry="4.5" fill="rgba(201,147,58,.3)"/></svg>`,
  ];
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.innerHTML = shapes[i % 3];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (14 + Math.random() * 18) + 's';
    p.style.animationDelay = (Math.random() * 14) + 's';
    p.style.transform = `scale(${0.5 + Math.random()})`;
    f.appendChild(p);
  }
})();

// ─── BAND ───
(()=>{
  const items = ['100% Naturel','Artisanal','Made in Algeria','Ingrédients tracés','Livraison 58 wilayas','Paiement à la livraison','Zéro parabène','Formulé pour vous'];
  const el = document.getElementById('band');
  const h = items.map(i => `<span class="band-item">${i}<span class="band-dot"></span></span>`).join('');
  el.innerHTML = h + h;
})();

// ─── IMAGE URLS ───
const IMGS = {
  serum_figue:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
  huile_nigelle:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
  huile_argan:'https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=600&q=80',
  masque_ghassoul:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  masque_miel:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
  masque_hibiscus:'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
  gommage:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  beurre_leaveIn:'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80',
  beurre_rose:'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
  serum_saffran:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
  savon_noir:'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&q=80',
  eau_oranger:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
  ghassoul_poudre:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
  ricin:'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  coffret_eclat:'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
  coffret_hammam:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  coffret_capillaire:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
  coffret_antiage:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
  diy1:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
  diy2:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
  diy3:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  ingr_figue:'https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=400&q=80',
  ingr_nigelle:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80',
  ingr_ghassoul:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
  ingr_oranger:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80',
  ingr_argan:'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
  ingr_safran:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
  ingr_karite:'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=80',
  ingr_hibiscus:'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
};

// ─── DONNÉES PRODUITS ───
const PRODUCTS = [
  {id:1,name:"Sérum Figue de Barbarie",ar:"زيت الهندية",cat:"visage",emoji:"🌵",
   formats:[{lbl:"30 ml",qty:"30 ml · Flacon compte-gouttes",price:1600},{lbl:"15 ml",qty:"15 ml · Mini format voyage",price:900}],
   badge:"Best-seller",btype:"",img:IMGS.serum_figue,
   peau:"Tous types · peaux matures",
   desc:"L'huile la plus rare que l'Algérie produise. Anti-âge, régénérante, lumineuse — sans compromis.",
   long:"Il faut près d'une tonne de figues de Barbarie pour extraire un seul litre de cette huile. Pressée à froid à partir des seules graines, elle détient la plus forte concentration en vitamine E de tout le règne végétal. Sur la peau, elle relance les mécanismes naturels de régénération cellulaire.",
   tags:["Anti-âge","Éclat","Régénérante"],
   benefits:["Concentration record en vitamine E, antioxydant contre le vieillissement","Atténue visiblement les ridules et prévient leur apparition","Stimule la production naturelle de collagène","Unifie le teint et estompe les taches pigmentaires","Pénètre sans film gras, convient aux peaux mixtes","Apaise les rougeurs et renforce la barrière cutanée"],
   usage:["Le soir, sur peau nettoyée et sèche, déposez 3 à 4 gouttes dans le creux de la main.","Réchauffez l'huile entre vos paumes quelques secondes pour libérer ses actifs.","Appliquez par pressions douces sur le visage, le cou et le contour des yeux.","Laissez pénétrer une minute avant de vous coucher. Cure de 4 semaines recommandée."],
   ingr:["Huile de pépins de figue de Barbarie 100%","Pressée à froid","Non raffinée"]},

  {id:2,name:"Huile Nigelle Anti-Chute",ar:"زيت الحبة السوداء",cat:"cheveux",emoji:"⚫",
   formats:[{lbl:"100 ml",qty:"100 ml · Flacon ambré",price:1500},{lbl:"50 ml",qty:"50 ml · Format découverte",price:850}],
   badge:"Nouveau",btype:"",img:IMGS.huile_nigelle,
   peau:"Cuir chevelu fragilisé · chute saisonnière",
   desc:"Citée dans les textes anciens, validée par la science. Pour des cheveux qui ont de la mémoire et des racines qui tiennent.",
   long:"La nigelle — habba sawda — accompagne les soins du Maghreb depuis des siècles. Sa richesse en thymoquinone en fait un actif puissant contre la chute et l'inflammation du cuir chevelu. Pressée à froid, dans sa forme la plus brute et la plus active.",
   tags:["Anti-chute","Repousse","Fortifiant"],
   benefits:["Freine la chute en renforçant l'ancrage du cheveu","Stimule les follicules endormis et favorise la repousse","Assainit le cuir chevelu, combat les pellicules","Apaise les démangeaisons et irritations","Redonne densité aux cheveux clairsemés","Efficace aussi sur les imperfections cutanées"],
   usage:["Versez directement sur le cuir chevelu, raie par raie.","Massez du bout des doigts 2 à 3 minutes, insistez sur les zones dégarnies.","Répartissez le reste sur les longueurs jusqu'aux pointes.","Laissez poser 1h minimum ou toute la nuit. Lavez avec un shampoing doux. 2 fois par semaine."],
   ingr:["Huile de nigelle 100% pure","Pressée à froid","Origine Jijel · Algérie"]},

  {id:3,name:"Huile d'Argan Pure",ar:"زيت الأركان",cat:"cheveux",emoji:"✦",
   formats:[{lbl:"50 ml",qty:"50 ml · Flacon doré",price:1400},{lbl:"100 ml",qty:"100 ml · Grand format",price:2400}],
   badge:null,btype:"",img:IMGS.huile_argan,
   peau:"Cheveux secs · pointes abîmées · multi-usage",
   desc:"L'huile de référence, pressée à froid, non torréfiée, sans additif. Cheveux, visage, ongles — une seule huile, une polyvalence rare.",
   long:"L'argan cosmétique pur pressé à froid, d'une couleur claire et d'une odeur discrète — signe de qualité. Ni coupée, ni torréfiée. Ce que vous voyez est ce que vous appliquez.",
   tags:["Multi-usage","Brillance","Nourrissant"],
   benefits:["Nourrit les cheveux secs, redonne la brillance","Répare les pointes fourchues, discipline les frisottis","Sur le visage : assouplit sans obstruer les pores","Renforce les ongles cassants","Riche en oméga 6, 9 et vitamine E","Pénètre rapidement, sans sensation grasse"],
   usage:["Cheveux : 2 à 3 gouttes sur longueurs et pointes, sans rincer.","Visage : 1 à 2 gouttes le soir en dernière étape, par tapotements.","Ongles : une goutte massée sur chaque cuticule, le soir.","Bain d'huile : généreusement avant shampoing, 30 min de pose."],
   ingr:["Huile d'argan cosmétique 100%","Pressée à froid, non torréfiée"]},

  {id:4,name:"Masque Ghassoul Curcuma",ar:"الغاسول والكركم",cat:"visage",emoji:"🟤",
   formats:[{lbl:"100 g",qty:"100 g · Pot en verre",price:900},{lbl:"200 g",qty:"200 g · Grand pot",price:1600}],
   badge:null,btype:"",img:IMGS.masque_ghassoul,
   peau:"Peaux mixtes à grasses · pores dilatés",
   desc:"L'argile millénaire du Maghreb relevée par le curcuma. Nettoie en profondeur et laisse une légèreté que rien d'autre ne reproduit.",
   long:"Le ghassoul est une argile lavante capable de capter le sébum sans décaper. Le curcuma, aux propriétés purifiantes et illuminatrices, remet la peau à zéro sans jamais la laisser tiraillée.",
   tags:["Pores resserrés","Purifiant","Éclat"],
   benefits:["Absorbe l'excès de sébum sans assécher","Resserre visiblement les pores dilatés","Le curcuma apaise et illumine","Désincruste les points noirs","Affine le grain de peau","Utilisable aussi en masque capillaire"],
   usage:["Dans un bol non métallique, mélangez une cuillère avec de l'eau tiède jusqu'à pâte onctueuse.","Appliquez sur visage propre, évitez le contour des yeux.","Laissez poser 10 minutes — pas davantage.","Rincez à l'eau tiède en massant doucement. Une fois par semaine."],
   ingr:["Ghassoul (argile saponifère du Maghreb)","Curcuma en poudre","100% naturel"]},

  {id:5,name:"Masque Miel & Argile Anti-Acné",ar:"قناع العسل والطين",cat:"visage",emoji:"🍯",
   formats:[{lbl:"100 g",qty:"100 g · Pot en verre",price:1100},{lbl:"200 g",qty:"200 g · Grand pot",price:1900}],
   badge:null,btype:"",img:IMGS.masque_miel,
   peau:"Peaux à imperfections · acnéiques",
   desc:"Miel de Jijel et argile réunis. Le premier cicatrise et nourrit, la seconde purifie. Contre l'acné sans agresser.",
   long:"Contre l'acné, assécher la peau irrite et aggrave le problème. Le miel de Jijel antibactérien calme l'inflammation pendant que l'argile absorbe le sébum. Doux mais efficace dans la durée.",
   tags:["Anti-acné","Cicatrisant","Apaisant"],
   benefits:["Miel de Jijel antibactérien naturel sur les boutons","Réduit inflammations et rougeurs","Favorise la cicatrisation, estompe les marques","Absorbe le sébum sans décaper","Nourrit sans assécher, évite l'effet rebond","Rééquilibre les peaux mixtes"],
   usage:["Appliquez une couche généreuse sur peau propre.","Laissez poser 15 minutes.","Rincez à l'eau tiède par mouvements circulaires doux.","2 fois par semaine en cure, une fois en entretien."],
   ingr:["Miel de Jijel brut","Argile (ghassoul)","Sans conservateur ajouté"]},

  {id:6,name:"Masque Capillaire Ghassoul-Hibiscus",ar:"قناع الكركديه",cat:"cheveux",emoji:"🌺",
   formats:[{lbl:"200 g",qty:"200 g · Pot en verre",price:1100},{lbl:"400 g",qty:"400 g · Pot familial",price:1900}],
   badge:null,btype:"",img:IMGS.masque_hibiscus,
   peau:"Cheveux ternes · manquant de volume",
   desc:"Le lavant doux des cheveux du Maghreb, sublimé par l'hibiscus. Nettoie sans agresser, gaine la fibre, réveille la brillance.",
   long:"Avant les shampoings industriels, on lavait les cheveux au ghassoul. Cette argile nettoie par absorption. L'hibiscus — le botox capillaire — gaine la fibre et ravive les reflets.",
   tags:["Volume","Brillance","Lavant doux"],
   benefits:["Nettoie sans décaper ni dessécher","L'hibiscus gaine la fibre et apporte du corps","Ravive les reflets et la brillance naturelle","Volume aux cheveux fins et plats","Apaise les cuirs chevelus sensibles","Stimule la pousse en assainissant"],
   usage:["Mélangez 3 cuillères avec de l'eau tiède en crème épaisse.","Appliquez sur cheveux humides, massez la racine.","Laissez poser 10 à 15 minutes sous serviette chaude.","Rincez abondamment. 1 à 2 fois par semaine."],
   ingr:["Ghassoul du Maghreb","Poudre d'hibiscus","Sans sulfate ni silicone"]},

  {id:7,name:"Gommage Sucre & Argan",ar:"مقشر السكر والأركان",cat:"corps",emoji:"🌿",
   formats:[{lbl:"200 g",qty:"200 g · Pot en verre",price:1000},{lbl:"400 g",qty:"400 g · Grand format",price:1700}],
   badge:null,btype:"",img:IMGS.gommage,
   peau:"Tous types · peau rugueuse ou terne",
   desc:"Le hammam condensé en un geste. Le sucre roux exfolie, l'argan nourrit, le miel scelle. La peau après n'a besoin de rien d'autre.",
   long:"Le sucre roux aux grains arrondis élimine les cellules mortes sans micro-rayures. Pendant qu'il travaille, l'argan et le miel nourrissent déjà la peau neuve qui apparaît.",
   tags:["Exfoliant","Nourrit","Peau satinée"],
   benefits:["Élimine les cellules mortes sans agresser","Grains de sucre roux — polis sans micro-rayer","L'argan nourrit pendant l'exfoliation","Active la microcirculation pour une peau tonique","Prépare la peau à mieux absorber les soins","Idéal avant épilation contre les poils incarnés"],
   usage:["Sur peau humide sous la douche, prélevez une noix de gommage.","Massez en mouvements circulaires, insistez sur coudes, genoux, talons.","Évitez le visage.","Rincez à l'eau tiède. 1 à 2 fois par semaine."],
   ingr:["Sucre roux","Huile d'argan","Miel de Jijel","Huiles essentielles naturelles"]},

  {id:8,name:"Beurre Leave-In Karité",ar:"زبدة الكاريتيه",cat:"cheveux",emoji:"💛",
   formats:[{lbl:"100 g",qty:"100 g · Pot en verre",price:1400},{lbl:"200 g",qty:"200 g · Grand format",price:2500}],
   badge:null,btype:"",img:IMGS.beurre_leaveIn,
   peau:"Cheveux secs, bouclés, crépus",
   desc:"Pour les cheveux qui ont soif. Karité brut fouetté avec l'argan. Texture aérienne, sans rinçage, hydratation longue durée.",
   long:"Ce beurre sans rinçage, fouetté pour une texture légère, scelle l'hydratation au cœur de la fibre. Le karité brut nourrit, l'argan assouplit, la boucle retrouve sa définition.",
   tags:["Leave-in","Hydratation durable","Définition boucles"],
   benefits:["Hydrate intensément les cheveux secs","Définit les boucles, discipline les frisottis","Texture fouettée légère qui n'alourdit pas","Le karité brut répare les fibres abîmées","Protège des agressions extérieures","Sublime aussi coudes, talons, mains très sèches"],
   usage:["Sur cheveux humides après lavage, prélevez une noisette.","Émulsionnez entre les paumes, appliquez sur longueurs et pointes.","Froissez les boucles vers le haut pour les définir.","Ne pas rincer. Réappliquez entre deux lavages si besoin."],
   ingr:["Beurre de karité brut","Huile d'argan","Sans rinçage"]},

  {id:9,name:"Beurre Corps Karité-Rose",ar:"زبدة الورد",cat:"corps",emoji:"🌹",
   formats:[{lbl:"200 g",qty:"200 g · Pot en verre",price:1500},{lbl:"400 g",qty:"400 g · Grand format",price:2700}],
   badge:null,btype:"rose",img:IMGS.beurre_rose,
   peau:"Peaux sèches · femmes enceintes",
   desc:"Karité brut, figue de Barbarie, pétales de rose séchés. Texture fouettée qui fond à la chaleur de la peau.",
   long:"Le karité nourrit, la figue de Barbarie améliore l'élasticité, les pétales de rose séchés déposent un parfum naturel délicat. Fond instantanément, sans film collant.",
   tags:["Hydratation longue","Anti-vergetures","Parfum naturel"],
   benefits:["Nourrit intensément les peaux sèches","Améliore l'élasticité, prévient les vergetures","Idéal pour les femmes enceintes","La figue de Barbarie raffermit et tonifie","Parfum naturel de rose, sans fragrance synthétique","Fond à la chaleur, sans sensation grasse"],
   usage:["Sur peau propre et sèche après la douche, prélevez une noix.","Réchauffez entre vos mains.","Massez en mouvements circulaires jusqu'à pénétration complète.","Futures mamans : appliquez matin et soir sur le ventre et les hanches dès le début de grossesse."],
   ingr:["Beurre de karité brut","Huile de figue de Barbarie","Pétales de rose séchés"]},

  {id:10,name:"Sérum Nuit Saffron Glow",ar:"سيروم الزعفران",cat:"visage",emoji:"🏵️",
   formats:[{lbl:"20 ml",qty:"20 ml · Flacon compte-gouttes",price:2200},{lbl:"10 ml",qty:"10 ml · Mini découverte",price:1200}],
   badge:"Premium",btype:"",img:IMGS.serum_saffran,
   peau:"Teint terne · taches · signes de fatigue",
   desc:"Safran algérien infusé 24h dans l'huile de rose musquée. Au réveil : un teint qui n'a pas besoin d'explication.",
   long:"Le safran est l'une des épices les plus actives en cosmétique. Ses caroténoïdes unifient le teint et combattent les taches. Infusé 24h dans l'huile de rose musquée, il compose un sérum de nuit d'exception.",
   tags:["Anti-taches","Éclat doré","Nocturne"],
   benefits:["Le safran unifie et estompe les taches pigmentaires","La rose musquée régénère pendant le sommeil","Efface les signes de fatigue au réveil","Lisse le grain de peau, atténue les ridules","Antioxydant puissant contre le vieillissement","Apporte une luminosité naturelle, l'effet glow"],
   usage:["Le soir uniquement (le safran réagit à la lumière).","2 à 3 gouttes dans la paume.","Appliquez sur visage et cou par pressions douces.","Laissez agir toute la nuit. 4 à 5 applications par semaine. Résultats visibles après 3 semaines."],
   ingr:["Safran algérien (Tipaza)","Huile de rose musquée","Huile de figue de Barbarie"]},

  {id:11,name:"Savon Noir Beldi",ar:"الصابون البلدي",cat:"corps",emoji:"⚫",
   formats:[{lbl:"200 g",qty:"200 g · Pot en verre",price:800},{lbl:"500 g",qty:"500 g · Grand format",price:1700}],
   badge:null,btype:"",img:IMGS.savon_noir,
   peau:"Tous types · rituel hammam",
   desc:"Le point de départ de tout hammam digne de ce nom. Une pâte d'olives noires qui ouvre les pores et prépare la peau au gommage.",
   long:"Le savon noir est une pâte végétale à base d'olives noires. Dans la chaleur, il ramollit les cellules mortes et ouvre les pores. Le geste fondateur du rituel hammam.",
   tags:["Hammam","Prépare la peau","Adoucissant"],
   benefits:["Ouvre les pores et ramollit les cellules mortes","Nettoie en profondeur sans dessécher","Riche en vitamine E grâce à l'huile d'olive","Adoucit et assouplit dès la première utilisation","Sans parfum de synthèse, convient aux peaux sensibles","La base authentique du rituel hammam algérien"],
   usage:["Sur peau humide dans la chaleur du bain, appliquez sur tout le corps.","Laissez poser 5 à 10 minutes.","Ne pas laisser sécher complètement.","Rincez puis exfoliez avec un gant kassa. Une fois par semaine."],
   ingr:["Olives noires","Huile d'olive","Potasse végétale"]},

  {id:12,name:"Eau de Fleur d'Oranger",ar:"ماء الزهر",cat:"visage",emoji:"🌸",
   formats:[{lbl:"200 ml",qty:"200 ml · Spray en verre",price:700},{lbl:"100 ml",qty:"100 ml · Format voyage",price:400}],
   badge:null,btype:"rose",img:IMGS.eau_oranger,
   peau:"Tous types · peaux sensibles",
   desc:"Distillée au printemps quand les orangers de Blida sont en pleine floraison. Tonique, apaisante, légèrement astringente.",
   long:"Distillée à la vapeur à Blida au moment exact de la floraison. Un hydrolat polyvalent : tonique, brume rafraîchissante, et un parfum qui appartient à la mémoire collective algérienne.",
   tags:["Tonique","Apaisant","Rafraîchissant"],
   benefits:["Tonifie et resserre légèrement les pores","Apaise les rougeurs et l'inconfort","Rafraîchit instantanément par forte chaleur","Prépare la peau à mieux absorber les soins","Fixe le maquillage en brume finale","Parfum naturel de néroli, sans alcool ajouté"],
   usage:["Après nettoyage, vaporisez à 20 cm du visage, yeux fermés.","Tapotez pour faire pénétrer, ou laissez sécher à l'air.","Avant le sérum : prépare et hydrate pour une meilleure absorption.","En journée : rafraîchit même sur maquillage."],
   ingr:["Hydrolat de fleur d'oranger (néroli)","Distillé à la vapeur","100% pur, sans alcool"]},

  {id:13,name:"Ghassoul Premium en Poudre",ar:"الغاسول",cat:"corps",emoji:"🪨",
   formats:[{lbl:"200 g",qty:"200 g · Sachet kraft",price:600},{lbl:"500 g",qty:"500 g · Grand sachet",price:1300}],
   badge:null,btype:"",img:IMGS.ghassoul_poudre,
   peau:"Visage · cheveux · corps · multi-usage",
   desc:"L'argile brute du Moyen Atlas dans sa forme la plus pure. Un produit, trois usages : visage, cheveux, corps.",
   long:"Le ghassoul est une argile unique du Moyen Atlas. Elle lave par absorption, sans tensioactif. Vendue en poudre pure sans aucun ajout, elle se module selon vos besoins.",
   tags:["Multi-usage","Purifiant","Économique"],
   benefits:["Lave peau et cheveux sans détergent","Absorbe l'excès de sébum en douceur","Resserre les pores et affine le grain","Apporte volume et brillance aux cheveux","100% naturel, modulable selon l'usage","Un seul produit pour visage, cheveux et corps"],
   usage:["Visage : 1 cuillère avec eau ou hydrolat, 10 min, rincez.","Cheveux : 3 cuillères en pâte crémeuse, remplace le shampoing.","Corps : cataplasme sur zones à purifier.","Toujours un récipient non métallique."],
   ingr:["Ghassoul (Rhassoul) 100% pur","Argile du Moyen Atlas","Aucun additif"]},

  {id:14,name:"Huile de Ricin Fortifiante",ar:"زيت الخروع",cat:"cheveux",emoji:"💧",
   formats:[{lbl:"100 ml",qty:"100 ml · Flacon ambré",price:900},{lbl:"50 ml",qty:"50 ml · Format découverte",price:500}],
   badge:null,btype:"",img:IMGS.ricin,
   peau:"Cheveux · cils · sourcils · ongles",
   desc:"L'huile que nos grand-mères gardaient précieusement. Épaisse, riche, redoutable pour épaissir cheveux, cils et sourcils.",
   long:"Riche en acide ricinoléique, elle stimule la circulation au niveau du bulbe. Sa texture épaisse en fait un soin intensif, souvent associé à des huiles plus fluides pour l'application.",
   tags:["Densifiant","Cils & sourcils","Fortifiant"],
   benefits:["Épaissit et densifie les cheveux clairsemés","Stimule la pousse des cils et sourcils","Fortifie la fibre capillaire, réduit la casse","Nourrit intensément les pointes sèches","Renforce les ongles cassants","Assainit et hydrate le cuir chevelu"],
   usage:["Cheveux : mélangez avec argan ou nigelle, massez, 1h de pose, lavez.","Cils et sourcils : le soir avec une brosse propre. Rincez au matin.","Ongles : une goutte massée sur l'ongle et la cuticule, le soir.","Résultats sur la densité après 4 à 8 semaines de régularité."],
   ingr:["Huile de ricin 100% pure","Pressée à froid"]},
];

// ─── COFFRETS ───
const COFFRETS = [
  {id:101,name:"Coffret Éclat Visage",ar:"طقم إشراق الوجه",need:"Pour un teint lumineux et unifié",ribbon:"Économie 15%",price:2900,old:3400,img:IMGS.coffret_eclat,
   desc:"La routine visage complète pour retrouver de l'éclat. Nettoyer, traiter, raviver — trois gestes, un résultat visible dès la deuxième semaine.",
   incl:["Masque Ghassoul Curcuma 100 g — purifie et affine","Sérum Figue de Barbarie 30 ml — régénère et illumine","Eau de Fleur d'Oranger 200 ml — tonifie et fixe"],
   accessories:[{id:"a101a",lbl:"Spatule à masque en bois + bol en céramique",price:120},{id:"a101b",lbl:"Gant exfoliant en coton naturel",price:80}]},
  {id:102,name:"Coffret Rituel Hammam",ar:"طقم الحمام",need:"Pour recréer le hammam chez soi",ribbon:"Économie 14%",price:2800,old:3250,img:IMGS.coffret_hammam,
   desc:"L'expérience du hammam algérien, dans le bon ordre. Préparer, exfolier, sublimer — le rituel ancestral au complet.",
   incl:["Savon Noir Beldi 200 g — ouvre les pores","Gommage Sucre & Argan 200 g — exfolie et nourrit","Ghassoul Premium en Poudre 200 g — purifie en profondeur"],
   accessories:[{id:"a102a",lbl:"Gant kassa traditionnel (exfoliation)",price:100},{id:"a102b",lbl:"Bol en bois pour ghassoul",price:90},{id:"a102c",lbl:"Serviette hammam en coton fin",price:250}]},
  {id:103,name:"Coffret Force Capillaire",ar:"طقم قوة الشعر",need:"Contre la chute, pour la densité",ribbon:"Économie 18%",price:4200,old:5100,img:IMGS.coffret_capillaire,
   desc:"Le programme intensif anti-chute, de la racine à la pointe. Quatre soins qui agissent en synergie sur la densité et la repousse.",
   incl:["Huile Nigelle Anti-Chute 100 ml — freine la chute","Huile de Ricin Fortifiante 100 ml — densifie","Masque Ghassoul-Hibiscus 200 g — lave et gaine","Beurre Leave-In Karité 100 g — hydrate et protège"],
   accessories:[{id:"a103a",lbl:"Peigne à dents larges en bois (sans casse)",price:80},{id:"a103b",lbl:"Bonnet chauffant en polyéthylène (pour masque)",price:60},{id:"a103c",lbl:"Pipette doseuse en verre 10 ml",price:50}]},
  {id:104,name:"Coffret Anti-Âge Précieux",ar:"طقم مكافحة الشيخوخة",need:"Le rituel jeunesse, jour et nuit",ribbon:"Économie 16%",price:4900,old:5800,img:IMGS.coffret_antiage,
   desc:"Nos soins les plus précieux réunis pour une action anti-âge globale. Pour celles qui veulent ce qu'il y a de mieux.",
   incl:["Sérum Nuit Saffron Glow 20 ml — régénère et unifie","Sérum Figue de Barbarie 30 ml — lisse et raffermit","Beurre Corps Karité-Rose 200 g — nourrit et tonifie"],
   accessories:[{id:"a104a",lbl:"Gua sha en pierre naturelle (drainage)",price:150},{id:"a104b",lbl:"Rouleau facial en quartz rose",price:200}]},
];

// ─── DIY SYNERGIES ───
const DIYS = [
  {num:"Synergie 01",name:"Élixir Anti-Chute",goal:"Densité & repousse",img:IMGS.diy1,
   ings:[["3 c.","Huile de Ricin"],["3 c.","Huile de Nigelle"],["1 c.","Huile d'Argan"]],
   method:"Mêlez dans un flacon ambré. Le ricin densifie, la nigelle freine la chute, l'argan fluidifie l'application. Massez le cuir chevelu, 1 heure de pose, puis lavez. Deux fois par semaine, constance requise.",
   accessories:[{id:"d1a",lbl:"Flacon ambré 50 ml + compte-gouttes",price:80},{id:"d1b",lbl:"Pipette doseuse en verre",price:50},{id:"d1c",lbl:"Étiquette adhésive personnalisable",price:20}]},
  {num:"Synergie 02",name:"Concentré Éclat Visage",goal:"Lumière & régénération",img:IMGS.diy2,
   ings:[["4 g.","Sérum Figue de Barbarie"],["2 g.","Huile d'Argan"],["1 g.","Saffron Glow"]],
   method:"Dans le creux de la main, réunissez les trois huiles juste avant l'application du soir. La figue de Barbarie régénère, l'argan assouplit, une touche de Saffron Glow illumine. Pressions douces, effet visible au réveil.",
   accessories:[{id:"d2a",lbl:"Flacon ambré 15 ml (pour préparer à l'avance)",price:60},{id:"d2b",lbl:"Mini-spatule en acier inoxydable",price:40}]},
  {num:"Synergie 03",name:"Baume Corps Sur-Mesure",goal:"Nutrition & souplesse",img:IMGS.diy3,
   ings:[["1 noix","Beurre Karité-Rose"],["3 g.","Huile d'Argan"],["2 g.","Figue de Barbarie"]],
   method:"Travaillez le beurre entre les paumes, incorporez les huiles goutte à goutte. Vous obtenez un baume enrichi, modulable selon la saison. Parfait sur les zones très sèches, le soir après la douche.",
   accessories:[{id:"d3a",lbl:"Bol de mélange en acier inoxydable",price:70},{id:"d3b",lbl:"Pot hermétique 100 ml en verre ambré",price:90}]},
];

// ─── AUTRES DONNÉES ───
const PROBLEMS = [
  {num:"01",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><path d="M17 7C17 7,11 12,11 17C11 22,14 25,17 27C20 25,23 22,23 17C23 12,17 7,17 7Z" stroke="rgba(233,197,192,.55)" stroke-width="1.2" fill="rgba(201,147,58,.07)"/><circle cx="17" cy="17" r="3" fill="rgba(201,147,58,.48)"/></svg>`,h:"Peau déshydratée",p:"Tiraillements au réveil, teint terne à 14h, crèmes qui n'hydratent qu'un quart d'heure. Ce cycle vous est familier.",sol:"Sérum Figue de Barbarie"},
  {num:"02",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><circle cx="11" cy="13" r="3" fill="rgba(233,197,192,.28)" stroke="rgba(233,197,192,.48)" stroke-width="1"/><circle cx="23" cy="13" r="3" fill="rgba(233,197,192,.28)" stroke="rgba(233,197,192,.48)" stroke-width="1"/><circle cx="17" cy="21" r="4" fill="rgba(201,147,58,.18)" stroke="rgba(201,147,58,.42)" stroke-width="1"/></svg>`,h:"Acné & imperfections",p:"Produits agressifs qui assèchent sans résoudre. Taches post-acné tenaces. La chimie a ses limites — la nature ses réponses.",sol:"Masque Miel & Argile"},
  {num:"03",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><path d="M9 11Q17 7,25 11L23 25Q17 28,11 25Z" stroke="rgba(233,197,192,.48)" stroke-width="1" fill="rgba(201,147,58,.07)"/><path d="M13 15Q17 13,21 15" stroke="rgba(201,147,58,.38)" stroke-width="1" fill="none"/></svg>`,h:"Chute des cheveux",p:"La brosse qui en dit trop. Les solutions du marché calment sans jamais fortifier à la racine. Il existe mieux.",sol:"Coffret Force Capillaire"},
  {num:"04",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><path d="M17 7L19.5 13.5L26 13.5L20.5 17.5L22.5 24L17 20L11.5 24L13.5 17.5L8 13.5L14.5 13.5Z" stroke="rgba(201,147,58,.48)" stroke-width="1" fill="rgba(201,147,58,.14)"/></svg>`,h:"Teint terne & taches",p:"Hyperpigmentation tenace, teint inégal. Le safran et la figue de Barbarie ont un avis différent.",sol:"Sérum Nuit Saffron Glow"},
  {num:"05",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><path d="M10 17L14 13L18 17L22 13L26 17" stroke="rgba(233,197,192,.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="9" y1="23" x2="25" y2="23" stroke="rgba(201,147,58,.22)" stroke-width=".8"/></svg>`,h:"Étiquettes illisibles",p:"Parabènes, sulfates, conservateurs. Vous avez cessé de lire parce que vous avez cessé de comprendre. Chez NOURYA, chaque ingrédient s'explique en une ligne.",sol:"Gamme 100% traçable"},
  {num:"06",ico:`<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15" stroke="rgba(201,147,58,.38)" stroke-width="1"/><path d="M13 21C13 16,9 14,9 10C9 7,12 6,14 8C15 6,19 6,20 8C22 6,25 7,25 10C25 14,21 16,21 21" stroke="rgba(233,197,192,.5)" stroke-width="1.2" fill="rgba(201,147,58,.08)" stroke-linejoin="round"/><rect x="13" y="21" width="8" height="6" rx="1" stroke="rgba(201,147,58,.38)" stroke-width="1" fill="rgba(201,147,58,.1)"/></svg>`,h:"Produits inadaptés",p:"Des soins formulés pour d'autres peaux, d'autres climates. La peau algérienne mérite des soins pensés pour elle.",sol:"Formulé pour votre peau"},
];

const INGRS = [
  {e:"🌵",n:"Figue de Barbarie",a:"الهندية",t:"L'huile la plus concentrée en vitamine E. Extraite à froid, elle régénère, lisse et illumine sans jamais alourdir.",o:"Batna · Tlemcen",img:IMGS.ingr_figue},
  {e:"⚫",n:"Habba Sawda",a:"الحبة السوداء",t:"Anti-inflammatoire, antibactérienne, stimulante de la repousse. Deux millénaires de tradition validés par la science.",o:"Jijel · Skikda",img:IMGS.ingr_nigelle},
  {e:"🪨",n:"Ghassoul",a:"الغاسول",t:"Argile du Moyen Atlas déposée depuis des millions d'années. Absorbe, purifie, restructure — sans jamais agresser.",o:"Atlas Maghrébin",img:IMGS.ingr_ghassoul},
  {e:"🌸",n:"Fleur d'Oranger",a:"ماء الزهر",t:"Distillée à la vapeur au printemps, quand les orangers de Blida sont en pleine floraison. Tonique et apaisante.",o:"Blida · Médéa",img:IMGS.ingr_oranger},
  {e:"✦",n:"Argan",a:"زيت الأركان",t:"Pressé à froid, non torréfié. Pénètre sans laisser de film, nourrit sans peser.",o:"Tlemcen · Naâma",img:IMGS.ingr_argan},
  {e:"🏵️",n:"Safran Algérien",a:"الزعفران",t:"Ses caroténoïdes unifient le teint et estompent les taches avec une efficacité que les synthèses peinent à reproduire.",o:"Tipaza · Algérie",img:IMGS.ingr_safran},
  {e:"💛",n:"Karité Brut",a:"زبدة الشيا",t:"Non raffiné, non déodorisé. Ce qui reste quand on ne retire rien. Vitamines A, E, F intactes.",o:"Afrique de l'Ouest",img:IMGS.ingr_karite},
  {e:"🌺",n:"Hibiscus",a:"الكركديه",t:"Surnommé le botox capillaire. Gaine la fibre, apporte du volume et ravive les reflets naturels.",o:"Sud algérien",img:IMGS.ingr_hibiscus},
];

const RITUAL = [
  {n:"01",h:"Préparer",p:"Le savon noir beldi ouvre les pores, ramollit les cellules mortes. Cinq minutes sur peau humide.",prod:"Savon Noir Beldi"},
  {n:"02",h:"Exfolier",p:"Le gant kassa, le gommage sucre-argan pour les zones de sécheresse. De bas en haut, toujours.",prod:"Gommage Sucre-Argan"},
  {n:"03",h:"Nourrir",p:"Sur peau encore humide, l'huile ou le beurre adapté pénètre deux fois plus efficacement. C'est la fenêtre d'opportunité.",prod:"Beurre Karité-Rose"},
  {n:"04",h:"Sceller",p:"Quelques sprays de fleur d'oranger. Elle fixe les actifs, laisse une légère astringence. La signature du hammam.",prod:"Eau de Fleur d'Oranger"},
];

const FAQS = [
  {q:"Vos produits sont-ils vraiment 100% naturels ?",a:"Sans exception. Chaque ingrédient est sourcé directement auprès de producteurs du Maghreb, avec traçabilité complète. La liste INCI est publiée sur chaque produit. Aucun parabène, aucun sulfate, aucun conservateur de synthèse."},
  {q:"Comment choisir entre petit et grand format ?",a:"Le petit format est idéal pour découvrir un produit avant de s'engager. Le grand format est destiné aux clientes régulières — il coûte moins cher au gramme et dure deux à trois fois plus longtemps."},
  {q:"Les accessoires des coffrets sont-ils obligatoires ?",a:"Pas du tout. Nous les proposons en option précisément parce qu'il serait dommage de vous les facturer si vous les avez déjà chez vous. Cochez uniquement ceux qui manquent dans votre rituel."},
  {q:"Comment fonctionnent les synergies DIY ?",a:"Ce sont des associations d'huiles à mélanger vous-même, juste avant usage ou dans un flacon dédié que vous commandez en option. Nous donnons les dosages précis et la méthode. Plus économique, plus frais, et cela vous reconnecte au geste traditionnel du soin fait main."},
  {q:"Quel est le délai de livraison réel ?",a:"2 à 3 jours ouvrables pour Alger, Oran et Constantine. 3 à 5 jours pour les autres wilayas. Vous recevez un code de suivi dès l'expédition de votre colis."},
  {q:"Mes données personnelles sont-elles en sécurité ?",a:"Nous ne conservons aucune donnée bancaire. Vos coordonnées de livraison sont supprimées après 30 jours. Nous ne vendons ni ne partageons vos données. Jamais."},
  {q:"Les soins conviennent-ils aux peaux sensibles ?",a:"La grande majorité de nos formules sont adaptées aux peaux sensibles, précisément parce qu'elles contiennent peu d'ingrédients, tous naturels. Un test au pli du coude 24h avant la première utilisation reste une précaution raisonnable."},
  {q:"Existe-t-il un programme de fidélité ?",a:"Oui. Chaque commande génère des points NOURYA (10 DA = 1 point, 100 points = 500 DA de réduction). Le parrainage offre 10% de remise à vous et à votre filleule. Demandez votre code directement sur WhatsApp."},
];

// ─── STATE ───
let cart = [], favs = [], activeCat = 'tous', openFaq = null;
const selectedFormats = {};
PRODUCTS.forEach(p => selectedFormats[p.id] = 0);

// Persistance panier dans localStorage
function saveCart() {
  try { localStorage.setItem('nourya_cart', JSON.stringify(cart)); } catch(e) {}
}
function loadCart() {
  try {
    const saved = localStorage.getItem('nourya_cart');
    if (saved) cart = JSON.parse(saved);
  } catch(e) { cart = []; }
}
loadCart();

// ─── RENDER FUNCTIONS ───
document.getElementById('prob-grid').innerHTML = PROBLEMS.map((p, i) => `
<div class="pcard fu d${(i % 3) + 1}">
  <div class="pcard-num">${p.num}</div>
  <div class="pcard-ico">${p.ico}</div>
  <div class="pcard-h">${p.h}</div>
  <div class="pcard-p">${p.p}</div>
  <div class="pcard-sol">${p.sol} <span class="pcard-arrow">→</span></div>
</div>`).join('');

function buildFilters() {
  const cats = ['tous', 'visage', 'cheveux', 'corps'];
  const lbl = { tous:'Tous les soins', visage:'Visage', cheveux:'Cheveux', corps:'Corps & Hammam' };
  document.getElementById('filters').innerHTML = cats.map(c =>
    `<button class="fbtn${c === activeCat ? ' on' : ''}" onclick="filterProd('${c}')">${lbl[c]}</button>`
  ).join('');
}

function filterProd(c) { activeCat = c; buildFilters(); buildProds(); }

function getPrice(p) {
  return p.formats[selectedFormats[p.id] || 0].price;
}

function buildProds() {
  const list = activeCat === 'tous' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
  const catLbl = { visage:'Visage', cheveux:'Cheveux', corps:'Corps & Hammam' };
  document.getElementById('pgrid').innerHTML = list.map(p => {
    const fi = selectedFormats[p.id] || 0;
    return `<div class="pc fu">
      <div class="pc-img" onclick="openDetail(${p.id})">
        <div class="pc-img-inner">
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentNode.style.background='var(--n3)'"/>
        </div>
        <div class="pc-img-overlay"></div>
        <div class="pc-rose-corner"></div>
        ${p.badge ? `<div class="pc-badge ${p.btype === 'rose' ? 'rose' : ''}">${p.badge}</div>` : ''}
        <button class="pc-fav${favs.includes(p.id) ? ' on' : ''}" onclick="event.stopPropagation();toggleFav(${p.id})" aria-label="${favs.includes(p.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}">${favs.includes(p.id) ? '♥' : '♡'}</button>
        <div class="pc-hover">
          <button class="btn-o" style="font-size:9px;padding:9px 14px;flex:1" onclick="event.stopPropagation();openDetail(${p.id})">Voir la fiche →</button>
          <button class="btn-g" style="font-size:9px;padding:9px 14px;flex:1" onclick="event.stopPropagation();addToCart(${p.id})">+ Panier</button>
        </div>
      </div>
      <div class="pc-body">
        <div class="pc-cat">${catLbl[p.cat]}</div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-ar">${p.ar}</div>
        <div class="pc-formats">
          ${p.formats.map((f, i) => `<button class="fmt-btn${i === fi ? ' sel' : ''}" onclick="event.stopPropagation();setFormat(${p.id},${i});this.closest('.pc').querySelectorAll('.fmt-btn').forEach((b,j)=>b.classList.toggle('sel',j===${i}));this.closest('.pc').querySelector('.pc-price').innerHTML='${f.price.toLocaleString()} <small>DA</small>';this.closest('.pc').querySelector('.fmt-qty').querySelector('span').textContent='${f.qty}';">${f.lbl}</button>`).join('')}
        </div>
        <div class="fmt-qty"><span class="fmt-qty-icon">📦</span><span>${p.formats[fi].qty}</span></div>
        <div class="pc-tags">${p.tags.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>
        <div class="pc-desc">${p.desc}</div>
        <button class="pc-detail-link" onclick="openDetail(${p.id})">Mode d'emploi & bienfaits <span>→</span></button>
        <div class="pc-foot">
          <div class="pc-price">${p.formats[fi].price.toLocaleString()} <small>DA</small></div>
          <button class="pc-add" onclick="addToCart(${p.id})" aria-label="Ajouter au panier">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
  observeAnim();
  initCardTilt();
}

function setFormat(pid, fi) { selectedFormats[pid] = fi; }

// Coffrets
document.getElementById('cof-grid').innerHTML = COFFRETS.map(c => `
<div class="cof-card fu">
  <div class="cof-visual">
    <img class="cof-img" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.style.display='none'"/>
    <div class="cof-img-ov"></div>
    <div class="cof-ribbon">${c.ribbon}</div>
    <div style="position:absolute;bottom:16px;left:0;right:0;text-align:center;z-index:3">
      <div style="font-family:var(--fa);font-size:18px;color:rgba(222,184,179,.6)">${c.ar}</div>
    </div>
    <div class="cof-hover-panel">
      <div class="cof-hover-title">Contenu du coffret</div>
      <div class="cof-hover-items">${c.incl.map(i=>`<div class="cof-hover-item">${i}</div>`).join('')}</div>
    </div>
  </div>
  <div class="cof-body">
    <div class="cof-need">${c.need}</div>
    <div class="cof-name">${c.name}</div>
    <div class="cof-desc">${c.desc}</div>
    <ul class="cof-incl">${c.incl.map(i => `<li><span class="cof-incl-ico">✦</span>${i}</li>`).join('')}</ul>
    <div class="acc-section">
      <div class="acc-title">Accessoires en option</div>
      ${c.accessories.map(a => `
        <div class="acc-opt">
          <input type="checkbox" id="${a.id}" onchange="updateCofPrice(${c.id})"/>
          <label class="acc-opt-lbl" for="${a.id}">${a.lbl}</label>
          <span class="acc-opt-price">+ ${a.price} DA</span>
        </div>`).join('')}
    </div>
    <div class="cof-foot">
      <div>
        <div class="cof-save">Économie vs achat séparé</div>
        <div class="cof-price" id="cof-price-${c.id}">${c.price.toLocaleString()} <small>DA</small></div>
      </div>
      <button class="cof-btn" onclick="addCofToCart(${c.id})">Commander →</button>
    </div>
  </div>
</div>`).join('');

function updateCofPrice(cid) {
  const c = COFFRETS.find(x => x.id === cid);
  let total = c.price;
  c.accessories.forEach(a => {
    const cb = document.getElementById(a.id);
    if (cb && cb.checked) total += a.price;
  });
  const el = document.getElementById('cof-price-' + cid);
  if (el) el.innerHTML = `${total.toLocaleString()} <small>DA</small>`;
}

// DIY
document.getElementById('diy-grid').innerHTML = DIYS.map((d, i) => `
<div class="diy-card fu d${i + 1}">
  <div class="diy-num">${d.num}</div>
  <div class="diy-name">${d.name}</div>
  <div class="diy-goal">${d.goal}</div>
  <img class="diy-img" src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.style.display='none'"/>
  <div class="diy-recipe-t">Composition</div>
  ${d.ings.map(g => `<div class="diy-ing"><span class="diy-ing-dose">${g[0]}</span><span>${g[1]}</span></div>`).join('')}
  <div class="diy-method">${d.method}</div>
  <div class="diy-acc">
    <div class="diy-acc-t">Accessoires nécessaires (optionnel)</div>
    ${d.accessories.map(a => `
      <div class="diy-acc-opt">
        <input type="checkbox" id="${a.id}" onchange="updateDiyBtn(${i})"/>
        <label for="${a.id}">${a.lbl}</label>
        <span>+ ${a.price} DA</span>
      </div>`).join('')}
  </div>
  <button class="diy-btn" onclick="addDiyToCart(${i})">Ajouter au panier →</button>
</div>`).join('');

// Ritual
document.getElementById('rsteps').innerHTML = RITUAL.map(s => `
<div class="rstep fu">
  <div class="rstep-circle"><div class="rstep-num">${s.n}</div></div>
  <div class="rstep-h">${s.h}</div>
  <div class="rstep-p">${s.p}</div>
  <span class="rstep-prod">${s.prod}</span>
</div>`).join('');

// Ingredients
document.getElementById('ingr-grid').innerHTML = INGRS.map(i => `
<div class="icard fu">
  <img class="icard-img" src="${i.img}" alt="${i.n}" loading="lazy" onerror="this.style.display='none'"/>
  <div class="icard-body">
    <div class="icard-emoji">${i.e}</div>
    <div class="icard-name">${i.n}</div>
    <div class="icard-ar">${i.a}</div>
    <div class="icard-txt">${i.t}</div>
    <div class="icard-origin">📍 ${i.o}</div>
  </div>
</div>`).join('');

// Delivery
const DELIVERIES = [
  {ico:"📦",h:"Livraison en 58 wilayas",p:"Via Yalidine Express sur l'ensemble du territoire national. Enlèvement à domicile ou bureau de dépôt selon votre préférence.",tag:"2–5 jours ouvrables"},
  {ico:"💰",h:"Règlement à la livraison",p:"Vous payez au moment où vous recevez votre commande, entre les mains du livreur. Aucune avance ni prélèvement préalable.",tag:"Le mode le plus utilisé"},
  {ico:"↩️",h:"Retours & échanges",p:"Un soin qui ne vous correspond pas ? Contactez-nous dans les 48 heures suivant la réception. Échange, avoir ou remboursement selon votre préférence.",tag:"Service client sous 12h"},
];
document.getElementById('del-grid').innerHTML = DELIVERIES.map(d => `
<div class="dcard fu">
  <div class="dcard-ico">${d.ico}</div>
  <div class="dcard-h">${d.h}</div>
  <div class="dcard-p">${d.p}</div>
  <div class="dcard-tag">${d.tag}</div>
</div>`).join('');

const PAYS = [
  {ico:"💳",n:"Carte Dahabia / Edahabia",s:"Paiement sécurisé · Algérie Post"},
  {ico:"📱",n:"BaridiMob",s:"Paiement mobile instantané"},
  {ico:"🤝",n:"À la livraison",s:"Cash · le mode le plus répandu"},
];
document.getElementById('pay-row').innerHTML = PAYS.map(m => `
<div class="pmethod">
  <span class="pmethod-ico">${m.ico}</span>
  <div><div class="pmethod-name">${m.n}</div><div class="pmethod-sub">${m.s}</div></div>
</div>`).join('');

// Testimonials
const TESTS = [
  {s:5,txt:"J'avais essayé des dizaines de produits pour ma chute de cheveux. L'huile nigelle NOURYA a fait en six semaines ce que rien n'avait réussi en trois ans. Ce n'est pas un hasard.",n:"Selma B.",l:"Alger · Cliente vérifiée",i:"S"},
  {s:5,txt:"Le packaging est sobre et élégant, mais ce qui m'a convaincue, c'est la transparence sur les ingrédients. Je sais exactement ce que j'applique. Le sérum figue de Barbarie est un choc dès le premier matin.",n:"Amira K.",l:"Oran · Cliente vérifiée",i:"A"},
  {s:5,txt:"Le Coffret Hammam est devenu mon rituel du vendredi. Enfin une marque algérienne qui ne cherche pas à singer les autres. Et les accessoires proposés en option sont vraiment réfléchis.",n:"Nadia T.",l:"Constantine · Cliente vérifiée",i:"N"},
];
document.getElementById('tgrid').innerHTML = TESTS.map(t => `
<div class="tcard fu">
  <div class="tcard-q">"</div>
  <div class="tcard-stars">${'★'.repeat(t.s)}</div>
  <div class="tcard-txt">"${t.txt}"</div>
  <div class="tcard-foot">
    <div class="tcard-av">${t.i}</div>
    <div><div class="tcard-name">${t.n}</div><div class="tcard-loc">${t.l}</div></div>
  </div>
</div>`).join('');

// FAQ
document.getElementById('faq-list').innerHTML = FAQS.map((f, i) => `
<div class="faq-item">
  <button class="faq-q" onclick="toggleFaq(${i})" aria-expanded="false" id="faq-btn-${i}">
    <span class="faq-qt">${f.q}</span>
    <span class="faq-ch" id="fch${i}">+</span>
  </button>
  <div class="faq-a" id="fa${i}" role="region" aria-labelledby="faq-btn-${i}">${f.a}</div>
</div>`).join('');

function toggleFaq(i) {
  if (openFaq !== null && openFaq !== i) {
    document.getElementById('fa' + openFaq).classList.remove('open');
    const c = document.getElementById('fch' + openFaq);
    if (c) { c.textContent = '+'; c.classList.remove('open'); }
    document.getElementById('faq-btn-' + openFaq)?.setAttribute('aria-expanded', 'false');
  }
  const a = document.getElementById('fa' + i), ch = document.getElementById('fch' + i);
  const op = a.classList.contains('open');
  a.classList.toggle('open', !op);
  ch.textContent = op ? '+' : '×';
  ch.classList.toggle('open', !op);
  document.getElementById('faq-btn-' + i)?.setAttribute('aria-expanded', String(!op));
  openFaq = op ? null : i;
}

// ─── PRODUCT DETAIL MODAL ───
function openDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const fi = selectedFormats[p.id] || 0;
  const catLbl = { visage:'Visage', cheveux:'Cheveux', corps:'Corps & Hammam' };
  const m = document.getElementById('detail-modal');
  m.innerHTML = `
    <button class="mcls" onclick="closeDetail()" aria-label="Fermer">✕</button>
    <div class="pd-hero">
      <div class="pd-visual-box">
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"/>
      </div>
      <div>
        <div class="pd-cat">${catLbl[p.cat]}</div>
        <div class="pd-name">${p.name}</div>
        <div class="pd-ar">${p.ar}</div>
        <div class="pd-price" id="pd-price-${p.id}">${p.formats[fi].price.toLocaleString()} <small>DA</small></div>
        <div class="pd-format-info" id="pd-fmt-info-${p.id}">${p.formats[fi].qty} · ${p.peau}</div>
        <div class="pd-formats-detail">
          ${p.formats.map((f, i) => `<button class="pd-fmt-btn${i === fi ? ' sel' : ''}" onclick="selectDetailFormat(${p.id},${i})">${f.lbl}</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="pd-sect"><div class="pd-sect-t">À propos</div><div class="pd-long">${p.long}</div></div>
    <div class="pd-sect">
      <div class="pd-sect-t">✦ Les bienfaits</div>
      <ul class="pd-benefits">${p.benefits.map(b => `<li class="pd-benefit"><span class="pd-benefit-ico">✦</span>${b}</li>`).join('')}</ul>
    </div>
    <div class="pd-sect">
      <div class="pd-sect-t">Comment l'utiliser</div>
      <div class="pd-usage-steps">${p.usage.map((u, i) => `<div class="pd-usage-step"><div class="pd-usage-num">${i + 1}</div><div class="pd-usage-txt">${u}</div></div>`).join('')}</div>
    </div>
    <div class="pd-sect">
      <div class="pd-sect-t">Composition</div>
      <div class="pd-ingr-chips">${p.ingr.map(i => `<span class="pd-chip">${i}</span>`).join('')}</div>
    </div>
    <div class="pd-foot">
      <button class="btn-g" style="flex:1;justify-content:center" onclick="addToCart(${p.id});closeDetail()">
        Ajouter au panier — <span id="pd-cart-price-${p.id}">${p.formats[fi].price.toLocaleString()}</span> DA
      </button>
      <button class="btn-o" style="padding:13px 18px" onclick="toggleFav(${p.id})" aria-label="Favoris">${favs.includes(p.id) ? '♥' : '♡'}</button>
    </div>`;
  document.getElementById('detail-ov').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectDetailFormat(pid, fi) {
  selectedFormats[pid] = fi;
  const p = PRODUCTS.find(x => x.id === pid);
  document.querySelectorAll('.pd-fmt-btn').forEach((b, i) => b.classList.toggle('sel', i === fi));
  const priceEl = document.getElementById('pd-price-' + pid);
  if (priceEl) priceEl.innerHTML = `${p.formats[fi].price.toLocaleString()} <small>DA</small>`;
  const fmtEl = document.getElementById('pd-fmt-info-' + pid);
  if (fmtEl) fmtEl.textContent = `${p.formats[fi].qty} · ${p.peau}`;
  const cartEl = document.getElementById('pd-cart-price-' + pid);
  if (cartEl) cartEl.textContent = p.formats[fi].price.toLocaleString();
}

function closeDetail() {
  document.getElementById('detail-ov').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── CART ───
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const fi = selectedFormats[id] || 0;
  const key = `${id}-${fi}`;
  const e = cart.find(x => x.key === key);
  if (e) e.qty++;
  else cart.push({ key, id, name: p.name, emoji: p.emoji, img: p.img, format: p.formats[fi].qty, price: p.formats[fi].price, qty: 1, isCof: false });
  renderCart(); updateBadge(); saveCart();
  toast(`${p.name} (${p.formats[fi].lbl}) ajouté au panier.`, '✦');
}

function addCofToCart(cid) {
  const c = COFFRETS.find(x => x.id === cid);
  let total = c.price;
  const accsList = [];
  c.accessories.forEach(a => {
    const cb = document.getElementById(a.id);
    if (cb && cb.checked) { total += a.price; accsList.push(a.lbl); }
  });
  const key = `cof-${cid}-${Date.now()}`;
  cart.push({ key, id: cid, name: c.name + (accsList.length ? ` + ${accsList.length} acc.` : ''), emoji: '🎁', img: c.img, format: 'Coffret complet', price: total, qty: 1, isCof: true });
  renderCart(); updateBadge(); saveCart();
  toast(`${c.name} ajouté au panier.`, '✦');
}

function addDiyToCart(di) {
  const d = DIYS[di];
  let total = 0;
  const accsList = [];
  d.accessories.forEach(a => {
    const cb = document.getElementById(a.id);
    if (cb && cb.checked) { total += a.price; accsList.push(a.lbl); }
  });
  if (total === 0) { toast('Sélectionnez au moins un accessoire, ou commandez les huiles individuellement.', '⚠'); return; }
  const key = `diy-${di}-${Date.now()}`;
  cart.push({ key, id: 1000 + di, name: `${d.name} — accessoires`, emoji: '🧪', format: `${accsList.length} accessoire(s)`, price: total, qty: 1, isCof: true });
  renderCart(); updateBadge(); saveCart();
  toast(`Accessoires ${d.name} ajoutés au panier.`, '✦');
}

function removeCart(key) { cart = cart.filter(x => x.key !== key); renderCart(); updateBadge(); saveCart(); }

function changeQty(key, d) {
  const e = cart.find(x => x.key === key);
  if (e) { e.qty += d; if (e.qty <= 0) removeCart(key); }
  renderCart(); updateBadge(); saveCart();
}

function updateBadge() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-badge').textContent = n;
}

function toggleCart() {
  document.getElementById('cart-drw').classList.toggle('open');
  document.getElementById('cart-ov').classList.toggle('open');
}

function renderCart() {
  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty-s"><div class="cart-empty-ico">◈</div><div class="cart-empty-t">Votre panier est vide</div></div>`;
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = cart.map(i => `
    <div class="ci">
      <div class="ci-img">
        ${i.img ? `<img src="${i.img}" alt="${i.name}" onerror="this.style.display='none'"/>` : ''}
        <span class="ci-img-emoji"${i.img ? ' style="display:none"' : ''}>${i.emoji}</span>
      </div>
      <div class="ci-info">
        <div class="ci-name">${i.name}</div>
        <div class="ci-format">${i.format}</div>
        <div class="ci-price">${(i.price * i.qty).toLocaleString()} DA</div>
        <div class="ci-qty">
          <button class="qbtn" onclick="changeQty('${i.key}',-1)" aria-label="Diminuer">−</button>
          <span class="qval">${i.qty}</span>
          <button class="qbtn" onclick="changeQty('${i.key}',1)" aria-label="Augmenter">+</button>
          <button class="ci-del" onclick="removeCart('${i.key}')">Retirer</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  foot.innerHTML = `
    <div class="cart-tot"><span class="cart-tot-l">Total commande</span><span class="cart-tot-v">${total.toLocaleString()} DA</span></div>
    <button class="btn-g" style="width:100%;justify-content:center;margin-bottom:10px" onclick="openCheckout()">Finaliser la commande &rsaquo;</button>
    <button class="btn-o" style="width:100%;justify-content:center;font-size:10px" onclick="toggleCart()">Continuer mes achats</button>`;
}

// ─── FAVORITES ───
function toggleFav(id) {
  const idx = favs.indexOf(id);
  if (idx > -1) { favs.splice(idx, 1); toast('Retiré de vos favoris.', '♡'); }
  else { favs.push(id); toast('Ajouté à vos favoris.', '♥'); }
  const b = document.getElementById('fav-badge');
  b.textContent = favs.length;
  b.style.display = favs.length ? 'flex' : 'none';
  buildProds();
}

function showFav() {
  toast(favs.length ? `${favs.length} produit(s) en favoris.` : 'Aucun favori pour le moment.', '♡');
}

// ─── CHECKOUT ───
function openCheckout() {
  if (!cart.length) { toast('Votre panier est vide.', '◈'); return; }
  toggleCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const wilayas = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem',"M'Sila",'Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane'];
  document.getElementById('checkout-modal').innerHTML = `
    <button class="mcls" onclick="closeCheckout()" aria-label="Fermer">✕</button>
    <div class="modal-hd"><div class="modal-title">Finaliser votre commande</div></div>
    <div class="modal-body">
      <div class="ord-sum">
        <div class="ord-sum-t">Récapitulatif</div>
        ${cart.map(i => `<div class="ord-row"><span>${i.name} × ${i.qty}</span><span style="color:var(--g)">${(i.price * i.qty).toLocaleString()} DA</span></div>`).join('')}
        <div class="ord-row" style="opacity:.4"><span>Livraison</span><span>Calculée selon wilaya</span></div>
        <div class="ord-total"><span>Total</span><span>${total.toLocaleString()} DA</span></div>
      </div>
      <div class="frow">
        <div class="fgrp"><label class="flbl" for="co-fn">Prénom</label><input class="fin" id="co-fn" placeholder="Votre prénom" required/></div>
        <div class="fgrp"><label class="flbl" for="co-ln">Nom</label><input class="fin" id="co-ln" placeholder="Votre nom" required/></div>
      </div>
      <div class="fgrp"><label class="flbl" for="co-ph">Téléphone</label><input class="fin" id="co-ph" type="tel" placeholder="0XXXXXXXXX" required/></div>
      <div class="fgrp"><label class="flbl" for="co-ad">Adresse complète</label><input class="fin" id="co-ad" placeholder="Numéro, rue, cité, quartier..." required/></div>
      <div class="frow">
        <div class="fgrp"><label class="flbl" for="co-wi">Wilaya</label>
          <select class="fsel" id="co-wi"><option value="">Sélectionner...</option>${wilayas.map(w => `<option>${w}</option>`).join('')}</select>
        </div>
        <div class="fgrp"><label class="flbl" for="co-cp">Code postal</label><input class="fin" id="co-cp" placeholder="16000"/></div>
      </div>
      <div class="fgrp">
        <label class="flbl">Mode de paiement</label>
        <div class="pay-opts">
          <label class="pay-opt sel" id="po-l" onclick="selPay('l')"><input type="radio" name="pay" value="liv" checked/><span style="font-size:17px">🤝</span><span class="pay-opt-lbl">Paiement à la livraison (cash)</span></label>
          <label class="pay-opt" id="po-d" onclick="selPay('d')"><input type="radio" name="pay" value="dah"/><span style="font-size:17px">💳</span><span class="pay-opt-lbl">Carte Dahabia / Edahabia</span></label>
          <label class="pay-opt" id="po-b" onclick="selPay('b')"><input type="radio" name="pay" value="bar"/><span style="font-size:17px">📱</span><span class="pay-opt-lbl">BaridiMob</span></label>
        </div>
      </div>
      <div style="display:flex;gap:9px;align-items:flex-start;margin-top:14px;padding:12px 14px;background:rgba(233,197,192,.05);border:1px solid rgba(212,154,146,.14);">
        <span style="color:var(--rose);flex-shrink:0;margin-top:2px">🔒</span>
        <span style="font-family:var(--fb);font-size:10px;font-weight:300;line-height:1.65;color:var(--c);opacity:.42">Données utilisées exclusivement pour cette commande. Aucune donnée bancaire conservée. Suppression sous 30 jours.</span>
      </div>
      <button class="submit-btn" onclick="submitOrder()">Confirmer la commande &rsaquo;</button>
    </div>`;
  document.getElementById('checkout-ov').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selPay(t) {
  ['l','d','b'].forEach(x => {
    const e = document.getElementById('po-' + x);
    if (e) e.classList.toggle('sel', x === t);
  });
}

function closeCheckout() {
  document.getElementById('checkout-ov').classList.remove('open');
  document.body.style.overflow = '';
}

function submitOrder() {
  const fn = document.getElementById('co-fn')?.value;
  const ph = document.getElementById('co-ph')?.value;
  const ad = document.getElementById('co-ad')?.value;
  const wi = document.getElementById('co-wi')?.value;
  if (!fn || !ph || !ad || !wi) { toast('Veuillez remplir tous les champs obligatoires.', '⚠'); return; }
  const num = 'NOURYA-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  document.getElementById('checkout-modal').innerHTML = `
    <div class="success-wrap">
      <div class="success-ico">🌿</div>
      <div class="success-h">Commande confirmée</div>
      <div class="order-num">${num}</div>
      <div class="success-p">Merci, ${fn}. Votre commande a bien été enregistrée. Vous recevrez une confirmation par SMS dans les prochaines minutes.<br/><br/>Votre colis sera expédié sous 24 heures et livré sous 2 à 5 jours ouvrables selon votre wilaya.</div>
      <button class="btn-g" onclick="closeCheckout();cart=[];updateBadge();renderCart();saveCart();">Retour à la boutique</button>
    </div>`;
  cart = []; updateBadge(); renderCart(); saveCart();
}

// ─── UTILS ───
function trackOrder() {
  const v = document.getElementById('track-in').value.trim();
  if (!v) { toast('Veuillez entrer votre numéro de commande.', '⚠'); return; }
  toast(`Recherche de ${v} — Commande en préparation.`, '📦');
}

function subscribe(e) { e.preventDefault(); toast('Bienvenue. Vous ferez partie des premiers informés.', '✦'); e.target.reset(); }
function sendQ(e) { e.preventDefault(); toast('Votre message a bien été transmis. Réponse sous 12 heures.', '✦'); e.target.reset(); }

function toast(msg, ico = '✦') {
  const toastIco = document.getElementById('toast-ico');
  const toastT = document.getElementById('toast-t');
  toastIco.textContent = ico;
  toastT.textContent = msg;
  const el = document.getElementById('toast');
  el.classList.add('on');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('on'), 3600);
}

function showAccount() { toast('Espace personnel — disponible prochainement.', '◈'); }

// ─── MENU MOBILE ───
let mobileNavOpen = false;

function mobileMenu() {
  mobileNavOpen = !mobileNavOpen;
  const overlay = document.getElementById('mobile-nav');
  const btn = document.querySelector('.hamburger');
  overlay.classList.toggle('open', mobileNavOpen);
  btn.classList.toggle('open', mobileNavOpen);
  document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileNavOpen = false;
  document.getElementById('mobile-nav').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── COMPTEUR ANIMÉ POUR LES STATS ───
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── TILT 3D SUR LES CARTES ───
function initCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.pc, .cof-card, .icard, .tcard, .pcard').forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transition = 'box-shadow .4s var(--ease)';
    });
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
      card.style.boxShadow = `${-x * 1.5}px ${Math.abs(y) * 2}px 48px rgba(26,12,0,.14)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s var(--ease), box-shadow .5s var(--ease)';
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// ─── SCROLL ANIMATIONS ───
function observeAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        // Compteur animé pour les stats
        const count = e.target.dataset.count;
        if (count !== undefined) {
          animateCounter(e.target, parseInt(count), count === '0' ? '' : '', 1600);
        }
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.fu:not(.vis), .fi-a:not(.vis), .fls:not(.vis)').forEach(el => obs.observe(el));
  document.querySelectorAll('.rstep:not(.vis)').forEach(el => obs.observe(el));
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

// ─── HERO SHOWCASE ───
function initHeroShowcase(){
  const SHOWCASE = PRODUCTS.slice(0,6);
  const slidesEl = document.getElementById('hsSlides');
  const dotsEl   = document.getElementById('hsDots');
  const content  = document.getElementById('hsContent');
  const badgeEl  = document.getElementById('hsBadge');
  const nameEl   = document.getElementById('hsName');
  const descEl   = document.getElementById('hsDesc');
  const priceEl  = document.getElementById('hsPrice');
  const addBtn   = document.getElementById('hsAdd');
  const timerEl  = document.getElementById('hsTimer');
  if(!slidesEl) return;

  SHOWCASE.forEach((p,i) => {
    const s = document.createElement('div');
    s.className = 'hs-slide' + (i===0?' hs-active':'');
    s.innerHTML = `<img src="${p.img}" alt="${p.name}" loading="${i===0?'eager':'lazy'}">`;
    slidesEl.appendChild(s);

    const d = document.createElement('button');
    d.className = 'hs-dot' + (i===0?' hs-dot-active':'');
    d.setAttribute('aria-label', p.name);
    d.addEventListener('click', ()=>goTo(i));
    dotsEl.appendChild(d);
  });

  let current = 0;
  let timer;

  function setContent(p){
    content.classList.remove('hs-in');
    void content.offsetWidth;
    badgeEl.textContent = p.badge || p.tags[0] || '';
    nameEl.textContent  = p.name;
    descEl.textContent  = p.desc;
    priceEl.textContent = p.formats[0].price.toLocaleString('fr-DZ') + ' DA';
    addBtn.onclick = () => addToCart(p.id, 0);
    requestAnimationFrame(() => content.classList.add('hs-in'));
  }

  function goTo(idx){
    const slides = slidesEl.querySelectorAll('.hs-slide');
    const dots   = dotsEl.querySelectorAll('.hs-dot');
    slides[current].classList.remove('hs-active');
    dots[current].classList.remove('hs-dot-active');
    current = (idx + SHOWCASE.length) % SHOWCASE.length;
    slides[current].classList.add('hs-active');
    dots[current].classList.add('hs-dot-active');
    setContent(SHOWCASE[current]);
    timerEl.classList.remove('hs-run');
    void timerEl.offsetWidth;
    requestAnimationFrame(() => timerEl.classList.add('hs-run'));
  }

  function startAuto(){ timer = setInterval(() => goTo(current+1), 3000); }
  function stopAuto(){ clearInterval(timer); }

  setContent(SHOWCASE[0]);
  requestAnimationFrame(() => {
    content.classList.add('hs-in');
    timerEl.classList.add('hs-run');
  });
  startAuto();

  const showcase = document.getElementById('heroShowcase');
  showcase.addEventListener('mouseenter', stopAuto);
  showcase.addEventListener('mouseleave', () => { goTo(current+1); startAuto(); });
}

// ─── SUPABASE — chargement des produits admin ───
const _SB_URL = 'https://wnwirmlvgjfzymixswsy.supabase.co';
const _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indud2lybWx2Z2pmenltaXhzd3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzcxMzksImV4cCI6MjA4OTQ1MzEzOX0.wxrbK6_ny7j3wI2l-bvIy9ljYqj_xbiyHncB5QJCnSc';

async function loadAdminProducts(){
  try{
    const [hiddenRes, prodRes] = await Promise.all([
      fetch(`${_SB_URL}/rest/v1/nourya_hidden_products?select=product_id`,
        { headers:{ 'apikey':_SB_KEY, 'Authorization':'Bearer '+_SB_KEY } }),
      fetch(`${_SB_URL}/rest/v1/nourya_products?visible=eq.true&order=created_at.asc&select=*`,
        { headers:{ 'apikey':_SB_KEY, 'Authorization':'Bearer '+_SB_KEY } })
    ]);

    // Apply hidden IDs — splice static products out of PRODUCTS
    if(hiddenRes.ok){
      const hiddenRows = await hiddenRes.json();
      const hiddenSet = new Set((hiddenRows||[]).map(r => r.product_id));
      if(hiddenSet.size){
        for(let i = PRODUCTS.length - 1; i >= 0; i--){
          if(PRODUCTS[i].id >= 1 && PRODUCTS[i].id <= 14 && hiddenSet.has(PRODUCTS[i].id)){
            PRODUCTS.splice(i, 1);
          }
        }
      }
    }

    if(!prodRes.ok){ buildFilters(); buildProds(); return; }
    const rows = await prodRes.json();
    if(rows && rows.length){
      let nextId = Math.max(...PRODUCTS.map(p=>p.id), 100) + 1;
      rows.forEach(r => {
        if(PRODUCTS.find(p=>p._sbId===r.id)) return;
        const formats = [];
        if(r.price_1) formats.push({lbl:r.label_1||'Format 1', qty:r.label_1||'', price:r.price_1});
        if(r.price_2) formats.push({lbl:r.label_2||'Format 2', qty:r.label_2||'', price:r.price_2});
        if(!formats.length) return;
        PRODUCTS.push({
          id:       nextId++,
          _sbId:    r.id,
          name:     r.name,
          ar:       r.name_ar || '',
          cat:      r.category || 'visage',
          emoji:    '✦',
          formats,
          badge:    r.badge || null,
          btype:    '',
          img:      r.image_url,
          peau:     '',
          desc:     r.description,
          long:     r.long_desc || r.description,
          tags:     r.tags || [],
          benefits: [],
          usage:    [],
          ingr:     [],
        });
      });
      selectedFormats && rows.forEach((_,i)=>{ const p=PRODUCTS[PRODUCTS.length-rows.length+i]; if(p) selectedFormats[p.id]=0; });
    }
    buildFilters();
    buildProds();
  } catch(e){
    // silently fail — static products remain
  }
}

// ─── INIT ───
buildFilters();
buildProds();
observeAnim();
initCardTilt();
initHeroShowcase();
renderCart();
updateBadge();
loadAdminProducts();
