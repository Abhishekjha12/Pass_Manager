import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  // Load passwords from localStorage on component mount
  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem("passwords"));
    if (savedPasswords) {
      setPasswordArray(savedPasswords);
    }
  }, []);

  const ref = useRef();
  const passwordRef = useRef();

  const showPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
      ref.current.src = passwordRef.current.type === "text" ? "icons/eyes.png" : "icons/eyescrossed.png";
    }
  };

  const savePassword = async () => {
    if (form.website.length > 3 && form.username.length && form.password.length > 3) {
      const updatedArray = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(updatedArray);

      // Save to localStorage
      localStorage.setItem("passwords", JSON.stringify(updatedArray));

      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      });

      setForm({ website: "", username: "", password: "" });
      toast("Password Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast("Error: Password not Saved");
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this?");
    if (c) {
      const updatedArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedArray);

      // Save updated passwords list to localStorage
      localStorage.setItem("passwords", JSON.stringify(updatedArray));

      let res = await fetch("http://localhost:3000/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    setPasswordArray(passwordArray.filter(item => item.id !== id));
    setForm(passwordArray.find(i => i.id === id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    toast("Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Background Gradient */}
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="mx-auto md:container px-5 md:px-30 flex flex-col min-h-screen bg-slate-900 text-white">
        <h1 className="text-indigo-300 text-4xl ml-5 font-bold text-center">
          <span className="text-blue-500">&lt;</span>
          Pass_<span className="text-blue-500">Manager&gt; </span>
        </h1>
        <p className="text-indigo-300 text-lg ml-5 text-center font-bold mt-2">
          Manage All your passwords in one place
        </p>

        <div className="text-black p-4 gap-4 flex md:flex-row flex-col items-center">
          <input
            value={form.website}
            onChange={handleChange}
            className="rounded-2xl border text-black w-full md:w-1/2 p-2"
            type="text"
            name="website"
            placeholder="Enter Website name"
            id="website"
          />

          <div className="flex flex-col md:flex-row my-3 gap-3 w-full md:w-1/2">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-2xl border text-black w-full md:w-1/4 p-2"
              type="text"
              name="username"
              placeholder="Enter UserName"
              id="username"
            />
            <div className="relative w-full md:w-1/4">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-2xl border text-black w-full p-2 pr-20"
                type="password"
                name="password"
                placeholder="Enter Password"
                id="password"
              />
              <span
                className="absolute right-2 top-2 text-black cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={35}
                  height={25}
                  src="icons/eyes.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-white text-xl flex justify-center items-center bg-indigo-800 rounded-full w-1/6 hover:bg-indigo-300 px-2 border-2 border-blue-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="password mt-5 flex flex-col items-center">
          <h2 className="text-indigo-600 font-extrabold text-2xl">Your passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-indigo-300">No Passwords saved yet</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto w-full max-w-4xl">
              <table className="table-auto w-full rounded-lg mb-3 bg-indigo-200">
                <thead className="bg-indigo-300">
                  <tr>
                    <th className="py-2">Website</th>
                    <th className="py-2">User Name</th>
                    <th className="py-2">Passwords</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-indigo-200">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 border border-white text-black">
                        <div className="flex items-center justify-center">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{item.website}</span>
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.website);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "2px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border text-black">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "2px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border text-black">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "2px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 justify-center text-center border flex">
                        <span className="cursor-pointer mx-2" onClick={() => { editPassword(item.id); }} >
                          <dotlottie-player
                            src="https://lottie.host/005b3a70-c1f7-450b-8213-0781aefe025a/LRTr57U24v.json"
                            background="transparent"
                            speed="1"
                            style={{ width: "25px", height: "25px" }}
                            loop
                            autoplay
                          ></dotlottie-player>
                        </span>
                        <span className="cursor-pointer mx-2" onClick={() => { deletePassword(item.id); }} >
                          <dotlottie-player
                            src="https://cdn.lordicon.com/skkahier.json"
                            background="transparent"
                            speed="1"
                            style={{ width: "25px", height: "25px" }}
                            loop
                            autoplay
                          ></dotlottie-player>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
