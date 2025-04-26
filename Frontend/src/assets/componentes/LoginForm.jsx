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
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await AuthService.login(values);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            {errors.general && <div className="text-red-600 mb-4">{errors.general}</div>}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
              <Field type="email" name="email" id="email" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
              <Field type="password" name="password" id="password" className="w-full border border-gray-300 p-2 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
