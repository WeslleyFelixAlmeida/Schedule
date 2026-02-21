import React, { useEffect, useRef, useState } from "react";
import style from "./Profile_security.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import useFetch2 from "../../Utils/useFetch2";
import { API_URL } from "../../config";

const Profile_security = () => {
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [showDeleteAcc, setShowDeleteAcc] = useState<boolean>(false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [deletePassword, setDeletePassword] = useState<string>("");
    const [message, setMessage] = useState<boolean[]>([false, false]);

    //Api states:
    const [apiUrl, setApiUrl] = useState<string>("");
    const [httpMethod, setHttpMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS">("OPTIONS");
    const [bodyRequest, setBodyRequest] = useState<BodyInit | null>();
    const { data, error, setCallApi, isLoading } = useFetch2({ apiUrl: apiUrl, method: httpMethod, body: bodyRequest });
    //-----------------------------------------------------------------

    const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        setApiUrl(`${API_URL}/user/changePassword`);
        setBodyRequest(form);
        setHttpMethod("PATCH");
        setCallApi(true);

    }

    const deleteAcc = () => {
        if (!deletePassword) {
            const form = new FormData();
            form.append("password", deletePassword);

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


    useEffect(() => {
        data ? () => console.log(data) : () => "";
    }, [data]);

    useEffect(() => {
        if (!isLoading) {
            setApiUrl(``);
            setBodyRequest(null);
            setHttpMethod("OPTIONS");
            setCallApi(false);
        }
    }, [isLoading]);

    useEffect(() => {
        console.log(error);
    }, [error]);

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
                        <form onSubmit={changePassword} className={style.formChangePassword} id="changePassword">
                            <section>
                                <p>Senha antiga:</p>
                                <input type="password" name="oldPassword" id="oldPassword" maxLength={225} onChange={handlePasswordInputs} value={oldPassword} />
                            </section>
                            <section>
                                <p>Nova senha:</p>
                                <input type="password" name="newPassword" id="newPassword" maxLength={225} onChange={handlePasswordInputs} value={newPassword} />
                            </section>
                            <input type="submit" value="Alterar senha" />
                        </form>
                    </div>
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
                                onClick={() => console.log("conta deletada!")}>
                                <GoAlertFill /> Confirmar
                            </button>
                        </div>
                    </div>
                }
                <p>*Cuidado, não é possível desfazer esta ação!</p>
            </div>
        </section>
    )
}

export default Profile_security;