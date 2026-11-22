import { useState } from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const formValidation = () => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.name.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Name!"
            });
            return
        };

        if (formData.email.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Email!"
            });
            return
        } else if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Valid Email!"
            });
            return
        };

        if (formData.password.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a Password!"
            });
            return
        } else if (formData.password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password minimum required lenght is 6"
            });
            return
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

                <form className="auth-form">
                    <div className="form-group">
                        <label>Full name</label>
                        <input
                            type="text"
                            placeholder="Enter a name"
                            value={formData.name}
                            onChange={(e) => setFormData(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData(e.target.value)} />
                    </div>

                    <button className="primary-btn">Create account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;