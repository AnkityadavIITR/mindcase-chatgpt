"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/utils/authstore";
import { Button } from "../ui/button";
import { EyeOffIcon, Eye } from "lucide-react";
import Link from "next/link";

const Form = ({type}) => {
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
  return (
    <div className="w-[350px] flex flex-col mt-10">
      <div className="p-5">
        <h1 className="text-[30px] font-bold flex justify-center">
          {type == "login" ? "Welcome back": "Create your account"}{" "}
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
      {type == "signup" ? (
        <h2 className="mt-5 mx-auto text-[13px]">
          Already have an account?{" "}<Link href="/auth/login" className="text-customGreen hover:underline text-[14px] font-medium">Login</Link>{" "}
        </h2>
      ) : (
        <h2 className="mt-5 mx-auto text-[13px]">
          Don't have an account?{" "} <Link href="/auth/signup" className="text-customGreen hover:underline text-[14px] font-medium">signup</Link>
        </h2>
      )}
    </div>
  );
};

export default Form;
