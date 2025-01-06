import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';

function DefaultLayout({ headerAbsolute = false, children }) {
  return (
    <SideBar>
      <Header isAbsolute={headerAbsolute}></Header>
      {children}
    </SideBar>
  );
}

export default DefaultLayout;
