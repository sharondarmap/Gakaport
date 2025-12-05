import loadNavbar from "./components/navbar";
loadNavbar();

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <section class="hero relative">
      <img src="/public/decor.svg" alt="" class="absolute inset-0 w-full h-full object-contain pointer-events-none" style="transform: scale(1.2);">
      
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

    <h2 style="padding: 32px;">Kreator Sorotan Minggu Ini</h2>

    <div class="section-grid mx-8">
      <div class="card">
        <img src="/image.png" alt="sample" />
        <div class="card-content">
          <span class="badge">Action</span>
          <span class="badge">Fantasy</span>
          <h3 class="card-title">Raka Wirayudha</h3>
          <p class="card-sub">Master Silat Sci-fi</p>
        </div>
      </div>

      <div class="card">
        <img src="/image.png" alt="sample" />
        <div class="card-content">
          <span class="badge">Drama</span>
          <span class="badge">Romance</span>
          <h3 class="card-title">Sena Putri</h3>
          <p class="card-sub">Ilustrator Emotif</p>
        </div>
      </div>

      <div class="card">
        <img src="/image.png" alt="sample" />
        <div class="card-content">
          <span class="badge">Comedy</span>
          <span class="badge">Slice of life</span>
          <h3 class="card-title">Dimas Atma</h3>
          <p class="card-sub">Humoris yang lembut</p>
        </div>
      </div>
    </div>
  `;
}