import { Route, Routes } from 'react-router-dom';

import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';
import { Roomdetail } from '@/routes/Roomdetail'

export const App = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/" element={<ApiTest />} />
      <Route path="roomdetail/:id" element={<Roomdetail />} />
    </Routes>
  );
};
