'use strict';

const MAX_CANVAS_SIZE = 100;
const MIN_CANVAS_SIZE = 16;
const canvas = document.querySelector('.etch-a-sketch-canvas');
const canvasWidth = canvas.clientWidth;
const gridSizeBanner = document.querySelector('.grid-size');
let gridSize = MIN_CANVAS_SIZE;

const clearGridKnob = document.querySelector('.clear-grid');
clearGridKnob.addEventListener('click', clearGrid);

const adjustGridKnob = document.querySelector('.adjust-grid');
adjustGridKnob.addEventListener('click', () => {
  adjustGridSize(promptGridSize());
});

const modes = document.querySelectorAll('input[name=mode]');

function getCurrentMode() {
  for (const mode of modes) {
    if (mode.checked) return mode.value;
  }
}

function calculateCellWidth() {
  return canvasWidth / gridSize;
}

function getRandom255() {
  return Math.floor(Math.random() * 256);
}

function getRandomRGB() {
  return `rgb(${getRandom255()} ${getRandom255()} ${getRandom255()})`;
}

function createCell(cellWidth) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.width = `${cellWidth}px`;
  cell.style.height = `${cellWidth}px`;
  cell.addEventListener('mouseover', colorCellBackground);
  cell.addEventListener('click', colorCellBackground);
  canvas.appendChild(cell);
  return cell;
}

function createGrid() {
  removeAllCells();
  const cellWidth = calculateCellWidth();
  for (let i = 0; i < gridSize ** 2; i++) {
    createCell(cellWidth);
  }
}

function colorCellBackground(event) {
  if (event.buttons !== 1 && event.type !== 'click') return;
  let color = 'black';
  if (getCurrentMode() === 'rgb') color = getRandomRGB();
  event.currentTarget.style.backgroundColor = color;
}

function clearGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = '';
  });
}

function removeAllCells() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

function updateGridSizeBanner() {
  gridSizeBanner.textContent = `${gridSize}x${gridSize}`;
}

function adjustGridSize(size) {
  gridSize = size;
  if (size < MIN_CANVAS_SIZE || isNaN(size)) gridSize = MIN_CANVAS_SIZE;
  if (size > MAX_CANVAS_SIZE) gridSize = MAX_CANVAS_SIZE;
  updateGridSizeBanner();
  createGrid();
}

function promptGridSize() {
  return parseInt(prompt('Enter a grid size (16 - 100):'));
}

updateGridSizeBanner();
createGrid();
