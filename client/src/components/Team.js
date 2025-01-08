const Team = () => {
  const data = [];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2>Our Team</h2>
          <table className="table table-striped mt-4 mb-5 table-responsive">
            <thead>
              <tr>
                <th className="px-5" style={{ width: "50%" }}>
                  Role
                </th>
                <th className="px-5" style={{ width: "50%" }}>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td className="border border-right-0-secondary px-5">
                    {user.role}
                  </td>
                  <td className="border border-right-0-secondary px-5">
                    {user.namet}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
