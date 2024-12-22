export default function Menu() {
  return (
    <div className="menu container">
      <div className="row">
        <div className="col-12">
          <ul className="d-flex justify-content-around align-items-center mt-2 mb-5 list-unstyled fs-5">
            <li className="border border-3-secondary py-4 px-4 rounded-2">
              Home
            </li>
            <li className="border border-3-secondary py-4 px-4 rounded-2">
              Team
            </li>
            <li className="border border-3-secondary py-4 px-4 rounded-2">
              All projects
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
