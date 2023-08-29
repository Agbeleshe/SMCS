import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const Index = () => {
  const [flip, setFlip] = useState(false);

  const handleSign = (e) => {
    e.preventDefault();
    setFlip(!flip);
    console.log(flip);
  };

  return (
    <div className="mb-20">
      <div className="pt-28 md:w-[80%] md:m-auto w-[90%] m-auto hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left items-center">
            <h1 className="md:text-5xl text-3xl font-bold text-center">
              Login now!
            </h1>
            <p className="py-6 text-center">
              <span className="font-semibold text-xl">S</span>tudent{" "}
              <span className="font-semibold text-xl">C</span>ounselling{" "}
              <span className="font-semibold text-xl">M</span>anagment{" "}
              <span className="font-semibold text-xl">S</span>ystem. <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              at sed earum necessitatibus omnis expedita aperiam quo corporis
              velit iusto.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {flip ? <SignUp flip={flip} setFlip={setFlip} /> : <Login />}
              {/* or */}
              <div className="divider">OR</div>
              <div className="w-full text-center">
                <a onClick={handleSign} href="">
                  {flip ? (
                    <p>
                      <span className="text-black">
                        Already have an account?
                      </span>
                      <em className="text-red-500 underline mx-1">Login</em>
                    </p>
                  ) : (
                    <p>
                      <span className="text-black">Don't have an account?</span>

                      <em className="text-red-500 underline mx-1">Sign up</em>
                    </p>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
