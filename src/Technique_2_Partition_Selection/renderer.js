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

// Mouse Co-ordinates
let mouseCoords = document.getElementById("mouseLocation");

// Floating Image
let chosenImage = document.getElementById("floatingImage");

// Container containing button
// let box = document.getElementById("tester");

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

// let box_width = box.width;

// Image height dimensions
let i0_height = i0.height;
let i1_height = i1.height;
let i2_height = i2.height;
let i3_height = i3.height;
let i4_height = i4.height;
let i5_height = i5.height;

// let box_height = box.height;

// Icon bounding boxes
i0_imgBoundingBox = i0.getBoundingClientRect();
i1_imgBoundingBox = i1.getBoundingClientRect();
i2_imgBoundingBox = i2.getBoundingClientRect();
i3_imgBoundingBox = i3.getBoundingClientRect();
i4_imgBoundingBox = i4.getBoundingClientRect();
i5_imgBoundingBox = i5.getBoundingClientRect();

// box_BoundingBox = box.getBoundingClientRect();

// Four corners of box
// let leftX = box_BoundingBox.left;
// let leftUpperCornerY = box_BoundingBox.top;
// let leftLowerCornerY = leftUpperCornerY + box_height;
// let rightUpperCornerY = leftUpperCornerY;
// let rightLowerCornerY = leftLowerCornerY;
// let rightX = leftX + box_width;

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

// Getting x co-ordinate region borders
let border_0_0 = Math.round(408);
let border_0_1 = Math.round((i0_x + i1_x) / 2);
let border_1_2 = Math.round((i1_x + i2_x) / 2);
let border_2_3 = Math.round((i2_x + i3_x) / 2);
let border_3_4 = Math.round((i3_x + i4_x) / 2);
let border_4_5 = Math.round((i4_x + i5_x) / 2);

