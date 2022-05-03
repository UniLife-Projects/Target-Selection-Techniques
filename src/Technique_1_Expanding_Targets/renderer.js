// define general variables

const app = require("electron").remote.app;
const fileDir = app.getPath("desktop");
const path = require("path");

// Timer variables
let startTime;
let stopTime;
let timeTaken;

// Used in save function to write file to directory
let fs = require("fs");

// References to music related HTML elements
let pausePlay = document.getElementById("player-button");
const pausePlaySrc = pausePlay.src;
let pause = document.getElementById("pause-button");
let music = document.getElementById("music-player");
let display = document.getElementById("volume-display");

// To keep record of the data to log
let dataLog = "";

// The count of the number of tasks completed
let clicks = 0;

// Variables to generate random volume to select.
// maxTrials and numIcons should be divisible with 'maxTrials >= numIcons'
const maxTrials = 6;
const numIcons = 6;
const timesEachIconCanServeAsTarget = maxTrials / numIcons;
let timesEachIconCanServeAsTargetList = [0, 0, 0, 0, 0, 0];

// Referencing our start button
let startButton = document.getElementById("start-button");

// The "DISPLAY" of the number of tasks completed
let counterDisplay = document.getElementById("counter");

// Element whose text we will be substituting
let textSubstitute = document.getElementById("volume-target");

// To carry ID to be logged of icon that has been clicked
let iconClicked;

// To retain the very icon object element that is clicked
let iconObject;

// To keep record of volume
let volume;

// element of container holding the icons to play with
let parent = document.getElementById("volume-bar");

// Array of all icons (hint: use the parent var to reference its children icons)
let icons = parent.children;

// Images
let image0 = icons[0];
let image1 = icons[1];
let image2 = icons[2];
let image3 = icons[3];
let image4 = icons[4];
let image5 = icons[5];

parent.appendChild(image0);
parent.appendChild(image1);
parent.appendChild(image2);
parent.appendChild(image3);
parent.appendChild(image4);
parent.appendChild(image5);

// Retrieving Images
// Note that these are the HTML ID names
let i0 = document.getElementById("button-0");
let i1 = document.getElementById("button-1");
let i2 = document.getElementById("button-2");
let i3 = document.getElementById("button-3");
let i4 = document.getElementById("button-4");
let i5 = document.getElementById("button-5");

// Image width dimensions
let i0_width = i0.width;
let i1_width = i1.width;
let i2_width = i2.width;
let i3_width = i3.width;
let i4_width = i4.width;
let i5_width = i5.width;

// Image height dimensions
let i0_height = i0.height;
let i1_height = i1.height;
let i2_height = i2.height;
let i3_height = i3.height;
let i4_height = i4.height;
let i5_height = i5.height;

// Respective Icon bounding boxes
i0_imgBoundingBox = i0.getBoundingClientRect();
i1_imgBoundingBox = i1.getBoundingClientRect();
i2_imgBoundingBox = i2.getBoundingClientRect();
i3_imgBoundingBox = i3.getBoundingClientRect();
i4_imgBoundingBox = i4.getBoundingClientRect();
i5_imgBoundingBox = i5.getBoundingClientRect();

// Icon x c0-ordinates
let i0_x = i0_imgBoundingBox.left;
let i1_x = i1_imgBoundingBox.left;
let i2_x = i2_imgBoundingBox.left;
let i3_x = i3_imgBoundingBox.left;
let i4_x = i4_imgBoundingBox.left;
let i5_x = i5_imgBoundingBox.left;

// Icon y co-0rdinates
let i0_y = i0_imgBoundingBox.top;
let i1_y = i1_imgBoundingBox.top;
let i2_y = i2_imgBoundingBox.top;
let i3_y = i3_imgBoundingBox.top;
let i4_y = i4_imgBoundingBox.top;
let i5_y = i5_imgBoundingBox.top;

// Gerring x center co-ordinate of image
i0_x = Math.round(i0_imgBoundingBox.left + i0_width / 2);
i1_x = Math.round(i1_imgBoundingBox.left + i1_width / 2);
i2_x = Math.round(i2_imgBoundingBox.left + i2_width / 2);
i3_x = Math.round(i3_imgBoundingBox.left + i3_width / 2);
i4_x = Math.round(i4_imgBoundingBox.left + i4_width / 2);
i5_x = Math.round(i5_imgBoundingBox.left + i5_width / 2);

