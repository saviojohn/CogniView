import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LANGUAGES, LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    // when we do a onChange it will trigger an event and capture it here
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    // It will be called once when my components load
    // But my header can be loaded in multiple sections
    // So it will keep attaching event listener in my browser
    // when my components is there it is perfectly fine to use it
    // but when components unmount then it should unsubscribe to it its action
    // When ever the user do anything related to auth onAuthStateChanged will keep track of it
    // When the components unmount
    // Then we have to return a function from this component
    // Firebase returns a cleanup function
    // unsubscribe is not special — it's just a variable name.

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser()); // not passing anything as it doesnt need an action
        navigate("/");
      }
    });

    return () => unsubscribe(); // when my header components unmounts it will unsubscribe onAuthStateChanged
  }, []); // each time component is render it is checking for auth

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      {" "}
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />{" "}
      {user && (
        <div className="flex p-3 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
          >
            {" "}
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img className="hidden md:block w-12 h-12" src={user?.photoURL} alt="userIcon" />{" "}
          <button onClick={handleClick} className="font-bold text-white">
            {" "}
            Sign Out{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
