// import "@babel/polyfill";

let columns = window.innerWidth / 3;
let rows = window.innerHeight / 3;

let pixels = [];

let state = {
  iteration: 0,
  running: true
}

const initialSeed = () => {
  for (let i = 0; i < columns; i++) {
    pixels.push([]);
    for (let j = 0; j < rows; j++) {
      pixels[i][j] = Math.random() >= 0.5;
      // pixels[i][j] = false;
    }
  }
  // glider
  // pixels[1][2] = true;
  // pixels[2][3] = true;
  // pixels[3][1] = true;
  // pixels[3][2] = true;
  // pixels[3][3] = true;
  // square
  // pixels[0][0] = true;
  // pixels[0][1] = true;
  // pixels[0][2] = true;
  // pixels[1][0] = true;
  // pixels[1][1] = true;
  // pixels[1][2] = true;
  // pixels[2][0] = true;
  // pixels[2][1] = true;
  // pixels[2][2] = true;

  draw(pixels);
};

const calculateNeighbors = (x, y, array) => {
  let neighbors = 0;
  const isAlive = (x, y) => {
    return array[x] && array[x][y] && array[x][y] === true;
  };
  if (isAlive(x, y + 1)) neighbors++;
  if (isAlive(x, y - 1)) neighbors++;
  if (isAlive(x + 1, y - 1)) neighbors++;
  if (isAlive(x - 1, y + 1)) neighbors++;
  if (isAlive(x + 1, y + 1)) neighbors++;
  if (isAlive(x - 1, y - 1)) neighbors++;
  if (isAlive(x + 1, y)) neighbors++;
  if (isAlive(x - 1, y)) neighbors++;

  return neighbors;
};

const createNextArray = () => {
  let nextArray = [];
  for (let i = 0; i < columns; i++) {
    nextArray.push([]);
    for (let j = 0; j < rows; j++) {
      let neighbors = calculateNeighbors(i, j, pixels);
      if (pixels[i][j] === true) {
        if (neighbors === 2 || neighbors === 3) {
          nextArray[i][j] = true;
        } else {
          nextArray[i][j] = false;
        }
      } else if (neighbors === 3) {
        nextArray[i][j] = true;
      } else {
        nextArray[i][j] = false;
      }
    }
  }
  // console.log(nextArray);
  pixels = nextArray;
  draw(pixels);
  state.iteration++;
  const iteration = document.getElementById("iteration");
  iteration.innerHTML = state.iteration;
  if (state.running === true) {
    setTimeout(function () {
      createNextArray();
    }, 60);
  }
};

const stopStartButton = document.getElementById("stopStartButton");
stopStartButton.addEventListener("click", () => {
  if (state.running === true) {
    state.running = false;
    stopStartButton.innerHTML = "Start";
  } else {
    state.running = true;
    stopStartButton.innerHTML = "Stop";
    createNextArray();
  }
});

const draw = (array) => {
  const canvas = document.getElementById("lifecanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = document.getElementById("lifecanvas").getContext("2d");
  ctx.clearRect(0, 0, 1512, 512);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === true) {
        ctx.fillStyle = "#CB320F";
        ctx.fillRect(i * 3, j * 3, 3, 3);
      } else {
        ctx.fillStyle = "#11223C";
        ctx.fillRect(i * 3, j * 3, 3, 3);
      }
    }
  }
};

// create seeded array
// draw
// create next array
// set next array to original array
// draw
initialSeed();
setTimeout(function () {
  createNextArray();
}, 60);
