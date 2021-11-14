import React, { useState, useMemo } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { getUser, getDB } from '../../database';

const ProfileFreelance = () => {
  const userInfo = getUser();
  const data = JSON.parse(JSON.stringify(userInfo))
  const initialState = () => {
    return {...userInfo};
  };
  const [formData, setFormData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const onSubmit = (data, e) => {
    if (isEdit) {
      let newUserData;
      setFormData((prev) => {
        return newUserData = {
          ...prev,
          ...data,
        }
      })
      const DB = getDB();
      let newUserDB = [
        ...(DB.data.user.filter((user) => user.username != newUserData.username)),
        newUserData,
      ]
      let newDB = {
        data: {
          ...(DB.data),
          user: newUserDB
        }
      }
      localStorage.setItem('database', JSON.stringify(newDB));
    }
    setIsEdit((prev) => {
      return !prev;
    });
  };
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ...formData
    }
  });

  const Input = ({ id, label, labelDisplay = true, ...props }) => {
    return (
      <>
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor={id}
          style={{ display: labelDisplay ? "block" : "none" }}
        >
          {label}
        </label>
        <input
          className={`w-full px-3 py-2 text-sm bg-transparent ${
            isEdit
              ? "border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              : ""
          }`}
          id={id}
          type="text"
          {...props}
          {...register(id)}
        />
      </>
    );
  };
  const Textarea = ({ id, label, labelDisplay = true, ...props }) => {
    return (
      <>
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor={id}
          style={{ display: labelDisplay ? "block" : "none" }}
        >
          {label}
        </label>
        <textarea
          className={`w-full px-3 py-2 text-sm bg-transparent resize-none ${
            isEdit
              ? "border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              : ""
          }`}
          id={id}
          {...props}
          {...register(id)}
        />
      </>
    );
  };

  return (
    <>
      <div className="">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    "url('https://source.unsplash.com/rFVhWXZnp7M/600x800')",
                }}
              ></div>
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">{formData.fullname}</h3>
                <h6 className="pt-1 text-xl text-center">@{formData.username}</h6>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  action="#!"
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <Input
                      id="personalHeading"
                      disabled={!isEdit}
                      label="Personal Heading:"
                    />
                  </div>
                  <div className="mb-4">
                    <Input id="address" disabled={!isEdit} label="Address:" />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      id="overview"
                      rows="8"
                      disabled={!isEdit}
                      label="Overview:"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="bio"
                    >
                      Gender:
                    </label>
                    <select
                      className="bg-transparent"
                      disabled={!isEdit}
                      id="bio"
                      {...register("bio")}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                    >
                      Skills:
                    </label>
                    <Controller
                      name="select"
                      control={control}
                      render={({ field }) => <Select 
                        {...field} 
                        className="bg-transparent"
                        isMulti
                        isDisabled={!isEdit}
                        options={[
                          { value: "html", label: "HTML" },
                          { value: "javascript", label: "Javascript" },
                          { value: "css", label: "CSS" }
                        ]} 
                      />}
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      {isEdit ? "Save" : "Edit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileFreelance;
