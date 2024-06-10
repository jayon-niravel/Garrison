import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const List = lazy(() => import('./list/list'));
const Create = lazy(() => import('./create/create'));


export default function SchedulerRoutes() {
  return (
        <Routes >
                <Route path="/list" element={<List />} />;
                <Route path="/create" element={<Create />} />;
        </Routes>
  );
}
