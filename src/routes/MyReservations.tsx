import Header from '@/components/home/Topbar/Header';
import MyReservationItems from '@/components/user/MyReservationItems';

const MyReservations = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <MyReservationItems />
    </>
  );
};

export default MyReservations;
