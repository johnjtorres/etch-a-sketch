'use strict';

const canvas = document.querySelector('.etch-a-sketch-canvas');
const canvasWidth = canvas.offsetWidth;
let gridSize = 16;

function calculateCellWidth() {
  return canvasWidth / gridSize;
}

function createCell(cellWidth) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.width = `${cellWidth}px`;
  cell.style.height = `${cellWidth}px`;
  canvas.appendChild(cell);
  return cell;
}

function createGrid() {
  const cellWidth = calculateCellWidth();
  for (let i = 0; i < gridSize ** 2; i++) {
    createCell(cellWidth);
  }
}

createGrid();
