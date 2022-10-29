import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {/* <Login></Login> */}
      <Signup></Signup>
    </div>
    
  );
}

export default App;
