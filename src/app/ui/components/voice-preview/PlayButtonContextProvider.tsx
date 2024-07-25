'use client';

import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const PlayBtnContext = createContext([]);
export const PlayBtnDispatchContext = createContext(null as any);

export function PlayBtnContextProvider({ children }: {children: React.ReactNode}) {
  const [prevAudios, dispatch] = useImmerReducer(
    playBtnReducer,
    [] as any
  );

  return (
    <PlayBtnContext.Provider value={prevAudios}>
      <PlayBtnDispatchContext.Provider value={dispatch}>
        {children}
      </PlayBtnDispatchContext.Provider>
    </PlayBtnContext.Provider>
  );
}

export function usePlayBtn() {
  return useContext(PlayBtnContext);
}

export function usePlayBtnDispatch() {
  return useContext(PlayBtnDispatchContext);
}

function playBtnReducer(draft: Array<any>, action: any) {
  switch (action.type) {
    case 'pause': {
      if (draft.length !== 0 && draft[0] !== action.payload.audio) {
        draft[0].pause && draft[0].pause();
      }
      draft[0] = action.payload.audio;
      break;
    }
    case 'clear': {
      return null;
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

