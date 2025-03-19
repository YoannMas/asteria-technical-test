import { Handle, Position } from 'reactflow';
import { containerStyle, labelStyle, buttonStyle } from './ChallengeNode.styles';

interface ChallengeNodeProps {
  data: {
    label: string;
    challengeId: number;
    onAddModel: (challengeId: number) => void;
  };
}

export const ChallengeNode: React.FC<ChallengeNodeProps> = ({ data }) => {
  const { label, challengeId, onAddModel } = data;

  return (
    <div style={containerStyle}>
      <Handle type="target" position={Position.Left} />
      <div style={labelStyle}>{label}</div>
      <button onClick={() => onAddModel(challengeId)} style={buttonStyle}>
        Add Model
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
