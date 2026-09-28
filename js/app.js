const tracks = [
  {title:"Midnight Drive", artist:"Artist One", category:"Afrobeats", downloads:4821, letter:"M"},
  {title:"Golden Hour", artist:"Artist Two", category:"Amapiano", downloads:3910, letter:"G"},
  {title:"No Pressure", artist:"Artist Three", category:"Hip-Hop", downloads:3254, letter:"N"},
  {title:"Afterglow", artist:"Artist Four", category:"R&B", downloads:2876, letter:"A"}
];

const grid=document.querySelector("#latestGrid"), popular=document.querySelector("#popularList");
function card(t,i){
  return `<article class="media-card">
    <div class="cover"><span class="tag">${t.category}</span>${t.letter}</div>
    <div class="media-info"><h3>${t.title}</h3><p>${t.artist}</p>
      <div class="media-bottom"><button class="play-card" data-play="${i}">▶ Play</button><button class="download-card" data-download="${i}">↓ Download</button></div>
    </div>
  </article>`;
}
grid.innerHTML=tracks.map(card).join("");
popular.innerHTML=tracks.map((t,i)=>`<div class="popular-item"><span class="number">0${i+1}</span><div><strong>${t.title}</strong><p>${t.artist} · ${t.category}</p></div><span class="downloads">${t.downloads.toLocaleString()} downloads</span><button class="list-play" data-play="${i}">▶</button></div>`).join("");

const audio=document.querySelector("#audio"), playBtn=document.querySelector("#playBtn"), title=document.querySelector("#playerTitle"), artist=document.querySelector("#playerArtist"), mini=document.querySelector("#miniCover"), progress=document.querySelector("#progress"), time=document.querySelector("#time"), download=document.querySelector("#downloadBtn");
let current=-1;

function selectTrack(i){
  const t=tracks[i]; current=i; title.textContent=t.title; artist.textContent=t.artist+" · "+t.category; mini.textContent=t.letter;
  // Real media URLs will be supplied by the admin/storage layer in the next build.
  audio.src="";
  audio.removeAttribute("src");
  playBtn.textContent="▶";
}
document.addEventListener("click",e=>{
  const p=e.target.closest("[data-play]"); if(p){selectTrack(Number(p.dataset.play));}
  const d=e.target.closest("[data-download]"); if(d){selectTrack(Number(d.dataset.download)); alert("Download links will be connected to the media-storage layer in the next build.");}
});
playBtn.addEventListener("click",()=>{ if(current<0) selectTrack(0); if(audio.src){audio.paused?audio.play():audio.pause();}});
audio.addEventListener("play",()=>playBtn.textContent="Ⅱ");
audio.addEventListener("pause",()=>playBtn.textContent="▶");
audio.addEventListener("timeupdate",()=>{
  if(!audio.duration)return;
  progress.style.width=(audio.currentTime/audio.duration*100)+"%";
  const s=Math.floor(audio.currentTime); time.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
});
document.querySelectorAll(".category-grid button").forEach(b=>b.addEventListener("click",()=>{
  const cat=b.dataset.category;
  const filtered=tracks.filter(t=>t.category===cat);
  grid.innerHTML=(filtered.length?filtered:tracks).map((t)=>card(t,tracks.indexOf(t))).join("");
  document.querySelector("#latest").scrollIntoView({behavior:"smooth"});
}));
document.querySelector(".menu-toggle").addEventListener("click",()=>alert("Mobile navigation will be expanded in the next UI pass."));
