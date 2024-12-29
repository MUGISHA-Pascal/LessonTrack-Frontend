import React, { useEffect, useRef, useState } from "react";
import { IoPieChartOutline } from "react-icons/io5";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { Chart, registerables } from "chart.js";
import { MdAnalytics } from "react-icons/md";

Chart.register(...registerables);

const Dashboard = () => {
  const [questionNo, setQuestionsNo] = useState(0);
  const [quizNo, setQuizNo] = useState(0);
  const [courseNo, setCourseNo] = useState(0);

  // const chartRef = useRef<Chart | null>(null);
  // const donutRef = useRef<Chart<"doughnut"> | null>(null);
  // useEffect(() => {
  //   const BarChartCanvas = document.getElementById("bar") as HTMLCanvasElement;

  //   if (BarChartCanvas) {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }

  //     chartRef.current = new Chart(BarChartCanvas, {
  //       type: "bar", // Change chart type to bar
  //       data: {
  //         labels: [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sep",
  //           "Oct",
  //           "Nov",
  //           "Dec",
  //         ],
  //         datasets: [
  //           {
  //             label: "Reach",
  //             data: [50, 80, 60, 100, 75, 120, 185, 110, 90, 140, 180, 160],
  //             backgroundColor: "#1E90FF", // Color for the bars
  //             borderColor: "#1E90FF", // Border color for the bars
  //             borderWidth: 1,
  //           },
  //           {
  //             label: "Paid Reach",
  //             data: [30, 50, 55, 70, 65, 110, 133, 100, 80, 120, 150, 140],
  //             backgroundColor: "#4169E1", // Color for the bars
  //             borderColor: "#4169E1", // Border color for the bars
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         plugins: {
  //           title: {
  //             display: false,
  //           },
  //           tooltip: {
  //             enabled: true,
  //             backgroundColor: "#4169E1",
  //             titleColor: "#FFFFFF",
  //             bodyColor: "#FFFFFF",
  //             displayColors: true,
  //             borderColor: "#4169E1",
  //             borderWidth: 1,
  //             callbacks: {
  //               label: function (tooltipItem) {
  //                 return `${tooltipItem.dataset.label}: ${tooltipItem.raw}K`;
  //               },
  //             },
  //           },
  //           legend: {
  //             display: true,
  //             labels: {
  //               color: "#374151",
  //               usePointStyle: true,
  //             },
  //           },
  //         },
  //         scales: {
  //           x: {
  //             title: {
  //               display: true,
  //               text: "Month",
  //               color: "#374151",
  //               font: { weight: "normal" },
  //             },
  //             ticks: {
  //               color: "#374151",
  //             },
  //             grid: {
  //               display: false,
  //             },
  //           },
  //           y: {
  //             title: {
  //               display: true,
  //               text: "Reach (K)",
  //               color: "#374151",
  //               font: { weight: "normal" },
  //             },
  //             ticks: {
  //               color: "#374151",
  //               stepSize: 40,
  //               padding: 10,
  //               callback: (value) => `${value}K`,
  //             },
  //             grid: {
  //               color: "#FFFFFF33",
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }

  //   const DonutChart = document.getElementById(
  //     "DonutChart"
  //   ) as HTMLCanvasElement;
  //   if (donutRef.current) {
  //     donutRef.current.destroy();
  //   }
  //   donutRef.current = new Chart<"doughnut">(DonutChart, {
  //     type: "doughnut",
  //     data: {
  //       labels: ["Tanzania", "Rwanda", "Uganda", "Kenya", "Burundi"],
  //       datasets: [
  //         {
  //           data: [21, 64, 18, 5, 5],
  //           backgroundColor: [
  //             "#87CEEB",
  //             "#1E90FF",
  //             "#4169E1",
  //             "#0000CD",
  //             "#00008B",
  //           ],
  //           borderColor: "#FFFFFF",
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       cutout: "70%",
  //       plugins: {
  //         tooltip: {
  //           callbacks: {
  //             label: (context) => `${context.label}: ${context.raw}K`,
  //           },
  //         },
  //         legend: {
  //           display: false,
  //         },
  //       },
  //     },
  //   });
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, []);
  let user = localStorage.getItem("user");
  console.log(user);
  let correctUser: any;
  if (user) {
    correctUser = JSON.parse(user);
  }

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        `http://localhost:4000/courses/triple_relation/${correctUser.user.id}`
      );
      const data = await response.json();
      console.log(data);
      setCourseNo(data.courses.length);
      setQuestionsNo(data.questions.length);
      setQuizNo(data.quizzes.length);
    };
    fetching();
  }, []);
  return (
    <div className="dashDiv flex-1 h-screen grid grid-cols-1 place-items-start overflow-y-auto pb-[50px] bg-[#ffffff] max-md:p-0">
      <h2 className="text-[30px] mx-[20px] mt-[20px] font-semibold text-gray-700">
        <span className="text-blue-500">Hello</span> {correctUser.user.username}
      </h2>
      <div className="shadow-custom  bg-white place-items-start grid grid-cols-1 gap-[20px] p-[20px]  max-md:p-[0px] h-[250px] max-md:h-[200px] max-md:w-[350px] rounded-[10px] w-[950px] mt-[20px] ml-[20px] relative">
        {/* <canvas id="bar"></canvas> */}

        <div className="h-[200px] max-md:h-[100px]  w-full gap-[20px] place-items-start grid grid-cols-1">
          <div className="flex flex-row w-full  border-b-[1px] border-gray-400 space-x-[10px] items-center justify-start p-[10px]">
            <div className="bg-blue-500 p-[4px] rounded-full ">
              <MdAnalytics className="text-white" />
            </div>
            <h2 className="text-[18px]  max-md:text-[12px] text-gray-700 font-bold">
              Statistics
            </h2>
          </div>{" "}
          <main className="flex flex-rows items-center pr-[20px] max-md:px-[15px] w-full space-x-[70px] max-md:space-x-[25px]">
            <div className="h-[140px] max-md:h-[100px]  border-[1px] border-gray-100  w-[200px] shadow-md rounded-md grid place-items-start grid-cols-1 max-md:p-[15px] p-[20px]">
              <h2 className="text-[22px]   max-md:text-[12px] text-gray-700 font-bold">
                Courses
              </h2>
              <h2 className="text-[30px]   max-md:text-[12px] text-blue-500 font-bold">
                {courseNo}
              </h2>
            </div>
            <div className="h-[140px] max-md:h-[100px] border-[1px] border-gray-100  w-[200px] shadow-md rounded-md grid place-items-start grid-cols-1 max-md:p-[15px] p-[20px]">
              <h2 className="text-[22px]   max-md:text-[12px] text-gray-700 font-bold">
                Quiz
              </h2>
              <h2 className="text-[30px]   max-md:text-[12px] text-blue-500 font-bold">
                {quizNo}
              </h2>
            </div>
            <div className="h-[140px] max-md:h-[100px] border-[1px] border-gray-100  w-[200px] shadow-md rounded-md grid place-items-start grid-cols-1 max-md:p-[15px] p-[20px]">
              <h2 className="text-[22px]   max-md:text-[12px] text-gray-700 font-bold">
                Questions
              </h2>
              <h2 className="text-[30px]   max-md:text-[12px] text-blue-500 font-bold">
                {questionNo}
              </h2>
            </div>{" "}
          </main>
        </div>
      </div>
      <div className="flex flex-row max-md:space-y-[10px] pl-[10px] md:space-x-[10px] mt-[20px] w-full max-md:flex-col ">
        <div className="shadow-custom bg-white w-[372px] h-[260px] rounded-[10px] flex flex-col space-y-[10px] p-[10px]">
          <div className="flex flex-row border-b-[1px] border-gray-400 space-x-[10px] items-center justify-start p-[10px]">
            <div className="bg-blue-500 p-[4px] rounded-full ">
              <MdOutlineCrisisAlert className="text-white" />
            </div>
            <h2 className="text-[18px] text-gray-700 font-bold">Tips</h2>
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
