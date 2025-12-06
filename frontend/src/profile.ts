import loadNavbar from "./components/navbar";
loadNavbar();

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <section class="hero relative !px-[24px]">
        <div class="content-center flex flex-col items-center relative z-10">
          <img
            src="/image.png" alt="Profile Picture"
            class="relative inline-block h-48 w-48 rounded-full object-cover object-center"/>
        </div>
    </section>
  `;
}