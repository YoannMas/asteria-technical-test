import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContent } from './AppContent';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};
