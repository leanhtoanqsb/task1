import React, { useState } from 'react';
import LayoutClient from '../../components/Client/LayoutClient';
import { useForm } from 'react-hook-form';
import { addJob } from '../../database';
import { toast } from 'material-react-toastify';
import { Redirect } from 'react-router-dom';

const AddJob = () => {
  const [bg, setBg] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [inprogress, setInprogress] = useState(false);
  const onSubmit = (e) => {
    setInprogress(true);
    setTimeout(() => {
      setInprogress(false);
      const addjob = addJob({
        title: e.project_title,
        desc: e.project_description,
        imgs: e.project_images,
        skills: e.project_skills,
        price: e.project_price,
        days: e.project_deadline,
        bids: [],
      });
      if (addjob.code !== 200) {
        return toast.error(addjob.message);
      }
      setBg(true);
      return toast.success(addjob.message);
    }, 500);
  };
  if (bg) return <Redirect to="/client/home" />;
  return (
    <LayoutClient>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <h2 className="text-2xl mb-2">Đăng dự án</h2>
        <hr className="mb-16" />
        <form action="#!" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="project_title"
              className="font-semibold text-sm uppercase"
            >
              Project title
            </label>
            <input
              type="text"
              id="project_title"
              placeholder="Project Title?"
              className="w-full px-2 py-4 border border-black outline-none mt-2"
              {...register('project_title', {
                required: 'Tên dự án là cần thiết',
                minLength: {
                  value: 30,
                  message: 'Tên dự án phải lớn hơn 30 ký tự',
                },
              })}
            />
            {errors.project_title && (
              <div className="bg-red-300 p-4 text-dark text-sm font-medium border border-red-300 mt-1">
                {errors.project_title.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="project_description"
              className="font-semibold text-sm uppercase"
            >
              Project description
            </label>
            <textarea
              type="text"
              id="project_description"
              placeholder="Project Description?"
              className="w-full px-2 py-4 border border-black outline-none mt-2"
              rows="6"
              {...register('project_description', {
                required: 'Mô tả dự án là cần thiết',
                minLength: {
                  value: 100,
                  message: 'Mô tả dự án phải lớn hơn 100 ký tự',
                },
              })}
            ></textarea>
            {errors.project_description && (
              <div className="bg-red-300 p-4 text-dark text-sm font-medium border border-red-300 mt-1">
                {errors.project_description.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="project_images"
              className="font-semibold text-sm uppercase"
            >
              Project images
            </label>
            <input
              type="text"
              id="project_images"
              placeholder="Project images? (link)"
              className="w-full px-2 py-4 border border-black outline-none mt-2"
              {...register('project_images')}
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm uppercase">
              Project skills
            </label>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  value="php"
                  {...register('project_skills')}
                />
                &nbsp;PHP &nbsp;
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  value="javascript"
                  {...register('project_skills')}
                />
                &nbsp;Javascript &nbsp;
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="project_price"
              className="font-semibold text-sm uppercase"
            >
              Project price
            </label>
            <input
              type="number"
              id="project_price"
              placeholder="Project price ($)?"
              className="w-full px-2 py-4 border border-black outline-none mt-2"
              {...register('project_price', {
                required: 'Vui lòng điền vào số tiền dự án',
                min: {
                  value: 1,
                  message: 'Số tiền dự án không được nhỏ hơn 1$',
                },
              })}
            />
            {errors.project_price && (
              <div className="bg-red-300 p-4 text-dark text-sm font-medium border border-red-300 mt-1">
                {errors.project_price.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="project_deadline"
              className="font-semibold text-sm uppercase"
            >
              Project deadline
            </label>
            <input
              type="text"
              id="project_deadline"
              placeholder="Deadline project? (day)"
              className="w-full px-2 py-4 border border-black outline-none mt-2"
              {...register('project_deadline', {
                required: 'Số ngày bạn muốn hoàn thành dự án này',
                min: {
                  value: 1,
                  message: 'Số ngày không được nhỏ hơn 1 ngày',
                },
              })}
            />
            {errors.project_deadline && (
              <div className="bg-red-300 p-4 text-dark text-sm font-medium border border-red-300 mt-1">
                {errors.project_deadline.message}
              </div>
            )}
          </div>
          <button
            type="password"
            className={`border-black bg-black text-white border w-full outline-none py-2 px-2 font-semibold text-center rounded-sm`}
            disabled={inprogress}
          >
            {inprogress ? 'In Progress' : 'Submit'}
          </button>
        </form>
      </div>
    </LayoutClient>
  );
};

export default AddJob;
