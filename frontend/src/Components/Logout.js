import { useHistory } from "react-router-dom";

export default function Logout() {

    const history = useHistory();

    localStorage.removeItem("user");
    localStorage.removeItem("gSignIn");
    history.push('/login');
    
    return(null);
}