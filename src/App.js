import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './screens/Login';
import Signup from './screens/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './screens/Home';
import WorkoutPlan from './screens/WorkoutPlan';
import MealPlan from './screens/MealPlan';
import Trainers from './screens/Trainers';
import Branches from './screens/Branches';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {/* <Login></Login> */}

      <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/workouts" element={<WorkoutPlan/>}/>
        <Route exact path="/meals" element={<MealPlan/>}/>
        <Route exact path="/trainers" element={<Trainers/>}/>
        <Route exact path="/branches" element={<Branches/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
