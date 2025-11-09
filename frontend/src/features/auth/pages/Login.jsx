import { useState, useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthContext"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/AuthForm";

export const Login = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({})

    useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(credentials),
                }
            );

            if(response.ok){
                const data = await response.json();
                login(data.token);
                navigate("/dashboard");
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
        label: "Email",
        name: "email",
        type: "email",
        value: credentials.email,
        onChange: handleInputChange,
        placeholder: "Wpisz swój email",
    },
    {
        label: "Hasło",
        name: "password",
        type: "password",
        value: credentials.password,
        onChange: handleInputChange,
        placeholder: "Wpisz hasło",
    },
    ];

    return (
        <AuthForm 
        title="Zaloguj się"
        fields={fields}
        submitText="Zaloguj"
        onSubmit={handleSubmit}
        footer={
            <>
                <p>Zapomniales hasal?</p>
                <br />
                <p>Zarejestruj sie</p>
            </>
        }
        />
    );
}