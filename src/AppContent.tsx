import { useGetProjects } from './hooks/useGetProjects';
import { ProjectFlow } from './components/project-flow/ProjectFlow';

export const AppContent: React.FC = () => {
  const { data, isLoading } = useGetProjects();

  return (
    <div style={{ padding: '20px' }}>
      {isLoading && <div>Loading...</div>}
      {data && <ProjectFlow project={data} />}
    </div>
  );
};
