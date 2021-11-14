import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { findTaskByCode, getDB, getSession } from '../../database';
import LayoutClient from '../../components/Client/LayoutClient';
import { toast } from 'material-react-toastify';

const JobDetail = () => {
  const [editMode, setEditMode] = useState(false);
  const { code } = useParams();
  const session = getSession();
  let jobData = findTaskByCode(code);
  jobData = jobData ? jobData[0][1] : false;
  const [title, setTitle] = useState(jobData.title);
  const [desc, setDesc] = useState(jobData.description);
  const [skills, setSkills] = useState(jobData.skills);
  const [image, setImage] = useState(jobData.imgs);
  const [timeDeadline, setTimeDeadline] = useState(jobData.end);
  const [price, setPrice] = useState(jobData.price);
  if (!jobData) return <Redirect to="/client/home" />;

  if (session.username !== jobData.owner) <Redirect to="/client/home" />;

  const handleUpdateJob = () => {
    const DB = getDB();
    let jobNow = findTaskByCode(code);
    jobNow = jobNow[0].splice(1, 1)[0];
    const findIndex = DB.data.task
      .map((e) => {
        return e.code;
      })
      .indexOf(code);
    let taskDB = [...DB.data.task];
    let newDB = {
      data: {
        user: [...DB.data.user],
        task: taskDB,
        taskRegister: [...DB.data.taskRegister],
      },
    };
    taskDB[findIndex] = {
      ...taskDB[findIndex],
      title: title,
      description: desc,
      imgs: image,
      end: timeDeadline,
      price: price,
    };
    localStorage.setItem('database', JSON.stringify(newDB));
    toast.success('Chỉnh sửa thành công');
  };

  return (
    <LayoutClient>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <button
          className="px-6 py-4 bg-blue-400 text-xl ofnt-semibold rounded-lg text-white"
          onClick={() => setEditMode(!editMode)}
        >
          Edit Mode
        </button>
        <small className="text-gray-700 font-semibold">
          Job Code:{' '}
          <span className="bg-red-300 rounded-xl px-4 text-white">
            {jobData.code}
          </span>
        </small>
        <div className="mb-4 mt-4">
          {editMode ? (
            <div>
              <h3>title</h3>
              <input
                type="text"
                className="w-full bg-black py-4 px-4 rounded-lg text-white outline-none"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          ) : (
            <h2 className="text-2xl font-medium">{jobData.title}</h2>
          )}
        </div>
        <div className="mb-4">
          {editMode ? (
            <div>
              <h3>image link</h3>
              <input
                type="text"
                value={image}
                className="w-full bg-black py-4 px-4 rounded-lg text-white outline-none"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          ) : (
            <img src={image} alt="" className="w-full max-w-lg" />
          )}
        </div>
        <div className="mb-4">
          {editMode ? (
            <div>
              <h3>Desc</h3>
              <textarea
                type="text"
                className="w-full bg-black py-4 px-4 rounded-lg text-white outline-none"
                onChange={(e) => setDesc(e.target.value)}
                rows={7}
                value={desc}
              ></textarea>
            </div>
          ) : (
            <p className="text-md">{desc}</p>
          )}
        </div>
        <div>
          {!editMode &&
            skills.map((skill, index) => (
              <span
                key={index}
                className="uppercase inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="mb-4">
          {editMode ? (
            <div>
              <h3>time deadline (day)</h3>
              <input
                type="text"
                value={timeDeadline}
                className="w-full bg-black py-4 px-4 rounded-lg text-white outline-none"
                onChange={(e) => setTimeDeadline(e.target.value)}
              />
            </div>
          ) : (
            <p className="text-md">deadline: {timeDeadline} day</p>
          )}
        </div>
        <div className="mb-4">
          {editMode ? (
            <div>
              <h3>price (USD)</h3>
              <input
                type="text"
                value={price}
                className="w-full bg-black py-4 px-4 rounded-lg text-white outline-none"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          ) : (
            <p className="text-md">price: {price} $</p>
          )}
        </div>
        <div>
          {editMode && (
            <button
              onClick={handleUpdateJob}
              className="px-6 py-4 text-white font-semibold bg-green-400 rounded-lg"
            >
              Update
            </button>
          )}
        </div>
      </div>
      <hr />
      <h2 className="text-lg mt-4 font-semibold mb-4">
        Freelance apply this project
      </h2>
      <hr />
      <div className="mt-4">asdf</div>
      <div className="h-screen"></div>
    </LayoutClient>
  );
};

export default JobDetail;
