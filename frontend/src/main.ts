import './style.css'
import loadNavbar from "./components/navbar";
import { getFeaturedCreators } from "../services/creatorService";
import type { Creator } from "../data/creators"; // Add 'type' keyword

// rest of the code remains the same

loadNavbar();

// Function to create a card element
function createCreatorCard(creator: Creator): string {
  const badges = creator.badges
    .map(badge => `<span class="badge">${badge}</span>`)
    .join('');
  
  return `
    <div class="card">
      <a href="/creator.html?id=${creator.id}" class="card-link">
        <img src="${creator.image}" alt="${creator.name}" />
        <div class="card-content">
          ${badges}
          <h3 class="card-title">${creator.name}</h3>
          <p class="card-sub">${creator.description}</p>
        </div>
      </a>
    </div>
  `;
}

async function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (!app) return;

  // Show loading state
  app.innerHTML = `
    <section class="hero relative !px-[24px]">
      <img src="/decor.svg" alt="" class="absolute inset-0 w-full h-full object-contain pointer-events-none" style="transform: scale(1.2);">
      
      <div class="content-center flex flex-col items-center relative z-10">
        <div class="box-border flex flex-row justify-center items-center w-48 h-8 px-4 rounded-full border border-gray-200 mb-4">
          <p class="text-sm text-gray-600">#DukungKreatorLokal</p>
        </div>
        <h1>Nikmati Karyanya, <br> Wujudkan Mimpinya.</h1>
        <div class="max-w-[370px]">
          <p class="subheading-2 text-(--neutral-400)">Jelajahi ribuan komik. Suka dengan karya mereka? Kirim dukungan "Let Me Sleep" agar kreator favoritmu bisa istirahat dan berkarya lebih baik.</p>
        </div>
      </div>
      <div class="hero-buttons">
        <button class="btn-main">Mulai Jelajahi</button>
        <button class="btn-secondary">Upload Karya</button>
      </div>
    </section>

    <h2 class="">Kreator Sorotan Minggu Ini</h2>

    <div class="section-grid">
      <div class="loading">Memuat kreator...</div>
    </div>
  `;

  // Fetch creators
  const creators = await getFeaturedCreators();

  app.innerHTML = `
    <section class="hero relative">
      <img src="/decor.svg" alt="" class="absolute inset-0 w-full h-full object-contain pointer-events-none">
      
      <div class="content-center flex flex-col items-center relative">
        <div class="box-border flex flex-row justify-center items-center w-48 h-8 px-4 rounded-full border border-gray-200 mb-4">
          <p class="text-sm text-gray-600">#DukungKreatorLokal</p>
        </div>
        <h1>Nikmati Karyanya, <br> Wujudkan Mimpinya.</h1>
        <div class="max-w-[370px]">
          <p class="subheading-2 text-(--neutral-400)">Jelajahi ribuan komik. Suka dengan karya mereka? Kirim dukungan "Let Me Sleep" agar kreator favoritmu bisa istirahat dan berkarya lebih baik.</p>
        </div>
      </div>
      <div class="hero-buttons">
        <button class="btn-main">Mulai Jelajahi</button>
        <button class="btn-secondary">Upload Karya</button>
      </div>
    </section>

    <h2 class="pt-[24px] px-[24px]">Kreator Sorotan Minggu Ini</h2>

    <div class="section-grid">
      ${creators.length > 0 
        ? creators.map(createCreatorCard).join('') 
        : '<p>Tidak ada kreator tersedia saat ini.</p>'
      }
    </div>
  `;
}

// Start the app
renderApp();