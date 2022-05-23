import React, { useReducer } from 'react';
import RSS3 from 'rss3';

import { RSS3_ENDPOINT_URL } from '../../constants';
import { ICurrentUser } from '../../models';
import reducer, { Action } from './reducer';

type ContextState = { state: ICurrentUser, dispatch: (action: Action) => void };
export const UserContext = React.createContext<ContextState | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

const rss3 = new RSS3({ endpoint: RSS3_ENDPOINT_URL });

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(reducer, { rss3, profile: null });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
