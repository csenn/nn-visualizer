export const WITH_TRAINING_ON = '#FFC400';
export const WITH_TRAINING_OFF = '#616161';
export const NO_TRAINING_POSITIVE = '#4FC3F7';
export const NO_TRAINING_NEGATIVE = '#546E7A';

export const GREEN = '#4CAF50';

export const HEADER_HEIGHT = 22;
export const HEIGHT = 600;
export let WIDTH = 1000;

export const INPUT_LAYER_NODE_WIDTH = 25;
export const HIDDEN_LAYER_NODE_WIDTH = 30;
export const OUTPUT_LAYER_NODE_WIDTH = 65;
export const OUTPUT_LAYER_LABEL = 35;

export const BIAS_LABEL_WIDTH = 45;


/* WIDTH is not exactly a constant anymore... whatev */
const readyStateCheckInterval = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval);
    const width = window.innerWidth;
    if (width > 1260) {
      WIDTH = 1200;
    } else if (width > 800) {
      WIDTH = width - 60;
    } else {
      WIDTH = 800;
    }
  }
}, 10);
