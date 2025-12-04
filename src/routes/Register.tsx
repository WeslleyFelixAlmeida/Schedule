import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./Register.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { API_URL } from "../config";

const registerFormSchema = z.object({
    username: z.string().min(5, "O usuário deve ter pelo menos 5 caracteres"),
    password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
    confirmPassword: z.string().min(5, "A confirmação deve ter pelo menos 5 caracteres"),
    email: z.email({ message: "Informe um e-mail válido" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    });

    function registerFormFilter(data: RegisterFormSchema) {
        fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    navigate(`/login?registerMessage=true`);
                } else {
                    console.log("Erro de registro:", data.error);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.containerLogo}>
                <Link to={"/"}>Home</Link>
                <div className={style.logoContainer}>
                    <h1>Seja bem-vindo ao Schedule</h1>
                    <Logo size={300} color={"black"} />
                </div>
            </div>
            <div className={style.contentContainer}>
                <form method="POST" onSubmit={handleSubmit(registerFormFilter)} >
                    <h2>Criar uma nova conta</h2>
                    <p>Preencha os campos abaixo para criar sua conta.</p>
                    <input type="text"
                        placeholder=""
                        {...register("username")}
                        required
                        id="username"
                        className={style.username}
                    />
                    <label htmlFor="username" className={`${style.usernameLabel} ${style.labelForm}`}>Nome de usuário</label>

                    <p className={style.errorMessage}>
                        {errors.username && errors.username.message}
                    </p>

                    <input
                        type="email"
                        placeholder=""
                        {...register("email")}
                        required
                        id="email"
                        className={style.email}
                    />
                    <label htmlFor="email" className={`${style.emailLabel} ${style.labelForm}`}>E-mail</label>

                    <p className={style.errorMessage}>
                        {errors.email && errors.email.message}
                    </p>

                    <input
                        type="password"
                        placeholder=""
                        {...register("password")}
                        required
                        id="password"
                        className={style.password}
                    />
                    <label htmlFor="password" className={`${style.passwordLabel} ${style.labelForm}`}>Senha</label>

                    <p className={style.errorMessage}>
                        {errors.password && errors.password.message}
                    </p>

                    <input
                        type="password"
                        placeholder=""
                        {...register("confirmPassword")}
                        required
                        id="confirmPassword"
                        className={style.confirmPassword}
                    />
                    <label htmlFor="confirmPassword" className={`${style.confirmPasswordLabel} ${style.labelForm}`}>Confirmar senha</label>

                    <p className={style.errorMessage}>
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </p>

                    <input type="submit" value="Criar conta" />
                    <Link to={"/login"}>Já possui uma conta?</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;