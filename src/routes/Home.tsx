import { Link } from "react-router-dom";
import style from "./Home.module.css";
import Logo from "../components/Logo";

const Home = () => {
    return (
        <div className={style.homeContainer}>
            {/* <h1>Seja bem vindo ao Schedule</h1>
            <h2>Agende compromissos ou divulgue horários de serviço para seu negócio.</h2>
            <Link to={"/register"}>
                <p>Comece a usar clicando aqui!</p>
            </Link>

            <Logo color={"black"} size={180} classname={style.imageContainer}/> */}

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