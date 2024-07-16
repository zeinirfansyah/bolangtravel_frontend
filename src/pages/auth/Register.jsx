import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const Register = () => {
  return (
    <>
      <div className="bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col mx-auto items-center justify-center min-h-screen max-w-[80vw] lg:max-w-[60vw] lg:relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
              }}
              className="border-2 w-full rounded-3xl bg-white my-12 lg:my-24  py-12"
            >
              <div className="mb-8 lg:my-7 space-y-1 px-8 lg:px-12 lg:py-0">
                <h1 className="text-2xl font-semibold">Welcome!</h1>
                <p className="text-sm text-slate-400">
                  Don't Miss Out! Register for Your Amazing Travel Package!
                </p>
              </div>
              <form action="" method="post">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2 h-full px-8 lg:px-12  lg:py-0">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="fullname" className="text-slate-400">
                          Fullname
                        </label>
                        <Input
                          type="fullname"
                          id="fullname"
                          name="fullname"
                          required={true}
                          placeholder="Enter your fullname"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="username" className="text-slate-400">
                          Username
                        </label>
                        <Input
                          type="username"
                          id="username"
                          name="username"
                          required={true}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-slate-400">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required={true}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 h-full px-8 lg:px-12  lg:py-0">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-slate-400">
                          Phone
                        </label>
                        <Input
                          type="phone"
                          id="phone"
                          name="phone"
                          required={true}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-slate-400">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required={true}
                          placeholder="Enter your email address"
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
                          required={true}
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 h-full px-8 lg:px-12 lg:py-0 space-y-4">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-secondary text-white"
                    >
                      Register
                    </Button>
                    <div className="flex justify-center w-full">
                      <Link
                        to="/register"
                        className="text-primary hover:text-secondary"
                      >
                        I already have an account
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
