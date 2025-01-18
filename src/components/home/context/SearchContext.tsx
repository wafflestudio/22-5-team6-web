import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type ModalType =
  | 'location'
  | 'calendar'
  | 'guests'
  | 'roomCalendar'
  | 'roomGuests'
  | null;

type Location = {
  sido: string;
  sigungu?: string;
};

type SearchContextType = {
  location: Location;
  setLocation: (location: Location) => void;
  checkIn: Date | null;
  setCheckIn: (date: Date | null) => void;
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  guests: number;
  setGuests: (count: number) => void;

  currentModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>({ sido: '' });
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(0);

  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => {
    setCurrentModal(modal);
  };
  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        currentModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
