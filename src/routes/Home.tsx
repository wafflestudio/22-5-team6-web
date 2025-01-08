import {FilterBar} from '@/components/home/FilterBar';
import Listings from '@/components/home/Listings';
import Topbar from '@/components/home/Topbar';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-44 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <Topbar />
        </div>
      </header>

      <nav className="h-24 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-1.5">
          <FilterBar />
        </div>
      </nav>

      <main className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Listings />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
