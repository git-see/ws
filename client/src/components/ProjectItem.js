export default function ProjectItem(props) {
  const project = [
    {
      projectid: 1,
      projectname: "Speed cars",
      projectstart: "16/05/2024 08h00",
      projectend: "14/10/2024 14h00",
      projectstatus: "Completed",
      projectcomment: "Showcase website- Annual maintenance",
    },
    {
      projectid: 2,
      projectname: "NiceCity",
      projectstart: "16/05/2024 14h00",
      projectend: "18/08/2024 12h00",
      projectstatus: "Completed",
      projectcomment:
        "Website redesign for the Nice City town hall- Annual maintenance",
    },
    {
      projectid: 3,
      projectname: "Nature & Me",
      projectstart: "20/12/2024 08h00",
      projectend: "10/10/2025 14:00",
      projectstatus: "In Progress",
      projectcomment:
        "Optimizing total ecology: web hosting, design, development",
    },
    {
      projectid: 4,
      projectname: "Hairdressing Bar",
      projectstart: "27/12/2024 08h00",
      projectend: "03/03/2025 14:00",
      projectstatus: "In Progress",
      projectcomment: "Showcase website",
    },
  ];

  return (
    <tbody>
      {project.map((project) => (
        <tr key={project.projectid}>
          {" "}
          <td className="text-secondary">{project.projectname}</td>
          <td className="text-secondary">{project.projectstart}</td>
          <td className="text-secondary">{project.projectend}</td>
          <td
            className="fst-italic"
            style={{
              fontWeight:
                project.projectstatus === "Completed" ? "bold" : "normal",
              color:
                project.projectstatus === "Completed" ? "#3b798c" : "#7b5844",
            }}
          >
            {project.projectstatus}
          </td>
          <td className="text-secondary">{project.projectcomment}</td>
          <td className="btn-group">
            <input
              type="submit"
              className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
              value="Edit"
              style={{ backgroundColor: "#3b798c" }}
            ></input>
            <input
              type="submit"
              className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
              value="View"
              style={{ backgroundColor: "#3b798c" }}
            ></input>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
