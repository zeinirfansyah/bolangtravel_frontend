import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { axiosInstance } from "../../hooks/useApi";
import Toast from "../../components/ui/Toast";
import { useAuthStore } from "../../stores/authStore";

export const Register = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, token } = useAuthStore((state) => state);

  if (token) {
    return <Navigate to={user?.role === "admin" ? "/admin" : "/"} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register", {
        fullname: fullname,
        username: username,
        phone: phone,
        address: address,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        alert("Registration successful. Please login.");
        navigate("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      navigate("/register/#error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex flex-col mx-auto items-center justify-center min-h-screen max-w-[80vw] lg:max-w-[60vw]">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
              }}
              className="border-2 w-full rounded-3xl bg-white my-12 lg:my-24 lg:relative py-8 lg:py-0 -top-12"
            >
              <div id="error" >
                {error && <Toast text={error} backgroundColor="bg-red-200" />}
              </div>
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
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="address" className="text-slate-400">
                          Address
                        </label>
                        <Input
                          type="address"
                          id="address"
                          name="address"
                          required={true}
                          placeholder="Enter your address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 h-full px-8 lg:px-12 lg:py-0 space-y-4">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
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
