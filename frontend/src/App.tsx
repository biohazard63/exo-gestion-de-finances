import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignupForm from "./pages/Singup.tsx";  // Ensure filename spelling consistency in your project directory
import { NavigationMenuDemo } from "./components/navBar.tsx";  // Check the export of NavigationMenuDemo
import Gestion from "./pages/gestion.tsx";
import LoginForm from "@/pages/Login.tsx";
import HomePage from "@/pages/Home.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";  // Consider using English names for global projects

function App() {
    return (
        <ThemeProvider>
        <BrowserRouter>
            <div>
                <NavigationMenuDemo />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/gestion" element={<Gestion />} />  // Typically, routes are in lowercase
                </Routes>
            </div>
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;