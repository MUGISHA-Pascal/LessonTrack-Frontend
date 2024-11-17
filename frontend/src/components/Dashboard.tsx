import React, { useEffect, useRef } from "react";
import { IoPieChartOutline } from "react-icons/io5";
import { MdOutlineCrisisAlert } from "react-icons/md";
import {
  Chart,
  LineController,
  CategoryScale,
  BarElement,
  LinearScale,
  DoughnutController,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
} from "chart.js";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <div className="dashDiv flex-1 h-screen overflow-y-auto pb-[50px] bg-[#ffffff] max-md:p-0">
      <div className="shadow-custom bg-white p-[10px] max-md:p-[0px] h-[320px] max-md:h-[250px] max-md:w-[350px] rounded-[10px] w-[950px] mt-[20px] ml-[20px] relative">
        <canvas id="bar"></canvas>
      </div>
      <div className="flex flex-row max-md:space-y-[10px] pl-[10px] md:space-x-[10px] mt-[20px] w-full max-md:flex-col ">
        <div className="shadow-custom bg-white w-[590px] max-md:h-[440px] h-[260px] max-md:w-[350px] rounded-[10px] flex flex-col">
          <div className="flex flex-row  border-b-[1px] border-gray-400 space-x-[10px] items-center justify-start p-[10px]">
            <div className="bg-blue-500 p-[4px] rounded-full ">
              <IoPieChartOutline className="text-white" />
            </div>
            <h2 className="text-[18px]  max-md:text-[12px] text-gray-700 font-bold">
              Sales Demography
            </h2>
          </div>
          <div className=" p-[4px]  max-md:pt-[20px] px-[20px] w-full flex flex-row max-md:flex-col md:space-x-[90px] max-md:space-y-[10px] items-center justify-center">
            <div className="w-[195px] h-[195px] max-md:w-[150px] max-md:h-[150px]">
              <canvas id="DonutChart"></canvas>
            </div>

            <div className="ml-10 max-md:ml-[5px] px-[20px] py-[5px] text-[10px] rounded-[10px] flex flex-col space-y-[7px] bg-gray-200 max-md:w-[350px] w-[400px] text-gray-700">
              <h3 className="text-[13px] font-semibold max-md:text-[10px]">
                Audience by Country
              </h3>
            </div>
          </div>
        </div>
        <div className="shadow-custom bg-white w-[372px] h-[260px] rounded-[10px] flex flex-col space-y-[10px] p-[10px]">
          <div className="flex flex-row border-b-[1px] border-gray-400 space-x-[10px] items-center justify-start p-[10px]">
            <div className="bg-blue-500 p-[4px] rounded-full ">
              <MdOutlineCrisisAlert className="text-white" />
            </div>
            <h2 className="text-[18px] text-gray-700 font-bold">
              Tips For Increasing grades
            </h2>
          </div>
          <div className="bg-gray-200 p-[7px] py-1 rounded-[10px]">
            <div className="scrollableDiv bg-gray-200 flex flex-col space-y-[20px] rounded-[10px] text-left p-[10px] text-[10px] text-gray-700 h-[180px] overflow-y-auto">
              <p>
                <b>Stay Organized and Manage Your Time Wisely :</b> Keeping
                track of assignments, tests, and deadlines is essential for
                academic success. Use tools like planners, calendars, or apps to
                stay on top of your tasks. Break larger projects into smaller,
                manageable parts and allocate specific times to study each day.
                Avoid last-minute cramming by sticking to a consistent schedule,
                ensuring you have enough time to review and understand your
                materials.
              </p>

              <p>
                <b>Seek Help When Needed :</b>If you’re struggling to understand
                a topic, don’t hesitate to ask for help. Approach your teachers,
                join study groups, or consider hiring a tutor for one-on-one
                guidance. Collaborating with peers can provide new perspectives
                and make learning more interactive. Many online resources, like
                videos and tutorials, can also clarify challenging concepts.
              </p>

              <p>
                <b>Develop Effective Study Habits :</b> Find a quiet,
                distraction-free environment to focus on your studies. Take
                regular breaks to keep your mind fresh and prevent burnout.
                Practice active learning techniques like summarizing notes,
                teaching concepts to others, or using flashcards for review.
                Tailor your study sessions to your learning style—whether
                visual, auditory, or kinesthetic—to absorb information more
                effectively.
              </p>

              <p>
                <b>Take Care of Your Health :</b>Your mental and physical health
                play a significant role in academic performance. Ensure you get
                enough sleep, eat nutritious meals, and stay hydrated to keep
                your brain sharp. Exercise regularly to reduce stress and
                improve focus. Practice mindfulness or relaxation techniques to
                stay calm and motivated during exams or challenging tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
