import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DevAIContext } from "../DevAIContext";
import { useNavigate } from "react-router-dom";
import register from "../assets/register.jpg";

const Registration = () => {
  const { user, setUser } = useContext(DevAIContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) return;
    navigate("/home");
  }, [user]);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegistration = (values) => {
    fetch("https://devai-ius1.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        if (!userData._id) {
          alert(userData.message);
          return;
        }
        setUser(userData);
        navigate("/home");
      });
  };

  const addRegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter your first name.")
      .min(2, "First name must have at least 2 characters.")
      .max(20, "First name has reached the character limit."),

    lastName: Yup.string()
      .required("Please enter your last name.")
      .min(2, "Last name must have at least 2 characters.")
      .max(20, "Last name has reached the character limit."),
    phone: Yup.string()
      .required("Please enter your phone number.")
      .matches(/^[0-9]+$/, "Please enter valid number.")
      .min(10, "Phone number must have at least 10 characters.")
      .max(15, "Phone number has reached the character limit."),
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter your email."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(6, "Password must have at least 6 characters.")
      .max(20, "Password has reached the character limit."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf([Yup.ref("password"), null], "Password didn’t match."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleRegistration(values);
      }}
      validationSchema={addRegistrationSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div>
          <section className="bg-gray-900">
            <div className="flex justify-center min-h-screen">
              <div
                className="hidden bg-cover lg:block lg:w-2/5"
                style={{
                  backgroundImage: `url(${register})`,
                }}
              ></div>

              <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div className="w-full">
                  <h1 className="text-2xl font-semibold tracking-wider capitalize text-white">
                    Get your free account now.
                  </h1>

                  <p className="mt-4 text-gray-400">
                    Let’s get you all set up so you can verify your personal
                    account and begin setting up your profile.
                  </p>

                  <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Ruman"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                        value={values.firstName}
                      />
                      {errors.firstName && touched.firstName ? (
                        <p className="text-red-600 font-medium">
                          {errors.firstName}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Das"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                        value={values.lastName}
                      />
                      {errors.lastName && touched.lastName ? (
                        <p className="text-red-600 font-medium">
                          {errors.lastName}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="8250449610"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                      />
                      {errors.phone && touched.phone ? (
                        <p className="text-red-600 font-medium">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="rumandas25@gmail.com"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <p className="text-red-600 font-medium">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <p className="text-red-600 font-medium">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm text-gray-200"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <p className="text-red-600 font-medium">
                          {errors.confirmPassword}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-10 py-3">
                      <p className="text-md text-gray-400">
                        Already have an account?{" "}
                        <Link
                          className="text-blue-500 focus:outline-none focus:underline hover:underline"
                          to="/"
                        >
                          Log in
                        </Link>
                        .
                      </p>
                    </div>

                    <div className="mt-10 flex justify-end">
                      <button
                        type="button"
                        className={`flex items-center justify-between w-1/2 px-6 py-3 text-sm tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                          !isValid &&
                          "text-gray-300 bg-gray-800 cursor-not-allowed hover:bg-gray-800"
                        }`}
                        onClick={handleSubmit}
                        disabled={!isValid}
                      >
                        <span>Sign up</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 rtl:-scale-x-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Formik>
  );
};

export default Registration;
