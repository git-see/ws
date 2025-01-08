import Header from "../components/Header";
import Menu from "../components/Menu";
import Team from "../components/Team";
import CurrentProjects from "../components/CurrentProjects";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="w-100 home">
      <div>
        <div className="col-12">
          <Header />
        </div>
        <div className="col-12">
          <Menu />
        </div>
        <div>
          <h1 className="h1"> Welcome Home !</h1>
        </div>
      </div>
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
      <div className="col-12">
        <Footer />
      </div>
    </div>
  );
}
