import React from "react";
const ProgressCircle = ({ percentage }) => {
  const gradient = `conic-gradient(#4d5bf9 ${percentage * 3.6}deg, #cadcff ${percentage * 3.6}deg)`;
  return (
    <div className="progessBar w-[150px] h-[150px] bg-[#e8/f0f7] rounded-md grid place-items-center">
      <div style={{ backgroundImage: gradient }} className="circular w-[100px] h-[100px] rounded-full grid place-items-center">
        <div className="percent relative text-[1.2rem] font-semibold">{percentage}%</div>
      </div>
    </div>
  );
};

export default ProgressCircle;