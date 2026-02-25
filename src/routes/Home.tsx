import { Link, useNavigate, useSearchParams } from "react-router-dom";
import style from "./Home.module.css";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Home = () => {
    const [urlParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (urlParams.get("process") === "accDeleted") {
            setTimeout(() => navigate("/"), 3000);
        }
    }, [urlParams]);

    useEffect(() => {
        fetch(`${API_URL}/user/isAuth`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if(data.allowed){
                    navigate("/schedules");
                }
            })
            .catch((err)=>console.log(err));
    }, [])

    return (
        <div className={style.homeContainer}>
            {urlParams.get("process") &&
                <div className={`${style.message} ${style.deleteAccMessage}`}>
                    <p>Conta deletada com sucesso!</p>
                </div>
            }

            <div className={style.containerText}>
                <h1>Seja bem vindo ao Schedule</h1>
                <h2>Agende compromissos ou divulgue horários de serviço para seu negócio.</h2>
                <Link to={"/register"}>
                    <p>Comece a usar clicando aqui!</p>
                </Link>
            </div>
            <Logo color={"black"} size={180} classname={style.imageContainer} />
        </div>
    );
}

export default Home;