import React, { useEffect, useState } from "react";
import style from "./Profile_security.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { API_URL } from "../../config";
import z, { ZodError } from "zod";
import { useNavigate } from "react-router-dom";

type MessageItem = {
    show: boolean;
};

type ShowMessageState = {
    message_0: MessageItem;
    message_1: MessageItem;
    message_2: MessageItem;
    message_3: MessageItem;
    message_4: MessageItem;
    message_5: MessageItem;
    message_6: MessageItem;
};

const passwordSchema = z.object({
    oldPassword: z.string().min(5).max(225),
    newPassword: z.string().min(5).max(225)
});

const deleteAccPasswordSchema = z.object({
    deletePassword: z.string().min(5).max(225)
});

const Profile_security = () => {
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [showDeleteAcc, setShowDeleteAcc] = useState<boolean>(false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [deletePassword, setDeletePassword] = useState<string>("");

    const [showMessage, setShowMessage] = useState<ShowMessageState>({
        message_0: { show: false },
        message_1: { show: false },
        message_2: { show: false },
        message_3: { show: false },
        message_4: { show: false },
        message_5: { show: false },
        message_6: { show: false },
    });

    const clearAllMessages = () => {
        setShowMessage({
            message_0: { show: false },
            message_1: { show: false },
            message_2: { show: false },
            message_3: { show: false },
            message_4: { show: false },
            message_5: { show: false },
            message_6: { show: false },
        })
    }


    const changePassword = async () => {
        try {
            const validate = passwordSchema.parse({
                oldPassword: oldPassword,
                newPassword: newPassword
            })

            const request = await fetch(`${API_URL}/user/changePassword`, {
                method: "PATCH",
                body: JSON.stringify(validate),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (request.status === 401) {
                setShowMessage((prev) => (
                    { ...prev, message_1: { show: true } }));
                return;
            }

            if (!request.ok) {
                throw new Error("Erro ao alterar senha.");
            }

            setShowMessage((prev) => (
                { ...prev, message_0: { show: true } }));

            setOldPassword("");
            setNewPassword("");

        } catch (error) {
            if (error instanceof ZodError) {
                setShowMessage((prev) => (
                    { ...prev, message_2: { show: true } }));
                return;
            }
            setShowMessage((prev) => (
                { ...prev, message_3: { show: true } }));

        } finally {
            setTimeout(() => clearAllMessages(), 3000);
            setShowChangePassword(false);
        }
    }

    const deleteAcc = async () => {
        try {
            const validate = deleteAccPasswordSchema.parse({
                deletePassword: deletePassword,
            })

            const request = await fetch(`${API_URL}/user/deleteAcc`, {
                method: "DELETE",
                body: JSON.stringify(validate),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (request.status === 401) {
                setShowMessage((prev) => (
                    { ...prev, message_5: { show: true } }));
                return;
            }

            if (!request.ok) {
                throw new Error("Erro ao alterar senha.");
            }

            setDeletePassword("")
            navigate("/?accountDeleted=true");
        } catch (error) {
            if (error instanceof ZodError) {
                setShowMessage((prev) => (
                    { ...prev, message_6: { show: true } }));
                return;
            }
            setShowMessage((prev) => (
                { ...prev, message_4: { show: true } }));

        } finally {
            setTimeout(() => clearAllMessages(), 3000);
            setShowChangePassword(false);
        }
    }

    const handlePasswordInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "oldPassword") {
            setOldPassword(e.target.value);
        }
        else if (e.target.id === "newPassword") {
            setNewPassword(e.target.value);
        }
        else if (e.target.id === "deletePassword") {
            setDeletePassword(e.target.value);
        }
    }

    return (
        <section className={style.containerSecurity}>
            <h1>Opções de segurança:</h1>
            <div className={style.containerChangePass}>
                <h2>Gostaria de mudar sua senha?</h2>
                {!showChangePassword &&
                    <button className={style.buttonsSecurity}
                        onClick={() => setShowChangePassword(true)}
                    >
                        <FaExchangeAlt />
                        Alterar senha
                    </button>
                }

                {showChangePassword &&
                    <div className={style.containerChangePasswordForm}>
                        <input type="button" value="Cancelar" onClick={() => {
                            setNewPassword("");
                            setOldPassword("");
                            setShowChangePassword(false);
                        }} />
                        <div className={style.formChangePassword} id="changePassword">
                            <section>
                                <p>Senha antiga:</p>
                                <input type="password" name="oldPassword" id="oldPassword" maxLength={225} onChange={handlePasswordInputs} value={oldPassword} />
                            </section>
                            <section>
                                <p>Nova senha:</p>
                                <input type="password" name="newPassword" id="newPassword" maxLength={225} onChange={handlePasswordInputs} value={newPassword} />
                            </section>
                            <input type="button" onClick={changePassword} value="Alterar senha" />
                        </div>
                    </div>
                }
                {showMessage.message_0.show &&
                    <p className={`${style.message} ${style.successMessage}`}>Senha alterada com sucesso!</p>
                }
                {showMessage.message_1.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>
                        Senha incorreta!</p>
                }
                {showMessage.message_2.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>Erro, verifique se as senhas possuem mais de 5 caractéres e tente novamente</p>
                }
                {showMessage.message_3.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>Erro ao realizar operação</p>
                }
            </div>
            <div className={style.containerDeleteAccount}>
                <h2>Deletar conta?</h2>
                {!showDeleteAcc &&
                    <button className={style.buttonsDeleteAcc} onClick={() => setShowDeleteAcc(true)}>
                        <FaRegTrashAlt />
                        Deletar conta
                    </button>
                }

                {showDeleteAcc &&
                    <div className={style.deleteAccContainer}>
                        <h2>Informe sua senha para deletar sua conta:</h2>
                        <input type="password" name="deletePassword" id="deletePassword" maxLength={225} onChange={handlePasswordInputs} value={deletePassword} />
                        <div className={style.containerDeleteButtons}>
                            <button className={style.cancelDeleteAccButton}
                                onClick={() => {
                                    setShowDeleteAcc(false);
                                }}>
                                Cancelar
                            </button>
                            <button className={style.confirmDeleteAccButton}
                                onClick={deleteAcc}>
                                <GoAlertFill /> Confirmar
                            </button>
                        </div>
                    </div>
                }
                {showMessage.message_4.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>Erro ao realizar operação</p>
                }
                {showMessage.message_5.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>Credenciais informadas inválidas!</p>
                }
                {showMessage.message_6.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>Verifique se a senha informada possui mais de 5 caractéres, e tente novamente.</p>
                }
                <p>*Cuidado, não é possível desfazer esta ação!</p>
            </div>
        </section>
    )
}

export default Profile_security;