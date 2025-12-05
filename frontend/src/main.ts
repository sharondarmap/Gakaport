import loadNavbar from "./components/navbar";
loadNavbar();

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <section class="hero">
      <h1>Lebih baik. Mulai Jelajahi.</h1>

      <div class="hero-buttons">
        <button class="btn-main">Mulai Jelajahi</button>
        <button class="btn-secondary">Upload Karya</button>
      </div>
    </section>

    <h2 style="padding: 32px;">Kreator Sorotan Minggu Ini</h2>

    <div class="section-grid">
      <div class="card">
        <img src="/public/sample1.jpg" alt="sample" />
        <div class="card-content">
          <span class="badge">Action</span>
          <span class="badge">Fantasy</span>
          <h3 class="card-title">Raka Wirayudha</h3>
          <p class="card-sub">Master Silat Sci-fi</p>
        </div>
      </div>

      <div class="card">
        <img src="/public/sample2.jpg" alt="sample" />
        <div class="card-content">
          <span class="badge">Drama</span>
          <span class="badge">Romance</span>
          <h3 class="card-title">Sena Putri</h3>
          <p class="card-sub">Ilustrator Emotif</p>
        </div>
      </div>

      <div class="card">
        <img src="/public/sample3.jpg" alt="sample" />
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
