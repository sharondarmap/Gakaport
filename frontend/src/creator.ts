import "./style.css"
import loadNavbar from "./components/navbar"
import { getCreatorById, getCreatorWorks } from "../services/creatorService"
import { SleepModal } from "./components/sleepModal"
import type { Creator, CreatorWork } from "../data/creators"

loadNavbar()

// Get creator ID from URL
function getCreatorIdFromURL(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get("id")
}

// Format numbers
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
  if (num >= 1000) return (num / 1000).toFixed(1) + "K"
  return num.toString()
}

// Create work card for free works with design system styling
function createWorkCard(work: CreatorWork): string {
  const genresBadges = work.genres.map((genre) => `<span class="badge">${genre}</span>`).join("")

  return `
    <div class="card-works">
      <a href="/work.html?id=${work.id}" class="card-link">
        <div class="card-works-image-container">
          <img 
            src="${work.cover}" 
            alt="${work.title}" 
          />
          <!-- Badge positioned as overlay on image -->
          <div class="card-works-badges">
            ${genresBadges}
          </div>
        </div>
        <div class="card-works-content">
          <h3 class="card-works-title">${work.title}</h3>
          <p class="card-works-sub">${work.status || "Ongoing"}</p>
        </div>
      </a>
    </div>
  `
}

// Create premium work card (locked) with design system styling
function createPremiumWorkCard(work: CreatorWork): string {
  const genresBadges = work.genres.map((genre) => `<span class="badge">${genre}</span>`).join("")

  return `
    <div class="card-works card-works-locked">
      <a href="#" class="card-link" onclick="return false;">
        <div class="card-works-image-container">
          <img 
            src="${work.cover}" 
            alt="${work.title}" 
            style="filter: brightness(0.5);"
          />
          <div class="card-works-badges">
            ${genresBadges}
          </div>
          <!-- Lock icon overlay for premium cards -->
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3);">
            <svg class="w-8 h-8 text-white" style="width: 32px; height: 32px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
        <div class="card-works-content">
          <h3 class="card-works-title">${work.title}</h3>
          <p class="card-works-sub">${work.status || "Completed"}</p>
        </div>
      </a>
    </div>
  `
}

// Render creator profile
function renderCreatorProfile(creator: Creator, works: CreatorWork[]): string {
  const freeWorks = works.filter((w) => !w.isPremium)
  const premiumWorks = works.filter((w) => w.isPremium)

  const freeWorksSection =
    freeWorks.length > 0
      ? `
    <section class="space-y-4">
      <h2 class="heading-2 mx-[24px]" style="color: var(--primary-blue);">Karya Gratis</h2>
      <div class="section-grid">
        ${freeWorks.map(createWorkCard).join("")}
      </div>
    </section>
  `
      : ""

  const premiumWorksSection =
    premiumWorks.length > 0
      ? `
    <section class="space-y-4">
      <h2 class="heading-2 mx-[24px]" style="color: var(--primary-blue);">Karya Eksklusif</h2>
      <div class="section-grid">
        ${premiumWorks.map(createPremiumWorkCard).join("")}
      </div>
    </section>
  `
      : ""

  return `
    <main style="margin: 0 auto; padding-top: 128px; padding-bottom: 24px;">
      <!-- Profile Header -->
      <div style="text-align: center; margin-bottom: 48px;">
        <img 
          src="${creator.image}" 
          alt="${creator.name}" 
          style="width: 128px; height: 128px; border-radius: 9999px; object-fit: cover; margin: 0 auto 24px;"
        />
        <h1 class="heading-1" style="margin-bottom: 12px;">${creator.name}</h1>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--neutral-600); margin-bottom: 24px;">
          <svg class="w-5 h-5" style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span style="font-weight: 500;">${formatNumber(creator.followers || 0)}</span>
        </div>

        <p class="body-1" style="margin-bottom: 32px; max-width: 672px; margin-left: auto; margin-right: auto; color: var(--neutral-700);">
          ${creator.bio || creator.description}
        </p>

        <button class="btn-main" style="width: 100%; max-width: 320px; margin-left: auto; margin-right: auto; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;" id="let-me-sleep-btn">
          <span style="font-size: 18px;">🌙</span>
          Let Me Sleep
        </button>
        <p class="body-2" style="color: var(--neutral-600);">Support me so I can sleep.</p>
      </div>

      <!-- Works Sections -->
      <div style="display: flex; flex-direction: column; gap: 48px;">
        ${freeWorksSection}
        ${premiumWorksSection}
      </div>
    </main>
  `
}

function renderNotFound(message: string): string {
  return `
    <main style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding-left: 24px; padding-right: 24px;">
      <div style="text-align: center;">
        <h1 class="heading-1" style="margin-bottom: 16px;">Kreator Tidak Ditemukan</h1>
        <p style="color: var(--neutral-600); margin-bottom: 32px;">${message}</p>
        <a href="/" class="btn-main" style="display: inline-block;">Kembali ke Beranda</a>
      </div>
    </main>
  `
}

function renderLoading(): string {
  return `
    <main style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding-left: 24px; padding-right: 24px;">
      <p style="color: var(--neutral-600);">Memuat profil kreator...</p>
    </main>
  `
}

// Main render
async function renderCreatorPage() {
  const app = document.querySelector<HTMLDivElement>("#app")
  if (!app) return

  const creatorId = getCreatorIdFromURL()

  if (!creatorId) {
    app.innerHTML = renderNotFound("ID kreator tidak valid.")
    return
  }

  app.innerHTML = renderLoading()

  const [creator, works] = await Promise.all([getCreatorById(creatorId), getCreatorWorks(creatorId)])

  if (!creator) {
    app.innerHTML = renderNotFound(`Kreator dengan ID "${creatorId}" tidak ditemukan.`)
    return
  }

  app.innerHTML = renderCreatorProfile(creator, works)

  // Add Let Me Sleep button handler
  const sleepBtn = app.querySelector("#let-me-sleep-btn")
  if (sleepBtn) {
    sleepBtn.addEventListener("click", () => {
      const modal = new SleepModal(creator.id, creator.name)
      modal.show()
    })
  }
}

renderCreatorPage()
