import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import AddProject from "./pages/AddProject";
import Footer from "./components/Footer";

import "./css/app.css";

function App() {
  return (
    <>
      <Header />
      <Menu />
      <Home />
      <AllProjects />
      <AddProject />
      <Footer />
    </>
  );
}

export default App;
