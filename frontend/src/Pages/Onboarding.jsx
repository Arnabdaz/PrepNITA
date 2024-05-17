import { Alert, Button, Label, Spinner, TextInput, Select } from "flowbite-react";
// import Select from 'flow-bite-react-select-library';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OAuth from "../Components/OAuth";
import { useMutation } from "@apollo/client";
import { ONBOARD_USER, REGISTER_USER } from "../gqlOperatons/mutations";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setLoading } from "../app/user/userSlice";
import { VerifyToken } from "../utils/verifyToken";
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import { CircularProgressbar } from 'react-circular-progressbar';
import toast from "react-hot-toast";
import TakeUserDetails from "../Components/TakeUserDetails";

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [imageFileUploadProgress, setImageFIleUploadProgress] = useState(0);

  const { loggedIn, isLoading, profile_pic, username } = useSelector((state) => state.user);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await VerifyToken(dispatch);
        if (response.verified) {
          dispatch(setLoading(false));
          navigate('/');
        }

      } catch (error) {
        console.log("Error in Auth try catch:", error.message);
        dispatch(setLoading(false));
      }
    };

    checkToken();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [onBoardUser] = useMutation(ONBOARD_USER, {
    onError: (mutationError) => {
      console.log("Error in onBoardUser mutation:", mutationError.message);
      dispatch(setLoading(false));
      toast.error("Error in Onboarding User ! Try again");
      // return setError(mutationError.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    console.log("formData at Onboarding User :", formData);
    const { name, username, mobileNum, gender, collegeId, graduationYear, cgpa, college,
      department, course, state, hosteler } = formData;

    const leetcodeProfile = formData.leetcodeProfile || ""; const codeforcesProfile = formData.codeforcesProfile || ""; const linkedinProfile = formData.linkedinProfile || ""; const githubProfile = formData.githubProfile || "";

    onBoardUser({
      variables: {
        user: {
          name, username, mobileNum, gender, collegeId, graduationYear: parseInt(graduationYear, 10), cgpa: parseFloat(cgpa), college,
          department, course, state, hosteler: hosteler === 'true', leetcodeProfile, codeforcesProfile, linkedinProfile, githubProfile
        }
      }
    })
      .then((user) => {
        console.log("onBoard user form backend :", user);
        // Handle success or navigation here
        if (!user || !user.data) {
          console.log("Error in onBoardUser user:", user.errors.message || "Internal Server Error");
          dispatch(setLoading(false));
          // return toast.error("Failed to Onboard User ! Try again ");
          // return setError(user.errors.message || "Internal Server Error");
        }
        else {

          dispatch(setLoading(false));
          return navigate("/");
        }
      })
      .catch((catchError) => {
        console.log("Error in signUpUser catch block:", catchError);
        dispatch(setLoading(false));
        return toast.error("Erron in Onboarding User ! Try again");
        // return setError(catchError);
      });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

  };

  if (isLoading) return <Loader />;
  if (!isLoading && (!loggedIn || (!username))) {
    return navigate('/');
  }
  // const { handleChange, handleSubmit, loggedIn, imageFileUploadProgress, isLoading,Button_Text } = props;
  return (
    <TakeUserDetails
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loggedIn={loggedIn}
      imageFileUploadProgress={imageFileUploadProgress}
      isLoading={isLoading}
      profile_pic={profile_pic}
      Button_Text="Submit"
      formData={formData}
      setFormData={setFormData}
    />
  )

};

export default Onboarding;
