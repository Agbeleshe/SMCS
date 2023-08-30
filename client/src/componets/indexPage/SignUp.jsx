import React, { useEffect, useState } from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import axios from "axios";
// import { useSignupContext } from "../../context/SignupProvider"; // Import the context hook

const SignUp = ({ flip, setFlip }) => {
  // const { updateSignupInfo } = useSignupContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [ambition, setAmbition] = useState("");
  const [prefectship, setPrefectship] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [funFact, setFunFact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    axios.post("https://smcsserver.vercel.app/", {
        email,
        password,
        firstName,
        lastName,
        age,
        sponsor,
        ambition,
        prefectship,
        studentClass,
        gender,
        hobbies,
        stateOfOrigin,
        funFact,
      })
      .then((result) => {
        console.log(result);
        //     // Clear input fields after successful submission
        //     // setEmail("");
        //     // setPassword("");
        //     // setFirstName("");
        //     // setLastName("");
        //     // setAge("");
        //     // setSponsor("");
        //     // setAmbition("");
        //     // setPrefectship("");
        //     // setStudentClass("");
        //     // setGender("");
        //     // setHobbies("");
        //     // setStateOfOrigin("");
        //     // setFunFact("");
      })
      .catch((err) => console.log(err));

    if (
      email.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      age.length === 0 ||
      sponsor.length === 0 ||
      ambition.length === 0 ||
      prefectship.length === 0 ||
      studentClass.length === 0 ||
      gender.length === 0 ||
      hobbies.length === 0 ||
      stateOfOrigin.length === 0 ||
      funFact.length === 0
    ) {
      setError(true);
      return; // Exit early if any field is empty
    }

    // If all fields are filled, proceed with form submission
    // console.log("Form data:", {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    //   age,
    //   sponsor,
    //   ambition,
    //   prefectship,
    //   studentClass,
    //   gender,
    //   hobbies,
    //   stateOfOrigin,
    //   funFact,
    // });

    setError(false); // Reset the error state
    setIsSubmitted(true);
    // console.log("isSubmitted: " + isSubmitted);

    // updateSignupInfo({
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    //   age,
    //   sponsor,
    //   ambition,
    //   prefectship,
    //   studentClass,
    //   gender,
    //   hobbies,
    //   stateOfOrigin,
    //   funFact,

    // });
  };

  const FirstForm = (
    <div className="form-contol">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        required
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">
        <span className="label-text">Set password</span>
      </label>
      <input
        required
        type="password"
        placeholder="password"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="label">
        <span className="label-text">First Name</span>
      </label>
      <input
        required
        type="text"
        placeholder="First Name"
        className="input input-bordered w-full"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label className="label">
        <span className="label-text">Last Name</span>
      </label>
      <input
        required
        type="text"
        placeholder="Last Name"
        className="input input-bordered w-full"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {/* Additional input fields */}
      <label className="label">
        <span className="label-text">Age</span>
      </label>
      <input
        required
        type="number"
        placeholder="Age"
        className="input input-bordered w-full"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="btn btn-primary mt-4 w-full" onClick={handleNext}>
        Next
      </button>
    </div>
  );

  const SecondForm = (
    <div className="form-contol">
      {/* Additional input fields */}
      <label className="label">
        <span className="label-text">Sponsor</span>
      </label>
      <select
        required
        className="input input-bordered w-full"
        value={sponsor}
        onChange={(e) => setSponsor(e.target.value)}
      >
        <option value="" disabled>
          Select Sponsor
        </option>
        <option value="self">Self</option>
        <option value="parent">Parent</option>
        <option value="guardian">Guardian</option>
      </select>
      <label className="label">
        <span className="label-text">Ambition</span>
      </label>
      <input
        required
        type="text"
        placeholder="Ambition"
        className="input input-bordered w-full"
        value={ambition}
        onChange={(e) => setAmbition(e.target.value)}
      />
      <label className="label">
        <span className="label-text">Prefectship</span>
      </label>
      <input
        required
        type="text"
        placeholder="Prefectship"
        className="input input-bordered w-full"
        value={prefectship}
        onChange={(e) => setPrefectship(e.target.value)}
      />
      <label className="label">
        <span className="label-text">Class</span>
      </label>
      <select
        required
        className="input input-bordered w-full"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      >
        <option value="" disabled>
          Select Class
        </option>
        <option value="jss1">JSS1</option>
        <option value="jss2">JSS2</option>
        <option value="jss3">JSS3</option>
        <option value="ss1">SS1</option>
        <option value="ss2">SS2</option>
        <option value="ss3">SS3</option>
      </select>

      <div className="flex mt-4 justify-between">
        <button className="btn btn-secondary mr-2" onClick={handleBack}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );

  const ThirdForm = (
    <div className="form-contol">
      <label className="label">
        <span className="label-text">Gender</span>
      </label>
      <select
        required
        className="input input-bordered w-full"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <label className="label">
        <span className="label-text">Hobbies</span>
      </label>
      <input
        required
        type="text"
        placeholder="Hobbies"
        className="input input-bordered w-full"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
      />
      <label className="label">
        <span className="label-text">State of Origin</span>
      </label>
      <input
        required
        type="text"
        placeholder="State of Origin"
        className="input input-bordered w-full"
        value={stateOfOrigin}
        onChange={(e) => setStateOfOrigin(e.target.value)}
      />
      <label className="label">
        <span className="label-text">Fun Fact about Me (Max 300 words)</span>
      </label>
      <textarea
        required
        maxLength="300"
        placeholder="Fun Fact about Me"
        className="input input-bordered w-full"
        value={funFact}
        onChange={(e) => setFunFact(e.target.value)}
      />
      <div className="flex mt-4 justify-between">
        <button className="btn btn-secondary mr-2" onClick={handleBack}>
          Back
        </button>

        {currentStep === 3 && (
          <button className="btn bg-success text-white tex-2xl" type="submit">
            Submit
          </button>
        )}
      </div>
    </div>
  );

  const Success = (
    <div className="form-contol">
      <div className="text-center my-5">
        <div className="text-xl text-green-500 flex gap-2">
          <BsPersonCheckFill
            size={25}
            color="green"
            className="h-auto text-green-400"
          />
          Successfully Registered!
        </div>
        <p>Click on the link or button below and go to the login page </p>
        <button
          className="btn bg-primary text-white w-full mt-2"
          onClick={() => {
            setFlip(!flip), setIsSubmitted(false);
            console.log("Flip value: " + flip);
            console.log("Issubmitted: " + isSubmitted);
          }}
        >
          Login now!
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <form className="form-contol w-full" onSubmit={handleSubmit}>
        <h1 className="w-[100%] text-center font-extrabold">
          Sign-up Form - Step {currentStep}/4
        </h1>
        {error && (
          <div className="text-red-500 mt-2 bg-red-100 p-2">
            Some fields are not properly filled. Please go back and fill them
            before submitting.
          </div>
        )}

        {isSubmitted ? (
          <div>{Success}</div>
        ) : (
          <div>
            {currentStep === 1 && FirstForm}
            {currentStep === 2 && SecondForm}
            {currentStep === 3 && ThirdForm}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
