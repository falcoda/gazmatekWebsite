import React, { type ReactNode } from "react";

import { breakpoints } from "../../config/Breakpoints";
import useWindowWidth from "../../hooks/useWindowWidth";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

interface NavbarProps {
  langSwitcher?: ReactNode;
  mobileLangSwitcher?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ langSwitcher, mobileLangSwitcher }) => {
  const { windowWidth } = useWindowWidth();

  return (
    <>
      {windowWidth > breakpoints["breakpoint-md"] ? (
        <DesktopNavbar langSwitcher={langSwitcher} />
      ) : (
        <MobileNavbar mobileLangSwitcher={mobileLangSwitcher} />
      )}
    </>
  );
};

export default React.memo(Navbar);
