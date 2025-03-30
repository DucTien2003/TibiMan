import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import Banner from "@/components/specific/Banner";

function PageConmicsLayout({ headerAbsolute = false, children }) {
  return (
    <SideBar>
      <Header isAbsolute={headerAbsolute}></Header>
      <div>
        {/* Banner */}
        <div className="pb-8">
          <Banner />
        </div>

        {children}
      </div>
      <Footer></Footer>
    </SideBar>
  );
}

export default PageConmicsLayout;
