import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ stage: {}, travelInfo: {}, travelIdeas: {}, personalData: {}, rating: {}, negotiation: {negotiationStage: 'New Request', negotiationStageNote: '', negotiationDueDate: Date.now, negotiationMemo: ''}});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

