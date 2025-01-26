import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import MyReviewItems from '@/components/user/MyReviewItems';

const MyReviews = () => {
  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <MyReviewItems />
      <Footer />
    </>
  );
};

export default MyReviews;
