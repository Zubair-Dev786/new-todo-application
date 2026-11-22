import { useState } from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { supabase } from "../supabase";


function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const formValidation = (event) => {

        event.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (formData.name.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Name!"
            });
            return false;
        };

        if (formData.email.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Email!"
            });
            return false;
        } else if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Valid Email!"
            });
            return false;
        };

        if (formData.password.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Password!"
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


    const addData = async (event) => {

        const isValid = formValidation(event);

        if (!isValid) {
            return;
        }


        try {
            const { error } = await supabase.auth.signUp({
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your data has been saved successfully.',
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#28a745',
                    timer: 3000,
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
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="brand">
                    <div className="brand-icon">✓</div>
                    <span>Taskly</span>
                </div>

                <div className="auth-heading">
                    <h1>Create your account</h1>
                    <p>Start organizing your day, one task at a time.</p>
                </div>

                <form className="auth-form" onSubmit={addData}>
                    <div className="form-group">
                        <label>Full name</label>
                        <input
                            type="text"
                            placeholder="Enter a name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>

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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <button type="submit" className="primary-btn">Create account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;