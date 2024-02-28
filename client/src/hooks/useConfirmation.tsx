import { useState } from "react";

interface ConfirmationData {
  title: string;
  message: string;
  onConfirm: () => void;
}

interface ConfirmationHook {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  showConfirmation: (
    title: string,
    message: string,
    onConfirm: () => void
  ) => void;
  hideConfirmation: () => void;
}

const useConfirmation = (): ConfirmationHook => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<ConfirmationData>({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void
  ) => {
    setData({ title, message, onConfirm });
    setShow(true);
  };

  const hideConfirmation = () => {
    setShow(false);
  };

  return {
    show,
    title: data.title,
    message: data.message,
    onConfirm: data.onConfirm,
    showConfirmation,
    hideConfirmation,
  };
};

export default useConfirmation;
