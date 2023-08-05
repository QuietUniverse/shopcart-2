import Header from "../Header/Header";
import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();
  const showBanner = location.pathname === "/" ? true : false;

  return (
    <>
      <Header showBanner={showBanner} />
      <Outlet />
    </>
  );
}

export default RootLayout;
