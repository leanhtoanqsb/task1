import React from 'react';
import { Link } from 'react-router-dom';

const ListTasksClient = ({
  title,
  description,
  code,
  price,
  end,
  createdAt,
  skills,
  imgs,
}) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-md">
      <div className="px-6 py-4">
        <Link to={`/client/job/${code}`}>
          <h1 className="font-semibold text-lg mb-2 my-4 text-gray-600">
            {title}
          </h1>
        </Link>
        <hr />
        <p className="text-gray-600 text-sm py-4">{description}</p>
        <hr />
        <div className="pt-4 pb-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="uppercase inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListTasksClient;
