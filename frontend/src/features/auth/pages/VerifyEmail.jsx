import { useState, useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthContext"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/layout/AuthForm/AuthForm";
import { AuthLayout } from "../components/layout/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: sessionStorage.getItem("email"),
        code: ""
    });
    const [error, setError] = useState({})

    const sendResetPasswordCode = async (email) => {
        try {
            const response = await fetch("http://localhost:8080/auth/resend-email-verification-code",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email}),
                }
            );

            if(response.ok){
                const data = await response.json();
            } else{
                const errorData = await response.json();
                setError(errorData);
                const messages = Object.values(errorData.errors).join("\n");
                alert(messages);
            }
        } catch (error){
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/validate-email",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(credentials),
                }
            );

            if(response.ok){
                const data = await response.json();
                navigate("/login");
            } else{
                const errorData = await response.json();
                setError(errorData);
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
        name: "code",
        type: "text",
        value: credentials.code,
        onChange: handleInputChange,
        placeholder: "Verification Code",
    },
    ];

    return (
        <AuthLayout>
            <AuthForm 
                title="Verify your Email"
                fields={fields}
                submitText="Validate email"
                onSubmit={handleSubmit}
                footer={
                    <>
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                        <br />
                        <p>-- Or -- </p>
                        <br />
                        <p>Didn't receive the email? <span style={{
                                cursor: "pointer",
                            }}
                                onMouseEnter={(e) => (e.target.style.color = "yellow")}
                                onMouseLeave={(e) => (e.target.style.color = "white")}
                                onClick={() => sendResetPasswordCode(credentials.email)}>
                                Resend email</span>
                        </p>
                    </>
                }
                />
        </AuthLayout>
    );
}