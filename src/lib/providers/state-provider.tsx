'use client'

// Define our AppState structure
import { Folder, Workspace } from '@/lib/supabase/types'
import { usePathname } from 'next/navigation'
import React, {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'

// Define our AppState structure
type AppState = {
  workspaces: appWorkspacesType[] | []
}

// Define our initial state
const initialState: AppState = { workspaces: [] }

// Define appFoldersType
export type appFoldersType = Folder & { files: File[] | [] }

// Define appWorkspacesType
export type appWorkspacesType = Workspace & {
  folders: appFoldersType[] | []
}

// Define our action types
type ActionType = {
  type: 'ADD_WORKSPACE'
  payload: appWorkspacesType
}

// Define our reducer
const reducer = (
  state: AppState = initialState,
  action: ActionType,
): AppState => {
  switch (action.type) {
    case 'ADD_WORKSPACE':
      return {
        ...state,
        workspaces: [action.payload, ...state.workspaces],
      }
    default:
      return initialState
  }
}

// Define our context
const AppStateContext = createContext({
  state: initialState,
  dispatch: () => null, // placeholder dispatch function
  workspaceId: undefined, // placeholder for workspaceId
} as {
  state: AppState
  dispatch: Dispatch<any>
  workspaceId: string | undefined
})

interface AppStateProviderProps {
  children: React.ReactNode
}

// Define our provider (EXPORT)
const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const pathname = usePathname()

  const workspaceId = useMemo(() => {
    const urlSegments = pathname?.split('/').filter(Boolean)
    if (urlSegments)
      if (urlSegments.length > 1) {
        return urlSegments[1]
      }
  }, [pathname])

  return (
    <AppStateContext.Provider value={{ state, dispatch, workspaceId }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider

// Define a hook for easy access to our AppState (EXPORT)
export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
