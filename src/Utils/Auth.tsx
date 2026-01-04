import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();

    fetch(`${API_URL}/user/isAuth`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((data) => data.json())
        .then((data) => {
            if (!data.allowed) {
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
            navigate("/");
        });

    return (
        <>
        </>
    )
}


export { Auth };