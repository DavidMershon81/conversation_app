import './App.css';
import MainAppRouter from './components/MainAppRouter';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const queryClient = new QueryClient();

  return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
        <MainAppRouter />  
        </QueryClientProvider>
      </div>
  );
}

export default App;
