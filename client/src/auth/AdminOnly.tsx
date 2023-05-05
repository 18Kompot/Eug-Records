import { useContext } from "react";
import { AppContext } from "../App";

function AdminOnly() {
  const context = useContext(AppContext);
  const admin = context && context.isAdmin;

  if (admin) {
    return <h2 className="text-center">You are an admin</h2>;
  }
  return <div className="text-danger">Forbbiden</div>;
}
export default AdminOnly;
