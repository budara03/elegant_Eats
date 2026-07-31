import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../auth/SignIn";


export default function AppRoutes(){

    return (

        <BrowserRouter>

            <Routes>

                <Route 
                    path="/"
                    element={<SignIn />}
                />


                <Route 
                    path="/signin"
                    element={<SignIn />}
                />

            </Routes>

        </BrowserRouter>

    );

}