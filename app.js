const object = document.getElementById("object");


// Varsayılan başlangıç pozisyonu
let posX = window.innerWidth / 2 - 25; // Ortada başlat
let posY = window.innerHeight / 2 - 25;


// Ekran sınırları kontrolü
const isWithinBounds = (x, y) => {
    const objWidth = object.offsetWidth;
    const objHeight = object.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return x >= 0 && y >= 0 && x + objWidth <= windowWidth && y + objHeight <= windowHeight;
};

// Klavye ile hareket
document.addEventListener("keydown", (event) => {
    let newX = posX;
    let newY = posY;

    switch (event.key) {
        case "ArrowUp":
            newY -= step;
            break;
        case "ArrowDown":
            newY += step;
            break;
        case "ArrowLeft":
            newX -= step;
            break;
        case "ArrowRight":
            newX += step;
            break;
    }

    if (isWithinBounds(newX, newY) && !isColliding(newX, newY)) {
        posX = newX;
        posY = newY;
        object.style.left = `${posX}px`;
        object.style.top = `${posY}px`;
    }
});

// Fare ile hareket
document.addEventListener("click", (event) => {
    const clickX = event.clientX - object.offsetWidth / 2;
    const clickY = event.clientY - object.offsetHeight / 2;

    if (isWithinBounds(clickX, clickY) && !isColliding(clickX, clickY)) {
        posX = clickX;
        posY = clickY;
        object.style.left = `${posX}px`;
        object.style.top = `${posY}px`;
    }
});

// Engelleri Dinamik Hale Getirme

const step = 10; // Hareket adımı
const obstacleCount = 5; // Dinamik olarak oluşturulacak engel sayısı
const obstacles = []; // Tüm engelleri tutmak için bir dizi

// Başlangıçta nesneyi ortalar
object.style.left = `${posX}px`;
object.style.top = `${posY}px`;

// Dinamik engeller oluşturma
const createObstacles = () => {
    for (let i = 0; i < obstacleCount; i++) {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.position = "absolute";
        obstacle.style.width = "100px";
        obstacle.style.height = "100px";
        obstacle.style.backgroundColor = "yellow";

        // Rastgele bir pozisyon belirle
        const randomX = Math.random() * (window.innerWidth - 50);
        const randomY = Math.random() * (window.innerHeight - 50);

        obstacle.style.left = `${randomX}px`;
        obstacle.style.top = `${randomY}px`;

        document.body.appendChild(obstacle); // Engel elementi body'ye ekler
        obstacles.push(obstacle); // Engeli diziye ekler
    }
};

// Engelleri Dinamik Hale Getirme
const changeObstaclePositions = () => {
    obstacles.forEach(obstacle => {
        const randomX = Math.random() * (window.innerWidth - obstacle.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - obstacle.offsetHeight);

        obstacle.style.left = `${randomX}px`;
        obstacle.style.top = `${randomY}px`;
    });
};

// Sayfa yüklendiğinde engelleri oluştur
createObstacles();

// Engellerin pozisyonlarını her 10 saniyede bir değiştir
setInterval(changeObstaclePositions, 10000);


// Çarpışma kontrolü
const isColliding = (x, y) => {
    const objRect = {
        left: x,
        top: y,
        right: x + object.offsetWidth,
        bottom: y + object.offsetHeight
    };

    for (let obstacle of obstacles) {
        const rect = obstacle.getBoundingClientRect();
        if (
            objRect.right > rect.left &&
            objRect.left < rect.right &&
            objRect.bottom > rect.top &&
            objRect.top < rect.bottom
        ) {
            return true;
        }
    }
    return false;
};

// Klavye ile hareket
document.addEventListener("keydown", (event) => {
    let newX = posX;
    let newY = posY;

    switch (event.key) {
        case "ArrowUp":
            newY -= step;
            break;
        case "ArrowDown":
            newY += step;
            break;
        case "ArrowLeft":
            newX -= step;
            break;
        case "ArrowRight":
            newX += step;
            break;
    }

    if (
        isWithinBounds(newX, newY) && // Ekran sınırlarını kontrol et
        !isColliding(newX, newY) // Çarpışma kontrolü
    ) {
        posX = newX;
        posY = newY;
        object.style.left = `${posX}px`;
        object.style.top = `${posY}px`;
    }
});

// Fare ile hareket
document.addEventListener("click", (event) => {
    const clickX = event.clientX - object.offsetWidth / 2;
    const clickY = event.clientY - object.offsetHeight / 2;

    if (
        isWithinBounds(clickX, clickY) && // Ekran sınırlarını kontrol et
        !isColliding(clickX, clickY) // Çarpışma kontrolü
    ) {
        posX = clickX;
        posY = clickY;
        object.style.left = `${posX}px`;
        object.style.top = `${posY}px`;
    }
});
