import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';
import { Project } from '../types/projects.types';

export const PROJECTS_QUERY_KEY = ['projects'];

export const useGetProjects = () => {
  const getProjects = useCallback(async () => {
    const response = await axios.get<Project>(
      'https://technical-test-866419219838.europe-west3.run.app/projects/1'
    );
    return response.data;
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: () => getProjects(),
    // Don't refetch on window focus to avoid to lose the newly created biological model
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};
