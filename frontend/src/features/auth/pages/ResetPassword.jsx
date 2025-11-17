import { useState, useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthContext"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/layout/AuthForm/AuthForm";
import { AuthLayout } from "../components/layout/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        code: "",
        newPassword: ""
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState({})

    
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (isValidEmail(credentials.email)) {
            setStep(2);
            sendResetPasswordCode(credentials.email);
        } else {
            setError({ message: "Please enter a valid email address" });
        }
    };

    const sendResetPasswordCode = async (email) => {
        try {
            const response = await fetch("http://localhost:8080/auth/send-reset-password-code",
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
            const response = await fetch("http://localhost:8080/auth/reset-password",
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

    const fields1 = [
    {
        name: "email",
        type: "email",
        value: credentials.email,
        onChange: handleInputChange,
        placeholder: "Email",
    },
    ];

    const fields2 = [
    {
        name: "code",
        type: "code",
        value: credentials.code,
        onChange: handleInputChange,
        placeholder: "Verification Code",
    },
    {
        name: "newPassword",
        type: "password",
        value: credentials.newPassword,
        onChange: handleInputChange,
        placeholder: "New password",
    },
    ];

    return (
        <AuthLayout>
            {step === 1 ?
                <AuthForm 
                title="Reset password"
                fields={fields1}
                submitText="Next"
                onSubmit={handleEmailSubmit}
                footer={
                    <>
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </>
                }
                />
            :
                <AuthForm 
                title="Reset password"
                fields={fields2}
                submitText="Reset password"
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
            }
            
        </AuthLayout>
    );
}