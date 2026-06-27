
document.addEventListener('DOMContentLoaded', () => {
  // انیمیشن اسلایدر قبل/بعد
  const afterImages = document.querySelectorAll('.after-image');

  afterImages.forEach((afterImage) => {
    let progress = 0;
    let direction = 1;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animateBeforeAfter() {
      progress += direction * 0.006;
      const easedProgress = easeInOutCubic(progress);
      afterImage.style.clipPath = `polygon(0 0, ${(1 - easedProgress) * 100}% 0, ${(1 - easedProgress) * 100}% 100%, 0 100%)`;

      if (progress >= 1 || progress <= 0) {
        direction *= -1;
        setTimeout(() => {
          requestAnimationFrame(animateBeforeAfter);
        }, 1000);
      } else {
        requestAnimationFrame(animateBeforeAfter);
      }
    }

    animateBeforeAfter();
  });

  // اسکرول نرم برای لینک‌های داخلی
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // پاپ‌آپ: باز و بسته شدن و قرار دادن متن پرامپت
  document.querySelectorAll('[data-popup]').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const popupId = this.getAttribute('data-popup');
      const promptText = this.getAttribute('data-prompt') || "No prompt provided";
      const popup = document.getElementById(popupId);
      if (!popup) return;
      const promptSpan = popup.querySelector('#promptText');
      if (promptSpan) promptSpan.textContent = promptText;
      popup.classList.add('show');
    });
  });

  // بستن پاپ‌آپ با کلیک روی دکمه یا خارج از باکس
  document.querySelectorAll('.popup .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.popup').classList.remove('show');
    });
  });

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', e => {
      if (e.target === popup) popup.classList.remove('show');
    });
  });

  // اسلایدر داخلی پاپ‌آپ (before/after)
const container = document.querySelector('.container-img-prompts');
if (container) {
  const before = container.querySelector('.before');
  const slider = container.querySelector('.popup-slider');
  let isDragging = false;

  // موس
  container.addEventListener('mousedown', e => {
    isDragging = true;
    moveSlider(e.clientX);
  });
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  // لمس (موبایل)
  container.addEventListener('touchstart', e => {
    isDragging = true;
    moveSlider(e.touches[0].clientX);
  });
  document.addEventListener('touchend', () => isDragging = false);
  document.addEventListener('touchmove', e => {
    if (!isDragging) return;
    moveSlider(e.touches[0].clientX);
  });

  function moveSlider(x) {
    const rect = container.getBoundingClientRect();
    let offset = x - rect.left;
    offset = Math.max(0, Math.min(offset, rect.width));
    const percent = (offset / rect.width) * 100;
    slider.style.transition = 'none';
    before.style.transition = 'none';
    slider.style.left = `${percent}%`;
    before.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  }
}

// تابع کپی کردن متن پرامپت
function copyPrompt() {
  const promptText = document.getElementById('promptText')?.textContent;
  if (!promptText) return alert('هیچ متنی برای کپی وجود ندارد!');
  navigator.clipboard.writeText(promptText)
    .then(() => alert('Prompt copied to clipboard!'))
    .catch(() => alert('Copy failed!'));
}

// صفحه وقتی بارگذاری میشه اسکرول به بالا
window.onload = function() {
  window.scrollTo(0, 0);
};


// // ---------------------------------------------------- see more -----------------------------------------------------------------


// document.addEventListener("DOMContentLoaded", () => {
//   const seeMoreBtn = document.getElementById("seeMoreBtn");

//   seeMoreBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     const hiddenCards = document.querySelectorAll(".poster-cards.hidden-card");
//     const numberToShow = 8;

//     for (let i = 0; i < numberToShow && i < hiddenCards.length; i++) {
//       const card = hiddenCards[i];

//       // ابتدا فقط opacity و transform رو برمی‌داریم
//       card.classList.remove("hidden-card");

//       // بازنشانی موقعیت اولیه برای انیمیشن
//       card.style.opacity = "0";
//       card.style.transform = "translateY(30px)";

//       // اجرای انیمیشن با تاخیر کم برای فعال شدن ترنزیشن
//       setTimeout(() => {
//         card.style.opacity = "1";
//         card.style.transform = "translateY(0)";
//         card.style.position = "relative";
//       }, 50);
//     }

//     // مخفی کردن دکمه اگر چیزی باقی نمونده
//     if (document.querySelectorAll(".poster-cards.hidden-card").length === 0) {
//       seeMoreBtn.style.display = "none";
//     }
//   });
// });

// // ---------------------------------------------------copy prompt -----------------------------------------------------------------
function copyPrompt() {
  const text = document.getElementById('promptText').innerText;
  navigator.clipboard.writeText(text).then(function() {
    showCopyNotification();
  });
}

function showCopyNotification() {
  const notif = document.getElementById('copy-notification');
  notif.style.display = 'block';
  notif.style.opacity = '1';
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.style.display = 'none', 300);
  }, 1200);
}


