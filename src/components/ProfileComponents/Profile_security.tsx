import React, { useState } from "react";
import style from "./Profile_security.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";

const Profile_security = () => {
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [showDeleteAcc, setShowDeleteAcc] = useState<boolean>(false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        console.log(form.get("newPassword"));
    }

    const handlePasswordInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "oldPassword") {
            setOldPassword(e.target.value);
        }
        else if (e.target.id === "newPassword") {
            setNewPassword(e.target.value);
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
                        <h2>Tem certeza que deseja deletar sua conta?</h2>
                        <div className={style.containerDeleteButtons}>
                            <button className={style.cancelDeleteAccButton}
                                onClick={() => {
                                    setShowDeleteAcc(false);
                                }}>
                                Não
                            </button>
                            <button className={style.confirmDeleteAccButton}
                            onClick={()=>console.log("conta deletada!")}>
                                <GoAlertFill /> Sim
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