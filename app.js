const latestCoursesRoot = document.querySelector("#latest-courses");
const catalogGrid = document.querySelector("#catalog-grid");
const catalogEmpty = document.querySelector("#catalog-empty");
const searchInput = document.querySelector("#course-search");
const embeddedCourses = document.querySelector("#courses-data");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const clockIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5"></circle>
    <path d="M12 7.5v5l3 1.8"></path>
  </svg>
`;

const visualMap = {
  spring: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="springLeaf-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#83d56f" />
          <stop offset="100%" stop-color="#2d9b47" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="92" cy="95" r="38" fill="url(#springLeaf-${id})" opacity="0.18" />
      <path d="M82 120c27-8 43-26 46-57-25 3-45 17-57 41 8-1 15-4 21-9-4 11-10 18-19 25z" fill="url(#springLeaf-${id})" />
      <path d="M84 103c17 2 30-5 42-20" fill="none" stroke="#f7f1ff" stroke-width="4.2" stroke-linecap="round" />
      <circle cx="96" cy="93" r="4.5" fill="#f7f1ff" />
      <rect x="154" y="66" width="90" height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x="154" y="88" width="76" height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x="154" y="110" width="96" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  kafka: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="kafka-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c08cff" />
          <stop offset="100%" stop-color="#68329e" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="84" cy="96" r="10" fill="url(#kafka-${id})" />
      <circle cx="120" cy="66" r="10" fill="url(#kafka-${id})" />
      <circle cx="120" cy="126" r="10" fill="url(#kafka-${id})" />
      <circle cx="158" cy="96" r="10" fill="url(#kafka-${id})" />
      <path d="M94 96h54m-28-22l18 16m-18 28l18-16" fill="none" stroke="#f7f1ff" stroke-width="4.5" stroke-linecap="round" />
      <circle cx="84" cy="96" r="22" fill="none" stroke="rgba(192,140,255,0.28)" stroke-width="2.5" />
      <rect x="188" y="70" width="72" height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x="188" y="92" width="84" height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x="188" y="114" width="60" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  python: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="python-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#84c8ff" />
          <stop offset="100%" stop-color="#3766a8" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <rect x="58" y="58" width="56" height="56" rx="20" fill="url(#python-${id})" />
      <rect x="102" y="78" width="56" height="56" rx="20" fill="#f3b27a" />
      <circle cx="82" cy="86" r="4.5" fill="#f7f1ff" />
      <circle cx="134" cy="108" r="4.5" fill="#1a1020" />
      <rect x="186" y="68" width="78" height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x="186" y="90" width="90" height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x="186" y="112" width="64" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  react: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="react-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#85e7ff" />
          <stop offset="100%" stop-color="#2b6d8f" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="110" cy="95" r="10" fill="#f7f1ff" />
      <ellipse cx="110" cy="95" rx="48" ry="18" fill="none" stroke="url(#react-${id})" stroke-width="5" />
      <ellipse cx="110" cy="95" rx="48" ry="18" transform="rotate(60 110 95)" fill="none" stroke="url(#react-${id})" stroke-width="5" />
      <ellipse cx="110" cy="95" rx="48" ry="18" transform="rotate(-60 110 95)" fill="none" stroke="url(#react-${id})" stroke-width="5" />
      <rect x="186" y="68" width="76" height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x="186" y="90" width="88" height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x="186" y="112" width="68" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  angular: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="angular-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff7f8d" />
          <stop offset="100%" stop-color="#92344f" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <path d="M110 54l42 14-6 56-36 20-36-20-6-56z" fill="url(#angular-${id})" />
      <path d="M110 74l18 44h-12l-3-8h-18l-3 8H80l18-44zm-6 27h12l-6-16z" fill="#f7f1ff" />
      <rect x="186" y="68" width="70" height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x="186" y="90" width="84" height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x="186" y="112" width="72" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  microservices: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="micro-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7bd1ff" />
          <stop offset="100%" stop-color="#5478dd" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <path d="M76 118h100c14 0 24-8 24-20 0-10-8-18-19-19-2-20-17-33-36-33-17 0-31 10-35 26-4-3-9-5-15-5-13 0-24 10-24 23 0 16 12 28 29 28z" fill="url(#micro-${id})" />
      <circle cx="92" cy="96" r="9" fill="#f7f1ff" />
      <circle cx="126" cy="96" r="9" fill="#f7f1ff" opacity="0.9" />
      <circle cx="160" cy="96" r="9" fill="#f7f1ff" opacity="0.8" />
      <path d="M101 96h16m18 0h16" stroke="#5478dd" stroke-width="4" stroke-linecap="round" />
      <rect x="214" y="72" width="44" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
      <rect x="214" y="92" width="54" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
    </svg>
  `,
  docker: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="docker-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#79d3ff" />
          <stop offset="100%" stop-color="#2d7bcf" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <rect x="72" y="84" width="20" height="16" rx="4" fill="url(#docker-${id})" />
      <rect x="96" y="84" width="20" height="16" rx="4" fill="url(#docker-${id})" />
      <rect x="120" y="84" width="20" height="16" rx="4" fill="url(#docker-${id})" />
      <rect x="96" y="64" width="20" height="16" rx="4" fill="url(#docker-${id})" />
      <path d="M68 106h82c0 14-12 24-27 24H90c-13 0-22-10-22-24z" fill="url(#docker-${id})" />
      <path d="M156 89c7-8 15-10 24-6-3 7-9 11-18 12" fill="none" stroke="#f7f1ff" stroke-width="4" stroke-linecap="round" />
      <rect x="200" y="72" width="58" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="200" y="92" width="72" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="200" y="112" width="46" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  kubernetes: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="k8s-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9ac4ff" />
          <stop offset="100%" stop-color="#4479d9" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <path d="M110 56l34 20v38l-34 20-34-20V76z" fill="url(#k8s-${id})" />
      <circle cx="110" cy="95" r="12" fill="#f7f1ff" />
      <path d="M110 67v16m0 24v16m28-28h-16m-24 0H82m20-20l8 8m16 16l8 8m0-48l-8 8m-16 16l-8 8" stroke="#4479d9" stroke-width="4" stroke-linecap="round" />
      <rect x="192" y="70" width="66" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="192" y="90" width="84" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="192" y="110" width="58" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  postgres: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="postgres-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8ab0ff" />
          <stop offset="100%" stop-color="#2f5ea8" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <ellipse cx="106" cy="68" rx="34" ry="14" fill="url(#postgres-${id})" />
      <path d="M72 68v42c0 8 15 14 34 14s34-6 34-14V68" fill="url(#postgres-${id})" opacity="0.95" />
      <ellipse cx="106" cy="110" rx="34" ry="14" fill="rgba(255,255,255,0.15)" />
      <path d="M144 82c13-8 24-9 34-5-8 3-14 8-19 16" fill="none" stroke="#f7f1ff" stroke-width="4" stroke-linecap="round" />
      <rect x="194" y="70" width="70" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="194" y="90" width="82" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="194" y="110" width="52" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  java: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="java-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f2b07c" />
          <stop offset="100%" stop-color="#b85e37" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="92" cy="94" r="34" fill="url(#java-${id})" opacity="0.95" />
      <path d="M84 103c9-5 17-5 25 0m-21-22c7 4 15 4 22 0m-11-18c10 10 10 22 0 32" fill="none" stroke="#f7f1ff" stroke-width="4.5" stroke-linecap="round" />
      <path d="M74 118h36" stroke="#f7f1ff" stroke-width="4" stroke-linecap="round" />
      <rect x="154" y="68" width="92" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="154" y="88" width="76" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="154" y="108" width="104" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  testing: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="testing-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9fe27a" />
          <stop offset="100%" stop-color="#4f9c4b" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <rect x="72" y="68" width="84" height="54" rx="14" fill="url(#testing-${id})" />
      <path d="M94 94l10 10 24-26" fill="none" stroke="#f7f1ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="188" cy="78" r="10" fill="#f3b27a" />
      <circle cx="214" cy="96" r="10" fill="#f3b27a" opacity="0.8" />
      <circle cx="188" cy="114" r="10" fill="#f3b27a" opacity="0.6" />
      <rect x="226" y="74" width="34" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="226" y="94" width="44" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="226" y="114" width="28" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  aws: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="aws-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffcb7d" />
          <stop offset="100%" stop-color="#ef8b2d" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <path d="M80 118h66c15 0 26-9 26-21 0-11-9-19-21-20-3-18-17-30-34-30-18 0-31 10-35 26-4-3-8-4-14-4-12 0-22 9-22 22 0 15 13 27 34 27z" fill="url(#aws-${id})" />
      <path d="M78 136c26 10 53 11 82 0" fill="none" stroke="#f7f1ff" stroke-width="4" stroke-linecap="round" />
      <path d="M154 132l10 8" fill="none" stroke="#f7f1ff" stroke-width="3.5" stroke-linecap="round" />
      <rect x="196" y="72" width="64" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="196" y="92" width="76" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="196" y="112" width="52" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `,
  node: (id) => `
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="node-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#98dd7e" />
          <stop offset="100%" stop-color="#4e9846" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <path d="M110 54l40 22v38l-40 22-40-22V76z" fill="url(#node-${id})" />
      <path d="M110 67l26 14v28l-26 14-26-14V81z" fill="none" stroke="#f7f1ff" stroke-width="4" />
      <path d="M110 80v30m-12-22l24 14" stroke="#f7f1ff" stroke-width="4" stroke-linecap="round" />
      <rect x="192" y="70" width="68" height="8" rx="4" fill="rgba(255,255,255,0.82)" />
      <rect x="192" y="90" width="80" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="192" y="110" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  `
};

const formatPrice = (price) => `USD ${price}`;
const formatRating = (rating) => rating.toFixed(1);

const createCourseCard = (course, variant = "catalog") => {
  const isLatest = variant === "latest";
  const wrapperClass = isLatest ? "course-card" : "market-card";
  const visualClass = isLatest ? "course-visual" : "market-visual";
  const bodyClass = isLatest ? "course-body" : "market-body";
  const titleTag = isLatest ? "h2" : "h3";
  const metaClass = isLatest ? "course-meta" : "market-meta";
  const priceMarkup = isLatest ? "" : `<div class="market-price">${formatPrice(course.price)}</div>`;

  return `
    <article class="${wrapperClass}">
      <div class="${visualClass}">
        ${visualMap[course.visual](course.id)}
      </div>
      <div class="${bodyClass}">
        <span class="course-tag">${escapeHtml(course.category)}</span>
        <${titleTag}>${escapeHtml(course.title)}</${titleTag}>
        <div class="${metaClass}">
          <span class="meta-item">
            ${clockIcon}
            ${escapeHtml(course.duration)}
          </span>
          <span class="meta-item rating">
            <span class="rating-number">${formatRating(course.rating)}</span>
            <span class="stars" style="--score: ${course.rating};" aria-label="${formatRating(course.rating)} de 5 estrellas"></span>
          </span>
        </div>
        ${priceMarkup}
      </div>
    </article>
  `;
};

const renderLatestCourses = (courses) => {
  const latest = courses.filter((course) => course.latest).slice(0, 3);
  if (!latestCoursesRoot || latest.length === 0) {
    return;
  }

  const radios = latest
    .map(
      (course, index) => `
        <input ${index === 0 ? "checked" : ""} type="radio" name="course-slider" id="course-${index + 1}">
      `
    )
    .join("");

  const cards = latest.map((course) => createCourseCard(course, "latest")).join("");

  const arrows = latest
    .map((_, index) => {
      const previous = index === 0 ? latest.length : index;
      const next = index === latest.length - 1 ? 1 : index + 2;
      return `
        <div class="arrows arrows-${index + 1}">
          <label for="course-${previous}" class="arrow" aria-label="Curso anterior">‹</label>
          <label for="course-${next}" class="arrow" aria-label="Siguiente curso">›</label>
        </div>
      `;
    })
    .join("");

  const dots = latest
    .map(
      (_, index) => `<label for="course-${index + 1}" class="dot" aria-label="Ver curso ${index + 1}"></label>`
    )
    .join("");

  latestCoursesRoot.innerHTML = `
    ${radios}
    <div class="carousel-viewport">
      <div class="carousel-track">
        ${cards}
      </div>
    </div>
    <div class="carousel-controls">
      ${arrows}
      <div class="dots" aria-label="Seleccion de cursos">
        ${dots}
      </div>
    </div>
  `;
};

const renderCatalog = (courses) => {
  if (!catalogGrid || !catalogEmpty) {
    return;
  }

  catalogGrid.innerHTML = courses.map((course) => createCourseCard(course, "catalog")).join("");
  catalogEmpty.hidden = courses.length > 0;
};

const setupSearch = (courses) => {
  if (!searchInput) {
    renderCatalog(courses);
    return;
  }

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderCatalog(courses);
      return;
    }

    const filtered = courses.filter((course) => {
      const haystack = [
        course.title,
        course.category,
        course.duration,
        ...(course.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });

    renderCatalog(filtered);
  };

  searchInput.addEventListener("input", applyFilter);
  renderCatalog(courses);
};

const init = async () => {
  try {
    let courses = [];

    try {
      const response = await fetch("courses.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      courses = await response.json();
    } catch (fetchError) {
      if (embeddedCourses?.textContent) {
        courses = JSON.parse(embeddedCourses.textContent);
      } else {
        throw fetchError;
      }
    }

    renderLatestCourses(courses);
    setupSearch(courses);
  } catch (error) {
    console.error("No se pudo cargar el catalogo de cursos", error);
    if (catalogEmpty) {
      catalogEmpty.hidden = false;
      catalogEmpty.textContent = "No fue posible cargar el catalogo de cursos.";
    }
  }
};

init();
