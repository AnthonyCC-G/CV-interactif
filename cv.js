"use strict";

const SKILLS = [
  { name: "PHP", detail: "Utilisé dans le projet MY-ANKODE (PHP 8.3)." },
  { name: "Symfony 6/7", detail: "Framework du projet MY-ANKODE (Symfony 7), avec l'ORM Doctrine pour l'accès aux données." },
  { name: "PHPUnit", detail: "Sur MY-ANKODE, 135 tests et 346 assertions exécutés dans Docker, dont 52 tests de sécurité (en-têtes, voters, mots de passe, assainissement, authentification, validation). Un seul test ignoré pour l'instant (protection CSP), en cours. Approche qualitative d'abord, objectif MVP." },
  { name: "Docker", detail: "Déploiement du projet MY-ANKODE." },
  { name: "Git / GitHub" },
  { name: "PostgreSQL", detail: "Base relationnelle du projet MY-ANKODE, en architecture hybride avec MongoDB." },
  { name: "MongoDB", detail: "Base documentaire du projet MY-ANKODE, en architecture hybride avec PostgreSQL ; accès aux données via un ODM." },
  { name: "HTML", detail: "Ce CV." },
  { name: "CSS", detail: "Ce CV." },
  { name: "JavaScript", detail: "Ce CV." },
];
const MS = [
  { name: "Outlook", detail: "Outil de travail quotidien en entreprise." },
  { name: "OneNote", detail: "Utilisé très intensivement ; j'ai travaillé à l'automatisation de l'outil, ce qui est devenu un point fort." },
  { name: "Excel", detail: "Utilisé avec des outils de BI (analyse et restitution de données)." },
  { name: "Power BI", detail: "Utilisé en entreprise ; formation Power BI Expert suivie chez DataScientest." },
];
const ARCH = [
  "Architecture d'applications web",
  "Conception et modélisation de bases de données",
  "Méthodologies agiles (Kanban)",
  "Sécurité : bases",
  "Tests automatisés (PHPUnit)",
];
const SOFT = [
  "Gestion de projet et documentation",
  "Animation de réunions et d'ateliers",
  "Coordination et tutorat",
  "Analyse et amélioration continue",
  "Pack Office avancé (macros)",
];

const PROJECTS = [
  {
    title: "Projet fullstack Angular – Java Spring",
    badge: "Projet à venir",
    summary: "Projet évalué dans le cadre de la formation CDA à l'ENI.",
    text: "Analyse et conception, développement d'un frontend Angular connecté à un backend Java Spring reposant sur une base de données relationnelle, selon une architecture RESTful conforme aux standards professionnels. Le sujet sera précisé avec le calendrier de la formation.",
    tags: ["Angular", "Java Spring", "RESTful"],
  },
  {
    title: "MY-ANKODE",
    summary: "Symfony 7 · architecture hybride",
    text: "Application complète avec interface Kanban, flux RSS, gestion de snippets et suivi de compétences. Architecture PostgreSQL et MongoDB, authentification sécurisée (bcrypt, CSRF, XSS), 135 tests PHPUnit dont 52 de sécurité, déploiement Docker.",
    tags: ["Symfony 7", "PHP 8.3", "PostgreSQL", "MongoDB", "Docker", "PHPUnit", "Kanban", "RSS"],
    url: "https://github.com/AnthonyCC-G/my-ankode",
  },
  { empty: true, message: "Peut-être un projet avec vous" },
];

const ICON_SLUG = {
  "PHP": "php", "Symfony 6/7": "symfony", "Docker": "docker", "Git / GitHub": "github",
  "PostgreSQL": "postgresql", "MongoDB": "mongodb", "HTML": "html5", "CSS": "css",
  "JavaScript": "javascript", "TypeScript": "typescript", "Java": "java", "Java SE": "java",
  "Java Spring Boot": "spring", "Java Spring Security": "spring", "Angular": "angular",
  "Express.js": "express", "Hibernate": "hibernate", "SQL Server": "microsoftsqlserver",
  "Transact SQL": "microsoftsqlserver", "Eclipse": "eclipse", "Visual Studio Code": "vscode",
  "Suite JetBrains": "jetbrains",
  "Outlook": "outlook", "OneNote": "onenote", "Excel": "excel", "Power BI": "powerbi",
  "Bash": "bash", "Claude": "claude", "Figma": "figma", "Firefox": "firefox",
  "MySQL": "mysql", "Trello": "trello", "Bootstrap": "bootstrap", "Google Chrome": "chrome",
};
function techIcon(name) {
  const slug = ICON_SLUG[name];
  if (!slug) return null;
  const img = new Image();
  img.className = "tech-ico";
  img.alt = "";
  img.width = 20;
  img.height = 20;
  img.addEventListener("error", () => img.remove());
  img.src = "assets/icons/" + slug + ".svg";
  return img;
}

