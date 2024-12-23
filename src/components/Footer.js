import Logows from "./Logows";

export default function Footer() {
  return (
    <div className="w-100 bg-secondary text-center pb-4">
      <div className="container">
        <div className="row mt-5 text-white pt-5 ">
          <div className="col-4 lh-lg">
            <ul className="list-unstyled">
              <li>About</li>
              <li>Services</li>
              <li>RGPD</li>
            </ul>
          </div>
          <div className="col-4 lh-lg">
            <ul className="list-unstyled ">
              <li>Partners</li>
              <li>Achievements</li>
            </ul>
          </div>
          <div className="col-4 lh-lg">
            <ul className="list-unstyled">
              <li>Contact</li>
              <li> &copy; WorkSpace</li>
              <li className="mt-2">
                  <Logows width={40} height={40} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
