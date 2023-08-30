const About = ({ userInfo }) => {

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="  justify-center items-center flex">
      <div className="p-5 px-15 mt-5">
        <h1 className="text-1xl font-bold text md:text-3xl text-center underline-offset-2 underline mb-3">
          About Me
        </h1>
        <div className="md:max-w-2xl text-justify border-2 border-gray-400 rounded-2xl p-5">
          <p className="mb-3">
            <span className="font-semibold">Age: </span>
            {userInfo.age}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Gender: </span>
            {userInfo.gender}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Sponsor:</span> {userInfo.sponsor}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Hobbies:</span> {userInfo.hobbies}
          </p>

          <p className="mb-3">
            <span className="font-semibold">State of origin:</span>{" "}
            {userInfo.stateOfOrigin}
          </p>

          <p className="mb-3">
            <span className="font-semibold">Ambition:</span> {userInfo.ambition}
          </p>

          <p className="mb-3">
            <span className="font-semibold">School result:</span> Result Preview
          </p>

          <p className="mb-3">
            <span className="font-semibold"> Prefectship:</span>{" "}
            {userInfo.prefectship}
          </p>

          <p className="mb-3">
            <span className="font-semibold">Class:</span>{" "}
            {userInfo.studentClass}
          </p>
          <p className="text-center mb-3">
            <span className="font-semibold underline">
              something cool about {userInfo.firstName}:
            </span>
            <br />
            {userInfo.funFact}
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
