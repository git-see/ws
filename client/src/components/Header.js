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

// mongosh "mongodb+srv://cluster0.b4z5o.mongodb.net/" --apiVersion 1 --username willnpm

// mongodb+srv://willnpm:<db_password>@cluster0.b4z5o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
