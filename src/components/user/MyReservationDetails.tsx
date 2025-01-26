type ReservationDetail = {
  reservationId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  place: string;
  numberOfGuests: number;
  imageUrl: string;
};

type MyReservationDetailsProps = {
  reservation: ReservationDetail;
};

const MyReservationDetails = ({ reservation }: MyReservationDetailsProps) => {
  const calculateNights = () => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초 -> 일 단위로 변환
  };

  const nights = calculateNights();

  return (
    <div className="flex flex-col w-96 h-full p-4 bg-white border border-gray-300">
      <img
        src={reservation.imageUrl}
        alt={reservation.place}
        className="w-full h-64 object-cover"
      />
      <div className="mt-2 p-4 bg-white rounded-lg w-3/4">
        <p className="text-sm text-gray-700">
          {reservation.startDate} - {reservation.endDate}
        </p>
        <p className="mt-2 text-xl font-bold">{reservation.place}</p>

        <p className="mt-2 text-sm text-gray-500">
          총 <strong>{nights}</strong>박, 숙박 인원{' '}
          <strong>{reservation.numberOfGuests}</strong>명
        </p>
      </div>
    </div>
  );
};

export default MyReservationDetails;
