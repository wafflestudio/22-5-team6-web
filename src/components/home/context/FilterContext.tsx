// c필터 구현을 위해 만들었는데, api와 연결하며 삭제할 수도 있습니다.
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface FilterContextType {
  priceRange: {
    min: number;
    max: number;
  };
  setPriceRange: (range: { min: number; max: number }) => void;
  propertyTypes: string[];
  setPropertyTypes: (types: string[]) => void;
  // 조건 추가
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  return (
    <FilterContext.Provider
      value={{
        priceRange,
        setPriceRange,
        propertyTypes,
        setPropertyTypes,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
