import Drawer from './drawers/Drawer';
import PersistentDrawer from './drawers/PersistentDrawer';
import { useWindowResize } from '@/hooks';

function SideBar({ children }) {
  const isMobile = useWindowResize();

  return (
    <div>
      {isMobile ? (
        <div>
          <Drawer />
          {children}
        </div>
      ) : (
        <PersistentDrawer>{children}</PersistentDrawer>
      )}
    </div>
  );
}

export default SideBar;
