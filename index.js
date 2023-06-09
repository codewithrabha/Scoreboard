document.addEventListener('DOMContentLoaded', () => {
  const playerOneScoreField = document.querySelector('.player-one-score');
  const playerOneIncreaseButton = document.querySelectorAll('.inc-one-btn');
  const playerOneDecreaseButton = document.querySelector('.decrease-player-one-score');
  const playerOneSelectField = document.getElementById('player-one-select-field');

  const playerTwoScoreField = document.querySelector('.player-two-score');
  const playerTwoIncreaseButton = document.querySelectorAll('.inc-two-btn');
  const playerTwoDecreaseButton = document.querySelector('.decrease-player-two-score');
  const playerTwoSelectField = document.getElementById('player-two-select-field');

  playerOneScoreField.readOnly = true; // Lock player one score field
  playerTwoScoreField.readOnly = true; // Lock player two score field

  const resetButton = document.getElementById('reset-btn');

  const resetBtnClickCount = () =>{
    buttonClickCount = 0;
  }

  // Reset function to clear the "active" class from the div elements
  const resetIndicators = () => {
    const playerOneIndicator = document.getElementById("player-one-service-indicator");
    const playerTwoIndicator = document.getElementById("player-two-service-indicator");
    const indicators = [playerOneIndicator, playerTwoIndicator];

    indicators.forEach(function (indicator) {
      indicator.classList.remove("active");
    });
  }

  // Reset function to reset scores of both players.
  const resetScores = () => {
    playerOneScoreField.value = 0;
    playerTwoScoreField.value = 0;
  }

resetButton.addEventListener('click', () => {
    resetScores();
    resetIndicators();
    resetBtnClickCount();
  });

  playerOneIncreaseButton.forEach(button => {
    button.addEventListener('click', () => updateScore(playerOneScoreField, playerTwoScoreField));
  });

  playerOneDecreaseButton.addEventListener('click', () => {
    let currentValue = parseFloat(playerOneScoreField.value) || 0;
    let newValue = currentValue - 1;

    if (newValue >= 0) {
      playerOneScoreField.value = newValue;
    }
  });

  playerTwoIncreaseButton.forEach(button => {
    button.addEventListener('click', () => updateScore(playerTwoScoreField, playerOneScoreField));
  });

  playerTwoDecreaseButton.addEventListener('click', () => {
    let currentValue = parseFloat(playerTwoScoreField.value) || 0;
    let newValue = currentValue - 1;

    if (newValue >= 0) {
      playerTwoScoreField.value = newValue;
    }
  });

  playerOneScoreField.value = 0;
  playerTwoScoreField.value = 0;

  // Score update function Start
  const updateScore = (currentPlayerScoreField, opponentScoreField) => {
    let currentValue = parseFloat(currentPlayerScoreField.value) || 0;
    let newValue = currentValue + 1;
  
    if (
      newValue >= 11 &&
      currentValue === parseFloat(opponentScoreField.value) &&
      currentValue >= 10 &&
      newValue - opponentScoreField.value >= 2
    ) {
      let winner, loser;
  
      if (currentPlayerScoreField === playerOneScoreField) {
        winner = playerOneSelectField.options[playerOneSelectField.selectedIndex].text;
        loser = playerTwoSelectField.options[playerTwoSelectField.selectedIndex].text;
      } else {
        winner = playerTwoSelectField.options[playerTwoSelectField.selectedIndex].text;
        loser = playerOneSelectField.options[playerOneSelectField.selectedIndex].text;
      }
  
      let playerOneScore = playerOneScoreField.value;
      let playerTwoScore = playerTwoScoreField.value;
      currentPlayerScoreField.value = newValue;
      showPopup(`Game Over! ${winner} wins!`, playerOneScore, playerTwoScore, resetScores);
      return;
    }
  
    if (newValue >= 11 && newValue - opponentScoreField.value >= 2) {
      let winner, loser;
  
      if (currentPlayerScoreField === playerOneScoreField) {
        winner = playerOneSelectField.options[playerOneSelectField.selectedIndex].text;
        loser = playerTwoSelectField.options[playerTwoSelectField.selectedIndex].text;
      } else {
        winner = playerTwoSelectField.options[playerTwoSelectField.selectedIndex].text;
        loser = playerOneSelectField.options[playerOneSelectField.selectedIndex].text;
      }
  
      let playerOneScore = playerOneScoreField.value;
      let playerTwoScore = playerTwoScoreField.value;
      currentPlayerScoreField.value = newValue;
      showPopup(`Game Over! ${winner} wins!`, playerOneScore, playerTwoScore, resetScores);
      return;
    }
  
    currentPlayerScoreField.value = newValue;
  }
  // Score update function end...


  // Game Over Popup function Start
  const showPopup = (message, playerOneScore, playerTwoScore, onClose) => {
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('result-popup');

    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-content-container';

    const content = document.createElement('h1');
    content.innerText = message;
    scoreContainer.appendChild(content);

    const scores = document.createElement('h2');
    scores.classList.add('scores');
    playerOneScore = playerOneScoreField.value;
    playerTwoScore = playerTwoScoreField.value;
    const playerOneName = playerOneSelectField.options[playerOneSelectField.selectedIndex].text;
    const playerTwoName = playerTwoSelectField.options[playerTwoSelectField.selectedIndex].text;
    scores.innerText = `${playerOneName} [${playerOneScore}] - ${playerTwoName} [${playerTwoScore}]`;
    scoreContainer.appendChild(scores);

    popup.appendChild(scoreContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.className = 'close-popup-button';
    closeButton.addEventListener('click', () => {
      popupOverlay.remove();
      onClose();
      resetIndicators();
      resetBtnClickCount();
    });

    buttonContainer.appendChild(closeButton);

    const saveButton = document.createElement('button');
    saveButton.className = 'save-record-button';
    saveButton.innerText = 'Save Record';
    saveButton.addEventListener('click', () => {
      // Save button click handler
    });
    buttonContainer.appendChild(saveButton);

    popup.appendChild(buttonContainer);

    popupOverlay.appendChild(popup);
    document.body.appendChild(popupOverlay);
  }
  // Game Over Popup function End...

  //Toss & Switch Module Starts
// Function to randomly select an element from an array
const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Wrap the code inside the DOMContentLoaded event listener

  // Get the div elements by their IDs
  const playerOneIndicator = document.getElementById("player-one-service-indicator");
  const playerTwoIndicator = document.getElementById("player-two-service-indicator");

  let activeIndicator; // Variable to store the currently active indicator

  const tossButton = document.getElementById("toss-btn");

  // Add event listener to the button
  tossButton.addEventListener("click", function () {
    // Create an array of the div elements
    const indicators = [playerOneIndicator, playerTwoIndicator];

    // Remove the "active" class from both divs
    indicators.forEach(function (indicator) {
      indicator.classList.remove("active");
    });

    // Select a random indicator and add the "active" class
    const randomIndicator = getRandomElement(indicators);
    randomIndicator.classList.add("active");

    activeIndicator = randomIndicator; // Store the currently active indicator
  });

  //Switch Active indicator after Two Points
  let buttonClickCount = 0; // Variable to track button clicks
  const increaseButtons = document.querySelectorAll(".increase-point");
  increaseButtons.forEach(button => {
    button.addEventListener("click", function () {
      buttonClickCount++;

      if (buttonClickCount >= 2) {
        const serviceIndicators = [playerOneIndicator, playerTwoIndicator];
        const inactiveIndicators = serviceIndicators.filter(indicator => indicator !== activeIndicator);
        activeIndicator.classList.remove("active");
        inactiveIndicators[0].classList.add("active");
        activeIndicator = inactiveIndicators[0]; // Update activeIndicator with the new active indicator
        buttonClickCount = 0; // Reset the button click count to 0
      }
    });
  });
//Toss & Switch Module Ends...
});
// Core Function Ends...

//Player Selection Module Starts
document.addEventListener('DOMContentLoaded', () => {
  const playerOneSelectField = document.getElementById('player-one-select-field');
  const playerTwoSelectField = document.getElementById('player-two-select-field');

  playerOneSelectField.addEventListener('change', (e) => {
    const selectedOption = e.target.value;
    const playerTwoOptions = playerTwoSelectField.options;

    // Enable all options and remove 'hidden' class
    for (let i = 0; i < playerTwoOptions.length; i++) {
      playerTwoOptions[i].disabled = false;
      playerTwoOptions[i].classList.remove('hidden');
    }

    // Disable selected option
    const disabledOption = playerTwoSelectField.querySelector(`option[value="${selectedOption}"]`);
    disabledOption.disabled = true;
    disabledOption.classList.add('hidden');
    playerTwoSelectField.value = '';
  });
});
//Player Selection Module Ends...
