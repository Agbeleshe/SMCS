import React, { useState, useEffect } from "react";

const MoreInfo = ({userInfo}) => {
  const [textarea, setTextarea] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const warningTimeout = setTimeout(() => {
      setWarning(false);
    }, 3000);

    return () => {
      clearTimeout(warningTimeout);
    };
  }, [warning]);

  const handleChange = (e) => {
    setTextarea(e.target.value);
  };

  const handleDailogueSubmit = (e) => {
    e.preventDefault();

    if (textarea.length < 20) {
      setWarning(true);
      return;
    }

    console.log("Submitting:", textarea);
    setTextarea("");
  };
  if(!userInfo){
    return <div>Loading...</div>
  }

  return (
    <div className="mt-5 w-[80%] m-auto">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <button
          onClick={() => window.my_modal_3.showModal()}
          className="btn btn-wid w-full text-xs md:text-sm bg-neutral hover:bg-slate-700 text-white"
        >
          Click here to Book A Counselling Session
        </button>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg">Hello! {userInfo.firstName}</h3>
            <p className="py-4 text-md md:text-lg">
              You are about to book a counselling session
              <em className="hidden md:block">
                Press ESC key or click on '✕' button to close when you are done
              </em>
            </p>
            <div className="transition-opacity duration-500 ease-in-out">
              {warning ? (
                <div className="alert alert-warning w-ful ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="">Textarea must have at least 20 characters</span>
                </div>
              ) : (
                <h1 className="text-center md:text-xl font-semibold">
                  Fill the form below
                </h1>
              )}
            </div>

            <div>
              <label htmlFor="">
                <span>State your problem</span>
              </label>
              <textarea
                value={textarea}
                onChange={handleChange}
                rows={4}
                cols={50}
                maxLength={1000}
                placeholder="Why do you need to book a counselling session..."
                className="p-3 w-full border-2 border-gray-300 rounded-md outline-none mt-2"
              />
            </div>
            <button
              onClick={handleDailogueSubmit}
              type="submit"
              className="btn hover:bg-slate-900 bg-black text-white w-full mt-2"
            >
              Submit
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MoreInfo;