// Gerring y center co-0rdinate of image
i0_y = Math.round(i0_imgBoundingBox.top + i0_height / 2);
i1_y = Math.round(i1_imgBoundingBox.top + i1_height / 2);
i2_y = Math.round(i2_imgBoundingBox.top + i2_height / 2);
i3_y = Math.round(i3_imgBoundingBox.top + i3_height / 2);
i4_y = Math.round(i4_imgBoundingBox.top + i4_height / 2);
i5_y = Math.round(i5_imgBoundingBox.top + i5_height / 2);

// Max Distance between cursor and Icon before I start to enlarge image (measured in pixels I suppose)
// This is used to form the invisible fence around each image
const maxPossibleDistance = 120;

// Difference Between maxPossibleDistance and respective currentDistanceBetweenCursorAndIcon
let difference_i0;
let difference_i1;
let difference_i2;
let difference_i3;
let difference_i4;
let difference_i5;

// x Distance between the mouse and the image
let x0;
let x1;
let x2;
let x3;
let x4;
let x5;

// y Distance between the mouse and the image
let y0;
let y1;
let y2;
let y3;
let y4;
let y5;

// Absolute distance between the mouse and the image
let distance0;
let distance1;
let distance2;
let distance3;
let distance4;
let distance5;

function save() {
  // change the filepath in the writeFile() function
  fs.writeFile(
    path.resolve(
      "/Users/igbobros/Library/CloudStorage/OneDrive-Personal/YR_3/TERM_2/COSC_341_PRIOR/COURSE_CONTENT/PROJECT_ASSIGNMENTS_SOLO/ASSN_5/61007530_Technique_1_Expanding_Targets",
      "JStest.csv"
    ),
    dataLog,
    (err) => {
      if (err) alert(err);
      alert("all tasks are done");
    }
  );
}
function randomTarget() {
  let choice = Math.round(Math.random() * 5);

  while (
    timesEachIconCanServeAsTargetList[choice] == timesEachIconCanServeAsTarget
  ) {
    choice = Math.round(Math.random() * 5);
  }

  timesEachIconCanServeAsTargetList[choice]++;

  return choice;
}

var timedClick = function () // saves data to file
// generates random volume to select
// function to do technique specific stuff
{
  //  disables the start button so it can't be clicked twice
  startButton.onclick = function () {
    timedClick();
  };

  //  update task selection instruction
  startButton.style.visibility = "hidden";
  counterDisplay.style.display = "none";

  let targetIndex = randomTarget();
  let targetIcon = icons[targetIndex];

  if (targetIcon.getAttribute("data-volume") == "0") {
    textSubstitute.innerHTML = `Set volume to: Mute`;
  } else {
    textSubstitute.innerHTML = `Set volume to: ${targetIcon.getAttribute(
      "data-volume"
    )}`;
  }

  //  start timer
  startTime = performance.now();

  //  watch and see which button is clicked on during the task
  for (var i = 0; i < icons.length; i++) {
    // attach an event listener to each button click
    icons[i].onclick = function () {
      // 1. adjust volume

      volume = parseInt(this.getAttribute("data-volume"));
      music.volume = volume / 100;
      // 2. call your technique specific function

      // A place to change the 'display' variable on icon click. String differs between volume 0 and others
      iconObject = this;

      if (!music.paused) {
        // Only change volume display on icon click when music is playing
        if (iconObject.getAttribute("data-volume") == "0") {
          display.innerHTML = `Currently Muted`;
        } else {
          display.innerHTML = `Current Volume: ${iconObject.getAttribute(
            "data-volume"
          )}`;
        }
      }

      // 3. when task selection is completed, do all this:

      // - stop timer
      stopTime = performance.now();
      timeTaken = Math.round(stopTime - startTime);

      // - prevent other buttons from being selected
      for (let i = 0; i < icons.length; i++) {
        icons[i].onclick = function () {};
      }

      // An alert just to check my code
      // alert(
      //   `That took ${timeTaken}. Icon clicked is ${iconObject.getAttribute(
      //     "data-volume"
      //   )}`
      // );

      // - figure out which button was clicked on
      iconClicked = this.id[7];

      // - log trial data
      dataLog += `${clicks}, ${targetIndex}, ${iconClicked}, ${timeTaken}\n`;

      // incrementing clicks / tasks completed
      clicks++;

      // - update/reset various interface elements
      counterDisplay.style.display = "block";
      counterDisplay.innerHTML = `Trials Completed: ${clicks}`;

      startButton.style.visibility = "visible";

      textSubstitute.innerHTML = `Start Next Trial`;

      // - check if maxTrials completed yet
      if (clicks == maxTrials) {
        // There is an alert call in the save function
        counterDisplay.style.display = "none";
        save();
        clicks = 0;
        dataLog = "";
      }

      // reactivate the start button by changing the onclick function from nothing back to starting the trial
      startButton.onclick = timedClick;
    };
  }
};

