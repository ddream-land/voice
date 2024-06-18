'use client';

import { createContext, useContext, useReducer } from 'react';
import AlterMessages from './AlterMessages';
import { useImmerReducer } from 'use-immer';
import { findIndex } from 'lodash-es';

export const AmContext = createContext([]);
export const AmDispatchContext = createContext(null as any);

export function AlterMessageContextProvider({ children }: {children: React.ReactNode}) {
  const [messages, dispatch] = useImmerReducer(
    amReducer,
    []
  );

  return (
    <AmContext.Provider value={messages}>
      <AmDispatchContext.Provider value={dispatch}>
        <AlterMessages messages={messages} onClose={() => {
          dispatch({
            type: "clear"
          })
        }} />
        {children}
      </AmDispatchContext.Provider>
    </AmContext.Provider>
  );
}

export function useAm() {
  return useContext(AmContext);
}

export function useAmDispatch() {
  return useContext(AmDispatchContext);
}

function amReducer(draft: string[], action: any) {
  switch (action.type) {
    case 'add': {
      const isHas = draft.find((item) => (item === action.payload));
      !isHas && draft.push(action.payload);
      break;
    }
    case 'clear': {
      return [];
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

