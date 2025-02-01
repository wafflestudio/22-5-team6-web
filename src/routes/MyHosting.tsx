import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import MyHostingItems from '@/components/user/MyHostingItems';

const MyHosting = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <MyHostingItems />
      <Footer />
    </>
  );
};

export default MyHosting;
