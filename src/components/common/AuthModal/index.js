import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../Modal";
import { CLoginForm } from "./LoginForm";
import { CRegisterForm } from "./RegisterForm";

export const AuthModal = ({ open, onClose }) => {
  const [selectedForm, setSelectedForm] = useState("login");
  const token = useSelector((state) => state.auth?.token || null);

  useEffect(() => {
    token && onClose();
  }, [token]);

  return (
    <Modal open={open} onClose={onClose} maxWidth={400}>
      {selectedForm === "login" ? (
        <CLoginForm onRegisterButtonClick={() => setSelectedForm("register")} />
      ) : selectedForm === "register" ? (
        <CRegisterForm onLoginButtonClick={() => setSelectedForm("login")} />
      ) : null}
    </Modal>
  );
};
