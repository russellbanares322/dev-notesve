import { createContext, useContext, useState } from "react";

type SidebarProviderState = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

type SidebarProviderProps = {
  children: React.ReactNode;
};

const initialState: SidebarProviderState = {
  isSidebarCollapsed: false,
  toggleSidebar: () => null,
};
const SidebarProviderContext = createContext(initialState);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevValue) => !prevValue);
  };

  const value = {
    isSidebarCollapsed,
    toggleSidebar,
  };

  return (
    <SidebarProviderContext.Provider value={value}>
      {children}
    </SidebarProviderContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarProviderContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
