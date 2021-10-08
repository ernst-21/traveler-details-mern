import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ stage: {}, travelInfo: {}, travelIdeas: {}, personalData: {}, rating: {}, negotiation: {negotiationStage: 'New Request', negotiationStageNote: '', negotiationDueDate: Date.now, negotiationMemo: '', negotiationStageAction: 'Contact the prospect'}});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

