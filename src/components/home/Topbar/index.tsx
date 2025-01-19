import Header from './Header';
import SearchBar from './SearchBar';

const Topbar = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="h-20 px-10">
        <Header />
      </div>

      <div className="px-10 py-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default Topbar;
