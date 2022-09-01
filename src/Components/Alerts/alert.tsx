import { Dispatch, SetStateAction } from "react";

const Alert = ({
  message,
  closeAlert,
}: {
  message: string | null;
  closeAlert: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="fixed bg-red-100 mt-2 border border-red-400 text-red-700 px-4 rounded"
      role="alert"
    >
      <span className="block sm:inline text-sm">{message}</span>
      <span
        onClick={() => {
          closeAlert(false);
        }}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          className="fill-current w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
        </svg>
      </span>
    </div>
  );
};

export default Alert;
