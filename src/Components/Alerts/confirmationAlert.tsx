import { Dispatch, SetStateAction, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "react-modal";
import Spinner from "../Spinner/spinner";

const ConfirmAlert = ({
  closeAlert,
  onSucces,
  loading,
}: {
  closeAlert: Dispatch<SetStateAction<boolean>>;
  onSucces: () => void;
  loading: boolean;
}) => {
  const matches = useMediaQuery("(max-width:1024px)");
  const modalStyle = {
    content: {
      borderRadius: "0px",
      width: matches ? "auto" : "30%",
      height: "20%",
      margin: "auto",
    },
    overlay: {
      backgroundColor: "rgb(39, 39, 39,.8)",
      right: "0",
      left: "0",
    },
  };

  const handleCancel = () => {
    closeAlert(false);
  };

  const handleDelete = () => {
    onSucces();
  };

  return (
    <Modal isOpen style={modalStyle}>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex justify-center">
          <div>
            <hr className="border-4 w-10 border-primary" />
            <h1 className="font-lexend text-lg">
              Are you Sure You Want to Delete?
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="bg-dark px-5 py-3 m-5 hover:bg-primary text-white"
          >
            <h1>Cancel</h1>
          </button>
          <button
            onClick={handleDelete}
            className="bg-dark px-5 py-3 m-5 hover:bg-primary text-white"
          >
            <h1>Delete</h1>
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 right-0">
        <Spinner visible={loading} />
      </div>
    </Modal>
  );
};

export default ConfirmAlert;
