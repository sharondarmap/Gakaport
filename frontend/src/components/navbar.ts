async function loadNavbar() {
  const res = await fetch("/src/components/navbar.html");
  const html = await res.text();
  document.body.insertAdjacentHTML("afterbegin", html);

  const menuBtn = document.getElementById("menuBtn")!;
  const dropdown = document.getElementById("dropdownMenu")!;
  const navbar = document.querySelector(".navbar")!;

  menuBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
    navbar.classList.toggle("expanded");
  });
}

export default loadNavbar;