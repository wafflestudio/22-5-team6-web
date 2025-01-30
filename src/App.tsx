import { StyledEngineProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import { HotPlaceProvider } from '@/components/home/context/HotplaceContext';
import { ModeProvider } from '@/components/home/context/ModeContext';
import { SearchProvider } from '@/components/home/context/SearchContext';
import { ApiTest } from '@/routes/ApiTest';
import Home from '@/routes/Home';
import Hosting from '@/routes/Hosting';
import Redirect from '@/routes/Redirect';

import CompleteProfilePage from './components/home/Topbar/Menu/CompleteProfilePage';
import RegisterPage from './components/home/Topbar/Menu/RegisterPage';
import { ReviewProvider } from './components/roomdetail/ReviewContext';
import MyReservations from './routes/MyReservations';
import MyReviews from './routes/MyReviews';
import OtherUserProfilePage from './routes/OtherUserProfilePage';
import ProfileEdit from './routes/ProfileEdit';
import ProfilePage from './routes/ProfilePage';
import ReservationDetails from './routes/ReservationDetails';
import Review from './routes/Review';
import { Roomdetail } from './routes/roomDetail';

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ModeProvider>
        <SearchProvider>
          <HotPlaceProvider>
            <ReviewProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="complete-profile"
                  element={<CompleteProfilePage />}
                />
                <Route path="/:id" element={<Roomdetail />} />
                <Route path="/tests" element={<ApiTest />} />
                <Route path="/redirect" element={<Redirect />} />
                <Route path="/hosting" element={<Hosting />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:userId" element={<OtherUserProfilePage />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/MyReservations" element={<MyReservations />} />
                <Route path="/MyReviews" element={<MyReviews />} />
                <Route path="/reviews/:reservationId" element={<Review />} />
                <Route
                  path="/reservations/:reservationId"
                  element={<ReservationDetails />}
                />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </ReviewProvider>
          </HotPlaceProvider>
        </SearchProvider>
      </ModeProvider>
    </StyledEngineProvider>
  );
};
