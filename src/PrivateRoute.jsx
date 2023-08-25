import NotFound from "./Components/NotFound";

var grupo = sessionStorage.getItem("grupo");
export function CheckRole({ role, children }) {
  const loggedUserRole = grupo;

  return role.toString() === loggedUserRole ? children : <NotFound />;
}
