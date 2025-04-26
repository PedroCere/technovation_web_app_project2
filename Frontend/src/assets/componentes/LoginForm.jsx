import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../utils/AuthService";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await AuthService.login(values);
      localStorage.setItem("token", response.token);
      navigate("/entry-selector");
    } catch (error) {
      console.error("Login failed", error);
      setErrors({ general: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] px-6">
      <div className="bg-[#1E1E1E] p-8 rounded-2xl shadow-2xl border border-emerald-400/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-emerald-400 mb-8 text-center">Welcome Back</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {errors.general && (
                <div className="text-rose-400 text-center font-medium">{errors.general}</div>
              )}

              <div>
                <label htmlFor="email" className="block mb-1 text-sm text-gray-300">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded-md p-3 bg-[#2D2D2D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-gray-600"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-rose-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm text-gray-300">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full rounded-md p-3 bg-[#2D2D2D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-gray-600"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-rose-400 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-400 to-green-400 text-[#0A0F0A] font-semibold py-3 rounded-md hover:opacity-90 transition-all"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
