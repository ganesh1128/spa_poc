import React, { createContext, useContext, useState, ReactNode, FunctionComponent, Dispatch, SetStateAction } from 'react';

interface BrandContextType {
  selectedBrand: any;
  setSelectedBrand: Dispatch<SetStateAction<any>>;
}
const BrandContext = createContext<BrandContextType | undefined>(undefined);
export const BrandProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
export const useBrandContext = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
};
