/**
 * Byahe ni Long - Digital Business Card Logic
 * -------------------------------------------
 * Handles interactive elements, vCard generation, gallery filtering,
 * lightbox navigation (Next/Prev/Swipe/Keys), and dynamic configuration.
 */

let activeCategory = "all";
let currentFilteredItems = [];
let currentLightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Configuration
  const config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : null;
  if (!config) {
    console.warn("SITE_CONFIG not found. Relying on static HTML fallback.");
    return;
  }

  // 2. Render Dynamic Content
  renderBrandDetails(config);
  initGallerySystem(config);
  renderSocialChannels(config.socials || []);
  setupContactFeatures(config.contact, config.brand);
  setupLightbox();
  setupSmoothScroll();
});

/**
 * Render brand texts and official main banner image
 */
function renderBrandDetails(config) {
  const brand = config.brand || {};
  const contact = config.contact || {};
  const footer = config.footer || {};

  // Official Brand / Main Banner Image
  const bannerPath = brand.mainBanner || brand.avatar || "assets/images/main-banner.jpg";
  const mainBannerEl = document.getElementById("heroMainBannerImg");
  if (mainBannerEl && bannerPath) {
    mainBannerEl.onerror = () => {
      if (!mainBannerEl.src.includes("main-banner.jpg")) {
        mainBannerEl.src = "assets/images/main-banner.jpg";
      } else {
        mainBannerEl.src = "assets/images/main%20banner.jpg";
      }
    };
    mainBannerEl.src = bannerPath;
  }

  const topNavAvatar = document.getElementById("topNavAvatar");
  if (topNavAvatar && bannerPath) {
    topNavAvatar.onerror = () => {
      topNavAvatar.src = "assets/images/main-banner.jpg";
    };
    topNavAvatar.src = bannerPath;
  }

  // Hero Texts
  const heroTitle = document.getElementById("heroBrandTitle");
  if (heroTitle && brand.name) heroTitle.textContent = brand.name;

  const topNavBrandName = document.getElementById("topNavBrandName");
  if (topNavBrandName && brand.name) topNavBrandName.textContent = brand.name;

  const heroTagline = document.getElementById("heroTagline");
  if (heroTagline && brand.tagline) heroTagline.textContent = brand.tagline;

  const heroIntro = document.getElementById("heroIntro");
  if (heroIntro && brand.shortIntro) heroIntro.textContent = brand.shortIntro;

  const heroBadge = document.getElementById("heroBadgeText");
  if (heroBadge && brand.badgeText) heroBadge.textContent = brand.badgeText;

  // About Section
  const aboutHeading = document.getElementById("aboutHeading");
  if (aboutHeading && brand.aboutHeading) aboutHeading.textContent = brand.aboutHeading;

  const aboutBio = document.getElementById("aboutBio");
  if (aboutBio && brand.aboutBio) aboutBio.textContent = brand.aboutBio;

  // Contact Section Details
  const contactNumberDisplay = document.getElementById("contactNumberDisplay");
  if (contactNumberDisplay && contact.phoneDisplay) {
    contactNumberDisplay.textContent = contact.phoneDisplay;
  }

  const callBtn = document.getElementById("btnCallNow");
  if (callBtn && contact.phoneTel) {
    callBtn.href = `tel:${contact.phoneTel}`;
  }

  const smsBtn = document.getElementById("btnSendSms");
  if (smsBtn && contact.phoneSms) {
    smsBtn.href = `sms:${contact.phoneSms}`;
  }

  // Floating Dock Buttons
  const dockCall = document.getElementById("dockCallBtn");
  if (dockCall && contact.phoneTel) {
    dockCall.href = `tel:${contact.phoneTel}`;
  }

  const dockSms = document.getElementById("dockSmsBtn");
  if (dockSms && contact.phoneSms) {
    dockSms.href = `sms:${contact.phoneSms}`;
  }

  // Footer
  const footerBrand = document.getElementById("footerBrand");
  if (footerBrand && (footer.brandName || brand.name)) {
    footerBrand.textContent = footer.brandName || brand.name;
  }

  const footerClosing = document.getElementById("footerClosing");
  if (footerClosing && (footer.closingMessage || brand.tagline)) {
    footerClosing.textContent = footer.closingMessage || brand.tagline;
  }

  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Initialize Gallery Filter Tabs and Render Grid
 */
function initGallerySystem(config) {
  const allGalleryItems = config.gallery || [];
  const categories = config.galleryCategories || [
    { id: "all", name: "Lahat" },
  ];

  const filterTabsContainer = document.getElementById("galleryFilterTabs");
  if (filterTabsContainer && categories.length > 0) {
    filterTabsContainer.innerHTML = "";

    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filter-tab-btn ${cat.id === activeCategory ? "active" : ""}`;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", cat.id === activeCategory ? "true" : "false");

      // Count items in category
      const count =
        cat.id === "all"
          ? allGalleryItems.length
          : allGalleryItems.filter((item) => item.category === cat.id).length;

      btn.innerHTML = `
        <span>${escapeHtml(cat.name)}</span>
        <span class="filter-tab-count">${count}</span>
      `;

      btn.addEventListener("click", () => {
        activeCategory = cat.id;
        document.querySelectorAll(".filter-tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        applyGalleryFilter(allGalleryItems);
      });

      filterTabsContainer.appendChild(btn);
    });
  }

  // Initial render
  applyGalleryFilter(allGalleryItems);
}

/**
 * Filter items and re-render gallery grid
 */
function applyGalleryFilter(allGalleryItems) {
  if (activeCategory === "all") {
    currentFilteredItems = [...allGalleryItems];
  } else {
    currentFilteredItems = allGalleryItems.filter(
      (item) => item.category === activeCategory
    );
  }
  renderGalleryGrid(currentFilteredItems);
}

/**
 * Render Adventure Gallery Items in Responsive Grid
 */
function renderGalleryGrid(items) {
  const container = document.getElementById("galleryGrid");
  if (!container) return;

  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--c-text-muted);">
        Walang nakitang litrato sa kategoryang ito.
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Tingnan ang litrato: ${item.title || item.destination}`
    );

    const destLabel = item.destination || item.caption || "Byahe";

    card.innerHTML = `
      <div class="gallery-card-img-wrap">
        <img
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(item.title || destLabel)} - Byahe ni Long"
          class="gallery-card-img"
          loading="lazy"
          onerror="this.src='assets/images/main-banner.jpg'"
        />
        <span class="gallery-dest-tag">📍 ${escapeHtml(destLabel)}</span>
      </div>
      <div class="gallery-card-body">
        <h3 class="gallery-card-title">${escapeHtml(item.title)}</h3>
        <p class="gallery-card-caption">${escapeHtml(item.caption || item.destination)}</p>
        <div class="gallery-card-action">
          <span>I-tap para sa full view</span>
          <span>&rarr;</span>
        </div>
      </div>
    `;

    // Click & Keyboard support for Lightbox
    const openCardLightbox = () => openLightboxAtIndex(index);
    card.addEventListener("click", openCardLightbox);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCardLightbox();
      }
    });

    container.appendChild(card);
  });
}

