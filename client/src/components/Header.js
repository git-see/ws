import Logows from "./Logows";

export default function Header() {
  return (
    <div>
      <div>
        <div className="position-absolute m-4">
          <Logows width={80} height={80} />
        </div>
        <div className="header">
          <div className="bg-title">
            <h1>WORKSPACE</h1>
          </div>
        </div>
      </div>
    </div>
  );
}


