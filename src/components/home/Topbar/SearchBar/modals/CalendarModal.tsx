import dayjs from 'dayjs';
import { useState } from 'react';

import { useSearch } from '@/components/home/context/SearchContext';

type CalendarModalProps = {
  onClose: () => void;
};

const CalendarModal = ({ onClose }: CalendarModalProps) => {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useSearch();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };
  const goToPrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const isDateSelectable = (date: dayjs.Dayjs) => {
    const today = dayjs().startOf('day');
    const isBeforeToday = date.isBefore(today);

    if (selecting === 'checkOut' && checkIn !== null) {
      const checkInDate = dayjs(checkIn);
      const isBeforeCheckIn = date.isBefore(checkInDate);
      return !isBeforeToday && !isBeforeCheckIn;
    }

    return !isBeforeToday;
  };

  const handleDateSelect = (date: dayjs.Dayjs) => {
    if (!isDateSelectable(date)) return;

    if (selecting === 'checkIn') {
      setCheckIn(date.toDate());
      setSelecting('checkOut');
    } else {
      setCheckOut(date.toDate());
      onClose();
    }
  };

  const renderCalendar = (monthDate: dayjs.Dayjs) => {
    const daysInMonth = monthDate.daysInMonth();
    const firstDayOfMonth = monthDate.startOf('month').day();
    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="p-0"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = monthDate.date(day);
      const isSelectable = isDateSelectable(date);
      const isSelected = (currentDate: dayjs.Dayjs) => {
        const checkInDate = checkIn !== null ? dayjs(checkIn) : null;
        const checkOutDate = checkOut !== null ? dayjs(checkOut) : null;

        return (
          (checkInDate !== null && checkInDate.isSame(currentDate, 'day')) ||
          (checkOutDate !== null && checkOutDate.isSame(currentDate, 'day'))
        );
      };
      const isInRange =
        checkIn !== null &&
        checkOut !== null &&
        date.isAfter(checkIn) &&
        date.isBefore(checkOut);

      days.push(
        <td key={day} className="p-0">
          <button
            onClick={() => {
              handleDateSelect(date);
            }}
            disabled={!isSelectable}
            className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center
              ${!isSelectable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
              ${isSelected(date) ? 'bg-black text-white hover:bg-black' : ''}
              ${isInRange ? 'bg-gray-100' : ''}
            `}
          >
            {day}
          </button>
        </td>,
      );

      if (days.length === 7) {
        weeks.push(<tr key={day}>{days}</tr>);
        days = [];
      }
    }

    if (days.length > 0) {
      weeks.push(<tr key="last">{days}</tr>);
    }

    return weeks;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={goToPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <div className="grid grid-cols-2 gap-8">
          {/* 현재 달 */}
          <div className="min-w-[280px]">
            <h3 className="text-center font-medium mb-4">
              {currentMonth.format('YYYY년 M월')}
            </h3>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <th
                      key={day}
                      className="p-1 text-center text-sm font-medium"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">{renderCalendar(currentMonth)}</tbody>
            </table>
          </div>

          {/* 다음 달 */}
          <div className="min-w-[280px]">
            <h3 className="text-center font-medium mb-4">
              {currentMonth.add(1, 'month').format('YYYY년 M월')}
            </h3>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <th
                      key={day}
                      className="p-1 text-center text-sm font-medium"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {renderCalendar(currentMonth.add(1, 'month'))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      <div className="text-center text-gray-500">
        {selecting === 'checkIn'
          ? '체크인 날짜를 선택해주세요.'
          : '체크아웃 날짜를 선택해주세요.'}
      </div>
    </div>
  );
};

export default CalendarModal;