const ENI_SKILLS = [
  ["Langages", ["Java", "SQL", "Transact SQL", "HTML", "CSS", "JavaScript", "TypeScript"]],
  ["Plateformes / Framework", ["Java SE", "Java Spring Boot", "Java Spring Security", "Angular", "Express.js"]],
  ["ORM", ["Hibernate"]],
  ["Bases de données", ["SQL Server", "MongoDB"]],
  ["Environnements", ["Eclipse", "Visual Studio Code", "Suite JetBrains"]],
  ["Méthodes", ["Modélisation des données", "Méthode agile (Scrum)", "UML"]],
  ["Sécurité", ["Chiffrement", "Hachage", "Acteurs de la sécurité"]],
  ["Tests", ["JUnit (introduction)"]],
];
const eniBox = document.getElementById("eni-skills");
ENI_SKILLS.forEach(([label, items]) => {
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  items.forEach((t) => {
    const s = document.createElement("span");
    s.className = "tag";
    const ic = techIcon(t);
    if (ic) s.append(ic);
    s.append(document.createTextNode(t));
    dd.appendChild(s);
  });
  eniBox.append(dt, dd);
});

const skillsBox = document.getElementById("skills");
const skillHint = document.getElementById("skills-hint");
const HINT_DEFAULT = skillHint.textContent;
function showSkill(text) {
  skillHint.textContent = text || HINT_DEFAULT;
  skillHint.classList.toggle("is-detail", Boolean(text));
}

function addSkillChip(s, box) {
  if (!s.detail) {
    const span = document.createElement("span");
    span.className = "chip chip--plain";
    span.textContent = s.name;
    const ic = techIcon(s.name);
    if (ic) span.prepend(ic);
    box.appendChild(span);
    return;
  }
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip chip--link";
  b.textContent = s.name;
  const ic2 = techIcon(s.name);
  if (ic2) b.prepend(ic2);
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => {
    const already = b.getAttribute("aria-pressed") === "true";
    document.querySelectorAll("#sec-skills button.chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    if (already) {
      showSkill("");
    } else {
      b.setAttribute("aria-pressed", "true");
      showSkill(s.name + " : " + s.detail);
    }
  });
  box.appendChild(b);
}
SKILLS.forEach((s) => addSkillChip(s, skillsBox));
MS.forEach((s) => addSkillChip(s, document.getElementById("skills-ms")));

function fillList(id, items) {
  document.getElementById(id).append(...items.map((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    return li;
  }));
}
fillList("skills-arch", ARCH);
fillList("skills-soft", SOFT);
const TOOLS = ["Visual Studio Code", "Bash", "Claude", "Figma", "Trello", "Bootstrap", "MySQL", "Google Chrome", "Firefox"];
document.getElementById("skills-tools").append(...TOOLS.map((t) => {
  const li = document.createElement("li");
  li.title = t;
  const ic = techIcon(t);
  if (ic) {
    ic.alt = t;
    ic.className = "tools__ico";
    ic.addEventListener("error", () => { li.textContent = t; li.classList.add("tools__txt"); });
    li.append(ic);
  } else {
    li.textContent = t;
    li.classList.add("tools__txt");
  }
  return li;
}));

