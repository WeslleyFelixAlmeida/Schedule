import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import style from "./Login.module.css";
import { API_URL } from "../config";
import { useEffect } from "react";

const loginFormSchema = z.object({
    email: z.string().email({ message: "Informe um e-mail válido" }),
    password: z.string().min(1, "O campo de senha está vazio"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;


const Login = () => {
    const navigate = useNavigate();
    const [ulrParams] = useSearchParams();

    const { register, handleSubmit, formState: { errors },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema)
    });

    async function loginFormFilter(data: LoginFormSchema) {
        // fetch(`${API_URL}/user/login`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include",
        //     body: JSON.stringify(data)
        // })
        //     .then((data) => data.json())
        //     .then((data) => {
        //         if (data.success) {
        //             console.log("Usuário autenticado!");
        //             navigate(`/schedules`);

        //         } else {
        //             console.log("Erro de login:", data.error);
        //         }
        //     })
        //     .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (ulrParams.get("registerMessage")) {

            const timeout = setTimeout(() => {
                navigate(window.location.pathname, { replace: true });
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [ulrParams, navigate]);

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
                {ulrParams.get("registerMessage") &&
                    <p>Conta criada com sucesso!</p>
                }
                <form method="POST" onSubmit={handleSubmit(loginFormFilter)}>
                    <h2>Entre na sua conta</h2>
                    <p>Informe suas credenciais de acesso.</p>
                    <input
                        type="email"
                        placeholder=""
                        {...register("email")}
                        required
                        id="email"
                    // name="userEmail" 
                    />
                    <label htmlFor="email"
                        className={`${style.labelForm} ${style.emailLabel}`}
                    >
                        E-mail
                    </label>

                    <p className={style.errorMessage}>
                        {errors.email && errors.email.message}
                    </p>
                    <input
                        type="password"
                        placeholder=""
                        {...register("password")}
                        required
                        id="password"
                    // name="userPassword"
                    />

                    <label htmlFor="password"
                        className={`${style.labelForm} ${style.passwordLabel}`}>
                        Senha
                    </label>
                    <p className={style.errorMessage}>
                        {errors.password && errors.password.message}
                    </p>

                    <input type="submit" value="Entrar" />
                    <Link to={"/register"}>Ainda não possui uma conta?</Link>
                </form>

            </div>
        </div>
    )
}

export default Login;