/*/~Epic Sandboxels Mod~/*/

// Adding elements:
elements.left_liquid = {
  color: "#9400D3",
  behavior: behaviors.LIQUID,
  category: "liquids",
  viscosity: 100000,
  state: "liquid",
  density: 720,
};

// Raw JavaScript behaviors:
elements.left_liquid.tick = function (pixel) {
  if (pixel.start === pixelTicks) {
    return;
  }
  if (pixel.charge && elements[pixel.element].behaviorOn) {
    pixelTick(pixel);
  }
  if (
    elements[pixel.element].viscosity &&
    !(Math.random() * 100 < 100 / elements[pixel.element].viscosity ** 0.25)
  ) {
    var move1Spots = [[pixel.x, pixel.y + 1]];
  } else {
    var move1Spots = [
      [pixel.x - 1, pixel.y + 1],
      [pixel.x - 1, pixel.y],
      [pixel.x - 1, pixel.y - 1],
    ];
  }
  var moved = false;
  for (var i = 0; i < move1Spots.length; i++) {
    var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
    if (tryMove(pixel, coords[0], coords[1])) {
      moved = true;
      break;
    } else {
      move1Spots.splice(move1Spots.indexOf(coords), 1);
    }
  }
  if (!moved) {
    if (
      elements[pixel.element].viscosity === undefined ||
      !!(Math.random() * 100 < 100 / elements[pixel.element].viscosity ** 0.25)
    ) {
      if (Math.random() < 0.5) {
        if (!tryMove(pixel, pixel.y + 1, pixel.y)) {
          tryMove(pixel, pixel.y - 1, pixel.y);
        }
      } else {
        if (!tryMove(pixel, pixel.y - 1, pixel.y)) {
          tryMove(pixel, pixel.y + 1, pixel.y);
        }
      }
    }
  }
  doDefaults(pixel);
};

// Create a new tool:
// elements.sand_exploder = {
//   color: "#ff0000",
//   tool: function (pixel) {
//     if (pixel.element == "sand") {
//       pixel.element = "explosion";
//     }
//   },
//   category: "tools",
// };


// Creating eLists:
eLists.GRAVITY = ["left_liquid"];
