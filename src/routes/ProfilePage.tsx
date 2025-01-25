import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import UserProfile from '@/components/user/profile/Profile';

const ProfilePage = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <UserProfile />
      <Footer />
    </>
  );
};

export default ProfilePage;
