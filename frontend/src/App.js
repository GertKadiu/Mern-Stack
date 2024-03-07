import Home from "./pages/Home";
import Edit from "./pages/Edit";
import EventPage from "./pages/Events";
import CreateEvents from "./pages/CreateEvents";
import EditEvent from "./pages/EditEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleUser from "./pages/SingleUser";
import SingleEvent from "./pages/SingleEvent";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/Update/:id" element={<Edit />} />
          <Route path="/Events" element={<EventPage />} />
          <Route path="/editEvent/:id" element={<EditEvent />} />
          <Route path="/CreateEvents" element={<CreateEvents />} />
          <Route path="/SingleUser/:id" element={<SingleUser />} />
          <Route path="/SingleEvent/:id" element={<SingleEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