function save() {
  // change the filepath in the writeFile() function
  fs.writeFile(
    path.resolve(
      "/Users/igbobros/Library/CloudStorage/OneDrive-Personal/YR_3/TERM_2/COSC_341_PRIOR/COURSE_CONTENT/PROJECT_ASSIGNMENTS_SOLO/ASSN_5/61007530_Technique_3_Partition_Selection",
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

  // Activate image mouse hovering
  document.onmousemove = function () {
    chosenImage.style.display = "block";
    document.onmousemove = mouseTrap;
  };

  //  start timer
  startTime = performance.now();

  //  watch and see which button is clicked on during the task
  // Operating according to regional clicks not icon clicks
  document.onclick = function (e) {
    // Mouse x-co-ordinates
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (mouseX > border_0_0 && mouseY > 247) {
      if (mouseX > border_0_0 && mouseX < border_0_1) {
        // button-0
        // 1. adjust volume
        volume = parseInt(i0.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Currently Muted`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i0.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i0.id[7];
        iconObject = i0;
      } else if (mouseX > border_0_1 && mouseX < border_1_2) {
        // button-1
        // 1. adjust volume
        volume = parseInt(i1.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Current Volume: ${i1.getAttribute(
            "data-volume"
          )}`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i1.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i1.id[7];
        iconObject = i1;
      } else if (mouseX > border_1_2 && mouseX < border_2_3) {
        // button-2
        // 1. adjust volume
        volume = parseInt(i2.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Current Volume: ${i2.getAttribute(
            "data-volume"
          )}`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i2.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i2.id[7];
        iconObject = i2;
      } else if (mouseX > border_2_3 && mouseX < border_3_4) {
        // button-3
        // 1. adjust volume
        volume = parseInt(i3.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Current Volume: ${i3.getAttribute(
            "data-volume"
          )}`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i3.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i3.id[7];
        iconObject = i3;
      } else if (mouseX > border_3_4 && mouseX < border_4_5) {
        // button-4
        // 1. adjust volume
        volume = parseInt(i4.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Current Volume: ${i4.getAttribute(
            "data-volume"
          )}`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i4.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i4.id[7];
        iconObject = i4;
      } else if (mouseX > border_4_5) {
        // button-5
        // 1. adjust volume
        volume = parseInt(i5.getAttribute("data-volume"));
        music.volume = volume / 100;

        // 2. Call your technique specific function

        // - Changing volume display
        if (!music.paused) {
          // Only change volume display on icon click when music is playing
          display.innerHTML = `Current Volume: ${i5.getAttribute(
            "data-volume"
          )}`;
        }

        // 3. When task selection is completed, do all this:

        // - Stop timer
        stopTime = performance.now();
        timeTaken = Math.round(stopTime - startTime);

        // An alert just to check my code
        // alert(
        //   `That took ${timeTaken}. Icon clicked is ${i5.getAttribute(
        //     "data-volume"
        //   )}`
        // );

        // - figure out which button was clicked on
        iconClicked = i5.id[7];
        iconObject = i5;
      }

      // - Deactivate image mouse hovering
      document.onmousemove = function () {
        chosenImage.style.display = "none"; // Making image disappear
      };

      // - prevent other regions from being selected
      document.onclick = function () {};

      // - Log trial data
      dataLog += `${clicks}, ${targetIndex}, ${iconClicked}, ${timeTaken}\n`;

      // Incrementing clicks / tasks completed
      clicks++;

      // - update / reset various interface elements
      counterDisplay.style.display = "block";
      counterDisplay.innerHTML = `Trials Completed: ${clicks}`;

      startButton.style.visibility = `visible`;

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
    }
  };
};

const mouseTrap = function (e) {
  // Mouse co-ordinates
  let userX = e.clientX;
  let userY = e.clientY;

  // Volume according to region
  let volume1;

  // Mouse co-ordinates statement
  // mouseCoords.innerHTML = `You are here: (${userX}, ${userY})`;

  // Image tracking mouse movement
  chosenImage.style.left = `${userX - chosenImage.clientWidth / 2}px`;
  chosenImage.style.top = `${userY - chosenImage.clientHeight / 2}px`;

  // Changing cursor image according to region

  if (userX < border_0_0) {
    // Outside blue backgroundregion
    chosenImage.style.visibility = "hidden";
  } else {
    // Inside the blue background region
    chosenImage.style.visibility = "visible";
    if (userX > border_0_0 && userX < border_0_1) {
      // button-0
      chosenImage.src = i0.src;
      volume1 = parseInt(i0.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    } else if (userX > border_0_1 && userX < border_1_2) {
      // button-1
      chosenImage.src = i1.src;
      volume1 = parseInt(i1.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    } else if (userX > border_1_2 && userX < border_2_3) {
      // button-2
      chosenImage.src = i2.src;
      volume1 = parseInt(i2.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    } else if (userX > border_2_3 && userX < border_3_4) {
      // button-3
      chosenImage.src = i3.src;
      volume1 = parseInt(i3.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    } else if (userX > border_3_4 && userX < border_4_5) {
      // button-4
      chosenImage.src = i4.src;
      volume1 = parseInt(i4.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    } else if (userX > border_4_5) {
      // button-5
      chosenImage.src = i5.src;
      volume1 = parseInt(i5.getAttribute("data-volume"));
      music.volume = volume1 / 100;
    }
  }

  // Just to increase frequency of image tracking
  chosenImage.style.left = `${userX - chosenImage.clientWidth / 2}px`;
  chosenImage.style.top = `${userY - chosenImage.clientHeight / 2}px`;
};

// Function used to pause play and make associated changes
function techniqueSpecific() {
  let paused = music.paused;
  let volume2; // Volume of initial play

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
      // I think string differes if vol.0 or others
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
}

window.onload = function () {
  // Initial display of text on top of panel containing Start button
  counterDisplay.innerHTML = `There are ${maxTrials} trials in total`;

  // Majority of work to be done here
  startButton.onclick = function () {
    document.onclick = function () {};
    // Activate image mouse hovering
    document.onmousemove = function () {
      chosenImage.style.display = "block";
      document.onmousemove = mouseTrap;
    };
    timedClick();
  };

  // setup technique specific callback function here
  pausePlay.onclick = techniqueSpecific; // Function used to pause play and make associated changes

  // Mouse Location Listener
  //document.onmousemove = function () {
  // document.onmousemove = mouseTrap;
  //};
};
