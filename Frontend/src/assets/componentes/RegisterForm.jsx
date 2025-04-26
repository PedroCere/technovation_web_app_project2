import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../utils/AuthService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { username, email, password } = values;
      await AuthService.register({ username, email, password });
      navigate("/login");
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            {errors.general && <div className="text-red-600 mb-4">{errors.general}</div>}
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1 font-semibold">Username</label>
              <Field type="text" name="username" id="username" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
              <Field type="email" name="email" id="email" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
              <Field type="password" name="password" id="password" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Confirm Password</label>
              <Field type="password" name="confirmPassword" id="confirmPassword" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
