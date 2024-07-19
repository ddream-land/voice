'use client';

import { createContext, useContext } from 'react';
import AlterMessages, { messageType } from './AlterMessages';
import { useImmerReducer } from 'use-immer';

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

function amReducer(draft: Array<messageType>, action: any) {
  switch (action.type) {
    case 'add': {
      const isHas = draft.find((item) => {
        return item.message === action.payload.message
      });
      if(!isHas) {
        draft.push({
          message: action.payload.message,
          title: action.payload.title || undefined,
          type: action.payload.type || 'error',
        })
      }
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

