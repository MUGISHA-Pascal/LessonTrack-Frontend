import React from "react";
import figmaImage from "../assets/Figma.jpeg";
import backgroundImage from "../assets/background.png";
import htmlImage from "../assets/htmlAndCss.jpeg";
const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Super Creative Background Creation",
      CreatedAt: "02/04/2024",
      duration: "20h 10m",
      price: "$150",
      level: "expert",
      image: backgroundImage,
    },
    {
      id: 2,
      title: "How to master html and css",
      CreatedAt: "02/03/2024",
      duration: "20h 10m",
      price: "$150",
      level: "basic",
      image: htmlImage,
    },
    {
      id: 3,
      title: "Master Design System In Figma",
      CreatedAt: "02/03/2024",
      duration: "20h 10m",
      price: "$150",
      level: "basic",
      image: figmaImage,
    },
    {
      id: 1,
      title: "Super Creative Background Creation",
      CreatedAt: "02/04/2024",
      duration: "20h 10m",
      price: "$150",
      level: "expert",
      image: backgroundImage,
    },
    {
      id: 2,
      title: "How to master html and css",
      CreatedAt: "02/03/2024",
      duration: "20h 10m",
      price: "$150",
      level: "basic",
      image: htmlImage,
    },
    {
      id: 3,
      title: "Master Design System In Figma",
      CreatedAt: "02/03/2024",
      duration: "20h 10m",
      price: "$150",
      level: "basic",
      image: figmaImage,
    },
  ];
  return (
    <div className="flex flex-col">
      <header className="border-b-[1px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-gray-700">Courses</h2>
      </header>
      <main className="messageDiv flex flex-col mt-[30px] shadow-md  h-[430px] overflow-y-auto">
        <table className=" border-gray-300 rounded-md border-[1px]">
          <thead className="">
            <tr className="border-gray-300  border-b-[1px]">
              <th className="text-[13px] font-normal text-gray-700 p-[10px]">
                COURSE
              </th>
              <th className="text-[13px] font-normal text-gray-700 p-[10px]">
                DURATION
              </th>
              <th className="text-[13px] font-normal text-gray-700 p-[10px]">
                PRICE
              </th>
              <th className="text-[13px] font-normal text-gray-700 p-[10px]">
                LEVEL
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-gray-300 border-[1px]">
                <td className="flex hover:cursor-pointer flex-row p-[20px] space-x-[40px]">
                  <img
                    src={course.image}
                    alt="course image"
                    className="w-[200px] rounded-md h-[120px]"
                  />
                  <div className="flex items-start space-y-[20px] flex-col w-[200px]">
                    <h2 className="text-gray-700 text-[17px] leading-6 text-left font-semibold">
                      {course.title}
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Created at : {course.CreatedAt}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="text-[11px] text-gray-500">{course.duration}</p>
                </td>
                <td>
                  <p className="text-[11px] text-gray-500">{course.price}</p>
                </td>
                <td>
                  <p className="text-[11px] text-gray-500">{course.level}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Courses;
