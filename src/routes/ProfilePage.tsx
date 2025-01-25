import Header from '@/components/home/Topbar/Header';
import UserProfile from '@/components/user/profile/Profile';

const Profile = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <UserProfile />
      <footer className="h-80 bg-gray-100 border-t border-gray-300"></footer>
    </>
  );
};

export default Profile;