/**
 * Render Additional Social Media Channels
 * Follows uniform button styling, spacing, colors, and typography.
 * Ignores empty URLs.
 */
function renderSocialChannels(socials) {
  const container = document.getElementById("moreSocialsGrid");
  const wrapper = document.getElementById("moreSocialsWrapper");
  if (!container || !wrapper) return;

  // Filter secondary socials with valid configured URLs
  const activeSecondarySocials = socials.filter(
    (s) => !s.isPrimary && s.url && s.url.trim().length > 0
  );

  if (activeSecondarySocials.length === 0) {
    wrapper.style.display = "none";
    return;
  }

  wrapper.style.display = "block";
  container.innerHTML = "";

  activeSecondarySocials.forEach((social) => {
    const card = document.createElement("a");
    card.href = social.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "social-pill-card";
    card.setAttribute(
      "aria-label",
      social.label || `Bisitahin ang ${social.name}`
    );

    const iconSvg = getSocialIconSvg(social.id);

    card.innerHTML = `
      <div class="social-icon-box">
        ${iconSvg}
      </div>
      <div>
        <div style="font-weight: 700; color: var(--c-forest-900); font-size: 0.92rem;">${escapeHtml(social.name)}</div>
        <div style="font-size: 0.76rem; color: var(--c-text-muted);">${escapeHtml(social.handle || "Byahe ni Long")}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Contact Features: vCard Export & Copy to Clipboard
 */
function setupContactFeatures(contactConfig, brandConfig) {
  const copyBtn = document.getElementById("btnCopyPhone");
  const phoneValueEl = document.getElementById("contactNumberDisplay");
  const vcardBtn = document.getElementById("btnSaveVCard");

  const phoneText = (contactConfig && contactConfig.phoneDisplay) || "0956 092 9225";

  // Copy Phone Number
  const copyAction = async () => {
    const cleanNumber = phoneText.replace(/\s+/g, "");
    try {
      await navigator.clipboard.writeText(cleanNumber);
      showToast("Kinopya ang numero: " + phoneText);
    } catch (err) {
      const input = document.createElement("input");
      input.value = cleanNumber;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast("Kinopya ang numero: " + phoneText);
    }
  };

  if (copyBtn) copyBtn.addEventListener("click", copyAction);
  if (phoneValueEl) phoneValueEl.addEventListener("click", copyAction);

  // Generate & Download .vcf (vCard) Contact Card for NFC tap
  if (vcardBtn) {
    vcardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadVCard(contactConfig, brandConfig);
    });
  }
}

/**
 * Creates and downloads a vCard file for mobile phones
 */
function downloadVCard(contactConfig, brandConfig) {
  const vCardDetails = contactConfig?.cardVCard || {};
  const phone = contactConfig?.phoneTel || "+639560929225";
  const name = brandConfig?.name || "Byahe ni Long";
  const note = vCardDetails.note || "Mga Lakad, Tanawin, at Kwentong Baon. | https://www.facebook.com/ByaheNiLong";
  const fbUrl = "https://www.facebook.com/ByaheNiLong";

  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:Byahe ni Long;Long;;;`,
    `ORG:${name}`,
    `TITLE:${vCardDetails.title || "Travel Content Creator"}`,
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `URL:${fbUrl}`,
    `NOTE:${note}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", "ByaheNiLong.vcf");
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast("Na-download ang Contact Card (vCard)!");
}

/**
 * Interactive Lightbox Modal setup with Next / Prev / Swipe / Keys
 */
function setupLightbox() {
  const modal = document.getElementById("galleryLightboxModal");
  const overlay = document.getElementById("lightboxOverlay");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPreviousPhoto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextPhoto();
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPreviousPhoto();
    } else if (e.key === "ArrowRight") {
      showNextPhoto();
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    },
    { passive: true }
  );

  function handleSwipeGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        showPreviousPhoto(); // swipe right = previous
      } else {
        showNextPhoto(); // swipe left = next
      }
    }
  }
}

function openLightboxAtIndex(index) {
  if (!currentFilteredItems || !currentFilteredItems.length) return;

  currentLightboxIndex = (index + currentFilteredItems.length) % currentFilteredItems.length;
  updateLightboxContent();

  const modal = document.getElementById("galleryLightboxModal");
  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function showNextPhoto() {
  if (!currentFilteredItems || !currentFilteredItems.length) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredItems.length;
  updateLightboxContent();
}

function showPreviousPhoto() {
  if (!currentFilteredItems || !currentFilteredItems.length) return;
  currentLightboxIndex =
    (currentLightboxIndex - 1 + currentFilteredItems.length) %
    currentFilteredItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = currentFilteredItems[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById("lightboxImg");
  const title = document.getElementById("lightboxTitle");
  const loc = document.getElementById("lightboxLocation");
  const caption = document.getElementById("lightboxCaption");
  const counter = document.getElementById("lightboxCounter");

  if (img) {
    img.src = item.image;
    img.alt = item.title || item.destination;
  }
  if (title) title.textContent = item.title;
  if (loc) loc.textContent = `📍 ${item.destination || "Adventure"}`;
  if (caption) caption.textContent = item.caption || item.destination || "";
  if (counter) {
    counter.textContent = `${currentLightboxIndex + 1} / ${currentFilteredItems.length}`;
  }
}

/**
 * Toast notification banner
 */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/**
 * Smooth scrolling helper
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

/**
 * Icon helpers
 */
function getSocialIconSvg(platform) {
  switch (platform) {
    case "instagram":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
    case "tiktok":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.29.95.17 1.98-.07 2.75-.68.61-.48.99-1.2 1.04-1.98.02-3.32.01-6.64.01-9.96 0-3.33 0-6.66-.01-9.99z"/></svg>`;
    case "youtube":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
    default:
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
