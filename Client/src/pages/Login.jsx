import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ResumifyeContext } from "../ResumifyeContext";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";

const Login = () => {
  const { user, setUser } = useContext(ResumifyeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) return;
    navigate("/home");
  }, [user]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = (values) => {
    fetch("https://devai-ius1.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
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

  const addLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter your email."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(6, "Password must have at least 6 characters.")
      .max(20, "Password has reached the character limit."),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleLogin(values);
      }}
      validationSchema={addLoginSchema}
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
        <div className="bg-gray-900">
          <div className="flex justify-center h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/3"
              style={{
                backgroundImage: `url(${login})`,
              }}
            ></div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <div className="flex-1">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                    Login
                  </h2>

                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    Sign in to access your account
                  </p>
                </div>

                <div className="mt-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-600 font-medium">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <div className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline cursor-pointer">
                        Forgot password?
                      </div>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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

                  <div className="mt-6">
                    <button
                      type="button"
                      className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                        !isValid &&
                        "text-gray-900 dark:text-gray-300 bg-gray-800 dark:bg-gray-800 cursor-not-allowed hover:bg-gray-800 hover:dark:bg-gray-800"
                      }`}
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      Sign in
                    </button>
                  </div>

                  <p className="mt-6 text-sm text-center text-gray-400">
                    Don't have an account yet?{" "}
                    <Link
                      to="/registration"
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      Sign up
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
