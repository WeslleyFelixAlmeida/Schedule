import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./Register.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const registerFormSchema = z.object({
    username: z.string().min(5, "O nome de usuário deve ter pelo menos 5 caracteres"),
    userPassword: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
    userPasswordConfirm: z.string().min(5, "A confirmação deve ter pelo menos 5 caracteres"),
    email: z.email({ message: "Informe um e-mail válido" }),
}).refine((data) => data.userPassword === data.userPasswordConfirm, {
    message: "As senhas não coincidem",
    path: ["userPasswordConfirm"],
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    });

    function registerFormFilter(data: RegisterFormSchema) {
        navigate("/login");
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
                    <input type="text" placeholder="Informe o nome de usuário" {...register("username")} required />
                    <p className={style.errorMessage}>
                        {errors.username && errors.username.message}
                    </p>
                    <input type="email" placeholder="Informe o e-mail" {...register("email")} required />
                    <p className={style.errorMessage}>
                        {errors.email && errors.email.message}
                    </p>
                    <input type="password" placeholder="Informe sua senha" {...register("userPassword")} required />
                    <p className={style.errorMessage}>
                        {errors.userPassword && errors.userPassword.message}
                    </p>
                    <input type="password" placeholder="Confirme sua senha" {...register("userPasswordConfirm")} required />
                    <p className={style.errorMessage}>
                        {errors.userPasswordConfirm && errors.userPasswordConfirm.message}
                    </p>
                    <input type="submit" value="Criar conta" />
                    <Link to={"/login"}>Já possui uma conta?</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;