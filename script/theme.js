// اعمال تم ذخیره‌شده هنگام لود صفحه
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || savedTheme === null) {
  // پیش‌فرض دارک مود
  document.documentElement.classList.add('dark-mode');
  document.getElementById('theme-checkbox').checked = true;
  if (savedTheme === null) {
    localStorage.setItem('theme', 'dark');
  }
} else {
  document.documentElement.classList.remove('dark-mode');
  document.getElementById('theme-checkbox').checked = false;
}

// سوییچ تم با چک‌باکس
document.getElementById('theme-checkbox').addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } 
});

