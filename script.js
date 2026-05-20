
const hero = document.getElementById('hero');
const memories = document.getElementById('memories');
const question = document.getElementById('question');
const celebration = document.getElementById('celebration');

const enterBtn = document.getElementById('enterBtn');
const questionBtn = document.getElementById('questionBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

/* PAGE TRANSITIONS */

enterBtn.addEventListener('click', () => {
  hero.classList.add('hidden');
  memories.classList.remove('hidden');

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
});

questionBtn.addEventListener('click', () => {
  memories.classList.add('hidden');
  question.classList.remove('hidden');

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
});

/* PHOTO UPLOADS */

function setupImageUpload(inputId, previewId){

  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener('change', () => {

    const file = input.files[0];

    if(file){

      const reader = new FileReader();

      reader.onload = (e) => {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
}

setupImageUpload('photo1','preview1');
setupImageUpload('photo2','preview2');
setupImageUpload('photo3','preview3');

/* RUNAWAY BUTTON */

const messages = [
  'nope 😭',
  'nice try',
  'bebby pls',
  'catch me first',
  'nuh uh',
  'run run run'
];

noBtn.addEventListener('mouseenter', () => {

  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  noBtn.innerText = messages[
    Math.floor(Math.random() * messages.length)
  ];
});

/* YES BUTTON */

yesBtn.addEventListener('click', () => {

  question.classList.add('hidden');
  celebration.classList.remove('hidden');

  startConfetti();
});



const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];

for(let i = 0; i < 250; i++){

  confetti.push({
    x:Math.random() * canvas.width,
    y:Math.random() * canvas.height,
    radius:Math.random() * 6 + 2,
    speed:Math.random() * 3 + 2,
    color:`hsl(${Math.random() * 360},100%,70%)`
  });
}

function drawConfetti(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  confetti.forEach(c => {

    ctx.beginPath();
    ctx.arc(c.x,c.y,c.radius,0,Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();

    c.y += c.speed;

    if(c.y > canvas.height){
      c.y = -10;
    }
  });

  requestAnimationFrame(drawConfetti);
}

function startConfetti(){
  drawConfetti();
}

window.addEventListener('resize', () => {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
