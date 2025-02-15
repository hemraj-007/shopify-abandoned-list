import { toast } from 'react-toastify';

export const useNotification = () => {
  const notify = (message, type = 'info') => {
    console.log('Toast Notification Triggered:', message, type);
    toast[type](message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  return notify;
};
