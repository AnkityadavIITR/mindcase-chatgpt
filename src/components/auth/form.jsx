"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/utils/authstore";
import { Button } from "../ui/button";
import { EyeOffIcon, Eye } from "lucide-react";
import Link from "next/link";

const Form = ({ type }) => {
  const signInWithGoogle = useAuthStore((state) => state.signInwithGoogle);
  const signUpWithEmailAndPassword = useAuthStore(
    (state) => state.signUpWithEmailAndPassword
  );
  const signInWithEmailAndPassword = useAuthStore(
    (state) => state.signInWithEmailAndPassword
  );
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: async () => {
      if (type == "login") {
        try {
        } catch (e) {}
      } else {
      }
    },
  });

  const handleSocialClick=async()=>{
    await signInWithGoogle();
  }
  return (
    <div className="w-[350px] flex flex-col mt-10">
      <div className="p-5">
        <h1 className="text-[30px] font-bold flex justify-center">
          {type == "login" ? "Welcome back" : "Create your account"}{" "}
        </h1>
      </div>
      <div className="flex justify-center  flex-col gap-y-5 w-[300px] mx-auto">
        <div className="relative">
          <input
            type="email"
            className="peer block  w-[300px]  border-2 focus:border-customGreen  rounded-md bg-transparent px-4 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.values.email == null || formik.values.email == "" ? (
            <label
              className="pointer-events-none bg-white absolute top-1 left-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-customGreen transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
              for="exampleInput90"
            >
              Email address
            </label>
          ) : (
            <label
              className="pointer-events-none absolute top-0 left-3 mb-0 text-cus max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
              for="exampleInput90"
            >
              Email address
            </label>
          )}
        </div>

        {showPasswordInput && (
          <div className="relative flex">
            <input
              type={showPassword ? "text" : "password"}
              className="peer block  w-[300px]  border-2 focus:border-customGreen  rounded-md  bg-transparent px-4 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button
              className="absolute right-1 bg-white text-black top-1 hover:bg-[#CFCFCF] my-auto rounded-none"
              onClick={() => {
                setShowPassword((val) => !val);
              }}
            >
              {!showPassword ? (
                <Eye strokeWidth={1.25} size={20} />
              ) : (
                <EyeOffIcon strokeWidth={1.25} size={20} />
              )}
            </Button>

            {formik.values.password == null || formik.values.password == "" ? (
              <label
                className="pointer-events-none bg-white absolute top-1 left-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  text-customGreen transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                for="exampleInput90"
              >
                Password
              </label>
            ) : (
              <label
                className="pointer-events-none absolute bg-white top-0 left-3 mb-0 text-cus max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-customGreen  transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
                for="exampleInput90"
              >
                Password
              </label>
            )}
          </div>
        )}

        <Button
          className="bg-customGreen rounded-md text-[16px] py-3 h-auto hover:bg-customGreen hover:opacity-70"
          onClick={() => {
            if (formik.values.password == "" && formik.values.email != "") {
              setShowPasswordInput(true);
            } else {
            }
          }}
        >
          {formik.values.password == "" ? "Continue" : "Submit"}
        </Button>
      </div>
      <div className="flex flex-col gap-y-10">
        {type == "signup" ? (
          <h2 className="mt-5 flex justify-center text-[13px]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-customGreen hover:underline text-[14px] font-medium"
            >
              Login
            </Link>{" "}
          </h2>
        ) : (
          <h2 className="mt-5  flex justify-center text-[13px]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-customGreen hover:underline text-[14px] font-medium"
            >
              signup
            </Link>
          </h2>
        )}

        <div className="flex  justify-center gap-x-1">
          <hr className="h-px my-3 bg-slate-400 border-0 dark:bg-gray-700 w-2/5" />
          <p>OR</p>
          <hr className="h-px my-3 bg-slate-400 border-0 dark:bg-gray-700 w-2/5" />
        </div>
        <Button
          variant="outline"
          className="flex w-[300px] bg-none mx-auto border-slate-500 gap-5 justify-start px-4 py-3"
          onClick={handleSocialClick}
        >
          <div>
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
          </div>
          <p>continue with google</p>
        </Button>
      </div>
    </div>
  );
};

export default Form;
