import { Route, Routes } from 'react-router-dom';

import { SearchProvider } from '@/components/home/context/SearchContext';
import { ApiTest } from '@/routes/ApiTest';
import Auth from '@/routes/Auth';
import Home from '@/routes/Home';

import { Roomdetail } from './routes/roomDetail';
export const App = () => {
  return (
    // useSearch 훅을 이용해서 컴포넌트를 감싸 놨습니다. AppProvider 등의 다른 파일을 만들어서 옮겨두는 것도 가능합니다.
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Roomdetail />} />
        <Route path="/tests" element={<ApiTest />} />
        <Route path="/registerTest" element={<Auth mode="signup" />} />
        <Route path="/loginTest" element={<Auth mode="login" />} />
      </Routes>
    </SearchProvider>
  );
};
