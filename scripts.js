'use strict';

const etchASketch = document.querySelector('.etch-a-sketch');

function createCell() {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  return cell;
}
