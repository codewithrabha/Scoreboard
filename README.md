# Score Board (Table Tennis)
This is a score tracking application for Table Tennis Sport that allows two players to keep track of their scores in a game. It provides functionality for increasing and decreasing scores, resetting scores, handling game over conditions, displaying a popup with game results, and implementing a toss and switch module for determining the serving player. Additionally, it includes a player selection module for selecting players.

The code is structured using event listeners and functions to handle different actions and interactions with the HTML elements on the page. It utilizes DOM manipulation to update the score fields, toggle classes for indicators, and create dynamic popups for displaying game results.

Initialization and Event Listeners
The code starts by adding an event listener to the DOMContentLoaded event. This ensures that the code inside the event listener executes only when the HTML document has finished loading.

ScoreBoard Demo : https://codewithrabha.github.io/scoreboard/

------------------------------------------------------------------

## Score Tracking
The code defines variables and selects the necessary HTML elements related to score tracking for both players. It selects score fields, increase and decrease buttons, and select fields for player one and player two.

## Add/Remove Players
This code enables the user to add and manage player options in a web application. It utilizes a modal to facilitate the addition of players, with an input field and an "Add" button. The player names are displayed in a list format, accompanied by a remove button for each player. The code also updates select fields with the added player options. The user can save the selected players and close the modal when finished. Overall, this code provides a user-friendly interface for managing player options in the application.

## Score Manipulation Functions
The code defines functions for updating scores, decreasing scores, and resetting scores. These functions handle the logic for incrementing and decrementing the scores based on button clicks.

## Game Over Popup
The code includes a function for displaying a popup with game results when a game is over. The function takes parameters such as the message to display, player scores, and a callback function to execute when the popup is closed.

## Toss and Switch Module
The code includes a toss and switch module that handles selecting a serving player and switching the serving player after two points. It defines a function to randomly select an element from an array, in this case, the player indicators.

## Player Selection Module
The code includes a player selection module that handles the selection of players. It selects the player select fields for player one and player two and adds an event listener to the player one select field.

## Project Overview
This project provides the functionality to track scores, handle game over conditions, display popups with game results, implement a toss and switch module for serving players, and enable player selection. You can use this code as a starting point for building a score tracking application or adapt it to fit your specific requirements.


# Change Log

## v1.0.1
* ADD - Option to add or remove players.
* ADD - Sound affects for toss and service change.

## v1.0
* Initial release.
