// components/home/Listings/index.tsx
import { useNavigate } from 'react-router-dom';

import { mockListings } from '@/mock/listings';

import ListingItem from './ListingItem';

const Listings = () => {
  const navigate = useNavigate();

  const handleRoomClick = (id: string) => {
    void navigate(`/${id}`)
  }

  return (
    <>
      {mockListings.map((listing) => (
        <div
          key={listing.id}
          onClick={() => { handleRoomClick(listing.id); }}
          style={{ cursor: 'pointer' }}
        >
          <ListingItem listing={listing} />
        </div>
      ))}
    </>
  );
};

export default Listings;
