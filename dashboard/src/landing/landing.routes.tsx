import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Signin = lazy(() => import('./signin/signin'));
const Signup = lazy(() => import('./signup/signup'));


export default function LandingRoutes() {
  return (
        <Routes >
                    <Route path="/" element={<Signup />} />
                    <Route path="/signup" element={<Signin />} />;
        </Routes>
  );
}
