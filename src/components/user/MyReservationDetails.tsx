type ReservationDetail = {
  reservationId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  place: string;
  price: number;
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
      <div className="mt-2 p-4 bg-white w-3/4">
        <p className="text-sm text-gray-600">
          {reservation.startDate} - {reservation.endDate}
        </p>
        <p className="mt-2 text-xl font-bold">{reservation.place}</p>

        <p className="mt-2 text-sm text-gray-600">
          총 <strong>{nights}</strong>박, 숙박 인원{' '}
          <strong>{reservation.numberOfGuests}</strong>명
        </p>
      </div>
      <hr className="w-full my-2 border-t border-gray-300" />
      <div className="p-4 bg-white">
        <p className="text-sm font-bold">결제 명세서</p>
        <div className="flex items-center mt-2 w-full justify-between">
          <p className="text-sm text-gray-600">
            &#8361; {reservation.price} x {nights}박
          </p>
          <p className="text-sm text-gray-600">
            &#8361; {reservation.price * nights}
          </p>
        </div>
        <div className="flex items-center mt-2 w-full justify-between">
          <p className="text-sm text-gray-600">서비스 수수료</p>
          <p className="text-sm text-gray-600">
            &#8361; {Math.floor((reservation.price + nights) * 0.1)}
          </p>
        </div>
      </div>
      <hr className="w-full my-2 border-t border-gray-300" />
      <div className="flex items-center p-4 w-full justify-between">
        <p className="text-lg">총 지불 금액</p>
        <p className="text-lg">
          &#8361;{' '}
          {reservation.price * nights +
            Math.floor((reservation.price + nights) * 0.1)}
        </p>
      </div>
    </div>
  );
};

export default MyReservationDetails;
