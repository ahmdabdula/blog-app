import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Modal from "react-modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../Button/button";
import InputBar from "../Forminput/inputbar";
import Spinner from "../Spinner/spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createBlog } from "../../Utils/Firebase/firebase";
import { UserContext } from "../../Context/userContext";
import GenericAlert from "../Alerts/genericAlert";
const defaultFormFields = {
  title: "",
  content: "",
};

const CreateBlog = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, content } = formFields;
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const matches = useMediaQuery("(min-width:600px)");

  let border: string;
  content.length > 0
    ? (border = "border-primary")
    : (border = "border-secondary");

  const contentStyle = {
    content: {
      borderRadius: "0px",
      width: matches ? "60%" : "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
    overlay: {
      backgroundColor: "rgb(39, 39, 39,.8)",
      right: "0",
      left: "0",
    },
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
    resetFields();
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      currentUser && (await createBlog(currentUser, content, title));
      setLoading(false);
      resetFields();
      setAlertMessage("New Blog Added");
      setAlertType("success");
      setAlert(true);
    } catch (error: unknown) {
      setLoading(false);
      setAlert(true);
      setAlertType("error");
      setAlertMessage(error as string);
    }
  };

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div>
      <Modal style={contentStyle} isOpen={isOpen}>
        {alert && (
          <GenericAlert
            message={alertMessage}
            closeAlert={setAlert}
            type={alertType}
          />
        )}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full lg:p-8 h-full flex flex-col items-center">
            <div className="w-full flex justify-between">
              <div>
                <hr className="border-4 w-10 border-primary" />
                <h1 className="font-lexend font-bold lg:text-4xl text-2xl pb-5">
                  Add Blog
                </h1>
              </div>
              <div>
                <button
                  onClick={handleClose}
                  className="text-xl sm:text-3xl text-dark"
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </div>

            <div className="mt-6 h-1/6 w-full">
              <InputBar
                placeholder="Blog Title"
                type="text"
                isValid={title.length > 0}
                onChange={handleChange}
                required
                name="title"
                value={title}
              />
            </div>
            <div className="h-3/6 w-full">
              <textarea
                placeholder="Blog Content"
                value={content}
                name="content"
                onChange={handleChange}
                className={
                  "w-full border-2 p-5 rounded-none focus:outline-none h-full " +
                  border
                }
              ></textarea>
            </div>
            <div className="flex items-end justify-end w-full">
              <Spinner visible={loading} />
              <Button
                disabled={!(content.length > 0 && title.length > 0 && !loading)}
                name="SUBMIT"
                onPress={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateBlog;
