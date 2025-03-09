import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInProtector() {
	const loggedIn: boolean = useAppSelector((state) => state.user.loggedIn) ?? false;

	if (!loggedIn) {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
}
