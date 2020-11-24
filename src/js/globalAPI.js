if (!window.$$) {
  window.$$ = document.querySelector.bind(document);
}

// 阻止form表单默认提交行为
let forms = document.getElementsByTagName('form');
Array.prototype.forEach.call(forms, (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});