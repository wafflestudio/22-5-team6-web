import { StyledEngineProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import { SearchProvider } from '@/components/home/context/RoomSearchContext';
import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';
import Hosting from '@/routes/Hosting';
import HostingImage from '@/routes/HostingImageUpload';
import Redirect from '@/routes/Redirect';

import RegisterPage from './components/home/Topbar/Menu/RegisterPage';
import MyReservationDetails from './components/profile/MyReservationDetails';
import MyReservations from './routes/MyReservations';
import Profile from './routes/Profile';
import ProfileEdit from './routes/ProfileEdit';
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
          <Route path="/hosting/images" element={<HostingImage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/MyReservations" element={<MyReservations />} />
          <Route
            path="/reservations/:reservationId"
            element={<MyReservationDetails />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </SearchProvider>
    </StyledEngineProvider>
  );
};
