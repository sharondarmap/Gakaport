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

// Create work card for free works
function createWorkCard(work: CreatorWork): string {
  const genresBadges = work.genres
    .map((genre) => `<span class="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">${genre}</span>`)
    .join("")

  return `
    <div class="flex-shrink-0 w-40">
      <a href="/work.html?id=${work.id}" class="block group">
        <img 
          src="${work.cover}" 
          alt="${work.title}" 
          class="w-full h-60 object-cover rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
        />
        <div class="space-y-2">
          <div class="flex flex-wrap gap-1">${genresBadges}</div>
          <h3 class="text-sm font-medium line-clamp-2">${work.title}</h3>
          <p class="text-xs text-neutral-500">${work.status || "Ongoing"}</p>
        </div>
      </a>
    </div>
  `
}

// Create premium work card (locked)
function createPremiumWorkCard(work: CreatorWork): string {
  const genresBadges = work.genres
    .map((genre) => `<span class="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">${genre}</span>`)
    .join("")

  return `
    <div class="flex-shrink-0 w-40 opacity-90">
      <div class="block cursor-not-allowed">
        <div class="relative mb-3 rounded-lg overflow-hidden">
          <img 
            src="${work.cover}" 
            alt="${work.title}" 
            class="w-full h-60 object-cover brightness-50"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black/30">
            <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex flex-wrap gap-1">${genresBadges}</div>
          <h3 class="text-sm font-medium line-clamp-2">${work.title}</h3>
          <p class="text-xs text-neutral-500">${work.status || "Completed"}</p>
        </div>
      </div>
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
      <h2 class="text-lg font-semibold text-primary">Karya Gratis</h2>
      <div class="flex gap-4 overflow-x-auto pb-2">
        ${freeWorks.map(createWorkCard).join("")}
      </div>
    </section>
  `
      : ""

  const premiumWorksSection =
    premiumWorks.length > 0
      ? `
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-primary">Karya Eksklusif</h2>
      <div class="flex gap-4 overflow-x-auto pb-2">
        ${premiumWorks.map(createPremiumWorkCard).join("")}
      </div>
    </section>
  `
      : ""

  return `
    <main class="mx-auto px-6 pt-32 pb-6">
      <!-- Profile Header -->
      <div class="text-center mb-12">
        <img 
          src="${creator.image}" 
          alt="${creator.name}" 
          class="w-32 h-32 rounded-full object-cover mx-auto mb-6"
        />
        <h1 class="text-3xl font-bold mb-3">${creator.name}</h1>
        
        <div class="flex items-center justify-center gap-2 text-neutral-600 mb-6">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span class="font-medium">${formatNumber(creator.followers || 0)}</span>
        </div>

        <p class="text-neutral-700 leading-relaxed mb-8 max-w-2xl mx-auto">
          ${creator.bio || creator.description}
        </p>

        <button class="btn-main w-full max-w-xs mx-auto mb-2 flex items-center justify-center gap-2" id="let-me-sleep-btn">
          <span class="text-lg">🌙</span>
          Let Me Sleep
        </button>
        <p class="text-xs text-neutral-600">Support me so I can sleep.</p>
      </div>

      <!-- Works Sections -->
      <div class="space-y-12">
        ${freeWorksSection}
        ${premiumWorksSection}
      </div>
    </main>
  `
}

// Error state templates
function renderNotFound(message: string): string {
  return `
    <main class="flex items-center justify-center min-h-screen px-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold mb-4">Kreator Tidak Ditemukan</h1>
        <p class="text-neutral-600 mb-8">${message}</p>
        <a href="/" class="btn-main inline-block">Kembali ke Beranda</a>
      </div>
    </main>
  `
}

function renderLoading(): string {
  return `
    <main class="flex items-center justify-center min-h-screen px-6">
      <p class="text-neutral-600">Memuat profil kreator...</p>
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
