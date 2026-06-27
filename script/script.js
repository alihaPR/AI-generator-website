document.addEventListener('DOMContentLoaded', () => {

  // ===================== انیمیشن اسلایدر قبل/بعد =====================
  const afterImages = document.querySelectorAll('.after-image');
  afterImages.forEach((afterImage) => {
    let progress = 0, direction = 1;

    const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;

    function animateBeforeAfter() {
      progress += direction * 0.006;
      const easedProgress = easeInOutCubic(progress);
      afterImage.style.clipPath = `polygon(0 0, ${(1-easedProgress)*100}% 0, ${(1-easedProgress)*100}% 100%, 0 100%)`;

      if(progress >= 1 || progress <= 0) {
        direction *= -1;
        setTimeout(() => requestAnimationFrame(animateBeforeAfter), 1000);
      } else requestAnimationFrame(animateBeforeAfter);
    }

    animateBeforeAfter();
  });

  // ===================== اسکرول نرم لینک‌های داخلی =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // ===================== باز و بسته شدن popup و پرامپت =====================
  function initPopups() {
    document.querySelectorAll('[data-popup]').forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        openPopup(button);
      });
    });

    document.querySelectorAll('.popup .close-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.popup').classList.remove('show','active'));
    });

    document.querySelectorAll('.popup').forEach(popup => {
      popup.addEventListener('click', e => { if(e.target === popup) popup.classList.remove('show','active'); });
    });
  }

  initPopups();

  function openPopup(el) {
    const popupId = el.getAttribute("data-popup");
    const popup = document.getElementById(popupId);
    if(!popup) return;

    const promptText = el.getAttribute("data-prompt") || '';
    const imgBefore = el.getAttribute("data-img-before") || '';
    const imgAfter = el.getAttribute("data-img-after") || '';
    const type = el.getAttribute("data-type") || '';

    const leftSection = popup.querySelector(".popup-content-left");
    let howToUseHTML = '';

    if(type==='chatgpt') {
      howToUseHTML = `
        <h4>How to use this filter</h4>
        <ul class="popup-menu">
          <li class="popup-menu-item">Open <a href="https://chat.openai.com/" target="_blank">ChatGpt</a> Ai</li>
          <li class="popup-menu-item">Select + And Select Your photo</li>
          <li class="popup-menu-item">Copy The Command Below And Paste It Into ChatGpt Ai</li>
        </ul>`;
    } else if(type==='benana') {
      howToUseHTML = `
        <h4>How to use this filter</h4>
        <ul class="popup-menu">
          <li class="popup-menu-item">Open <a href="https://nanobanana.ai/" target="_blank">Nanobanana</a> Ai</li>
          <li class="popup-menu-item">Select + And Select Your photo</li>
          <li class="popup-menu-item">Copy The Command Below And Paste It Into Nanobanana Ai</li>
        </ul>`;
    } else {
      howToUseHTML = `
        <h4>How to use this filter</h4>
        <ul class="popup-menu">
          <li class="popup-menu-item">Open the related Ai platform</li>
          <li class="popup-menu-item">Select + And Select Your photo</li>
          <li class="popup-menu-item">Copy The Command Below And Paste It</li>
        </ul>`;
    }

    const boxContainerHTML = `
      <div class="box-container" id="boxContainer">
        <div class="popup-box">
          <span id="promptText">${promptText}</span>
          <svg class="copy-btn" onclick="copyPrompt()" width="24" height="24" viewBox="0 0 32 32" fill="none"
          xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6665 20H5.33317C4.62593 20 3.94765 19.7191 3.44755 19.219C2.94746 18.7189 2.6665 18.0406 2.6665 17.3334V5.33335C2.6665 4.62611 2.94746 3.94783 3.44755 3.44774C3.94765 2.94764 4.62593 2.66669 5.33317 2.66669H17.3332C18.0404 2.66669 18.7187 2.94764 19.2188 3.44774C19.7189 3.94783 19.9998 4.62611 19.9998 5.33335V6.66669M14.6665 12H26.6665C28.1393 12 29.3332 13.1939 29.3332 14.6667V26.6667C29.3332 28.1394 28.1393 29.3334 26.6665 29.3334H14.6665C13.1937 29.3334 11.9998 28.1394 11.9998 26.6667V14.6667C11.9998 13.1939 13.1937 12 14.6665 12Z" stroke-width="2" />
          </svg>
        </div>
      </div>`;

    leftSection.innerHTML = howToUseHTML + boxContainerHTML;
    popup.querySelector("#popupImageBefore").src = imgBefore;
    popup.querySelector("#popupImageAfter").src = imgAfter;

    popup.classList.add("show","active");

    // ریست اسلایدر به وسط
    const slider = popup.querySelector('.popup-slider');
    const before = popup.querySelector('.before');
    if(slider && before){
      slider.style.left = '50%';
      before.style.clipPath = 'inset(0 50% 0 0)';
      if(slider.tagName==='INPUT') slider.value = 50;
    }

    initPopupSlider(popup);
  }

  // ===================== اسلایدر داخلی popup =====================
 function initPopupSlider(popup) {
  const container = popup.querySelector('.container-img-prompts');
  if(!container) return;

  const before = container.querySelector('.before');
  const slider = container.querySelector('.popup-slider');
  if(!before || !slider) return;

  let isDragging = false;

  const moveSlider = x => {
    const rect = container.getBoundingClientRect();
    let offset = x - rect.left;
    offset = Math.max(0, Math.min(offset, rect.width));
    const percent = (offset / rect.width) * 100;
    slider.style.transition = 'none';
    before.style.transition = 'none';
    slider.style.left = `${percent}%`;
    before.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  };

  // پاک کردن eventهای قبلی قبل از attach دوباره
  container.onmousedown = null;
  container.ontouchstart = null;
  document.onmouseup = null;
  document.ontouchend = null;
  document.onmousemove = null;
  document.ontouchmove = null;

  // موس
  container.addEventListener('mousedown', e => { isDragging = true; moveSlider(e.clientX); });
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('mousemove', e => { if(isDragging) moveSlider(e.clientX); });

  // لمس موبایل
  container.addEventListener('touchstart', e => { isDragging = true; moveSlider(e.touches[0].clientX); });
  document.addEventListener('touchend', () => isDragging = false);
  document.addEventListener('touchmove', e => { if(isDragging) moveSlider(e.touches[0].clientX); });

  // ریست اسلایدر به وسط هر بار باز شدن
  slider.style.left = '50%';
  before.style.clipPath = 'inset(0 50% 0 0)';
}


  // ===================== کپی پرامپت =====================
  window.copyPrompt = function(){
    const prompt = document.getElementById("promptText")?.innerText;
    if(!prompt) return;
    navigator.clipboard.writeText(prompt);
    const infoBar = document.getElementById("infoBar");
    if(infoBar){
      infoBar.style.display='block';
      setTimeout(()=>infoBar.style.display='none',2500);
    }
    showCopyNotification();
  };

  function showCopyNotification(){
    const notif = document.getElementById('copy-notification');
    if(!notif) return;
    notif.style.display='block';
    notif.style.opacity='1';
    setTimeout(()=>{notif.style.opacity='0'; setTimeout(()=>notif.style.display='none',300)},1200);
  }

  // ===================== pagination کارت‌ها =====================
  const cards = Array.from(document.querySelectorAll('.poster-cards'));
  const cardsPerPage = 12;
  let currentPage = 1;
  const paginationEl = document.getElementById('pagination');

  function showPage(page){
    currentPage=page;
    const start = (page-1)*cardsPerPage;
    const end = start+cardsPerPage;
    cards.forEach((c,i)=>c.style.display=(i>=start && i<end)?"":"none");
    updatePagination();
  }

  function updatePagination(){
    if(!paginationEl) return;
    const totalPages = Math.max(1, Math.ceil(cards.length/cardsPerPage));
    paginationEl.innerHTML='';
    const prev = document.createElement('button');
    prev.innerText='Prev'; prev.disabled=currentPage===1; prev.onclick=()=>showPage(Math.max(1,currentPage-1));
    paginationEl.appendChild(prev);

    for(let i=1;i<=totalPages;i++){
      const btn=document.createElement('button');
      btn.innerText=i; btn.className=(i===currentPage)?"active":"";
      btn.onclick=()=>showPage(i);
      paginationEl.appendChild(btn);
    }

    const next=document.createElement('button');
    next.innerText='Next'; next.disabled=currentPage===totalPages; next.onclick=()=>showPage(Math.min(totalPages,currentPage+1));
    paginationEl.appendChild(next);
  }

  if(cards.length && paginationEl) showPage(1);

  // ===================== منوی همبرگری =====================
  const menuIcon = document.getElementById('menu-toggle');
  const navbar = document.querySelector('.navbar');
  if(menuIcon && navbar){
    menuIcon.addEventListener('click',()=>{ navbar.classList.toggle('active'); menuIcon.classList.toggle('active'); });
  }

  // ===================== scroll به بالا و indicator =====================
  const posterContainer = document.querySelector('.poster');
  const posterCards = document.querySelectorAll('.poster .poster-cards');
  const dots = document.querySelectorAll('.poster-indicators .dot');

  if(posterContainer){
    posterContainer.addEventListener('scroll',()=>{
      const scrollLeft = posterContainer.scrollLeft;
      const cardWidth = posterCards[0].offsetWidth + 12;
      const activeIndex = Math.round(scrollLeft/cardWidth);
      dots.forEach((dot,idx)=>dot.classList.toggle('active',idx===activeIndex));
    });

    setTimeout(()=>{
      if(posterCards.length>=2){
        const scrollLeft = posterCards[1].offsetLeft-(posterContainer.offsetWidth-posterCards[1].offsetWidth)/2;
        posterContainer.scrollTo({left:scrollLeft,behavior:"smooth"});
      }
    },100);
  }

  document.querySelector('.footer-scroll-btn')?.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.getElementById('home');
    if(target){
      const y = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({top:y,behavior:'smooth'});
    }
  });

  // ===================== AOS =====================
  window.addEventListener('load',()=>{ AOS.init({once:true,duration:1000}); });
  window.addEventListener('resize',()=>{ AOS.refresh(); });

  // ===================== subscribe popup =====================
  setTimeout(()=>{
    const popup=document.getElementById("subscribeBox");
    if(popup) popup.style.display='block';
  },2000);

  window.closeSubscribe = function(){
    const popup=document.getElementById("subscribeBox");
    if(popup) popup.style.display='none';
  };

  // ===================== infoBar =====================
  const infoBar = document.getElementById('infoBar');
  const boxContainerEl = document.getElementById('boxContainer');
  let timeoutId;

  if(boxContainerEl && infoBar){
    boxContainerEl.addEventListener('mouseenter',()=>{
      clearTimeout(timeoutId);
      infoBar.classList.add('active');
      timeoutId=setTimeout(()=>infoBar.classList.remove('active'),4000);
    });

    infoBar.addEventListener('mouseenter',()=>clearTimeout(timeoutId));
    infoBar.addEventListener('mouseleave',()=>timeoutId=setTimeout(()=>infoBar.classList.remove('active'),10000));
  }

  function initInfoBar(popup) {
  const boxContainerEl = popup.querySelector('#boxContainer');
  const infoBar = popup.querySelector('#infoBar');
  if(!boxContainerEl || !infoBar) return;

  let timeoutId;

  boxContainerEl.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    infoBar.classList.add('active');
    timeoutId = setTimeout(() => infoBar.classList.remove('active'), 4000);
  });

  infoBar.addEventListener('mouseenter', () => clearTimeout(timeoutId));
  infoBar.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => infoBar.classList.remove('active'), 10000);
  });
}

  // ===================== poster zoom effect =====================
  if(posterContainer){
    posterContainer.addEventListener('mouseover', e=>{
      const card=e.target.closest('.poster-cards.poster-zoom');
      if(!card) return;
      card.style.transform='scale(1.05)';
      card.style.transition='transform 0.3s ease';
    });
    posterContainer.addEventListener('mouseout', e=>{
      const card=e.target.closest('.poster-cards.poster-zoom');
      if(!card) return;
      card.style.transform='scale(1)';
    });
  }

  // ===================== scroll to top on page load =====================
  window.scrollTo(0,0);

});
