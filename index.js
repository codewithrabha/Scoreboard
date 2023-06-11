document.addEventListener('DOMContentLoaded', () => {
  const currentDateTime = getCurrentDateTime();
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

  const resetBtnClickCount = () => {
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

  const fullscreenmode = document.getElementById('toggle-btn');
  fullscreenmode.addEventListener('click', () => {
    toggleFullScreen();
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

    const srcElement = document.querySelector("body");
    const saveButton = document.createElement('button');
    saveButton.className = 'save-record-button';
    saveButton.innerText = 'Save Record';
    saveButton.addEventListener('click', () => {

      html2canvas(srcElement).then((canvas) => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = `${playerOneName} vs ${playerTwoName} - ${currentDateTime}`;
        a.click();
      });

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

  // Get the div elements by their IDs
  const playerOneIndicator = document.getElementById("player-one-service-indicator");
  const playerTwoIndicator = document.getElementById("player-two-service-indicator");

  let activeIndicator; // Variable to store the currently active indicator

  const tossButton = document.getElementById("toss-btn");

  // Add event listener to the button
  tossButton.addEventListener("click", () => {
    // Create an array of the div elements
    const tossAudio = new Audio('assets\\toss.mp3');
    const indicators = [playerOneIndicator, playerTwoIndicator];
    tossAudio.play();

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
        const switchAudio = new Audio('assets\\switch-service.mp3');
        const serviceIndicators = [playerOneIndicator, playerTwoIndicator];
        const inactiveIndicators = serviceIndicators.filter(indicator => indicator !== activeIndicator);
        activeIndicator.classList.remove("active");
        inactiveIndicators[0].classList.add("active");
        activeIndicator = inactiveIndicators[0]; // Update activeIndicator with the new active indicator
        buttonClickCount = 0; // Reset the button click count to 0
        switchAudio.play();
      }
    });
  });
  //Toss & Switch Module Ends...

  // Add player Option Function Start
  // Get the modal element and the button to open it
  const modal = document.getElementById("modal");
  const addPlayerButton = document.getElementById("add-player");

  // Get the close button, input field, and add button within the modal
  const closeButton = document.getElementsByClassName("close")[0];
  const playerNameInput = document.getElementById("player-name");
  const addButton = document.getElementById("add-button");
  const playerList = document.getElementById("player-list");


  // // Open the modal when the "Add Player" button is clicked
  addPlayerButton.addEventListener("click", function () {
    modal.style.display = "flex";
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');
    popupOverlay.appendChild(modal);
    document.body.appendChild(popupOverlay);
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    const element = document.querySelector('.popup-overlay');
    element.parentNode.removeChild(element);
  });

  // Add a new player to the list when the "Add" button is clicked
  addButton.addEventListener("click", function () {
    const playerName = playerNameInput.value;

    if (playerName.trim() !== "") {
      addPlayer(playerName);
      playerNameInput.value = "";
    }
  });

  // Add player to the list and bind remove functionality
  function addPlayer(playerName) {
    const listItem = document.createElement("li");
    listItem.textContent = playerName;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="material-symbols-outlined">close</i>';
    removeButton.addEventListener("click", function () {
      listItem.remove();
    });

    listItem.appendChild(removeButton);
    playerList.appendChild(listItem);
  }

  // Get existing player options and add them to the modal's list
  const selectPlayerOptions = document.querySelectorAll(".select-player option");
  const uniquePlayerNames = new Set();


  selectPlayerOptions.forEach(function (option) {
    if (!option.disabled) {
      const playerName = option.textContent.trim();
      if (playerName !== "" && !uniquePlayerNames.has(playerName)) {
        addPlayer(playerName);
        uniquePlayerNames.add(playerName);
      }
    }
  });

  // Save the selected players and update the select fields
  const saveButton = document.querySelector(".save");
  saveButton.addEventListener("click", function () {
    const selectPlayers = document.querySelectorAll(".select-player");

    selectPlayers.forEach(function (selectPlayer) {
      // Remove existing options (excluding disabled options)
      const selectPlayerOptions = selectPlayer.querySelectorAll("option");
      selectPlayerOptions.forEach(function (option) {
        if (!option.disabled) {
          selectPlayer.removeChild(option);
        }
      });

      // Add new options from the list items
      const listItems = playerList.querySelectorAll("li");
      listItems.forEach(function (listItem) {
        const playerName = listItem.firstChild.textContent;
        const option = document.createElement("option");
        option.textContent = playerName;
        option.value = playerName; // Assign option name as the value
        selectPlayer.appendChild(option);
      });

    });
    // Close the modal
    modal.style.display = "none";
    const element = document.querySelector('.popup-overlay');
    element.parentNode.removeChild(element);
  });
  // Add player Option Function End...

});
// Core Function Ends...


