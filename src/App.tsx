import { StyledEngineProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import { SearchProvider } from '@/components/home/context/SearchContext';
import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';
import Hosting from '@/routes/Hosting';
import Redirect from '@/routes/Redirect';

import RegisterPage from './components/home/Topbar/Menu/RegisterPage';
import MyReservations from './routes/MyReservations';
import ProfileEdit from './routes/ProfileEdit';
import ProfilePage from './routes/ProfilePage';
import ReservationDetails from './routes/ReservationDetails';
import Review from './routes/Review';
import { Roomdetail } from './routes/roomDetail';

export const App = () => {
  return (
    // useSearch 훅을 이용해서 컴포넌트를 감싸 놨습니다. AppProvider 등의 다른 파일을 만들어서 옮겨두는 것도 가능합니다.
    <StyledEngineProvider injectFirst>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Roomdetail />} />
          <Route path="/tests" element={<ApiTest />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/MyReservations" element={<MyReservations />} />
          <Route path="/reviews/:reservationId" element={<Review />} />
          <Route
            path="/reservations/:reservationId"
            element={<ReservationDetails />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </SearchProvider>
    </StyledEngineProvider>
  );
};
