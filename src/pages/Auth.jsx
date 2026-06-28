import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "../pages/Auth.css";

export default function Auth() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const mode = searchParams.get("mode") === "signup" ? "signup" : "login";

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { signUp, login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const result =
            mode === "signup"
                ? await signUp(data.email, data.password)
                : await login(data.email, data.password);

        setIsLoading(false);

        if (!result.success) {
            setError(result.error);
            return;
        }

        setSuccess(result.message);

        setTimeout(() => {
            navigate("/");
        }, 800);
    }

    return (
        <div className="page auth-page">
            <div className="container">
                <div className="auth-container">
                    <div className="auth-header">
                        <p className="auth-badge">InTech Account</p>
                        <h1 className="page-title">
                            {mode === "signup" ? "Create an account" : "Welcome Back"}
                        </h1>
                        <p className="auth-subtitle">
                            {mode === "signup"
                                ? "Join InTech and start building your premium tech setup."
                                : "Login to continue shopping premium tech products."}
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                className={errors.email ? "form-input input-error" : "form-input"}
                                id="email"
                                placeholder="you@example.com"
                                disabled={isLoading}
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address.",
                                    },
                                })}
                            />
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                className={
                                    errors.password ? "form-input input-error" : "form-input"
                                }
                                id="password"
                                placeholder="Enter your password"
                                disabled={isLoading}
                                {...register("password", {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters.",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password must be less than 12 characters.",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="form-error">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? mode === "signup"
                                    ? "Creating account..."
                                    : "Logging in..."
                                : mode === "signup"
                                  ? "Sign Up"
                                  : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                                Already have an account?{" "}
                                <Link
                                    to="/auth?mode=login"
                                    onClick={(e) => {
                                        if (isLoading) e.preventDefault();
                                    }}
                                    className="auth-link"
                                >
                                    Login
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to="/auth?mode=signup"
                                    onClick={(e) => {
                                        if (isLoading) e.preventDefault();
                                    }}
                                    className="auth-link"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
