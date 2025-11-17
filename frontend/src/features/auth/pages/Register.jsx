import { useState, useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthContext"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/layout/AuthForm/AuthForm";
import { AuthLayout } from "../components/layout/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [error, setError] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/register",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(credentials),
                }
            );

            if(response.ok){
                const data = await response.json();
                sessionStorage.setItem("email", data.email);
                navigate("/verify-email");
            } else{
                const errorData = await response.json();
                setError(errorData.errors);
                const messages = Object.values(errorData.errors).join("\n");
                alert(messages);
            }
        } catch (error){
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCredentials(
            {
            ...credentials,
            [name]: value,
            }
        );
    };

    const fields = [
    {
        name: "email",
        type: "email",
        value: credentials.email,
        onChange: handleInputChange,
        placeholder: "Email",
    },
    {
        name: "password",
        type: "password",
        value: credentials.password,
        onChange: handleInputChange,
        placeholder: "Password",
    },
    {
        name: "username",
        type: "username",
        value: credentials.username,
        onChange: handleInputChange,
        placeholder: "Username",
    },
    ];

    return (
        <AuthLayout>
            <AuthForm 
                title="Sign up"
                fields={fields}
                submitText="Sign up"
                onSubmit={handleSubmit}
                footer={
                    <>
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                        <br />
                        <p>-- Or -- </p>
                        <br />
                        <p>Forgot password? <Link to="/reset-password">Reset password</Link></p>
                    </>
                }
                />
        </AuthLayout>
    );
}