// ---------------------------------------------------fix popup-----------------------------------------------------------------
function openPopup(el) {
  const imgBefore = document.getElementById('popupImageBefore');
  const imgAfter = document.getElementById('popupImageAfter');
  const promptText = document.getElementById('promptText');
  const popup = document.getElementById('popup1');
  if (!imgBefore || !imgAfter || !promptText || !popup || !el) {
    console.error('Popup elements or trigger element not found.');
    return;
  }
  imgBefore.src = el.getAttribute('data-img-before') || '';
  imgAfter.src = el.getAttribute('data-img-after') || '';
  promptText.innerText = el.getAttribute('data-prompt') || '';
  popup.classList.add('show');
   popup.classList.add('show');

  // ریست اسلایدر به وسط
  const slider = popup.querySelector('.popup-slider');
  const before = popup.querySelector('.before');
  if (slider && before) {
    slider.style.left = '50%';
    before.style.clipPath = 'inset(0 50% 0 0)';
    if (slider.tagName === 'INPUT') slider.value = 50; // اگر اسلایدر input هست
  }
}

// --------------------------------------------------------------------------------------

window.addEventListener("load", function () {
  AOS.refresh(); // اضافه کن
  AOS.init({
    once: true,
    duration: 1000
  });
});

window.addEventListener('resize', () => {
  AOS.refresh();
});

// --------------------------------------- popup sub -----------------------------------------------

window.onload = function () {
  setTimeout(() => {
    const popup = document.getElementById("subscribeBox");
    popup.style.display = "block";
  }, 2000);
}

function closeSubscribe() {
  const popup = document.getElementById("subscribeBox");
  popup.style.display = "none";
}

//--------------------------------------------------------------------------------------------
const boxContainer = document.getElementById('boxContainer');
const infoBar = document.getElementById('infoBar');
let timeoutId;

function showInfoBar() {
  clearTimeout(timeoutId);
  console.log("test 1 2 3");
  infoBar.classList.add('active');
  timeoutId = setTimeout(() => {
    infoBar.classList.remove('active');
  }, 4000);
}

boxContainer.addEventListener('mouseenter', showInfoBar);

infoBar.addEventListener('mouseenter', () => {
  clearTimeout(timeoutId);
});

infoBar.addEventListener('mouseleave', () => {
  timeoutId = setTimeout(() => {
    infoBar.classList.remove('active');
  }, 10000);
});
// ------------------------------------------------hamber ger menu--------------------------------------------

const menuIcon = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('active');
});
});

// -------------------------------------------------home img center-------------------------------------------
// -------------------------------------------------indicator img-------------------------------------------
const container = document.querySelector('.poster');
const cards = document.querySelectorAll('.poster .poster-cards');
const dots = document.querySelectorAll('.poster-indicators .dot');

container.addEventListener('scroll', () => {
  const scrollLeft = container.scrollLeft;
  const cardWidth = cards[0].offsetWidth + 12; // کارت + فاصله gap
  const activeIndex = Math.round(scrollLeft / cardWidth);
  
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeIndex);
  });
});
// ---------------------------------------------------scrole top -----------------------------------------------------------------
document.querySelector('.footer-scroll-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.getElementById('home');
  if (target) {
    const y = target.getBoundingClientRect().top + window.pageYOffset - 100; // 100 پیکسل برای هدر فیکس
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});


window.addEventListener("load", () => {
  setTimeout(() => {
    const container = document.querySelector(".poster");
    const cards = container.querySelectorAll(".poster-cards");
    if (cards.length < 2) return;

    const cardToCenter = cards[1]; // کارت دوم

    const scrollLeft = cardToCenter.offsetLeft - (container.offsetWidth - cardToCenter.offsetWidth) / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth"
    });
  }, 100);
});



// ------------------------------------------------ popup text and other  -------------------------------------------------------


