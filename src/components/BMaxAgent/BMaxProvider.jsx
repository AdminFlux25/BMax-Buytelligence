import { createContext, useContext, useState } from "react";
import BMaxEngine from "./BMaxEngine";

const BMaxContext = createContext();

export function BMaxProvider({ children }) {
  const [state, setState] = useState({
    cart: [],
    alerts: [],
    recommendations: [],
    spendAnalysis: null,
    familyProfile: "Hiro"
  });

  const engine = new BMaxEngine(state, setState);

  return (
    <BMaxContext.Provider value={{ state, engine }}>
      {children}
    </BMaxContext.Provider>
  );
}

export const useBMax = () => useContext(BMaxContext);
