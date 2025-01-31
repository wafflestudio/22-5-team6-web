import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import OtherUserProfile from '@/components/user/profile/OtherUserProfile';

const OtherUserProfilePage = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <OtherUserProfile />
      <Footer />
    </>
  );
};

export default OtherUserProfilePage;
