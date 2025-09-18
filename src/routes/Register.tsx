import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./Register.module.css";
import { Link } from "react-router-dom";

const registerFormSchema = z.object({
    username: z.string().min(5, "O nome de usuário deve ter pelo menos 5 caracteres"),
    userPassword: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
    userPasswordConfirm: z.string().min(5, "A confirmação deve ter pelo menos 5 caracteres"),
}).refine((data) => data.userPassword === data.userPasswordConfirm, {
    message: "As senhas não coincidem",
    path: ["userPasswordConfirm"],
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register = () => {
    const { register, handleSubmit, formState: { errors },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    });

    function registerFormFilter(data: RegisterFormSchema) {
        console.log(data);
    }

    return (
        <div className={style.contentContainer}>
            <Link to={"/"}>Home</Link>
            <h1>Realize seu cadastro para usar nosso sistema</h1>
            <form method="POST" onSubmit={handleSubmit(registerFormFilter)}>
                <label htmlFor="username">Usuário:</label>
                <input type="text" placeholder="Informe o nome de usuário" {...register("username")} required />
                {errors.username && <p>{errors.username.message}</p>}

                <label htmlFor="userPassword">Senha:</label>
                <input type="password" placeholder="Informe sua senha" {...register("userPassword")} required />
                {errors.userPassword && <p>{errors.userPassword.message}</p>}

                <label htmlFor="userPasswordConfirm">Confirmar senha:</label>
                <input type="password" placeholder="Confirme sua senha" {...register("userPasswordConfirm")} required />
                {errors.userPasswordConfirm && (
                    <p>{errors.userPasswordConfirm.message}</p>
                )}

                <input type="submit" value="Criar conta" />
            </form>
        </div>
    );
}

export default Register;