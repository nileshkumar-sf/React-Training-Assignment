import './App.css';
import UserTable from './components/UserTable/UserTable';
import ContextProvider from './context/userdata.context';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <UserTable />
      </ContextProvider>
    </div>
  );
}

export default App;