const EMPLOYERS = [
  { name: "M.N.T.", city: "Villeneuve d'Ascq", logo: "assets/icons/Logo_MNT.png", mark: "MNT", tone: "gold", dates: "11/2016 – 02/2017",
    role: "Gestionnaire polyvalent en prévoyance",
    bullets: ["Contrôle de conformité des formulaires d'adhésion papier", "Aide à la mise en place digitalisée des données"] },
  { name: "Willis Towers Watson (anciennement Gras Savoye)", city: "Lille centre", logo: "assets/icons/Logo_Willis_Towers_Watson.png", mark: "WTW", tone: "blue", dates: "05/2017 – 05/2019",
    role: "Gestionnaire polyvalent",
    bullets: ["Affiliation, portabilité, radiation, gestion santé et tiers payant", "Relation client multicanale (entreprises et assurés)",
      "Paiement des factures des assurés, étude de devis, mise en place d'échéanciers", "Contrôle de conformité des adhésions collectives",
      "Régularisation et relances des impayés de cotisations (collectif et individuel)", "Mise à jour de la télétransmission Noémie"] },
  { name: "Verspieren", city: "Wasquehal", logo: "assets/icons/Logo_Verspieren.png", mark: "V", tone: "green", dates: "06/2018 – 09/2018", role: "Gestionnaire adhésion santé", bullets: ["Contrôle et mise en place des nouveaux assurés (contrats collectifs)"] },
  { name: "AG2R La Mondiale", city: "Mons-en-Barœul", logo: "assets/icons/Logo_Ag2r.png", mark: "AG2R", tone: "blue", dates: "02/2021 – 08/2021",
    role: "Gestionnaire prestations prévoyance",
    bullets: ["Traitement des prestations et gestion des réclamations", "Traitement des demandes de prestations des assurés collectifs", "Création de macros Office pour optimiser les processus internes"] },
  { name: "Groupama Gan Vie", city: "Lille centre", logo: "assets/icons/Logo_Groupama.png", mark: "GGV", tone: "green", dates: "11/2021 – 01/2022",
    role: "Gestionnaire épargne",
    bullets: ["Contrôle de conformité des demandes de rachat, normes LCB-FT", "Accompagnement téléphonique des assurés"] },
  { name: "Malakoff Humanis · AGIRC-ARRCO", city: "Lille Vauban", logo: "assets/icons/Logo_Malakoff_Humanis.png", mark: "MH", tone: "blue", dates: "02/2022 – 02/2026",
    role: "Référent et gestionnaire client individu",
    bullets: ["Expertise réglementaire et technique en retraite complémentaire", "Participation à la mise en place d'outils applicatifs et de nouveaux processus", "Rédaction de procédures métier et contribution aux actions de recette", "Tutorat des nouveaux entrants et accompagnement des équipes"] },
  { name: "Crédit Agricole", city: "Villeneuve d'Ascq", logo: "assets/icons/Logo_Credit_Agricole.png", mark: "CA", tone: "green", dates: "18/05/2026 – 04/09/2026",
    role: "Gestionnaire tarification",
    bullets: ["Propositions de tarification sur des contrats de prévoyance individuelle"] },
];

const empBox = document.getElementById("employers");
const empDetail = document.getElementById("employer-detail");
const SVGNS = "http://www.w3.org/2000/svg";

function badge(e) {
  if (e.logo) {
    const img = document.createElement("img");
    img.className = "emp__logo"; img.alt = ""; img.width = 110; img.height = 72;
    img.addEventListener("error", () => img.replaceWith(monogram(e)));
    img.src = e.logo;
    return img;
  }
  return monogram(e);
}

function monogram(e) {
  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("width", "56");
  svg.setAttribute("height", "56");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const r = document.createElementNS(SVGNS, "rect");
  r.setAttribute("x", "2"); r.setAttribute("y", "2"); r.setAttribute("width", "60"); r.setAttribute("height", "60"); r.setAttribute("rx", "14");
  r.setAttribute("class", "mk mk--" + e.tone);
  const t = document.createElementNS(SVGNS, "text");
  t.setAttribute("x", "32"); t.setAttribute("y", "33");
  t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central");
  t.setAttribute("class", "mk-t mk-t--" + e.tone);
  t.setAttribute("font-size", e.mark.length > 3 ? "15" : "19");
  t.textContent = e.mark;
  svg.append(r, t);
  return svg;
}

function showEmployer(e, btn) {
  empBox.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  const where = document.createElement("p"); where.className = "emp-where"; where.textContent = e.name + " · " + e.city;
  const head = document.createElement("div"); head.className = "emp-head";
  const h = document.createElement("h3"); h.textContent = e.role;
  const d = document.createElement("span"); d.className = "k"; d.textContent = e.dates;
  head.append(h, d);
  empDetail.replaceChildren(where, head);
  if (e.bullets.length) {
    const ul = document.createElement("ul");
    e.bullets.forEach((b) => { const li = document.createElement("li"); li.textContent = b; ul.appendChild(li); });
    empDetail.appendChild(ul);
  }
}

EMPLOYERS.forEach((e) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "emp";
  b.setAttribute("aria-pressed", "false");
  b.setAttribute("aria-label", e.name + ", " + e.city + ", " + e.dates);
  b.append(badge(e));
  b.addEventListener("click", () => showEmployer(e, b));
  empBox.appendChild(b);
});
const defIdx = EMPLOYERS.findIndex((x) => x.name.startsWith("Malakoff"));
showEmployer(EMPLOYERS[defIdx], empBox.children[defIdx]);

const dialog = document.getElementById("project-dialog");
const projectsBox = document.getElementById("projects");

