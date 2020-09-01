
let columns = 20;
let rows = 20;

let pixels = [];

const initialSeed = () => {
  for (let i = 0; i < columns; i++) {
    pixels.push([]);
    for (let j = 0; j < rows; j++) {
      // pixels[i][j] = Math.random() >= 0.5;
      pixels[i][j] = false;
    }
  }
  // glider
  // pixels[2][0] = true;
  // pixels[2][1] = true;
  // pixels[2][2] = true;
  // pixels[1][2] = true;
  // pixels[0][1] = true;
  // square
  pixels[0][0] = true;
  pixels[0][1] = true;
  pixels[0][2] = true;
  pixels[1][0] = true;
  pixels[1][1] = true;
  pixels[1][2] = true;
  pixels[2][0] = true;
  pixels[2][1] = true;
  pixels[2][2] = true;

  draw(pixels);
  console.log(pixels);
  setTimeout(function () {
    update(pixels);
  }, 3000);
};



const update = () => {
  console.log(pixels);
  let newArray = [...pixels];

  // To update, take everyone in the existing pixels array
  // Loop through, calculate whether they should now be alive or dead
  // Assign those values to newArray
  // Then wait a sec probably
  // And call itself again?
  // for (let i = 0; i < columns; i++) {
  //   newArray.push([]);
  //   for (let j = 0; j < rows; j++) {
  //     let neighbors = calculateNeighbors(i, j, pixels);
  //     console.log(neighbors);
  //     if (neighbors < 2 || neighbors > 3) {
  //       newArray[i][j] = false;
  //     } else if (neighbors === 3 || neighbors === 2) {
  //       newArray[i][j] = true;
  //     }
  //   }
  // }
  const calculateNeighbors = (x, y, array) => {
    let neighbors = 0;
    const isAlive = (x, y) => {
      return array[x] && array[x][y] && array[x][y] === true;
    };
    if (isAlive(x - 1, y - 1)) neighbors++;
    if (isAlive(x, y - 1)) neighbors++;
    if (isAlive(x + 1, y - 1)) neighbors++;
    if (isAlive(x - 1, y)) neighbors++;
    if (isAlive(x + 1, y)) neighbors++;
    if (isAlive(x - 1, y + 1)) neighbors++;
    if (isAlive(x, y + 1)) neighbors++;
    if (isAlive(x + 1, y + 1)) neighbors++;

    return neighbors;
  };

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray[i].length; j++) {
      let neighbors = calculateNeighbors(i, j, newArray);
      if (neighbors > 5) {
        console.log("logged it");
        newArray[i][j] = true;
      } else {
        newArray[i][j] = false;
      }
      // if (neighbors < 2 || neighbors > 3) {
      //   // console.log(`${i, j} was ${pixels[i][j]} -> now ${pixels[i][j]}`);
      //   newArray[i][j] = false;
      // } else if (neighbors === 3 || neighbors === 2) {
      //   // console.log(`${(i, j)} was ${pixels[i][j]} -> now ${pixels[i][j]}`);
      //   newArray[i][j] = true;
      // }
    }
  }

  pixels = [...newArray];
  draw(pixels);
};

const draw = (array) => {
  const ctx = document.getElementById("lifecanvas").getContext("2d");
  ctx.clearRect(0, 0, 1512, 512);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === true) {
        ctx.fillStyle = "green";
        ctx.fillRect(i * 6, j * 6, 5, 5);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(i * 6, j * 6, 5, 5);
      }
    }
  }

  setTimeout(function () {
    update();
  }, 3000);
};

initialSeed();
console.log(pixels);
