import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Event } from "./components/Event.jsx";

import { Test } from "./pages/Chat.jsx";
import { Users } from "./components/Users.jsx";
import { Events } from "./pages/Events.jsx";
import { Marketplace } from "./pages/Marketplace.jsx";
import { Profile } from "./pages/Profile.jsx";
import { LocationMap } from "./components/LocationMap.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/navigation" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/try" element={<LocationMap />} />
      </Routes>
    </div>
  );
}

export default App;
