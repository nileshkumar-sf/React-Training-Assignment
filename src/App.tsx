import "./App.css";
import UserTable from "./components/UserTable";
import data from "./data/users.json";

function App() {
  return (
    <div className="App">
      <UserTable usersData={data} />
    </div>
  );
}

export default App;
