import { useEffect, useState, type JSX } from "react";
import { API_URL } from "../config";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/user/isAuth`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setAllowed(data.allowed);
                setLoading(false);
            })
            .catch(() => {
                setAllowed(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (!allowed) {
        return <Navigate to="/" replace />;
    }

    return children;

}


export { ProtectedRoute };