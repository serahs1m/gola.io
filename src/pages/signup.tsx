import { FunctionComponent, useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAdditionalUserInfo } from "firebase/auth";
import { auth, provider } from "../data/firebase";

const SignUp: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
	try {
	  await createUserWithEmailAndPassword(auth, email, password);
	  alert("You're All Set. Welcome to QBank!");
	} catch (error: any) {
	  let message = "";
  
	  switch (error.code) {
		case "auth/email-already-in-use":
		  message = "This email is already in use.";
		  break;
		case "auth/invalid-email":
		  message = "Please enter a valid email address.";
		  break;
		case "auth/weak-password":
		  message = "Password should be at least 6 characters.";
		  break;
		default:
		  message = "Signup failed: " + error.message;
	  }
  
	  alert(message);
	  console.error(error);
	}
  };
  

  const signInWithGoogle = async () => {
	try {
	  const result = await signInWithPopup(auth, provider);
  
	  // 추가 정보 추출 (명확한 타입 처리)
	  const additionalInfo = getAdditionalUserInfo(result);
	  const isNewUser = additionalInfo?.isNewUser;
  
	  if (isNewUser) {
		alert("You're All Set. Welcome to QBank!");
	  } else {
		alert("This Google account is already registered. Logging you in.");
	  }
  
	} catch (error: any) {
	  alert("Google signup failed: " + error.message);
	  console.error(error);
	}
  };

  return (
    <div className={styles.signUp}>
      <Link to="/" className={styles.logo}>
        QBank
      </Link>
      <div className={styles.signUpInner}>
        <div className={styles.frameParent}>
          <div className={styles.getStartedNowWrapper}>
            <div className={styles.getStartedNow}>Get Started Now</div>
          </div>

          <div className={styles.frameGroup}>
            <div className={styles.nameWrapper}>
              <div className={styles.getStartedNow}>Name</div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.enterYourNameWrapper}>
                <input
                  type="text"
                  className={styles.inputBox}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.frameContainer}>
            <div className={styles.nameWrapper}>
              <div className={styles.getStartedNow}>Email address</div>
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.enterYourNameWrapper}>
                <input
                  type="email"
                  className={styles.inputBox}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.frameParent1}>
            <div className={styles.nameWrapper}>
              <div className={styles.getStartedNow}>Password</div>
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.enterYourNameWrapper}>
                <input
                  type="password"
                  className={styles.inputBox}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.lineParent}>
            <div className={styles.frameChild} />
            <div className={styles.orWrapper}>
              <div className={styles.getStartedNow}>Or</div>
            </div>
          </div>

          <div className={styles.iAgreeToTheTermsPolicyParent}>
            <div className={styles.iAgreeToContainer}>
              I agree to the{" "}
              <span className={styles.termsPolicy}>terms & policy</span>
            </div>
            <div className={styles.groupChild} />
          </div>

          <div className={styles.groupWrapper}>
            <div className={styles.haveAnAccountSignInWrapper}>
              <div className={styles.haveAnAccountContainer}>
                <span className={styles.haveAnAccount}>Have an account? </span>
                <Link to="/login">
                  <span className={styles.signIn}>Sign In</span>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.instanceParent}>
            <div className={styles.frameWrapper2}>
              <div className={styles.frameWrapper3}>
                <div className={styles.frameItem} />
              </div>
            </div>
            <button className={styles.loginButton} onClick={handleSignup}>
              Sign up
            </button>
          </div>

          <div
            className={styles.frameWrapper4}
            onClick={signInWithGoogle}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.icons8Google1Parent}>
              <img
                className={styles.icons8Google1}
                alt="Google Logo"
                src="google_logo.svg"
              />
              <div className={styles.getStartedNow}>Sign in with Google</div>
            </div>
          </div>

          <div className={styles.frameWrapper5}>
            <div className={styles.icons8AppleLogo1Parent}>
              <img
                className={styles.icons8Google1}
                alt=""
                src="google_logo.svg"
              />
              <div className={styles.getStartedNow}>Sign in with Apple</div>
            </div>
          </div>
        </div>
      </div>
      <img
        className={styles.loginimg}
        alt=""
        src="login.png"
      />
    </div>
  );
};

export default SignUp;
