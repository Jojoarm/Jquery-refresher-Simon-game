let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

let started = "false";
let level = 0;

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// User Click
$(".btn").on("click", function (e) {
  let userChosenColor = e.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Function to play sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed"), 100;
  });
}

$("body").keydown(function () {
  if (started === "false") {
    $("#level-title").text("Level 0");
    nextSequence();
    started = "true";
  }
});

// Function to check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    // Check if the sequence of answer is correct
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

// Function to start all over
function startOver() {
    started = "false";
    level = 0;
    gamePattern = []
}