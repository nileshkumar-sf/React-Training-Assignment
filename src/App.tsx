import './App.css';
import UserTable from './components/UserTable/UserTable';
import data from './data/users.json';

function App() {
  return (
    <div className="App">
      <UserTable usersData={data} />
    </div>
  );
}

export default App;
