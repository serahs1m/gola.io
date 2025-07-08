import { FunctionComponent, useState } from 'react';
import styles from './LogIn.module.css';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../data/firebase";

const LogIn: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome back to QBank!");
      navigate("/");
    } catch (error: any) {
      let message = "";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No user found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        default:
          message = "Login failed: " + error.message;
      }
      alert(message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google!");
      navigate("/");
    } catch (error: any) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className={styles.logIn}>
      <Link to="/" className={styles.logo}>QBank</Link>
      <div className={styles.logInInner}>
        
        <div className={styles.frameParent}>
          <div className={styles.welcomeBackWrapper}>
            <div className={styles.welcomeBack}>Welcome back!</div>
          </div>
          <div className={styles.enterYourCredentials}>Enter your Credentials to access your account</div>

          <div className={styles.frameContainer}>
            <div className={styles.nameWrapper}>
              <div className={styles.welcomeBack}>Email address</div>
            </div>
            <div className={styles.frameWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.inputBox}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.frameDiv}>
            <div className={styles.nameWrapper}>
              <div className={styles.welcomeBack}>Password</div>
            </div>
            <div className={styles.frameWrapper}>
              <input
                type="password"
                placeholder="Enter your password"
                className={styles.inputBox}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>


		  <div className={styles.instanceParent}>
            <div className={styles.frameWrapper2}>
              <div className={styles.frameWrapper3}>
                <div className={styles.frameItem} />
              </div>
            </div>
            <button className={styles.loginButton} onClick={handleLogin}>
              Sign In
            </button>
          </div>

          <div className={styles.instanceParent}>
            <button className={styles.loginButton} onClick={handleLogin}>Sign in</button>
          </div>

          <div className={styles.frameParent1}>
            <div className={styles.frameWrapper4} onClick={signInWithGoogle} style={{ cursor: 'pointer' }}>
              <div className={styles.icons8Google1Parent}>
                <img className={styles.icons8Google1} alt="" src="google_logo.svg" />
                <div className={styles.welcomeBack}>Sign in with Google</div>
              </div>
            </div>
            <div className={styles.frameWrapper5}>
              <div className={styles.icons8AppleLogo1Parent}>
                <img className={styles.icons8Google1} alt="" src="icons8-apple-logo 1.svg" />
                <div className={styles.welcomeBack}>Sign in with Apple</div>
              </div>
            </div>
          </div>

          <div className={styles.dontHaveAnAccountSignUpWrapper}>
            <div className={styles.dontHaveAnContainer}>
              <span className={styles.dontHaveAn}>Don’t have an account? </span>
              <Link to="/signup">
                <span className={styles.signUp}>Sign Up</span>
              </Link>
            </div>
          </div>

          <div className={styles.forgotPassword}>forgot password</div>
        </div>
      </div>
      <div className={styles.lineParent}>
        <div className={styles.frameInner} />
        <div className={styles.orWrapper}>
          <div className={styles.welcomeBack}>Or</div>
        </div>
      </div>
      <img className={styles.loginimg} alt="" src="login.png" />
    </div>
  );
};

export default LogIn;
