import { Link } from "react-router-dom";

function Signup() {
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
                        <input type="text" placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" placeholder="you@example.com" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" />
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