function openPopup(element) {
    const popupId = element.getAttribute("data-popup");
    const popup = document.getElementById(popupId);

    const promptText = element.getAttribute("data-prompt");
    const imgBefore = element.getAttribute("data-img-before");
    const imgAfter = element.getAttribute("data-img-after");
    const type = element.getAttribute("data-type");

    // تعیین متن مخصوص نوع پرامپت
    let howToUseHTML = "";

    if (type === "chatgpt") {
        howToUseHTML = `
            <h4>How to use this filter</h4>
            <ul class="popup-menu">
                <li class="popup-menu-item">
                    Open <a href="https://chat.openai.com/" target="_blank">ChatGpt</a> Ai
                </li>
                <li class="popup-menu-item">Select + And Select Your photo</li>
                <li class="popup-menu-item">
                    Copy The Command Below And Paste It Into 
                    <a href="https://chat.openai.com/" target="_blank">ChatGpt</a> Ai
                </li>
            </ul>
        `;
    } else if (type === "benana") {
        howToUseHTML = `
            <h4>How to use this filter</h4>
            <ul class="popup-menu">
                <li class="popup-menu-item">
                    Open <a href="https://nanobanana.ai/" target="_blank">Nanobanana</a> Ai
                </li>
                <li class="popup-menu-item">Select + And Select Your photo</li>
                <li class="popup-menu-item">
                    Copy The Command Below And Paste It Into 
                    <a href="https://nanobanana.ai/" target="_blank">Nanobanana</a> Ai
                </li>
            </ul>
        `;
    } else {
        howToUseHTML = `
            <h4>How to use this filter</h4>
            <ul class="popup-menu">
                <li class="popup-menu-item">Open the related Ai platform</li>
                <li class="popup-menu-item">Select + And Select Your photo</li>
                <li class="popup-menu-item">Copy The Command Below And Paste It</li>
            </ul>
        `;
    }

    // مقداردهی درون پاپ‌آپ
    const leftSection = popup.querySelector(".popup-content-left");
    const boxContainer = `
        <div class="box-container" id="boxContainer">
            <div class="popup-box">
                <span id="promptText">${promptText}</span>
                <svg class="copy-btn" onclick="copyPrompt()" width="24" height="24" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.6665 20H5.33317C4.62593 20 3.94765 19.7191 3.44755 19.219C2.94746 18.7189 2.6665 18.0406 2.6665 17.3334V5.33335C2.6665 4.62611 2.94746 3.94783 3.44755 3.44774C3.94765 2.94764 4.62593 2.66669 5.33317 2.66669H17.3332C18.0404 2.66669 18.7187 2.94764 19.2188 3.44774C19.7189 3.94783 19.9998 4.62611 19.9998 5.33335V6.66669M14.6665 12H26.6665C28.1393 12 29.3332 13.1939 29.3332 14.6667V26.6667C29.3332 28.1394 28.1393 29.3334 26.6665 29.3334H14.6665C13.1937 29.3334 11.9998 28.1394 11.9998 26.6667V14.6667C11.9998 13.1939 13.1937 12 14.6665 12Z" stroke-width="2" />
                </svg>
            </div>
        </div>
    `;

    leftSection.innerHTML = howToUseHTML + boxContainer;

    popup.querySelector("#popupImageBefore").src = imgBefore;
    popup.querySelector("#popupImageAfter").src = imgAfter;

    popup.classList.add("active");
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove("active");
}

function copyPrompt() {
    const prompt = document.getElementById("promptText").innerText;
    navigator.clipboard.writeText(prompt);

    const infoBar = document.getElementById("infoBar");
    if (infoBar) {
        infoBar.style.display = "block";
        setTimeout(() => infoBar.style.display = "none", 2500);
    }
}


// -------------------------------------------------------------------------------------------------------

const posterContainer = document.querySelector('.poster');

posterContainer.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.poster-cards.poster-zoom');
  if (!card) return;
  card.style.transform = 'scale(1.05)';
  card.style.transition = 'transform 0.3s ease';
});

posterContainer.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.poster-cards.poster-zoom');
  if (!card) return;
  card.style.transform = 'scale(1)';
});




// // ---------------------------------------------------copy prompt -----------------------------------------------------------------
function copyPrompt() {
  const text = document.getElementById('promptText').innerText;
  navigator.clipboard.writeText(text).then(function() {
    showCopyNotification();
  });
}

function showCopyNotification() {
  const notif = document.getElementById('copy-notification');
  notif.style.display = 'block';
  notif.style.opacity = '1';
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.style.display = 'none', 300);
  }, 1200);
}


// -==============================================-09087568790-3-=3478390478039879283749287492874928743892749324

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.poster-cards'));
  const cardsPerPage = 12;
  let currentPage = 1;

  const paginationEl = document.getElementById('pagination');
  if (!paginationEl) {
    console.warn('pagination element (#pagination) not found in HTML.');
    return;
  }

  function showPage(page) {
    currentPage = page;
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, i) => {
      card.style.display = (i >= start && i < end) ? "" : "none"; // "" => default (block via CSS)
    });

    updatePagination();
    // برای اطمینان اسکرول به بالا هر بار صفحه عوض شد (اختیاری)
    // window.scrollTo({ top: paginationEl.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }

  function updatePagination() {
    const totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage));
    paginationEl.innerHTML = "";

    // Prev
    const prev = document.createElement('button');
    prev.innerText = 'Prev';
    prev.disabled = currentPage === 1;
    prev.onclick = () => showPage(Math.max(1, currentPage - 1));
    paginationEl.appendChild(prev);

    // numbered buttons (ساده)
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.innerText = i;
      btn.className = (i === currentPage) ? "active" : "";
      btn.onclick = () => showPage(i);
      paginationEl.appendChild(btn);
    }

    // Next
    const next = document.createElement('button');
    next.innerText = 'Next';
    next.disabled = currentPage === totalPages;
    next.onclick = () => showPage(Math.min(totalPages, currentPage + 1));
    paginationEl.appendChild(next);
  }

  // اجرا
  showPage(1);
});