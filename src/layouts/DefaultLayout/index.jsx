import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";

function DefaultLayout({ headerAbsolute = false, children }) {
  return (
    <SideBar>
      <Header isAbsolute={headerAbsolute}></Header>
      {children}
      <Footer></Footer>
    </SideBar>
  );
}

export default DefaultLayout;
