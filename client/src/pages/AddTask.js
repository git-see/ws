import Menu from "../components/Menu";

export default function AddTask() {
  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div className="d-flex">
        <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
          Add New task
        </h1>
        <h2 className="text-secondary px-5 pt-5">
          {/*project.projectname*/}
          "Nature & Me"
        </h2>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center px-3">
          <form className="px-5 py-5">
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskrole">
                Role
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="taskrole"
                id="taskrole"
              />
            </div>

            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskobjective">
                Objective
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="taskobjective"
                id="taskobjective"
              />
            </div>

            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskpic">
                Person In Charge
              </label>
              <select
                className="form-control form-control-lg text-secondary fs-6"
                name="taskpic"
                id="taskpic"
              >
                <option value="">Select a person &#9207;</option>
                <option value="John">John</option>
                <option value="Siam">Siam</option>
                <option value="Melody">Melody</option>
                <option value="Tom">Tom</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskstart">
                Start date
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="taskstart"
                id="taskstart"
              />
            </div>

            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskend">
                Delivery Date
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="taskend"
                id="taskend"
              />
            </div>

            <div className="d-flex justify-content-center">
              <input
                type="submit"
                className="btn border-0 px-3 py-2 mx-3 w-25 text-white text-decoration-none"
                value="Add Task"
                style={{ backgroundColor: "#3b798c" }}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
