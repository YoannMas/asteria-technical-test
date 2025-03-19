import { useGetProjects } from './hooks/useGetProjects';

export const AppContent: React.FC = () => {
  const { data, isLoading } = useGetProjects();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};
