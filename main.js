const sections = ["section1","section2","section3","section4","section5"]
  .map(id => document.getElementById(id));

function show(s) {
  sections.forEach(x => x.style.display="none");
  s.style.display="flex";
}

show(section1);

// ================= PLATFORM SELECTION =================
document.querySelectorAll(".platform").forEach(p => {
  p.addEventListener("click", () => {
    document.querySelectorAll(".platform").forEach(x=>x.classList.remove("selected"));
    p.classList.add("selected");
    p.querySelector("input").checked = true;
  });
});

// ================= FLOW =================
next1.onclick = () => {
  if(!receiverId.value.trim()) return alert("Enter Player ID");
  if(!document.querySelector('input[name="platform"]:checked')) return alert("Select platform");

  searchUsername.textContent = receiverId.value;
  show(section2);

  setTimeout(()=>show(section3),1500);
};

next2.onclick = () => {
  if(+coinsInput.value<=0 && +gpInput.value<=0) return alert("Select items");
  show(section4);

  setTimeout(()=>{
    finalUsername.textContent = receiverId.value;
    finalCoins.textContent = coinsInput.value || 0;
    finalGP.textContent = gpInput.value || 0;

    show(section5);
    launchCelebration();
  },2000);
};

restart.onclick = () => location.reload();

// ================= FUTBOL PARTICLES =================
const canvas = document.getElementById("stadiumParticles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize(); onresize = resize;

let balls = Array.from({length:40},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*2+1,
  s:Math.random()*0.5+0.2
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="rgba(255,255,255,.05)";
  balls.forEach(b=>{
    b.x+=b.s;
    if(b.x>canvas.width) b.x=0;
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
    ctx.stroke();
  });
  requestAnimationFrame(animate);
}
animate();

// ================= CELEBRATION =================
function launchCelebration(){
  const c = document.getElementById("celebration");
  const x = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;

  let rockets = Array.from({length:80},()=>({
    x:Math.random()*c.width,
    y:c.height,
    vy:Math.random()*-6-4,
    color:`hsl(${Math.random()*360},100%,60%)`
  }));

  function boom(){
    x.clearRect(0,0,c.width,c.height);
    rockets.forEach(r=>{
      r.y+=r.vy;
      x.fillStyle=r.color;
      x.fillRect(r.x,r.y,4,4);
    });
    requestAnimationFrame(boom);
  }
  boom();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
