import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SchedulerRoutes from './scheduler/scheduler.routes';
import LandingRoutes  from './landing/landing.routes';

export default function AppRouter() {
  const isLoggedIn = false;
  const LoadingMessage = () => <div>Loading..,</div>;

    return (
    <BrowserRouter>
      <Suspense fallback={<LoadingMessage />}>
          <Routes>
            <Route path="/*" element={<LandingRoutes />} />
            <Route path="/dashboard/*" element={<SchedulerRoutes />} />
          </Routes>      
      </Suspense>
    </BrowserRouter>
    );

}
