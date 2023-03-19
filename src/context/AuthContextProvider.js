import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

// export const {Provider} = createContext()
export const AuthContext = createContext();
//* with custom hook
// export const useAuthContext = () => {
//     return useContext(AuthContext);
//   };

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName, photoURL) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL || "https://i.ibb.co/GTgY47j/avatar.png",
      });
      navigate("/");
      toastSuccessNotify("Registered successfully!");
      return user;
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap
  const signIn = async (email, password) => {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
      return user;
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toastSuccessNotify("Logged out successfully!");
      navigate("/login");
      return true;
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.clear();
        // console.log("logged out");
      }
    });
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastWarnNotify("Please check your mail box!");
        // alert("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
        // alert(err.message);
        // ..
      });
  };
  const profileChange = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
      toastSuccessNotify("Profile saved!");
      return true;
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const values = {
    createUser,
    signIn,
    logOut,
    signUpProvider,
    forgotPassword,
    currentUser,
    setCurrentUser,
    profileChange,
    
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider
