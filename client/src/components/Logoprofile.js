import profile from "../images/profile.png";

export default function logoprofile({ width = 80, height = 80 }) {
  return (
    <div className="logows">
      <div>
        <img
          src={profile}
          alt="Logo Profile"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: "#7b5844",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
