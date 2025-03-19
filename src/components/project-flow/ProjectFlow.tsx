import { useMemo, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Project } from '../../types/projects.types';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
  VERTICAL_SPACING,
  TITLE_Y,
  START_Y,
  PROJECT_X_PERCENTAGE,
  CHALLENGE_X_PERCENTAGE,
  MODEL_X_PERCENTAGE,
  PROJECT_NODE_STYLE,
  MODEL_NODE_STYLE,
  PROJECT_TITLE_STYLE,
  CHALLENGE_TITLE_STYLE,
  MODEL_TITLE_STYLE,
} from './ProjectFlow.constants';
import { ChallengeNode } from './nodes/ChallengeNode';
import { useAddBiologicalModel } from '../../hooks/useAddBiologicalModel';

interface ProjectFlowProps {
  project: Project;
}

const nodeTypes = {
  challenge: ChallengeNode,
};

const useProjectFlowNodes = (
  project: Project,
  windowWidth: number,
  onAddModel: (challengeId: number) => void
) => {
  return useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Calculate column positions based on window width
    const projectX = windowWidth * PROJECT_X_PERCENTAGE;
    const challengeX = windowWidth * CHALLENGE_X_PERCENTAGE;
    const modelX = windowWidth * MODEL_X_PERCENTAGE;

    // Add column titles
    nodes.push(
      {
        id: 'title-projects',
        data: { label: 'Projects' },
        position: { x: projectX, y: TITLE_Y },
        type: 'default',
        draggable: false,
        style: PROJECT_TITLE_STYLE,
      },
      {
        id: 'title-challenges',
        data: { label: 'Technical Challenges' },
        position: { x: challengeX, y: TITLE_Y },
        type: 'default',
        draggable: false,
        style: CHALLENGE_TITLE_STYLE,
      },
      {
        id: 'title-models',
        data: { label: 'Biological Models' },
        position: { x: modelX, y: TITLE_Y },
        type: 'default',
        draggable: false,
        style: MODEL_TITLE_STYLE,
      }
    );

    // First pass: Calculate total height needed for biological models
    const totalModels = project.technicalChallenges.reduce(
      (sum, challenge) => sum + challenge.biologicalModels.length,
      0
    );
    const totalHeight = (totalModels - 1) * VERTICAL_SPACING;

    // Add project node (centered relative to all models)
    const projectY = START_Y + totalHeight / 2;
    nodes.push({
      id: `project-${project.id}`,
      data: { label: project.name },
      position: { x: projectX, y: projectY },
      type: 'default',
      style: PROJECT_NODE_STYLE,
    });

    let modelCounter = 0;

    // Add technical challenge nodes and their biological models
    project.technicalChallenges.forEach((challenge, challengeIndex) => {
      const modelsInChallenge = challenge.biologicalModels.length;

      // Calculate the center position for this challenge based on its models
      const challengeStartY = START_Y + modelCounter * VERTICAL_SPACING;
      const challengeEndY = challengeStartY + (modelsInChallenge - 1) * VERTICAL_SPACING;
      const challengeY = (challengeStartY + challengeEndY) / 2;

      nodes.push({
        id: `challenge-${challenge.id}`,
        data: { label: challenge.name, challengeId: challenge.id, onAddModel },
        position: { x: challengeX, y: challengeY },
        type: 'challenge',
      });

      edges.push({
        id: `edge-project-${project.id}-challenge-${challenge.id}`,
        source: `project-${project.id}`,
        target: `challenge-${challenge.id}`,
        type: 'smoothstep',
        animated: true,
      });

      challenge.biologicalModels.forEach(model => {
        const modelY = START_Y + modelCounter * VERTICAL_SPACING;
        modelCounter++;

        nodes.push({
          id: `model-${model.id}`,
          data: { label: model.name },
          position: { x: modelX, y: modelY },
          type: 'default',
          style: MODEL_NODE_STYLE,
        });

        edges.push({
          id: `edge-challenge-${challenge.id}-model-${model.id}`,
          source: `challenge-${challenge.id}`,
          target: `model-${model.id}`,
          type: 'smoothstep',
          animated: true,
        });
      });
    });

    return { nodes, edges };
  }, [project, windowWidth]);
};

export const ProjectFlow: React.FC<ProjectFlowProps> = ({ project }) => {
  const windowWidth = useWindowWidth();
  const { addBiologicalModel } = useAddBiologicalModel();

  const handleAddModel = useCallback(
    (challengeId: number) => {
      // I didn't want to implement a component library only for this, so I'm using the native prompt
      // Of course, in a real project, I would use a component library
      const modelName = window.prompt('Enter the name of the new biological model:');
      if (modelName) {
        addBiologicalModel.mutate({ challengeId, name: modelName });
      }
    },
    [addBiologicalModel]
  );

  const { nodes: initNodes, edges: initEdges } = useProjectFlowNodes(
    project,
    windowWidth,
    handleAddModel
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
    setNodes(initNodes);
    setEdges(initEdges);
  }, [initNodes, initEdges]);

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
