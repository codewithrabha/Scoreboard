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


  