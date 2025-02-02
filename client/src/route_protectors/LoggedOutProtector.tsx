import { useAppSelector } from "@/store/hooks"
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedOutProtector() {
    const loggedIn:boolean = useAppSelector((state) => state.user.username).length > 0;

    console.log('username:', useAppSelector((state) => state.user.username))
    console.log('redirect is needed?', loggedIn); // debug

    if (loggedIn) {
        console.log('returning a redirect!!'); // debug
        return <Navigate to={'/dashboard'} />
    }

    return (
        <Outlet />
    )
}