PROJECTS.forEach((p) => {
  if (p.empty) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.textContent = p.message;
    const dots = document.createElement("span");
    dots.className = "dots";
    dots.setAttribute("aria-hidden", "true");
    dots.innerHTML = "<i></i><i></i><i></i>";
    slot.append(dots);
    projectsBox.appendChild(slot);
    return;
  }
  const b = document.createElement("button");
  b.type = "button";
  b.className = "pcard";
  const title = document.createElement("strong");
  title.textContent = p.title;
  const sum = document.createElement("span");
  sum.textContent = p.summary;
  const more = document.createElement("span");
  more.className = "more";
  more.textContent = "Voir le détail";
  if (p.badge) {
    const pill = document.createElement("span");
    pill.className = "pill pill--soon";
    pill.textContent = p.badge;
    title.append(" ", pill);
  }
  b.append(title, sum, more);
  b.addEventListener("click", () => {
    document.getElementById("pd-title").textContent = p.title;
    document.getElementById("pd-text").textContent = p.text;
    const tags = document.getElementById("pd-tags");
    tags.replaceChildren(...p.tags.map((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      return li;
    }));
    const link = document.getElementById("pd-link");
    link.replaceChildren();
    if (p.url) {
      const a = document.createElement("a");
      a.className = "ext";
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Voir le code sur GitHub (nouvel onglet)";
      link.appendChild(a);
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
  projectsBox.appendChild(b);
});

const sections = Array.from(document.querySelectorAll(".main details.acc"));
const infoSection = document.getElementById("sec-info");

const target = document.getElementById(location.hash.slice(1));
if (target && target.matches("details.acc")) target.open = true;

const firstSection = sections[0];
function ensureOneOpen() {
  if (!sections.some((d) => d.open)) firstSection.open = true;
}
if (!sections.some((d) => d.open)) firstSection.open = true;
sections.forEach((d) => d.addEventListener("toggle", ensureOneOpen));

sections.forEach((d) => {
  const sum = d.querySelector(":scope > summary");
  if (sum) sum.addEventListener("click", (e) => { if (d.open) e.preventDefault(); });
});

const root = document.documentElement;
const themeBtn = document.getElementById("btn-theme");
const themeLabel = document.getElementById("theme-label");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}
function applyTheme(t) {
  root.dataset.theme = t;
  const dark = t === "dark";
  themeBtn.setAttribute("aria-pressed", String(dark));
  themeLabel.textContent = dark ? "Mode clair" : "Mode sombre";
  themeBtn.title = themeLabel.textContent;
}
try {
  const saved = localStorage.getItem("cv-theme");
  if (saved === "dark" || saved === "light") root.dataset.theme = saved;
} catch (e) {}
applyTheme(currentTheme());

themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("cv-theme", next); } catch (e) {}
});

(function () {
  const v = document.getElementById("hero-video");
  const ctl = document.getElementById("hero-ctl");
  const ico = document.getElementById("hero-ico");
  if (!v || !ctl) return;
  const SRC = "assets/ankode-web.mp4";
  const PLAY = "M8 5v14l11-7z", PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z", REPLAY = "M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  function state(s) {
    const map = { play: [PLAY, "Lancer l'animation"], pause: [PAUSE, "Mettre l'animation en pause"], replay: [REPLAY, "Rejouer l'animation"] };
    ico.setAttribute("d", map[s][0]);
    ctl.setAttribute("aria-label", map[s][1]);
  }
  function load() { if (!v.getAttribute("src")) v.src = SRC; }
  const side = document.querySelector(".side");
  const grow = (on) => side && side.classList.toggle("is-playing", on);

  const closeInfo = () => { if (infoSection) infoSection.open = false; };
  v.addEventListener("play", () => { closeInfo(); state("pause"); grow(true); });
  v.addEventListener("pause", () => { if (!v.ended) state("play"); grow(false); });
  v.addEventListener("ended", () => { state("replay"); grow(false); });
  function toggle() {
    closeInfo();
    load();
    if (v.ended) v.currentTime = 0;
    v.paused ? v.play().catch(() => {}) : v.pause();
  }
  ctl.addEventListener("click", toggle);
  v.addEventListener("click", toggle);
  state("play");
  window.addEventListener("load", () => {
    if (reduce.matches) { return; }
    load();
    v.play().catch(() => state("play"));
  });
})();

(function () {
  const item = document.getElementById("mail-item");
  const link = document.getElementById("mail");
  if (!item || !link) return;
  const addr = ["Anthonycandidature", "protonmail.com"].join("@");
  link.href = "mailto:" + addr;
  link.textContent = addr;
  item.hidden = false;
})();
