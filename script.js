const wishes = [
  "Chúc anh luôn mạnh khỏe, bình an và có thật nhiều niềm vui trong những điều giản dị mỗi ngày.",
  "Mong những cố gắng của anh hôm nay sẽ đưa anh đến gần hơn với những điều anh luôn mong muốn.",
  "Chúc chàng trai của em lúc nào cũng tự tin, vững vàng và luôn tin vào chính mình nhé.",
  "Nếu hôm nay có hơi mệt, anh nhớ nghỉ ngơi một chút. Không cần lúc nào cũng phải mạnh mẽ đâu.",
  "Mong anh luôn gặp được những người tốt, những cơ hội tốt và có thật nhiều lý do để mỉm cười.",
  "Dù không thể ở cạnh để nhắc anh từng chút, em vẫn mong anh ăn uống đầy đủ và chăm sóc bản thân thật tốt.",
  "Chúc anh công việc, học tập đều thuận lợi. Những điều anh đang kiên trì rồi sẽ có ngày được đền đáp.",
  "Mong khoảng cách chỉ làm chúng mình thêm trân trọng những lần gặp gỡ, chứ không làm vơi đi tình cảm dành cho nhau.",
  "Cảm ơn anh vì đã cùng em cố gắng trong tình yêu này. Em biết yêu xa đôi khi không dễ, nhưng em vẫn chọn chúng mình.",
  "Chúc anh có một ngày 19/11 thật vui. Mong anh luôn cảm nhận được rằng ở nơi xa vẫn có một người thương và tự hào về anh."
];

const field = document.getElementById("petalField");
const modal = document.getElementById("messageModal");
const messageText = document.getElementById("messageText");
const modalKicker = document.getElementById("modalKicker");
const nextBtn = document.getElementById("nextBtn");
const ending = document.getElementById("ending");
let opened = new Set();
let currentIndex = 0;

const positions = [
  [18,48,-28,18],[73,43,24,28],[31,65,-48,24],[65,70,42,14],[12,78,-20,12],
  [82,81,25,20],[40,83,-38,16],[57,55,35,22],[24,34,-25,18],[76,29,28,15]
];

function createPetals(){
  field.innerHTML = "";
  positions.forEach((p,i)=>{
    const b=document.createElement("button");
    b.className="petal";
    b.setAttribute("aria-label",`Cánh hoa ${i+1}`);
    b.style.left=p[0]+"%"; b.style.top=p[1]+"%";
    b.style.setProperty("--dx",p[2]+"px");
    b.style.setProperty("--dy",p[3]+"px");
    b.style.setProperty("--rot",(Math.random()*70-35)+"deg");
    b.style.animationDelay=(i*.24)+"s";
    b.addEventListener("click",()=>openWish(i,b));
    field.appendChild(b);
  });
}
function openWish(i,button){
  if(opened.has(i)) return;
  opened.add(i); button.classList.add("used");
  currentIndex=i;
  modalKicker.textContent=`CÁNH HOA ${i+1} / 10`;
  messageText.textContent=wishes[i];
  nextBtn.textContent=opened.size===10?"Đến cánh hoa cuối cùng":"Đọc tiếp một cánh hoa";
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  modal.classList.remove("show");modal.setAttribute("aria-hidden","true");
}
document.getElementById("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
nextBtn.addEventListener("click",()=>{
  closeModal();
  if(opened.size===10){
    document.getElementById("hint").textContent="Còn một cánh hoa cuối cùng trên cành...";
    document.getElementById("lastPetal").classList.add("glow");
  } else {
    const next=positions.findIndex((_,i)=>!opened.has(i));
    if(next>=0) setTimeout(()=>field.children[next].click(),250);
  }
});
document.getElementById("lastPetal").addEventListener("click",()=>{
  if(opened.size<10){
    modalKicker.textContent="CHỜ MỘT CHÚT NHÉ";
    messageText.textContent="Em còn 10 điều nhỏ xíu muốn gửi anh. Mình mở hết những cánh hoa kia trước nhé!";
    nextBtn.textContent="Mình tiếp tục nhé";
    modal.classList.add("show");return;
  }
  ending.classList.add("show");ending.setAttribute("aria-hidden","false");
});
document.getElementById("startBtn").addEventListener("click",()=>{
  document.getElementById("hint").textContent="Chạm vào từng cánh hoa nhé";
  document.querySelector(".garden").scrollIntoView({behavior:"smooth",block:"center"});
});
document.getElementById("againBtn").addEventListener("click",()=>{
  ending.classList.remove("show");ending.setAttribute("aria-hidden","true");
  opened.clear();createPetals();
  document.getElementById("hint").textContent="Chạm vào từng cánh hoa nhé";
});
createPetals();
