let pants = [28, 30, 32, 34];
let shirts = [95, 100, 105];

document.querySelectorAll('.form-select')[0].addEventListener('input', (e) => {
  if (e.currentTarget.value === '셔츠') {
    document.querySelectorAll('.form-select')[1].classList.remove('form-hide');
    document.querySelectorAll('.form-select')[1].innerHTML = '';
    shirts.forEach((item) => {
      document.querySelectorAll('.form-select')[1].insertAdjacentHTML('beforeend', `<option>${item}</option>`)
    })
  } else if (e.currentTarget.value === '모자') {
    document.querySelectorAll('.form-select')[1].classList.add('form-hide');
  } else if (e.currentTarget.value === '바지') {
    document.querySelectorAll('.form-select')[1].classList.remove('form-hide');
    document.querySelectorAll('.form-select')[1].innerHTML = '';
    pants.forEach((item) => {
      document.querySelectorAll('.form-select')[1].insertAdjacentHTML('beforeend', `<option>${item}</option>`)
    });
  }
});

document.querySelector('.list').addEventListener('click', (e) => {
  openTab(Number(e.target.dataset.id))
})

function openTab(i) {
  for (let i = 0; i < document.querySelectorAll('.tab-button').length; i++) {
    document.querySelectorAll('.tab-button')[i].classList.remove('orange');
    document.querySelectorAll('.tab-content')[i].classList.remove('show');
  };
  document.querySelectorAll('.tab-button')[i].classList.add('orange')
  document.querySelectorAll('.tab-content')[i].classList.add('show')
}