import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function PrivacyComp({ children }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/employee/login");
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return <>{children}</>;
}

export default PrivacyComp;