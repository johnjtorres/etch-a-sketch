'use strict';

const canvas = document.querySelector('.etch-a-sketch-canvas');
const canvasWidth = canvas.offsetWidth;
let gridSize = 16;

const clearGridKnob = document.querySelector('.clear-grid');
clearGridKnob.addEventListener('click', clearGrid);

function calculateCellWidth() {
  return canvasWidth / gridSize;
}

function createCell(cellWidth) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.width = `${cellWidth}px`;
  cell.style.height = `${cellWidth}px`;
  cell.addEventListener('mouseover', colorBackgroundOnHover);
  canvas.appendChild(cell);
  return cell;
}

function createGrid() {
  const cellWidth = calculateCellWidth();
  for (let i = 0; i < gridSize ** 2; i++) {
    createCell(cellWidth);
  }
}

function colorBackgroundOnHover(event) {
  event.currentTarget.style.backgroundColor = 'black';
}

function clearGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = '';
  });
}

createGrid();
