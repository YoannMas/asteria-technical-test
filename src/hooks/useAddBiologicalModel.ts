import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiologicalModel, Project } from '../types/projects.types';
import { PROJECTS_QUERY_KEY } from './useGetProjects';

interface AddBiologicalModelVariables {
  challengeId: number;
  name: string;
}

export const useAddBiologicalModel = () => {
  const queryClient = useQueryClient();

  const addBiologicalModel = useMutation({
    mutationFn: async ({ challengeId, name }: AddBiologicalModelVariables) => {
      // In a real application, this would be an API call
      // For this demo, we'll simulate it by updating the cache directly
      const currentProject = queryClient.getQueryData<Project>(PROJECTS_QUERY_KEY);
      if (!currentProject) throw new Error('Project not found');

      const challenge = currentProject.technicalChallenges.find(c => c.id === challengeId);
      if (!challenge) throw new Error('Challenge not found');

      const newModel: BiologicalModel = {
        id: Date.now(), // Generate a temporary ID
        name,
      };

      // Update the cache optimistically
      queryClient.setQueryData<Project>(PROJECTS_QUERY_KEY, oldProject => {
        if (!oldProject) return oldProject;

        return {
          ...oldProject,
          technicalChallenges: oldProject.technicalChallenges.map(c =>
            c.id === challengeId
              ? {
                  ...c,
                  biologicalModels: [...c.biologicalModels, newModel],
                }
              : c
          ),
        };
      });

      return newModel;
    },
  });

  return { addBiologicalModel };
};
