import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import ProfileEditForm from '@/components/user/profile/ProfileEditForm';

const ProfileEdit = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <ProfileEditForm />
      <Footer />
    </>
  );
};

export default ProfileEdit;
