import Modal from '@mui/material/Modal';
import { useState, forwardRef, useImperativeHandle } from 'react';

import { IoClose } from '@/utils';
import DefaultButton from '@/components/common/buttons/DefaultButton';
import AppIconButton from '@/components/common/buttons/AppIconButton';

function ModalComponent(
  {
    title = '',
    closeTitle = 'Cancel',
    submitTitle = 'Confirm',
    handleSubmit = () => {},
    children,
  },
  ref
) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      setOpen(false);
    },
    toggleModal() {
      setOpen(!open);
    },
    getModalState() {
      return open;
    },
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}>
      <div className="theme-background-bg absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded px-5 py-3 shadow-2xl">
        <div className="flex flex-col">
          <div className="theme-gray-border mb-3 flex items-center justify-between border-b border-solid pb-2">
            <h4 className="font-medium">{title}</h4>
            <AppIconButton onClick={handleClose}>
              <IoClose />
            </AppIconButton>
          </div>
          <div>{children}</div>
          <div className="mb-1 mt-3 flex items-center justify-end">
            <DefaultButton
              className="!mr-2"
              variant="outlined"
              onClick={handleClose}>
              {closeTitle}
            </DefaultButton>

            <DefaultButton
              hoverColor="primary.contrastText"
              onClick={() => {
                handleSubmit();
                setOpen(false);
              }}>
              {submitTitle}
            </DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(ModalComponent);
