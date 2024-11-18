import React, { useEffect, useRef } from "react";
import { IoPieChartOutline } from "react-icons/io5";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const chartRef = useRef<Chart | null>(null);
  const donutRef = useRef<Chart<"doughnut"> | null>(null);
  useEffect(() => {
    const BarChartCanvas = document.getElementById("bar") as HTMLCanvasElement;

    if (BarChartCanvas) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(BarChartCanvas, {
        type: "bar", // Change chart type to bar
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Reach",
              data: [50, 80, 60, 100, 75, 120, 185, 110, 90, 140, 180, 160],
              backgroundColor: "#1E90FF", // Color for the bars
              borderColor: "#1E90FF", // Border color for the bars
              borderWidth: 1,
            },
            {
              label: "Paid Reach",
              data: [30, 50, 55, 70, 65, 110, 133, 100, 80, 120, 150, 140],
              backgroundColor: "#4169E1", // Color for the bars
              borderColor: "#4169E1", // Border color for the bars
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "#4169E1",
              titleColor: "#FFFFFF",
              bodyColor: "#FFFFFF",
              displayColors: true,
              borderColor: "#4169E1",
              borderWidth: 1,
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}K`;
                },
              },
            },
            legend: {
              display: true,
              labels: {
                color: "#374151",
                usePointStyle: true,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Month",
                color: "#374151",
                font: { weight: "normal" },
              },
              ticks: {
                color: "#374151",
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Reach (K)",
                color: "#374151",
                font: { weight: "normal" },
              },
              ticks: {
                color: "#374151",
                stepSize: 40,
                padding: 10,
                callback: (value) => `${value}K`,
              },
              grid: {
                color: "#FFFFFF33",
              },
            },
          },
        },
      });
    }

    const DonutChart = document.getElementById(
      "DonutChart"
    ) as HTMLCanvasElement;
    if (donutRef.current) {
      donutRef.current.destroy();
    }
    donutRef.current = new Chart<"doughnut">(DonutChart, {
      type: "doughnut",
      data: {
        labels: ["Tanzania", "Rwanda", "Uganda", "Kenya", "Burundi"],
        datasets: [
          {
            data: [21, 64, 18, 5, 5],
            backgroundColor: [
              "#87CEEB",
              "#1E90FF",
              "#4169E1",
              "#0000CD",
              "#00008B",
            ],
            borderColor: "#FFFFFF",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}K`,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
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
            <div className="relative w-[195px] h-[195px] max-md:w-[150px] max-md:h-[150px]">
              <canvas id="DonutChart"></canvas>
              <p className="absolute top-[80px] max-md:text-[12px] max-md:top-[600px] max-md:left-[145px] left-[60px] text-gray-700 font-bold">
                Countries
              </p>
            </div>

            <div className="ml-10 max-md:ml-[5px] px-[20px] py-[5px] text-[10px] rounded-[10px] flex flex-col space-y-[7px] bg-gray-200 max-md:w-[350px] w-[400px] text-gray-700">
              <h3 className="text-[13px] font-semibold max-md:text-[10px]">
                Audience by Country
              </h3>
              <ul className="flex flex-col space-y-[9px]">
                <li className="flex flex-row space-x-[70px] max-md:space-x-[150px] items-center my-1">
                  <div className="flex flex-row space-x-[15px] items-center">
                    <span className="w-2 h-2 bg-[#87CEEB] rounded-full mr-2"></span>
                    <p>Tanzania</p>
                  </div>
                  <div className="flex flex-row space-x-[35px] items-center">
                    <span>21K</span>{" "}
                    <div className="text-blue-500 w-[25px] flex flex-row items-center justify-center h-[25px] p-[4px] font-bold bg-[#E6F2FE] rounded-full">
                      <span className="ml-auto ">27%</span>
                    </div>
                  </div>
                </li>
                <li className="flex flex-row space-x-[70px] max-md:space-x-[150px] items-center my-1">
                  <div className="flex flex-row space-x-[15px] items-center">
                    <span className="w-2 h-2 bg-[#1E90FF] rounded-full mr-2"></span>
                    <p>Rwanda</p>
                  </div>{" "}
                  <div className="flex flex-row space-x-[35px] items-center">
                    <span>64K</span>
                    <div className="text-blue-500 w-[25px] flex flex-row items-center justify-center h-[25px] p-[4px] font-bold bg-[#E6F2FE] rounded-full">
                      <span className="ml-auto">40%</span>
                    </div>
                  </div>
                </li>
                <li className="flex flex-row space-x-[73px] max-md:space-x-[153px] items-center my-1">
                  <div className="flex flex-row space-x-[15px] items-center">
                    <span className="w-2 h-2 bg-[#4169E1] rounded-full mr-2"></span>
                    <p>Uganda</p>
                  </div>{" "}
                  <div className="flex flex-row space-x-[35px] items-center">
                    <span>18K</span>
                    <div className="text-blue-500 w-[25px] flex flex-row items-center justify-center h-[25px] p-[4px] font-bold bg-[#E6F2FE] rounded-full">
                      <span className="ml-auto">16%</span>
                    </div>
                  </div>
                </li>
                <li className="flex flex-row space-x-[85px] max-md:space-x-[165px] items-center my-1">
                  <div className="flex flex-row space-x-[15px] items-center">
                    <span className="w-2 h-2 bg-[#0000CD] rounded-full mr-2"></span>
                    <p>Kenya</p>
                  </div>{" "}
                  <div className="flex flex-row space-x-[35px] items-center">
                    <span>5K</span>
                    <div className="text-blue-500 w-[25px] flex flex-row items-center justify-center h-[25px] p-[4px] font-bold bg-[#E6F2FE] rounded-full">
                      <span className="ml-auto">8%</span>
                    </div>
                  </div>
                </li>
                <li className="flex flex-row space-x-[77px] max-md:space-x-[157px] items-center my-1">
                  <div className="flex flex-row space-x-[15px] items-center">
                    <span className="w-2 h-2 bg-[#00008B] rounded-full mr-2"></span>
                    <p>Burundi</p>
                  </div>
                  <div className="flex flex-row space-x-[35px] items-center">
                    <span>5K</span>
                    <div className="text-blue-500 w-[25px] flex flex-row items-center justify-center h-[25px] p-[4px] font-bold bg-[#E6F2FE] rounded-full">
                      <span className="ml-auto">8%</span>
                    </div>
                  </div>
                </li>
              </ul>
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
