import { Link } from "react-router-dom";

function Login() {
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

                <form className="auth-form">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" placeholder="you@example.com" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>

                    <button className="primary-btn">Sign in</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/">Create account</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;