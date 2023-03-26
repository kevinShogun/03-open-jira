import { createContext } from "react";

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggin: boolean;
    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (state: boolean) => void;
    endtDraggin: () => void;
    startDraggin: () => void;
}

export const UIContext = createContext({} as ContextProps);