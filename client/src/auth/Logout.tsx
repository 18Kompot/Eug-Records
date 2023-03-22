import { useContext } from "react";
import { AppContext } from "../App";

function Logout() {
  const context = useContext(AppContext);
  if (!context) return <div>Error</div>;

  return (
    <span className="btn" onClick={(e) => context.handleLogout()}>
      Log Out
    </span>
  );
}

export default Logout;
