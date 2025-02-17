import { useMode } from '@/components/home/context/ModeContext';
import FilterBar from '@/components/home/FilterBar';
import Listings from '@/components/home/Listings';
import Topbar from '@/components/home/Topbar';

const Home = () => {
  const { mode } = useMode();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-44 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <Topbar />
        </div>
      </header>

      {mode === 'normal' && (
        <nav className="h-24 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-1.5">
            <FilterBar />
          </div>
        </nav>
      )}

      <main className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Listings />
        </div>
      </main>
    </div>
  );
};

export default Home;
