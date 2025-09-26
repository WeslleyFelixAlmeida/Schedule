import white_logo from "./../assets/imgs/icone_branco.png";
import dark_logo from "./../assets/imgs/icone_preto.png";

type LogoProps = {
    size: number;
    color: "black" | "white";
    classname?: string;
}

const Logo = ({ size, color, classname }: LogoProps) => {
    return (
        <div className={classname ? classname : ""}>
            {color === "black" &&
                <img src={dark_logo} alt="logo" width={`${size}px`} />
            }
            {color === "white" &&
                <img src={white_logo} alt="logo" width={`${size}px`} />
            }
        </div>
    );
}

export default Logo;