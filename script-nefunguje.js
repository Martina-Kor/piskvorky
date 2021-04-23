'use strict';

let playing = 'circle';
let endOfGame = null;

let click = 0;

const playsElm = document.querySelector('.game__player--circle');
//console.log(playsElm);

const selectButton = (event) => {
  event.target.classList.add('btn--' + playing);
  if (playing === 'circle') {
    playing = 'cross';
    playsElm.src = 'image/cross.svg';
    playsElm.alt = 'Hraje křížek.';

    if (isWinningMove(field) === true) {
      endOfGame = 'circle';
      setTimeout(() => {
        playAgain('Vyhrálo kolečko. Chcete hrát znovu?');
      }, 200);
    }
  } else {
    playing = 'circle';
    playsElm.src = 'image/circle.svg';
    playsElm.alt = 'Hraje kolečko.';

    if (isWinningMove(field) === true) {
      endOfGame = 'cross';
      setTimeout(() => {
        playAgain('Vyhrál křížek. Chcete hrát znovu?');
      }, 200);
    }
  }
};

const btnSelected = document.querySelectorAll('button');
// check: console.log(btnSelected.length);

for (let i = 0; i < btnSelected.length; i += 1) {
  btnSelected[i].addEventListener('click', selectButton);
}

//------------HOMEWORK no. 5 ---------------

/* 1) Funkce getPosition(field), která pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrátí {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, … */

const boardSize = 10; // 10x10
//console.log(boardSize);

const fields = document.querySelectorAll('.board_field');
//console.log(fields.length);

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

//console.log(getPosition(fields[99]));

/* 2) Funkce getField(row, column), která naopak pro číslo řádku a sloupce vrátí příslušný prvek.*/

const getField = (row, column) => fields[row * boardSize + column];

console.log(getField(2, 3));

/* 3) Funkce getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined. */

const getSymbol = (field) => {
  if (field.classList.contains('btn--cross')) {
    return 'cross';
  } else if (field.classList.contains('btn--circle')) {
    return 'circle';
  }
};

/* 4) S použitím nachystaných funkcí zjistíme při každém tahu, jestli se nejedná o výherní. Nový kód navážeme na event listener ze čtvrtého úkolu.

Vytvoříme funkci isWinningMove(field), která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false. */

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

// starts new game
const playAgain = (message) => {
  let yes = confirm(message);
  if (yes === true) {
    location.reload();
  }
};

