import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./pages/read";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Single from "./pages/single";
import Dashboard from "./pages/dashboard";
import Create from "./pages/create.jsx";
import Update from "./pages/update.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Read/>} path="/"/>
                    <Route element={<Login/>} path="/logins"/>
                    <Route element={<Registration/>} path="/registration"/>
                    <Route element={<Single/>} path="/post/:id"/>
                    <Route element={<Dashboard/>} path="/dashboard"/>
                    <Route element={<Create/>} path="/create"/>
                    <Route element={<Update/>} path="/edit/:id"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;