import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChallengeNode } from '../ChallengeNode';
import { Position } from 'reactflow';

// Mock ReactFlow's Handle component
vi.mock('reactflow', () => ({
  Handle: vi.fn(() => null),
  Position: {
    Left: 'left',
    Right: 'right',
  },
}));

describe('ChallengeNode', () => {
  const mockOnAddModel = vi.fn();
  const defaultProps = {
    data: {
      label: 'Test Challenge',
      challengeId: 1,
      onAddModel: mockOnAddModel,
    },
  };

  beforeEach(() => {
    mockOnAddModel.mockClear();
  });

  it('renders the challenge label', () => {
    render(<ChallengeNode {...defaultProps} />);
    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
  });

  it('renders the Add Model button', () => {
    render(<ChallengeNode {...defaultProps} />);
    expect(screen.getByText('Add Model')).toBeInTheDocument();
  });

  it('calls onAddModel with challengeId when Add Model button is clicked', () => {
    render(<ChallengeNode {...defaultProps} />);
    const addButton = screen.getByText('Add Model');

    fireEvent.click(addButton);

    expect(mockOnAddModel).toHaveBeenCalledTimes(1);
    expect(mockOnAddModel).toHaveBeenCalledWith(1);
  });
});
