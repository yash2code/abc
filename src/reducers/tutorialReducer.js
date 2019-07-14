const initialState = {
  tutorialSteps: [
    { left: 26, top: 32, right: 29.5, bottom: 32,
      textBoxes: [{ text: 'To begin, upload a photo of the yard you want to design.', justify: 'center', textXPos: 34, textYPos: 20, width: 26 }]},
    { left: 86, top: 86, right: 3.2, bottom: 2,
      textBoxes: [{ text: `Let's add a tree / plant to your design. Open the drawer to browse our collection.`, justify: 'right', textXPos: 58, textYPos: 85, width: 24}] },
    { left: 39.4, top: 65.5, right: 33, bottom: 0,
      textBoxes: [{ text: 'Select the category you are interested in.', justify: 'center', textXPos: 43, textYPos: 54, width: 22}] },
    { left: 13.1, top: 65.5, right: 61, bottom: 0,
      textBoxes: [{ text: 'Tap / Click the ( + ) icon or drag your tree / plant onto your design. ', justify: 'center', textXPos: 15, textYPos: 50, width: 22}] },
    { left: 24, top: 18, right: 34, bottom: 12,
      textBoxes: [{ text: 'Move, Rotate or Resize your tree / plant.', justify: 'right', textXPos: 4, textYPos: 43, width: 18}] },
    { left: 78, top: 0, right: 0, bottom: 0,
      textBoxes: [{ text: 'From this toolset you can also Crop, Duplicate, Flip, Erase, and Delete trees and plants.', justify: 'right', textXPos: 50, textYPos: 42, width: 22}] },
    { left: 0, top: 0, right: 0, bottom: 0,
      textBoxes: [{ text: '', justify: 'left', textXPos: 34, textYPos: 36, width: 0},
        { text: 'Use the Menu Icon to open the Menu and navigate Backyard Builder.', justify: 'left', textXPos: 6, textYPos: 22, width: 22},
        { text: 'Use the Finish Icon to save, submit your design and schedule a consultation.', justify: 'right', textXPos: 68, textYPos: 24, width: 26},
        { text: 'Use the Save Icon to save a draft of your design.', justify: 'right', textXPos: 72, textYPos: 36, width: 22},
        { text: `Use this Icon at any time during design to see your list of current design inventory.`, justify: 'left', textXPos: 6, textYPos: 75, width: 26}] }
  ],
  step: 0,
  isRunning: false,
  splash: true
}
export default function(state = initialState, action) {
  var step, isRunning, splash
  switch (action.type) {
    case "nextTutorialStep":
      if (state.splash) {
        step = 0
        isRunning = true
        splash = false
      } else if (state.step >= (state.tutorialSteps.length - 1)) {
        step = 0
        isRunning = false
        splash = true
      } else {
        step = (state.step + 1)
        isRunning = true
        splash = false
      }
      return {
        ...state,
        step: step,
        isRunning: isRunning,
        splash: splash
      };
    case "previousTutorialStep":
      return {
        ...state,
        step: (state.step - 1)
      };
    case "startTutorial":
      step = 0
      return {
        ...state,
        step: step,
        isRunning: true,
        splash: true
      }
    case "resetTutorial":
      return {
        ...state,
        step: 0,
        isRunning: false,
        splash: true
      };
    default:
      return state;
  }
}
