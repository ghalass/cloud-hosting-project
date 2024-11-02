import React from "react";
import { Noto_Kufi_Arabic } from "next/font/google";

const kufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "500"],
});

const RegisterPage = () => {
  return (
    <div className={kufiArabic.className}>
      <h1>Register Page</h1>
      <h1>أهلاً وسهلاً</h1>
    </div>
  );
};

export default RegisterPage;
