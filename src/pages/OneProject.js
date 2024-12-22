export default function OneProject() {
  const data = [
    {
      taskid: 1,
      taskname: "Design",
      taskobjective:
        "Research into modern ecological tools and methods in website design",
      taskstart: "16/05/2024 08h00",
      taskend: "16/05/2025 12h00",
      taskpic: "Siam",
      taskstatus: "Completed",
    },
    {
      taskid: 1,
      taskname: "Design",
      taskobjective: "Create a logo in an eco-friendly way",
      taskstart: "16/05/2024 14h00",
      taskend: "18/05/2025 12h00",
      taskpic: "Siam",
      taskstatus: "Completed",
    },
    {
      taskid: 1,
      taskname: "Design",
      taskobjective: "Create the site model",
      taskstart: "18/05/2024 14h00",
      taskend: "01/06/2025 12h00",
      taskpic: "Siam",
      taskstatus: "In Progress",
    },
    {
      taskid: 2,
      taskname: "Development",
      taskobjective:
        "Research into modern ecological tools and methods in website development",
      taskstart: "16/05/2024 08h00",
      taskend: "16/05/2025 12h00",
      taskpic: "Melody",
      taskstatus: "Completed",
    },
    {
      taskid: 2,
      taskname: "Development",
      taskobjective: "Create back-end with Node.js and Express.js",
      taskstart: "16/05/2024 14h00",
      taskend: "18/07/2025 12h00",
      taskpic: "Melody",
      taskstatus: "In Progress",
    },
    {
      taskid: 3,
      taskname: "Community Management",
      taskobjective: "Prepare the marketing plan",
      taskstart: "16/05/2024 08h00",
      taskend: "16/06/2025 12h00",
      taskpic: "Tom",
      taskstatus: "In Progress",
    },
    {
      taskid: 3,
      taskname: "Community Management",
      taskobjective: "Prepare communication on social networks",
      taskstart: "17/05/2024 14h00",
      taskend: "18/05/2025 12h00",
      taskpic: "Tom",
      taskstatus: "Completed",
    },
  ];

  const uniqueTaskNames = {};

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            Nature & Me
          </h1>
        </div>
        <div
          className=" mx-5 px-5 pt-5 fs-5 fst-italic text-decoration-none"
          style={{ color: "#7b5844" }}
        >
          &#10132; Back to all projects
        </div>
      </div>

      <div className="container mt-5 tabletask">
        <div className="row">
          <div className="col-12">
            <table className="table table-striped mt-4 mb-5">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Objective</th>
                  <th>Person In Charge</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((task) => {
                  // If the current task name already exists
                  if (uniqueTaskNames[task.taskname]) {
                    // If true, display an empty string
                    return (
                      <tr key={task.taskid}>
                        <td className="fw-bold">{""}</td>
                        <td>{task.taskobjective}</td>
                        <td>{task.taskpic}</td>
                        <td>{task.taskstart}</td>
                        <td>{task.taskend}</td>
                        <td
                          className="opstatus fst-italic"
                          style={{
                            fontWeight:
                              task.taskstatus === "Completed"
                                ? "bold"
                                : "normal",
                            color:
                              task.taskstatus === "Completed"
                                ? "#3b798c"
                                : "#7b5844",
                          }}
                        >
                          {task.taskstatus}
                        </td>
                      </tr>
                    );
                  } else {
                    // Otherwise, add the task name
                    uniqueTaskNames[task.taskname] = true;

                    // Show color based on task status
                    let statusColor = "";
                    if (task.taskstatus === "Completed") {
                      statusColor = "#3b798c";
                    } else if (task.taskstatus === "In Progress") {
                      statusColor = "#7b5844";
                    }

                    return (
                      <tr key={task.taskid}>
                        <td className="ttaskcolor fs-5 fw-bold">
                          <button>{task.taskname}</button>
                        </td>
                        <td>{task.taskobjective}</td>
                        <td>{task.taskpic}</td>
                        <td>{task.taskstart}</td>
                        <td>{task.taskend}</td>

                        <td
                          className="opstatus fst-italic"
                          style={{
                            fontWeight:
                              task.taskstatus === "Completed"
                                ? "bold"
                                : "normal",
                            color: statusColor, // statusColor
                          }}
                        >
                          {task.taskstatus}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>

            <div className="justify-content-center text-center mt-5 ">
              <button
                type="submit"
                className="btn border-0 mb-5 text-white px-4 py-2 w-25"
                style={{ backgroundColor: "#3b798c" }}
              >
                Add New Objective
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
