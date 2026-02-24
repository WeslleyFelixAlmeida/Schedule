import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import type { userType } from "../../Utils/UserData";
import style from "./Profile_privacy.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { z, ZodError } from "zod";

type Profile_privacy_props = {
    username: string;
    email: string;
    profileImage: string;
}

type MessageItem = {
    message: string;
    show?: boolean;
};

type ShowMessageState = {
    message_0: MessageItem;
    message_1: MessageItem;
    message_2: MessageItem;
    message_3: MessageItem;
    message_4: MessageItem;
    message_5: MessageItem;
};

const usernameSchema = z.object({
    username: z.string().min(5),
});

const Profile_privacy = (props: Profile_privacy_props) => {
    const [userData, setUserData] = useState<Profile_privacy_props>({
        username: props.username,
        email: props.email,
        profileImage: props.profileImage,
    });

    const [showChangeUsername, setShowChangeUsername] = useState<boolean>(false);
    const [showChangeProfImage, setShowChangeProfImage] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>("");
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>("");

    const messages: string[] = [
        "Usuário alterado com sucesso!",
        "Erro ao alterar nome de usuário, verifique se o nome possui mais de 5 caractéres e tente novamente.",
        "Ocorreu um erro inesperado. Tente novamente.",
        "O campo está vazio ou tem menos de 5 caractéres!",
        "Não foi identificada nenhuma imagem!",
        "Imagem de perfil alterada com sucesso!"
    ]

    const [showMessage, setShowMessage] = useState<ShowMessageState>({
        message_0: { message: messages[0], show: false },
        message_1: { message: messages[1], show: false },
        message_2: { message: messages[2], show: false },
        message_3: { message: messages[3] },
        message_4: { message: messages[4] },
        message_5: { message: messages[5], show: false },
    });

    const clearAllMessages = () => {
        setShowMessage({
            message_0: { message: messages[0], show: false },
            message_1: { message: messages[1], show: false },
            message_2: { message: messages[2], show: false },
            message_3: { message: messages[3] },
            message_4: { message: messages[4] },
            message_5: { message: messages[5], show: false },
        })
    }

    const changeUsername = async () => {
        if (!newUsername) { return null }

        try {
            const validated = usernameSchema.parse({ username: newUsername });

            const response = await fetch(`${API_URL}/user/update/username`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validated),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            const data: userType = await response.json();

            setUserData(prev => ({
                ...prev,
                username: data.username,
            }));

            setShowMessage((prev) => (
                { ...prev, message_0: { ...prev.message_0, show: true } }));

        } catch (error) {
            if (error instanceof ZodError) {
                setShowMessage((prev) => (
                    { ...prev, message_1: { ...prev.message_1, show: true } }));
                return;
            }

            setShowMessage((prev) => (
                { ...prev, message_2: { ...prev.message_2, show: true } }));
        } finally {
            setTimeout(() => clearAllMessages(), 3000);

            setShowChangeUsername(false);
            setNewUsername("");
        }
    };

    const changeProfileImage = async () => {
        if (!newProfileImage) { return null }

        try {
            const formData = new FormData();
            formData.append("profileImage", newProfileImage);

            const response = await fetch(`${API_URL}/user/update/profileImage`, {
                method: "PATCH",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            const data: userType = await response.json();

            setUserData(prev => ({
                ...prev,
                username: data.username,
            }));

            setShowMessage((prev) => (
                { ...prev, message_5: { ...prev.message_5, show: true } }));
        } catch (error) {
            setShowMessage((prev) => (
                { ...prev, message_3: { ...prev.message_3, show: true } }));
        } finally {
            setTimeout(() => clearAllMessages(), 3000);

            setShowChangeProfImage(false);
            setNewProfileImage(null);
            setProfileImagePreview(null);
        }


    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "username") {
            setNewUsername(e.target.value);
        }
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setNewProfileImage(file);

        const previewUrl = URL.createObjectURL(file);
        setProfileImagePreview(previewUrl);
    };

    const cancelImageChange = () => {
        if (profileImagePreview) {
            URL.revokeObjectURL(profileImagePreview);
        }

        setProfileImagePreview(null);
        setNewProfileImage(null);
        setShowChangeProfImage(false);
    };


    return (
        <section className={style.containerPersonalInfos}>
            <h1>Informações pessoais:</h1>
            <div className={`${style.emailLine}`}>
                <h2>E-mail do usuário:</h2>
                <p>{userData.email}</p>
            </div>
            <div className={style.containerUsername}>
                <h2>Nome de usuário:</h2>
                <p>{userData.username}</p>

                {!showChangeUsername &&
                    <button className={`${style.commomButton} ${style.buttonsPrivacy}`}
                        onClick={() => setShowChangeUsername(prev => !prev)}
                    >
                        <FaExchangeAlt /> <span>Alterar</span>
                    </button>
                }

                {showChangeUsername &&
                    <>
                        <input type="text" name="username" id="username" placeholder="Novo nome de usuário" value={newUsername} onChange={handleInputChange} minLength={5} />
                        <button className={`${style.commomButton} ${style.buttonsCancel}`}
                            onClick={() => {
                                setShowChangeUsername(prev => !prev);
                                setNewUsername("");
                            }}
                        >
                            <MdCancel /> <span>Cancelar</span>
                        </button>
                        <button className={`${style.commomButton} ${style.buttonsConfirm}`}
                            onClick={changeUsername}>
                            <FaSquareCheck /> <span>Confirmar</span>
                        </button>
                    </>
                }

                {showMessage.message_0.show &&
                    <p className={`${style.message} ${style.successMessage}`}>{showMessage.message_0.message}</p>
                }

                {showMessage.message_1.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>{showMessage.message_1.message}</p>
                }

                {showMessage.message_2.show &&
                    <p className={`${style.message} ${style.errorMessage}`}>{showMessage.message_2.message}</p>
                }

                {showChangeUsername && newUsername.length < 5 &&
                    <p className={`${style.message} ${style.errorMessage}`}>{showMessage.message_3.message}</p>
                }

            </div>
            <div className={style.containerUserImage}>
                {!profileImagePreview && <h2>Imagem de perfil:</h2>}
                {profileImagePreview && <h2>*Nova imagem:</h2>}

                <img src={profileImagePreview ? profileImagePreview : userData.profileImage} alt="Imagem de perfil" />

                {!showChangeProfImage &&
                    <button className={`${style.commomButton} ${style.buttonsPrivacy}`}
                        onClick={() => setShowChangeProfImage(!showChangeProfImage)}
                    >
                        <FaExchangeAlt />
                        Alterar
                    </button>
                }


                {showMessage.message_5.show &&
                    <p className={`${style.message} ${style.successMessage}`}>{showMessage.message_5.message}</p>
                }
                {showChangeProfImage &&
                    <>
                        <div className={style.containerChangeImage}>
                            <input type="file" name="profileImage" id="profileImage" accept="image/*" onChange={handleProfileImageChange} />
                            <label htmlFor="profileImage">Escolher imagem</label>
                        </div>
                        <button className={`${style.commomButton} ${style.buttonsCancel}`}
                            onClick={() => {
                                cancelImageChange()
                            }}
                            style={{ marginTop: "30px" }}
                        >
                            <MdCancel /> <span>Cancelar</span>
                        </button>
                        <button
                            className={`${style.commomButton} ${style.buttonsConfirm}`}
                            onClick={changeProfileImage}
                        >
                            <FaSquareCheck /> <span>Confirmar</span>
                        </button>
                        {!profileImagePreview &&
                            <p className={`${style.message} ${style.errorMessage}`}>{showMessage.message_4.message}</p>
                        }
                    </>
                }

            </div>
        </section>
    )
}

export default Profile_privacy;