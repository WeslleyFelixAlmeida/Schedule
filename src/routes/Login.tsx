import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import style from "./Login.module.css";

const loginFormSchema = z.object({
    email: z.email({ message: "Informe um e-mail válido" }),
    userPassword: z.string().min(1, "O campo de senha está vazio"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;


const Login = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema)
    });

    function loginFormFilter(data: LoginFormSchema) {
        navigate(`/schedules?teste=${"data"}`);
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
                <form method="POST" onSubmit={handleSubmit(loginFormFilter)}>
                    <h2>Entre na sua conta</h2>
                    <p>Informe suas credenciais de acesso.</p>
                    <input type="email" placeholder="" {...register("email")} required id="userEmail" name="userEmail" />
                    <label htmlFor="userEmail"
                        className={`${style.labelForm} ${style.emailLabel}`}
                    >
                        E-mail
                    </label>

                    <p className={style.errorMessage}>
                        {errors.email && errors.email.message}
                    </p>
                    <input type="password" placeholder="" {...register("userPassword")} required id="userPassword" name="userPassword" />

                    <label htmlFor="userPassword"
                        className={`${style.labelForm} ${style.passwordLabel}`}>
                        Senha
                    </label>
                    <p className={style.errorMessage}>
                        {errors.userPassword && errors.userPassword.message}
                    </p>

                    <input type="submit" value="Entrar" />
                    <Link to={"/register"}>Ainda não possui uma conta?</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;