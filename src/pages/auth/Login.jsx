import img_pagoda from "../../assets/images/pagoda.jpg";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const Login = () => {
  return (
    <>
      <div className="bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col mx-auto items-center justify-center min-h-screen max-w-[80vw] lg:max-w-[60vw] mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
              }}
              className="flex flex-col lg:flex-row justify-center items-center border-2 w-full rounded-3xl bg-white"
            >
              <div className="w-full lg:w-1/2 h-full">
                <motion.img
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 70,
                      restDelta: 0.001,
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  src={img_pagoda}
                  alt="pagoda"
                  className="w-full max-h-[160px] lg:max-h-[70vh] object-cover rounded-t-3xl lg:rounded-3xl"
                />
              </div>
              <div className="w-full lg:w-1/2 h-full px-8 lg:px-12 py-12 lg:py-0">
                <form action="" method="post" className="space-y-4">
                  <div className="mb-8 lg:my-7 space-y-1">
                    <h1 className="text-2xl font-semibold">Welcome Back!</h1>
                    <p className="text-sm text-slate-400">
                      Don't Miss Out! Login for Your Amazing Travel Package!{" "}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-slate-400">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-slate-400">
                      Password
                    </label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-center items-center py-4">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-secondary text-white"
                    >
                      Login
                    </Button>
                    <div className="flex justify-between w-full my-4">
                      <Link
                        to="/register"
                        className="text-primary hover:text-secondary"
                      >
                        I don't have an account
                      </Link>
                      <Link
                        to="/register"
                        className="text-slate-400 hover:text-primary"
                      >
                        I forgot my password
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
