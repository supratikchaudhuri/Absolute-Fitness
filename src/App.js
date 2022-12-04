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
import Navbar from './components/Navbar';
import MyPlan from './screens/MyPlan';
import { UserContextProvider } from './context/UserContext';
import TrainerPerformance from './screens/TrainerPerformance';
import MemberHealthRecord from './screens/MemberHealthRecord';
import MemberProfilePage from './screens/MemberProfilePage';
import Facilities from './screens/Facilities';
import BMIChart from './components/BMIChart';
import HealthPlan from './screens/HealthPlan';

function App() {
  console.log(window.location.pathname);
  return (
    <div className="App">
      <UserContextProvider>

        <BrowserRouter>

        {/* <Navbar></Navbar> */}


        {window.location.pathname !== "/login" && window.location.pathname !== "/signup "
          ? 
          ( <Navbar/> ): null
        }
    

        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>

          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/branches" element={<Branches/>}/>
          <Route exact path="/gym/:gym_id/trainers" element={<Trainers/>}/>
          <Route exact path="/gym/:gym_id/facilities" element={<Facilities/>}/>


          <Route exact path="/user/:userId/health-record" element={<MemberHealthRecord/>}/>
          <Route exact path="/user/:userId/health-plan" element={<HealthPlan/>}/>
          <Route exact path="/user/:userId/workout-plan" element={<WorkoutPlan/>}/>
          <Route exact path="/user/:userId/diet-plan" element={<MealPlan/>}/>
          
          
          <Route exact path="/health-record" element={<MemberHealthRecord/>}/>
          <Route exact path="/member-profile" element={<MemberProfilePage/>}/>
          <Route exact path="/trainers/:trainerId/performace" element={<TrainerPerformance/>}/>

          <Route exact path="/test" element={<BMIChart/>}/>
        </Routes>

        </BrowserRouter>

      </UserContextProvider>
    </div>
    
  );
}

export default App;
