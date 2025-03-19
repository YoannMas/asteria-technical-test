import { CHALLENGE_COLOR, CHALLENGE_NODE_STYLE } from '../ProjectFlow.constants';

export const containerStyle = {
  ...CHALLENGE_NODE_STYLE,
  position: 'relative' as const,
};

export const labelStyle = {
  marginBottom: '8px',
};

export const buttonStyle = {
  background: CHALLENGE_COLOR,
  color: 'white',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  justifySelf: 'end',
} as const;
