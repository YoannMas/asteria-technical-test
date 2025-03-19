import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectFlow } from '../ProjectFlow';
import { Project } from '../../../types/projects.types';
import { Node, Edge } from 'reactflow';

// Mock ReactFlow component and its hooks
vi.mock('reactflow', () => {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  const setNodes = vi.fn(newNodes => {
    nodes = typeof newNodes === 'function' ? newNodes(nodes) : newNodes;
    return nodes;
  });
  const setEdges = vi.fn(newEdges => {
    edges = typeof newEdges === 'function' ? newEdges(edges) : newEdges;
    return edges;
  });
  const onNodesChange = vi.fn();
  const onEdgesChange = vi.fn();

  return {
    __esModule: true,
    default: vi.fn(
      ({
        children,
        nodes: propNodes,
        edges: propEdges,
      }: {
        children: React.ReactNode;
        nodes: Node[];
        edges: Edge[];
        onNodesChange: any;
        onEdgesChange: any;
      }) => {
        // Update internal state when props change
        nodes = propNodes;
        edges = propEdges;

        return (
          <div data-testid="react-flow">
            {children}
            {nodes.map((node: Node) => (
              <div
                key={node.id}
                data-testid={`node-${node.id}`}
                onClick={() => node.data?.onAddModel?.(node.data?.challengeId)}
              >
                {node.data?.label}
              </div>
            ))}
          </div>
        );
      }
    ),
    Background: vi.fn(() => <div data-testid="background" />),
    Controls: vi.fn(() => <div data-testid="controls" />),
    MiniMap: vi.fn(() => <div data-testid="minimap" />),
    useNodesState: vi.fn(() => [nodes, setNodes, onNodesChange]),
    useEdgesState: vi.fn(() => [edges, setEdges, onEdgesChange]),
    Position: {
      Left: 'left',
      Right: 'right',
    },
  };
});

// Mock the custom hooks
vi.mock('../../../hooks/useWindowWidth', () => ({
  useWindowWidth: vi.fn(() => 1024),
}));

const mockMutate = vi.fn();
vi.mock('../../../hooks/useAddBiologicalModel', () => ({
  useAddBiologicalModel: () => ({
    addBiologicalModel: {
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
      data: null,
    },
  }),
}));

describe('ProjectFlow', () => {
  const mockProject: Project = {
    id: 1,
    name: 'Test Project',
    technicalChallenges: [
      {
        id: 1,
        name: 'Test Challenge',
        biologicalModels: [
          { id: 1, name: 'Model 1' },
          { id: 2, name: 'Model 2' },
        ],
      },
      {
        id: 2,
        name: 'Test Challenge 2',
        biologicalModels: [{ id: 3, name: 'Model 3' }],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.prompt
    vi.spyOn(window, 'prompt').mockImplementation(() => 'New Model');
  });

  it('renders without crashing', () => {
    render(<ProjectFlow project={mockProject} />);
    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    render(<ProjectFlow project={mockProject} />);
    expect(screen.getByTestId('background')).toBeInTheDocument();
    expect(screen.getByTestId('controls')).toBeInTheDocument();
    expect(screen.getByTestId('minimap')).toBeInTheDocument();
  });

  it('renders all nodes correctly', () => {
    render(<ProjectFlow project={mockProject} />);

    // Check title nodes
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Technical Challenges')).toBeInTheDocument();
    expect(screen.getByText('Biological Models')).toBeInTheDocument();

    // Check project node
    expect(screen.getByText('Test Project')).toBeInTheDocument();

    // Check challenge nodes
    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText('Test Challenge 2')).toBeInTheDocument();

    // Check model nodes
    expect(screen.getByText('Model 1')).toBeInTheDocument();
    expect(screen.getByText('Model 2')).toBeInTheDocument();
    expect(screen.getByText('Model 3')).toBeInTheDocument();
  });

  it('handles adding a new biological model', async () => {
    render(<ProjectFlow project={mockProject} />);

    // Find and click the first challenge node
    const challengeNode = screen.getByTestId('node-challenge-1');
    fireEvent.click(challengeNode);

    // Verify prompt was shown and mutation was called
    expect(window.prompt).toHaveBeenCalledWith('Enter the name of the new biological model:');
    expect(mockMutate).toHaveBeenCalledWith({
      challengeId: 1,
      name: 'New Model',
    });
  });

  it('does not add model when prompt is cancelled', () => {
    vi.spyOn(window, 'prompt').mockImplementation(() => null);
    render(<ProjectFlow project={mockProject} />);

    const challengeNode = screen.getByTestId('node-challenge-1');
    fireEvent.click(challengeNode);

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
