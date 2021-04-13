'use strict';

let playing = 'circle';

let click = 0;
const playsElm = document.querySelector('.game__player--circle');
//console.log(playsElm);

const selectButton = (event) => {
  event.target.classList.add('btn--' + playing);
  if (playing === 'circle') {
    playing = 'cross';
    playsElm.src = 'image/cross.svg';
    playsElm.alt = 'Hraje křížek.';
  } else {
    playing = 'circle';
    playsElm.src = 'image/circle.svg';
    playsElm.alt = 'Hraje kolečko.';
  }
  event.target.disabled = true;
  click++;
  console.log(click);
};

const btnSelected = document.querySelectorAll('button');
// check: console.log(btnSelected.length);
for (let i = 0; i < btnSelected.length; i += 1) {
  btnSelected[i].addEventListener('click', selectButton);
}
