import { useEffect, useState, type JSX } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const IsLogged = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/user/isAuth`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.allowed) {
                    if (data.allowed) {
                        navigate("/schedules");
                    }
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    return children;
}


export { IsLogged };