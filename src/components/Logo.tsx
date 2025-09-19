import white_logo from "./../assets/imgs/icone_branco.png";
import dark_logo from "./../assets/imgs/icone_preto.png";

type LogoProps = {
    size: number;
    color: "black" | "white";
}

const Logo = ({ size, color }: LogoProps) => {
    return (
        <div>
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