import React from "react";
import { Link } from "react-router-dom";

const JobCard = (props) => {
  return (
    <div className="text-blueGray-700 bg-white mt-0">
      <div className="container flex flex-col items-center px-2 py-10 mx-auto md:flex-row lg:px-28">
        <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
          <h2 className="mb-4 text-xs font-light tracking-widest text-black uppercase title-font">
            Catalog show here
          </h2>
          <h1 className="w-full break-words mb-4 text-2xl font-black tracking-tighter text-black  title-font">
            {props.title || "Job title"}
          </h1>
          <p className="w-full break-words mb-4 mb-8 text-base leading-relaxed text-left text-blueGray-600 ">
            {props.description || "Job description"}
          </p>
          <p className="w-full break-words mb-4 mb-8 text-base leading-relaxed text-left text-blueGray-600 ">
            {(props.skills || []).map((skill, index) => {
              return <span key={index} className="">{skill || "Skills required"}</span>;
            })}
          </p>
          <div className="flex flex-col justify-center lg:flex-row">
            <Link
              to={`/freelance/job/${props.code}`}
              className="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
            >
              Detail
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:max-w-lg md:w-1/2">
          <img
            className="object-cover object-center rounded-lg "
            alt="hero"
            src={
              props.imgs ?
              props.imgs :
              "https://dummyimage.com/720x600/F3F4F7/8693ac"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
