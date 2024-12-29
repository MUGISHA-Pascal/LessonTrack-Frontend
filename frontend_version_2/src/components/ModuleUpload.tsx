import axios from "axios";
import { json } from "body-parser";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModuleUpload = () => {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState<string>("");
  const [modules, setModules] = useState<{
    [key: string]: { [key: string]: any[] };
  }>({
    "Module 1": {},
  });

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("module");
  const titles = urlParams.get("title");
  // Function to add a new module
  const addModule = () => {
    const newModuleKey = `Module ${Object.keys(modules).length + 1}`;
    setModules((prevModules) => ({
      ...prevModules,
      [newModuleKey]: {},
    }));
  };

  // Function to add a new chapter
  const addChapter = (moduleName: string, chapterName: string) => {
    setModules((prevModules) => {
      const updatedModules = { ...prevModules };
      if (!updatedModules[moduleName][chapterName]) {
        updatedModules[moduleName][chapterName] = [];
      }
      return updatedModules;
    });
  };

  const addSubChapter = (
    moduleName: string,
    chapterName: string,
    content: string,
    image: string
  ) => {
    setModules((prevModules) => {
      // Create a deep copy of the modules state
      const updatedModules = { ...prevModules };

      // Ensure the chapter exists under the module
      if (!updatedModules[moduleName][chapterName]) {
        updatedModules[moduleName][chapterName] = [];
      }

      // Prevent duplicates: Ensure unique subchapter IDs or avoid multiple submissions
      const isDuplicate = updatedModules[moduleName][chapterName].some(
        (subchapter) =>
          subchapter.content === content && subchapter.image === image
      );

      if (!isDuplicate) {
        // Add the new subchapter using immutable updates
        updatedModules[moduleName][chapterName] = [
          ...updatedModules[moduleName][chapterName],
          { id: Date.now(), content, image },
        ];
      }

      return updatedModules; // Return the updated state
    });
  };

  // Function to delete a module
  const deleteModule = (moduleName: string) => {
    setModules((prevModules) => {
      const updatedModules = { ...prevModules };
      delete updatedModules[moduleName];
      return updatedModules;
    });
  };

  // Function to delete a chapter
  const deleteChapter = (moduleName: string, chapterName: string) => {
    setModules((prevModules) => {
      const updatedModules = { ...prevModules };
      delete updatedModules[moduleName][chapterName];
      return updatedModules;
    });
  };

  // Function to delete a subchapter
  const deleteSubChapter = (
    moduleName: string,
    chapterName: string,
    index: number
  ) => {
    setModules((prevModules) => {
      const updatedModules = { ...prevModules };
      updatedModules[moduleName][chapterName].splice(index, 1);
      return updatedModules;
    });
  };
  useEffect(() => {
    console.log("Modules State in Required Format:");
    console.log(JSON.stringify(modules, null, 2));
  }, [modules]);

  console.log();

  const addModuke = async () => {
    const themodule = JSON.stringify(modules);
    try {
      const res = await axios.post("http://localhost:4000/courses/module/", {
        module: themodule,
        courseId,
        userid: 1,
      });
      console.log(res.data);
      if (res.data) {
        navigate("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashDiv overflow-auto h-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
        Modules
      </h1>
      {/* Display Modules */}
      {Object.keys(modules).map((moduleName) => (
        <div key={moduleName} className="border p-4 mb-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] text-gray-700 font-bold">
              {moduleName}
            </h2>
            <button
              className="flex flex-row items-center space-x-[7px] justify-center"
              onClick={() => deleteModule(moduleName)}
            >
              <MdDelete className="text-red-500 text-[20px]" />
              <span className="text-[14px] font-semibold text-red-500">
                Delete Module
              </span>
            </button>
          </div>
          {/* Display Chapters */}
          {Object.keys(modules[moduleName]).map((chapterName) => (
            <div key={chapterName} className="mb-4">
              <div className="flex justify-between items-center mt-[20px]">
                <h3 className="text-lg font-semibold">{chapterName}</h3>
                <button
                  className="flex flex-row items-center space-x-[7px] justify-center"
                  onClick={() => deleteChapter(moduleName, chapterName)}
                >
                  <MdDelete className="text-red-500 text-[20px]" />
                  <span className="text-[14px] font-semibold text-red-500">
                    Delete Chapter
                  </span>
                </button>
              </div>
              {/* Add Subchapter */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  const image = form.image.value;
                  addSubChapter(moduleName, chapterName, editorContent, image); // Use editorContent as content
                  form.reset();
                  setEditorContent("");
                }}
              >
                <div className="mt-2 space-y-2">
                  <ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    className="p-2 border focus:outline-none rounded w-full"
                    placeholder="Subchapter Content"
                  />
                  <input
                    type="text"
                    hidden
                    name="image"
                    className="p-2 focus:outline-none border rounded w-full"
                    placeholder="Image URL"
                  />
                </div>
                <button
                  type="submit"
                  className="flex flex-row mt-[15px] items-center space-x-[7px] justify-center"
                >
                  <IoIosAddCircle className="text-green-500 text-[20px]" />
                  <span className="text-[14px] font-semibold text-green-500">
                    Add Subchapter
                  </span>
                </button>
              </form>
              {/* Display Subchapters */}
              {modules[moduleName][chapterName].map((subChapter, index) => (
                <div
                  key={index}
                  className="border mt-4 p-4 rounded shadow-sm bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p>{subChapter.content}</p>
                    {subChapter.image && (
                      <img
                        src={subChapter.image}
                        alt="image"
                        // alt={subChapter ${index + 1}}
                        className="mt-2 rounded-md"
                      />
                    )}
                  </div>
                  <button
                    className="flex flex-row items-center space-x-[7px] justify-center"
                    onClick={() =>
                      deleteSubChapter(moduleName, chapterName, index)
                    }
                  >
                    <MdDelete className="text-red-500 text-[20px]" />
                    <span className="text-[14px] font-semibold text-red-500">
                      Delete Subchapter
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ))}
          {/* Add Chapter */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              const chapterName = form.chapterName.value.trim();
              if (chapterName) {
                addChapter(moduleName, chapterName);
                form.reset();
              }
            }}
          >
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                name="chapterName"
                className="p-2 border focus:outline-none rounded w-full"
                placeholder="New Chapter Name"
              />
              <button
                type="submit"
                className="flex flex-row items-center space-x-[7px] w-[200px] justify-center"
              >
                <IoIosAddCircle className="text-blue-500 text-[20px]" />

                <span className="text-[14px] font-semibold text-blue-500">
                  Add Chapter
                </span>
              </button>
            </div>
          </form>
        </div>
      ))}
      {/* Add Module */}
      <div className="flex flex-col items-center justify-center space-y-[20px] ">
        <button
          onClick={addModule}
          className="bg-blue-500 w-[200px] text-white py-2 px-6 rounded"
        >
          Add Module
        </button>

        <button
          onClick={addModuke}
          className="bg-blue-500 w-[200px] text-white py-2 px-6 rounded"
        >
          Add All module
        </button>
      </div>
    </div>
  );
};

export default ModuleUpload;
