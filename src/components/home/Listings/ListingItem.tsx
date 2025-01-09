import type { Listing } from '@/types/listing';

interface ListingItemProps {
  listing: Listing;
}

const ListingItem = ({ listing }: ListingItemProps) => {
  return (
    <div className="group cursor-pointer">
      {/* 이미지 컨테이너 */}
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* 정보 컨테이너 */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{listing.location}</span>
          <div className="flex items-center gap-1">
            <span>★</span>
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="text-gray-500">{listing.distance}</p>
        <p className="text-gray-500">{listing.dateRange}</p>
        <p className="mt-2">
          <span className="font-medium">
            ₩{listing.pricePerNight.toLocaleString()}
          </span>
          <span className="text-gray-500">/박</span>
        </p>
      </div>
    </div>
  );
};

export default ListingItem;
