import { FlowProvider } from './context/flowcontext';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <FlowProvider>
      <BuilderPage />
    </FlowProvider>
  );
}

export default App;
