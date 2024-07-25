"use client";

import { createContext, useEffect } from "react";
import { UserType } from "@/app/lib/definitions.user";
import { useReducer } from "react";
import { useContext } from "react";


export const UserContext = createContext<UserType>(null as any);
export const UserDispatchContext = createContext(null as any);

export function UserContextProvider({ children, value }: {children: React.ReactNode, value: UserType}) {
  
  const [user, dispatch] = useReducer(
    userReducer,
    value
  );

  useEffect(() => {
    dispatch({ type: 'set', payload: value });
  }, [value])

  return (
    <UserContext.Provider value={user as any}>
      <UserDispatchContext.Provider value={dispatch as any}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function userReducer(value: UserType, action: any) {
  switch (action.type) {
    case 'set': {
      return action.payload;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

