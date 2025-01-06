// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import DrawerContent from '../DrawerContent';
import { useSideBarStore, sideBarActions } from '@/store';

export default function TemporaryDrawer() {
  const [sideBarState, sideBarDispatch] = useSideBarStore();

  return (
    <div>
      <Drawer
        open={sideBarState.isShow}
        onClose={() => sideBarDispatch(sideBarActions.hiddenSideBar())}
        className="theme-white-10-bg">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => sideBarDispatch(sideBarActions.hiddenSideBar())}>
          <DrawerContent />
        </Box>
      </Drawer>
    </div>
  );
}
