import { Route, Routes } from 'react-router-dom';

import { SearchProvider } from '@/components/home/context/SearchContext';
import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';

export const App = () => {
  return (
    // useSearch 훅을 이용해서 컴포넌트를 감싸 놨습니다. AppProvider 등의 다른 파일을 만들어서 옮겨두는 것도 가능합니다.
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<ApiTest />} />
      </Routes>
    </SearchProvider>
  );
};
