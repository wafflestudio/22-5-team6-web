import Header from '@/components/home/Topbar/Header';
import UserProfile from '@/components/profile';

const Profile = () => {
  return (
    <>
      <Header />
      <UserProfile />
      <footer className="h-80 bg-gray-100 border-t border-gray-300"></footer>
    </>
  );
};

export default Profile;
