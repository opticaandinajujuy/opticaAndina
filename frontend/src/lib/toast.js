import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (el) => {
    el.onmouseenter = Swal.stopTimer;
    el.onmouseleave = Swal.resumeTimer;
  },
});

export const toastSuccess = (title) => Toast.fire({ icon: 'success', title });
export const toastError = (title) => Toast.fire({ icon: 'error', title });
export const toastWarning = (title) => Toast.fire({ icon: 'warning', title });

export const confirmAction = ({
  title,
  text,
  confirmButtonText = 'Confirmar',
  icon = 'warning',
  confirmButtonColor = '#5c9c9d',
}) =>
  Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    confirmButtonColor,
    cancelButtonColor: '#85b6b7',
  });
