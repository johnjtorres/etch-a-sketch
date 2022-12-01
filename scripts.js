'use strict';

const MAX_CANVAS_SIZE = 100;
const MIN_CANVAS_SIZE = 16;
const MAX_OPACITY = 1;

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
  const cell = event.currentTarget;
  let color = 'rgba(0, 0, 0, 1)';
  if (getCurrentMode() === 'rgb') color = getRandomRGB();
  if (getCurrentMode() === 'increment') color = incrementCellOpacity(cell);
  cell.style.backgroundColor = color;
}

function incrementCellOpacity(cell) {
  let curColor = window.getComputedStyle(cell).backgroundColor;
  curColor = colorValues(curColor);
  const opacity = parseFloat(curColor[3]) || 0;
  let newColor = 'rgba(0, 0, 0, 0.1)';
  if (opacity > 0) {
    newColor = `rgba(0, 0, 0, ${Math.min(opacity + 0.1, MAX_OPACITY)})`;
  }
  return newColor;
}

function colorValues(color) {
  if (!color) return;
  if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0];
  if (color[0] === '#') {
    if (color.length < 7) {
      // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
      color =
        '#' +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        color[3] +
        color[3] +
        (color.length > 4 ? color[4] + color[4] : '');
    }
    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
      color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1,
    ];
  }
  if (color.indexOf('rgb') === -1) {
    // convert named colors
    var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
    var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
    temp_elem.style.color = flag;
    if (temp_elem.style.color !== flag) return; // color set failed - some monstrous css rule is probably taking over the color of our object
    temp_elem.style.color = color;
    if (temp_elem.style.color === flag || temp_elem.style.color === '') return; // color parse failed
    color = getComputedStyle(temp_elem).color;
    document.body.removeChild(temp_elem);
  }
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1) color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    return color.match(/[\.\d]+/g).map(function (a) {
      return +a;
    });
  }
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
