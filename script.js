'use strict';

const selectButton = (event) => {
  event.target.classList.toggle('btn--selected');
};

const btnSelected = document.querySelectorAll('button');
/* console.log(btnSelected.length); */
for (let i = 0; i < btnSelected.length; i += 1) {
  btnSelected[i].addEventListener('click', selectButton);
}



