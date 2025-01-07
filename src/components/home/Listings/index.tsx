// components/home/Listings/index.tsx
import { mockListings } from '@/mock/listings';

import ListingItem from './ListingItem';

const Listings = () => {
  return (
    <>
      {mockListings.map((listing) => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </>
  );
};

export default Listings;
