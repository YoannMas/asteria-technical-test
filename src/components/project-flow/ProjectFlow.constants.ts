// Spacing and positioning
export const VERTICAL_SPACING = 200;
export const TITLE_Y = 50;
export const START_Y = 150;

// Column positions (as percentage of window width)
export const PROJECT_X_PERCENTAGE = 0;
export const CHALLENGE_X_PERCENTAGE = 0.3;
export const MODEL_X_PERCENTAGE = 0.6;

// Node dimensions
export const PROJECT_NODE_WIDTH = 180;
export const CHALLENGE_NODE_WIDTH = 250;
export const MODEL_NODE_WIDTH = 180;

// Colors
export const PROJECT_COLOR = '#1a73e8';
export const CHALLENGE_COLOR = '#e8871a';
export const MODEL_COLOR = '#71e81a';

// Node styles
export const PROJECT_NODE_STYLE = {
  background: '#e6f3ff',
  border: `1px solid ${PROJECT_COLOR}`,
  borderRadius: '8px',
  padding: '10px',
  width: PROJECT_NODE_WIDTH,
} as const;

export const CHALLENGE_NODE_STYLE = {
  background: '#fff3e6',
  border: `1px solid ${CHALLENGE_COLOR}`,
  borderRadius: '8px',
  padding: '10px',
  width: CHALLENGE_NODE_WIDTH,
} as const;

export const MODEL_NODE_STYLE = {
  background: '#f3ffe6',
  border: `1px solid ${MODEL_COLOR}`,
  borderRadius: '8px',
  padding: '10px',
  width: MODEL_NODE_WIDTH,
} as const;

// Title node styles
export const TITLE_NODE_BASE_STYLE = {
  background: 'transparent',
  border: 'none',
  fontSize: '16px',
  fontWeight: 600,
} as const;

export const PROJECT_TITLE_STYLE = {
  ...TITLE_NODE_BASE_STYLE,
  color: PROJECT_COLOR,
  width: PROJECT_NODE_WIDTH,
} as const;

export const CHALLENGE_TITLE_STYLE = {
  ...TITLE_NODE_BASE_STYLE,
  color: CHALLENGE_COLOR,
  width: CHALLENGE_NODE_WIDTH,
} as const;

export const MODEL_TITLE_STYLE = {
  ...TITLE_NODE_BASE_STYLE,
  color: MODEL_COLOR,
  width: MODEL_NODE_WIDTH,
} as const;
