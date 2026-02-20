import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import type { userType } from "../../Utils/UserData";
import style from "./Profile_privacy.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { z, ZodError } from "zod";
import useFetch from "../../Utils/useFetch2";

type Profile_privacy_props = {
    username: string;
    email: string;
    profileImage: string;
}

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

    const [body, setBody] = useState<BodyInit>();
    const [apiRoute, setApiRoute] = useState<string>("");

    const [showMessage, setShowMessage] = useState<boolean[]>([false, false, false]);
    const messages: string[] = [
        "Usuário alterado com sucesso!",
        "Erro ao alterar nome de usuário, verifique se o nome possui mais de 5 caractéres e tente novamente.",
        "Ocorreu um erro inesperado. Tente novamente.",
        "O campo de alteração está vazio!",
    ]

    const { isLoading, data, error, callApi, setCallApi, isFile, setIsFile } = useFetch({
        apiUrl: apiRoute,
        method: "PATCH",
        body: body,
    });

    const changeUsername = async () => {
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

            setShowMessage([true, false, false]);

            setTimeout(() => {
                setShowMessage([false, false, false]);
            }, 3000);

            setShowChangeUsername(false);
            setNewUsername("");

        } catch (error) {
            if (error instanceof ZodError) {
                setShowMessage([false, true, false]);
                return;
            }

            setShowMessage([false, false, true]);
        }
    };

    const changeProfileImage = async () => {
        if (!newProfileImage) { return null }

        const formData = new FormData();
        formData.append("profileImage", newProfileImage);
        setIsFile(true);
        setBody(formData);
        setApiRoute(
            `${API_URL}/user/update/profileImage`
        )
        setCallApi(true);
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

    useEffect(() => {
        console.log(error);
    }, [error])


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
                {showChangeUsername &&
                    <input type="text" name="username" id="username" placeholder="Novo nome de usuário" value={newUsername} onChange={handleInputChange} minLength={5} />
                }

                {!showChangeUsername &&
                    <button className={`${style.commomButton} ${style.buttonsPrivacy}`}
                        onClick={() => setShowChangeUsername(prev => !prev)}
                    >
                        <FaExchangeAlt /> <span>Alterar</span>
                    </button>
                }

                {showMessage[0] &&
                    <p className={style.success}>{messages[0]}</p>
                }


                {showMessage[1] &&
                    <p className={style.errorMessage}>{messages[1]}</p>
                }

                {showMessage[2] &&
                    <p className={style.errorMessage}>{messages[2]}</p>
                }

                {showChangeUsername && newUsername.length < 5 &&
                    <p className={style.errorMessage}>{messages[3]}</p>
                }


                {showChangeUsername &&
                    <button className={`${style.commomButton} ${style.buttonsConfirm}`}
                        onClick={changeUsername}>
                        <FaSquareCheck /> <span>Confirmar</span>
                    </button>
                }
                {showChangeUsername &&
                    <button className={`${style.commomButton} ${style.buttonsCancel}`}
                        onClick={() => {
                            setShowChangeUsername(prev => !prev);
                            setNewUsername("");
                        }}
                    >
                        <MdCancel /> <span>Cancelar</span>
                    </button>
                }


            </div>
            <div className={style.containerUserImage}>
                {!profileImagePreview && <h2>Imagem de perfil:</h2>}
                {profileImagePreview && !data && <h2>*Nova imagem:</h2>}

                {!isLoading && profileImagePreview && <h2>Imagem de perfil:</h2>}

                <img src={profileImagePreview ? profileImagePreview : userData.profileImage} alt="Imagem de perfil" />

                {!showChangeProfImage &&
                    <button className={`${style.commomButton} ${style.buttonsPrivacy}`}
                        onClick={() => setShowChangeProfImage(!showChangeProfImage)}
                    >
                        <FaExchangeAlt />
                        Alterar
                    </button>
                }

                {showChangeProfImage &&
                    <div className={style.containerChangeImage}>
                        <input type="file" name="profileImage" id="profileImage" accept="image/*" onChange={handleProfileImageChange} />
                        <label htmlFor="profileImage">Escolher imagem</label>
                    </div>
                }

                {showChangeProfImage &&
                    <button className={`${style.commomButton} ${style.buttonsCancel}`}
                        onClick={() => {
                            cancelImageChange()
                        }}
                        style={{ marginTop: "30px" }}
                    >
                        <MdCancel /> <span>Cancelar</span>
                    </button>
                }

                {showChangeProfImage &&
                    <button
                        className={`${style.commomButton} ${style.buttonsConfirm}`}
                        onClick={changeProfileImage}
                    >
                        <FaSquareCheck /> <span>Confirmar</span>
                    </button>
                }
            </div>
        </section>
    )
}

export default Profile_privacy;