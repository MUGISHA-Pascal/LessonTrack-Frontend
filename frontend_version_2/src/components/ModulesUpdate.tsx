import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import notfound from "../assets/search.png";
import _ from "lodash";
const ModulesUpdate = () => {
  interface Subchapter {
    id: number;
    content: string;
    image: string;
  }

  interface Chapter {
    [chapterName: string]: Subchapter[];
  }

  interface Modules {
    [moduleName: string]: Chapter;
  }

  const [modules, setModules] = useState<Modules[]>([]); // Assume modules are an array
  const { courseId, courseName } = useParams<{
    courseId: string;
    courseName: string;
  }>();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/courses/module/${courseId}`
        );
        const data = await response.json();
        setModules(data.courses || {}); // Ensure data.courses is an object
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, [courseId]); // Only depend on courseId

  const updateModules = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/courses/update_module/${courseId}`,
        { modules: JSON.stringify(modules[0]) } // Send the entire modules object
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating modules:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(modules).length > 0) {
      updateModules();
    }
  }, [modules]); // Add courseId as a dependency

  // Function to delete a module
  const deleteModule = (moduleName: string) => {
    setModules((prevModules) => {
      return prevModules.map((module) => {
        const newModule = { ...module };
        delete newModule[moduleName]; // Remove the module by name
        return newModule;
      });
    });
  };
  // Function to delete a chapter from a specific module
  const deleteChapter = (moduleName: string, chapterName: string) => {
    setModules((prevModules) => {
      return prevModules.map((module) => {
        const newModule = { ...module };
        if (newModule[moduleName]) {
          delete newModule[moduleName][chapterName]; // Remove the chapter
        }
        return newModule;
      });
    });
  };

  // Function to delete a subchapter from a specific chapter in a module
  const deleteSubchapter = (
    moduleName: string,
    chapterName: string,
    subchapterId: number
  ) => {
    setModules((prevModules) => {
      return prevModules.map((module) => {
        const newModule = { ...module };
        if (newModule[moduleName] && newModule[moduleName][chapterName]) {
          newModule[moduleName][chapterName] = newModule[moduleName][
            chapterName
          ].filter((subchapter) => subchapter.id !== subchapterId); // Remove the subchapter by id
        }
        return newModule;
      });
    });
  };
  console.log(modules);
  return (
    <div className="messageDiv h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
          Modules View For {courseName}
        </h2>
      </header>
      <div>
        {/* Render modules dynamically */}
        {modules.length > 0 ? (
          <ul>
            {Object.entries(modules[0]).map(([moduleName, chapters]) => (
              <div
                key={moduleName}
                className="module text-gray-700 px-[20px] text-left"
              >
                <h2 className="font-bold mb-[15px] mt-[14px] text-[20px]">
                  {moduleName}
                </h2>
                <button
                  onClick={() => deleteModule(moduleName)}
                  className="delete-module-btn text-white bg-red-500 text-[12px] p-[7px] rounded-[10px]"
                >
                  Delete Module
                </button>
                <div className="chapters text-left">
                  {Object.entries(chapters).map(
                    ([chapterName, subchapters]) => (
                      <div key={chapterName} className="chapter">
                        <h3 className="chapter-title mb-[12px] mt-[10px] font-semibold text-[15px]">
                          {chapterName}
                        </h3>
                        <button
                          onClick={() => deleteChapter(moduleName, chapterName)}
                          className="delete-module-btn text-white bg-red-500 text-[12px] p-[7px] rounded-[10px]"
                        >
                          Delete Chapter
                        </button>
                        <ul className="subchapters text-[14px]">
                          {subchapters.map((subchapter) => (
                            <li key={subchapter.id} className="subchapter">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: subchapter.content,
                                }}
                              />
                              {subchapter.image && (
                                <img
                                  src={subchapter.image}
                                  alt={`Subchapter ${subchapter.id}`}
                                  className="subchapter-image"
                                />
                              )}
                              <button
                                onClick={() =>
                                  deleteSubchapter(
                                    moduleName,
                                    chapterName,
                                    subchapter.id
                                  )
                                }
                                className="delete-module-btn text-white bg-red-500 text-[12px] p-[7px] rounded-[10px]"
                              >
                                Delete Subchapter
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No modules available.</p>
        )}
        {_.isEqual({}, modules[0]) && (
          <>
            <div className="w-full  flex mt-[50px] flex-col space-y-[20px] items-center justify-center">
              <img
                src={notfound}
                className="w-auto h-[270px]"
                alt="not found"
              />

              <h2 className="text-[25px] font-bold text-gray-700">
                No Modules
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModulesUpdate;
