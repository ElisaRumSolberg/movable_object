const movable = document.getElementById("movable");

// Varsayılan başlangıç pozisyonu
let posX = window.innerWidth / 2 - 25; // Ortada başlat
let posY = window.innerHeight / 2 - 25;

// Elemanın hareket ettirilmesi
document.addEventListener("keydown", (event) => {
  const step = 10; // Hareket mesafesi
  if (event.key === "ArrowUp") posY = Math.max(0, posY - step); // Yukarı
  if (event.key === "ArrowDown") posY = Math.min(window.innerHeight - 50, posY + step); // Aşağı
  if (event.key === "ArrowLeft") posX = Math.max(0, posX - step); // Sol
  if (event.key === "ArrowRight") posX = Math.min(window.innerWidth - 50, posX + step); // Sağ

  movable.style.left = `${posX}px`;
  movable.style.top = `${posY}px`;
});


document.addEventListener("click", (event) => {
    // Tıklama pozisyonunu al
    const clickX = event.clientX;
    const clickY = event.clientY;
  
    // Eleman ekran dışına çıkmasın
    posX = Math.min(window.innerWidth - 50, Math.max(0, clickX - 25));
    posY = Math.min(window.innerHeight - 50, Math.max(0, clickY - 25));
  
    movable.style.left = `${posX}px`;
    movable.style.top = `${posY}px`;
  });