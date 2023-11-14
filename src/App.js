import "./App.css";
import Login from "./screens/Authentication/Login";
import Signup from "./screens/Authentication/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import WorkoutPlan from "./screens/GymServices/WorkoutPlan";
import Trainers from "./screens/Trainers";
import Branches from "./screens/Gym/Branches";
import Navbar from "./components/Navbar";
import TrainerPerformance from "./screens/GymServices/TrainerPerformance";
import MemberHealthRecord from "./screens/GymServices/MemberHealthRecord";
import Facilities from "./screens/Gym/Facilities";
import HealthPlan from "./screens/GymServices/HealthPlan";
import StaffLogin from "./screens/Authentication/StaffLogin";
import DietPlan from "./screens/GymServices/DietPlan";
import GymMembers from "./screens/GymMembers";
import GymStaff from "./screens/GymStaff";
import ProfilePage from "./screens/Profile/ProfilePage";
import StaffProfilePage from "./screens/StaffProfilePage";
import Dashboard from "./screens/GymServices/Dashboard";
import PageNotFound from "./screens/PageNotFound";
import GymEquipments from "./screens/Gym/GymEquipments";
import PaymentPlans from "./screens/PaymentPlans";
import MySubscriptionsPage from "./screens/MySubscriptionsPage";
import Root from "./screens/Root";

// MDB React
import "mdb-react-ui-kit/dist/css/mdb.min.css";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// Google
import { GoogleOAuthProvider } from "@react-oauth/google";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import EditProfile from "./screens/Profile/EditProfile";

/************************ Imports complete ************************/

const GOOGLE_CLIENT_ID =
  "771432891086-pnekaemhkjo6f60ndfu1l8heh7u64c01.apps.googleusercontent.com";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51N4IuESIsW8FsEuEN6OPvDtj95w1XrlO17O9gLaFcrDTRDQWc5CdCCHeqgKznFdcQAGhuHLbzDsFD1NJIlMpFgdW00iQ2mlzNY";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(window.location.pathname);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/staff-login" element={<StaffLogin />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        {user && <Navbar />}
        <div className="App">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/branches" element={<Branches />} />

            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="/gym/:gym_id/trainers" element={<Trainers />} />
            <Route
              exact
              path="/gym/:gym_id/facilities"
              element={<Facilities />}
            />
            <Route
              exact
              path="/gym/:gym_id/equipments"
              element={<GymEquipments />}
            />

            <Route
              exact
              path="/user/:userId/profile"
              element={<ProfilePage />}
            />
            <Route
              exact
              path="/user/:userId/edit-profile"
              element={<EditProfile />}
            />
            <Route
              exact
              path="/user/:userId/health-record"
              element={<MemberHealthRecord />}
            />
            <Route
              exact
              path="/user/:userId/health-plan"
              element={<HealthPlan />}
            />
            <Route
              exact
              path="/user/:userId/workout-plan"
              element={<WorkoutPlan />}
            />
            <Route
              exact
              path="/user/:userId/diet-plan"
              element={<DietPlan />}
            />

            <Route
              exact
              path="/staff/:staff_id/profile"
              element={<StaffProfilePage />}
            />

            <Route
              exact
              path="/health-record"
              element={<MemberHealthRecord />}
            />
            <Route
              exact
              path="/trainer/:staffId/memberRecords"
              element={<TrainerPerformance />}
            />

            <Route exact path="/gym/:gymId/members" element={<GymMembers />} />
            <Route exact path="/gym/:gymId/staff" element={<GymStaff />} />

            <Route
              exact
              path="/my-subscriptions"
              element={<MySubscriptionsPage />}
            />

            <Route
              exact
              path="/payment-plans"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentPlans />
                </Elements>
              }
            />

            {/* tema members in root */}
            <Route exact path="/" element={<Root />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
