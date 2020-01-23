const mainScraper = require('./mainScraper');

const secondLevelCheckbox = document.querySelector('#second-level-checkbox');
const secondLevelGroup = document.querySelector('.additional-group');
const scrapSubmitBtn = document.querySelector('#submit');

secondLevelCheckbox.addEventListener('change', e => {
  const { checked } = e.target;

  if (checked) {
    secondLevelGroup.classList.remove('hidden');
  } else {
    secondLevelGroup.classList.add('hidden');
  }
});

scrapSubmitBtn.addEventListener('click', mainScraper);
