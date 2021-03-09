import { useState } from "react";
import { login } from "./login";

const App = () => {
    const [showForm, setShowForm] = useState(1);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    const switchForm = (e) => {
        e.preventDefault();
        setShowForm(parseInt(e.target.href.split("-")[1], 10));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.length) {
            setError("Please provide a username");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        }

        if (!password.length) {
            setError("Please provide a password");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        }

        try {
            let success = await login({ username, password });
            setIsLogged(success);
            setShowForm(0);
        } catch (error) {
            setError("Invalid username or password");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        }
    };

    const handleFirstPassword = (e) => {
        e.preventDefault();

        const errors = [
            e.target.value.length < 8,
            e.target.value.match(/[0-9]/g) === null,
            e.target.value.match(/[a-z]/g) === null,
            e.target.value.match(/[A-Z]/g) === null,
            e.target.value.match(/[@!#$%^&*(),./?+-]+/g) === null,
        ];

        const errorMessages = [
            "at least 8 characters",
            "digits",
            "blowercase characters",
            "uppercase characters",
            "special symbols",
        ];

        if (errors.filter((e) => !!e).length !== 0) {
            setError(
                "Password needs to contain " +
                    errorMessages.filter((_, idx) => errors[idx]).join(", ")
            );
        } else {
            setError("");
        }

        setPassword(e.target.value);
    };

    const handleSecondPassword = (e) => {
        e.preventDefault();

        if (e.target.value !== password) {
            setError("Passwords do not match");
        } else {
            setError("");
        }

        setPasswordVerif(e.target.value);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username.length) {
            setError("Please provide a username");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        } else if (!password.length) {
            if (e.target.value) setError("Please provide a password");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        } else if (!passwordVerif.length) {
            setError("Please retype your password");
            setUsername("");
            setPassword("");
            setPasswordVerif("");
        } else {
            setError("");
            setIsLogged(true);
        }
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        setError("");
        setUsername("");
        setPassword("");
        setPasswordVerif("");
        setIsLogged(false);
        setShowForm(1);
    };

    return (
        <>
            {error.length ? <p className="error">{error}</p> : null}
            {showForm === 1 ? (
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        <span>Username:</span>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <span>Password:</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button>Submit</button>
                    <p>
                        Don't have an account?{" "}
                        <a href="#form-2" onClick={switchForm}>
                            Register here
                        </a>
                    </p>
                </form>
            ) : showForm === 2 ? (
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">
                        <span>Username:</span>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <span>Password:</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleFirstPassword}
                        />
                    </label>
                    <label htmlFor="password-verif">
                        <span>Retype password:</span>
                        <input
                            type="password"
                            name="password-verif"
                            id="password-verif"
                            value={passwordVerif}
                            onChange={handleSecondPassword}
                        />
                    </label>
                    <button>Submit</button>
                    <p>
                        Already have an account?{" "}
                        <a href="#form-1" onClick={switchForm}>
                            Login here
                        </a>
                    </p>
                </form>
            ) : null}
            {isLogged ? (
                <>
                    <h1>Hello, {username}</h1>
                    <p>
                        <a href="/" onClick={handleLogOut}>
                            Log out
                        </a>
                    </p>
                </>
            ) : null}
        </>
    );
};

export default App;
