const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const basketWidth = 100; // Basket width
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;
let score = 0;
let emojis = [];
let gameOver = false;

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 20; // Movement speed
    } else if (event.key === 'ArrowRight' && basketX < canvas.width - basketWidth) {
        basketX += 20; // Movement speed
    }
});

function createEmoji() {
    const emojiX = Math.floor(Math.random() * (canvas.width - 20));
    emojis.push({ x: emojiX, y: 0 });
}

function drawBasket() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
}

function drawEmojis() {
    emojis.forEach(emoji => {
        ctx.font = '20px Arial';
        ctx.fillText('💩', emoji.x, emoji.y); // Draw poop emoji
    });
}

function updateEmojis() {
    emojis.forEach(emoji => {
        emoji.y += 2; // Falling speed
    });

    // Check for collisions with the basket
    emojis.forEach((emoji, index) => {
        if (emoji.y + 20 >= canvas.height - basketHeight && emoji.x >= basketX && emoji.x <= basketX + basketWidth) {
            score++;
            document.getElementById('score').innerText = score;
            emojis.splice(index, 1); // Remove the emoji that was caught
        } else if (emoji.y > canvas.height) {
            gameOver = true; // If an emoji falls to the ground
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawEmojis();
    updateEmojis();

    if (gameOver) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    }
}

const game = setInterval(draw, 100);
setInterval(createEmoji, 1500); // Create a new emoji every 1.5 seconds