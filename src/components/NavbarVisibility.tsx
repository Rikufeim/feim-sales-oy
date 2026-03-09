import React, { createContext, useContext, useMemo, useState } from "react";

type NavbarVisibilityContextValue = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

const NavbarVisibilityContext = createContext<NavbarVisibilityContextValue | null>(null);

export const NavbarVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hidden, setHidden] = useState(false);

  const value = useMemo(() => ({ hidden, setHidden }), [hidden]);

  return (
    <NavbarVisibilityContext.Provider value={value}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

export const useNavbarVisibility = () => {
  const ctx = useContext(NavbarVisibilityContext);
  if (!ctx) throw new Error("useNavbarVisibility must be used within NavbarVisibilityProvider");
  return ctx;
};
