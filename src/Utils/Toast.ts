import { toast } from "react-toastify";

export const showErrorToast = (error: any, location: any) => {
  console.log("called");

  return toast.error(error, {
    position: location,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccessToast = (info: any, location: any) => {
  return toast.success(info, {
    position: location,
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showLoadingToast = (info: any, location: any) => {
  return toast.loading(info, {
    position: location,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: true,
    progress: undefined,
  });
};

export const dismissToast = (id: any) => {
  toast.dismiss(id);
}