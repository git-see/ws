import Menu from "../components/Menu";

export default function TeamCrud() {
  const data = [
    { role: "Manager", namet: "John" },
    { role: "Designer", namet: "Siam" },
    { role: "Web Developer", namet: "Melody" },
    { role: "Community Manager", namet: "Tom" },
  ];

  return (
    <div className="w-100">
      <div>
        <div className="col-12">
          <Menu />
        </div>
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            Team Composition
          </h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="justify-content-center text-center mb-5 pb-2">
              <button
                className="btn border-0 text-white px-4 py-2 w-25"
                style={{ backgroundColor: "#3b798c" }}
              >
                Add A Colleague
              </button>
            </div>
            <table className="table table-striped mx-5 mt-4 mb-5">
              <thead>
                <tr style={{ width: "40%" }}>
                  <th>Role</th>
                  <th style={{ width: "40%" }}>Name</th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    {" "}
                    <td className="text-secondary">{user.role}</td>
                    <td className="text-secondary">{user.namet}</td>
                    <td className="btn-group text-center w-100">
                      <input
                        type="submit"
                        className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                        value="Edit"
                        style={{ backgroundColor: "#3b798c" }}
                      ></input>
                      <input
                        type="submit"
                        className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                        value="Delete"
                        style={{ backgroundColor: "#3b798c" }}
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
