import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../supabase";


function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loader, setLoader] = useState(false);

    const formValidation = (event) => {

        event.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (formData.email.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter your email address."
            });
            return false;
        } else if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email address."
            });
            return false;
        };

        if (formData.password.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "	Please enter your password."
            });
            return false;
        } else if (formData.password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 6 characters long."
            });
            return false;
        }

        return true;
    }

    const checkData = async (event) => {

        const isValid = formValidation(event);

        if (!isValid) {
            return;
        }

        try {

            setLoader(true);

            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message
                });
            } else {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'You have successfully signed in.',
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#28a745',
                    timer: 2000,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    }
                });

                window.location.href = "/todo";
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
            });

        } finally {
            setLoader(false);
        };
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="brand">
                    <div className="brand-icon">✓</div>
                    <span>Taskly</span>
                </div>

                <div className="auth-heading">
                    <h1>Welcome back</h1>
                    <p>Sign in to continue managing your tasks.</p>
                </div>

                <form className="auth-form" onSubmit={checkData}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <button className="primary-btn">{loader ? "Signing in..." : "Sign in"}</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/">Create account</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;