const mouseTrap = function (e) {
  // Mouse co-ordinates
  let userX = e.clientX;
  let userY = e.clientY;

  // x Distance between the mouse and the image
  x0 = Math.abs(userX - i0_x);
  x1 = Math.abs(userX - i1_x);
  x2 = Math.abs(userX - i2_x);
  x3 = Math.abs(userX - i3_x);
  x4 = Math.abs(userX - i4_x);
  x5 = Math.abs(userX - i5_x);

  // y Distance between the mouse and the image
  y0 = Math.abs(userY - i0_y);
  y1 = Math.abs(userY - i1_y);
  y2 = Math.abs(userY - i2_y);
  y3 = Math.abs(userY - i3_y);
  y4 = Math.abs(userY - i4_y);
  y5 = Math.abs(userY - i5_y);

  // Absolute distance between the mouse and the image
  distance0 = Math.round(Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2)));
  distance1 = Math.round(Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)));
  distance2 = Math.round(Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2)));
  distance3 = Math.round(Math.sqrt(Math.pow(x3, 2) + Math.pow(y3, 2)));
  distance4 = Math.round(Math.sqrt(Math.pow(x4, 2) + Math.pow(y4, 2)));
  distance5 = Math.round(Math.sqrt(Math.pow(x5, 2) + Math.pow(y5, 2)));

  // Getting extent by which to increase image size
  difference_i0 = maxPossibleDistance - distance0;
  difference_i1 = maxPossibleDistance - distance1;
  difference_i2 = maxPossibleDistance - distance2;
  difference_i3 = maxPossibleDistance - distance3;
  difference_i4 = maxPossibleDistance - distance4;
  difference_i5 = maxPossibleDistance - distance5;

  // Changing image size accordingly
  // Image size changed only if mouse if within image vicinity
  if (difference_i0 > 0) {
    i0.style.width = `${i0_width + difference_i0}px`;
    i0.style.height = `${i0_height + difference_i0}px`;
  }
  if (difference_i1 > 0) {
    i1.style.width = `${i1_width + difference_i1}px`;
    i1.style.height = `${i1_height + difference_i1}px`;
  }
  if (difference_i2 > 0) {
    i2.style.width = `${i2_width + difference_i2}px`;
    i2.style.height = `${i2_height + difference_i2}px`;
  }
  if (difference_i3 > 0) {
    i3.style.width = `${i3_width + difference_i3}px`;
    i3.style.height = `${i3_height + difference_i3}px`;
  }
  if (difference_i4 > 0) {
    i4.style.width = `${i4_width + difference_i4}px`;
    i4.style.height = `${i4_height + difference_i4}px`;
  }
  if (difference_i5 > 0) {
    i5.style.width = `${i5_width + difference_i5}px`;
    i5.style.height = `${i5_height + difference_i5}px`;
  }
};

// Function used to pause play and make associated changes
let techniqueSpecific = function () {
  let paused = music.paused;
  let volume2;

  // Taking this pathway means system is currently paused therefore clicking means the user wants to play
  if (paused) {
    music.play();
    pausePlay.src = pause.src;
    if (clicks == 0) {
      display.innerHTML = `Current Volume: 100`;
      volume2 = parseInt(i5.getAttribute("data-volume")); // 100% volume by default
      music.volume = volume2 / 100;
    } else {
      // change string to actual volume
      // I think string differs if vol.0 or others
      if (iconObject.getAttribute("data-volume") == "0") {
        display.innerHTML = `Currently Muted`;
      } else {
        display.innerHTML = `Current Volume: ${iconObject.getAttribute(
          "data-volume"
        )}`;
      }
    }
  } else {
    music.pause();
    pausePlay.src = pausePlaySrc;
    display.innerHTML = `Music Paused`;
  }
};

window.onload = function () {
  // Initial display of text on top of panel containing Start button
  counterDisplay.innerHTML = `There are ${maxTrials} trials in total`;

  // Majority of work to be done here
  startButton.onclick = timedClick;

  // setup technique specific callback function here
  pausePlay.onclick = techniqueSpecific; // Function used to pause play and make associated changes

  // Mouse Location Listener
  document.onmousemove = function () {
    document.onmousemove = mouseTrap;
  };
};
