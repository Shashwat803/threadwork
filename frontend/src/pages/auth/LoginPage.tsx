import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../api/APIEndpoints";

interface Login {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState<Login>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<string>("password");
  const [isEyeClosed, setIsEyeClosed] = useState<boolean>(false);

  useEffect(() => {
    if (isEyeClosed) {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  }, [isEyeClosed]);

  const handleOnChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate(loginFormData);
  };

  const { mutate, isError, error, isSuccess, isPending } = useMutation({
    mutationFn: loginUser,
  });

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLoginSubmit}
        className="min-h-[400px] min-w-96 flex space-y-10 pt-10 items-center flex-col bg-gradient-to-r from-green-400 to-blue-500 ..."
      >
        <h1 className="text-white text-4xl">ThreadWork</h1>
        {isError && <div className="text-red-500">{error.message}</div>}
        {isPending && <div className="text-yellow-500">Logging in...</div>}
        {isSuccess && <div className="text-green-500">Login Successful</div>}
        <div className="username">
          <input
            type="text"
            className="px-4 py-2 text-black focus:outline-none"
            placeholder="Enter your username"
            name="username"
            onChange={handleOnChange}
          />
        </div>
        <div className="password relative">
          <input
            type={showPassword}
            className="px-4 py-2 text-black focus:outline-none"
            placeholder="Enter your password"
            name="password"
            onChange={handleOnChange}
          />
          <FaEye
            color="black"
            onClick={() => setIsEyeClosed(!isEyeClosed)}
            className={`${
              !isEyeClosed ? "hidden" : "block"
            } cursor-pointer absolute top-[50%] right-[10px] transform -translate-y-[50%]`}
          />
          <FaEyeSlash
            color="black"
            onClick={() => setIsEyeClosed(!isEyeClosed)}
            className={`${
              isEyeClosed ? "hidden" : "block"
            } cursor-pointer absolute top-[50%] right-[10px] transform -translate-y-[50%]`}
          />
        </div>
        <button className="hover:bg-gray-600 bg-black py-2 px-6 font-bold text-center rounded-sm w-1/">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
