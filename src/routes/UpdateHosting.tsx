import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import EditHostingForm from '@/components/user/EditHosting';

const EditHosting = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <EditHostingForm />
      <Footer />
    </>
  );
};

export default EditHosting;
