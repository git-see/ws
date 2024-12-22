import Team from "../components/Team";
import CurrentProjects from "../components/CurrentProjects";

export default function Home() {
  return (
    <div className="home">
      <h2 className="h2"> Welcome Home !</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Team />
          </div>
          <div className="col-12">
            <CurrentProjects />
          </div>
        </div>
      </div>
    </div>
  );
}
