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
import BMIChart from './screens/BMIChart';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {/* <Login></Login> */}

      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/workouts" element={<WorkoutPlan/>}/>
        <Route exact path="/meals" element={<MealPlan/>}/>
        <Route exact path="/trainers" element={<Trainers/>}/>
        <Route exact path="/branches" element={<Branches/>}/>
        <Route exact path="/user/bmi" element={<BMIChart/>}/>
        <Route exact path="/trainers/:trainerId/performace" element={<BMIChart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
