import { Route, Routes } from 'react-router-dom';

import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<ApiTest />} />
    </Routes>
  );
};
