import { PropsWithChildren } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

type ToastMessageProps = PropsWithChildren<{
  showToastMessage?: boolean;
  onClose?: () => void;
}>;

const ToastMessage = ({ children, onClose, showToastMessage }: ToastMessageProps) => {
  return (
    <ToastContainer
      position="top-start"
      className="text-white"
      style={{ zIndex: 1, width: '100%', padding: 4 }}>
      <Toast
        style={{ width: 'inherit' }}
        animation={true}
        show={showToastMessage ?? true}
        onClose={() => onClose?.()}
        bg="success"
        delay={2000}
        autohide>
        <Toast.Body className="d-flex justify-content-between">
          <div>{children}</div>
          <div>
            <Button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => onClose?.()}></Button>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
