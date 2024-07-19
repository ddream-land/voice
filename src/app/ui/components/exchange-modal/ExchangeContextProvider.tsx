'use client';

import { createContext, useContext, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import ExchangeModal, { ExchangeModalProps } from './ExchangeModal';

export const ExchangeContext = createContext({} as ExchangeModalProps);
export const ExchangeDispatchContext = createContext(null as any);

const initialState : ExchangeModalProps = { isOpen: false };

export function ExchangeContextProvider({ children }: {children: React.ReactNode}) {
  const [props , dispatch] = useImmerReducer(
    loginReducer,
    initialState
  );

  return (
    <ExchangeContext.Provider value={props}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        <ExchangeModal {...props} onClose={() => {
          props.onClose?.();
          dispatch({
            type: "close"
          })
        }} />
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeContext.Provider>
  );
}

export function useExchange() {
  return useContext(ExchangeContext);
}

export function useExchangeDispatch() {
  return useContext(ExchangeDispatchContext);
}

function loginReducer(draft: ExchangeModalProps, action: any) {
  switch (action.type) {
    case 'open': {
      draft.isOpen = true;
      action.payload.locale !== undefined && (draft.locale = action.payload.locale);
      action.payload.onClose !== undefined && (draft.onClose = action.payload.onClose);
      action.payload.onChange !== undefined && (draft.onChange = action.payload.onChange);
      action.payload.onSuccess !== undefined && (draft.onSuccess = action.payload.onSuccess);

      return draft
    }
    case 'close': {
      draft.isOpen = false;
      return draft
    }
    case 'clear': {
      return draft
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

