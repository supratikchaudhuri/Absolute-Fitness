import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './screens/Login';
import Signup from './screens/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './screens/Home';
import WorkoutPlan from './screens/WorkoutPlan';
import Trainers from './screens/Trainers';
import Branches from './screens/Branches';
import Navbar from './components/Navbar';
import { UserContextProvider } from './context/UserContext';
import TrainerPerformance from './screens/TrainerPerformance';
import MemberHealthRecord from './screens/MemberHealthRecord';
import Facilities from './screens/Facilities';
import BMIChart from './components/BMIChart';
import HealthPlan from './screens/HealthPlan';
import StaffLogin from './screens/StaffLogin';
import DietPlan from './screens/DietPlan';
import GymMembers from './screens/GymMembers';
import GymStaff from './screens/GymStaff';
import ProfilePage from './screens/ProfilePage';

function App() {
  console.log(window.location.pathname);
  return (
    <div className="App">
      <UserContextProvider>

        <BrowserRouter>
        
        {window.location.pathname !== "/login" && window.location.pathname !== "/signup" && window.location.pathname !== "/staff-login"
          ? 
          ( <Navbar/> ): null
        }
    

        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/staff-login" element={<StaffLogin/>}/>
          <Route exact path="/signup" element={<Signup/>}/>


          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/branches" element={<Branches/>}/>
          <Route exact path="/gym/:gym_id/trainers" element={<Trainers/>}/>
          <Route exact path="/gym/:gym_id/facilities" element={<Facilities/>}/>


          <Route exact path="/user/:userId/profile" element={<ProfilePage/>}/>
          <Route exact path="/user/:userId/health-record" element={<MemberHealthRecord/>}/>
          <Route exact path="/user/:userId/health-plan" element={<HealthPlan/>}/>
          <Route exact path="/user/:userId/workout-plan" element={<WorkoutPlan/>}/>
          <Route exact path="/user/:userId/diet-plan" element={<DietPlan/>}/>
          
          <Route exact path="/health-record" element={<MemberHealthRecord/>}/>
          <Route exact path="/trainers/:trainerId/performace" element={<TrainerPerformance/>}/>


          <Route exact path="/gym/:gymId/members" element={<GymMembers/>}/>
          <Route exact path="/gym/:gymId/staff" element={<GymStaff/>}/>

          <Route exact path="/test" element={<BMIChart/>}/>
        </Routes>

        </BrowserRouter>

      </UserContextProvider>
    </div>
    
  );
}

export default App;
