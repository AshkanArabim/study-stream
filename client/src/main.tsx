import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ChakraProvider } from "./components/ui/provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import { Theme } from "@chakra-ui/react";
import Login from "./pages/Login.tsx";
import LandingAndLogin from "./pages/LandingAndLogin.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.ts";
import LoggedOutProtector from "./route_protectors/LoggedOutProtector.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AuthLoader from "./pages/AuthLoader.tsx";
import LoggedInProtector from "./route_protectors/LoggedInProtector.tsx";
import LoggedInLayout from "./pages/LoggedInLayout.tsx";
import Explore from "./pages/Explore.tsx";
import Profile from "./pages/Profile.tsx";
import CreateProject from "./pages/CreateProject.tsx";

const router = createBrowserRouter([
	{
		path: "",
		element: <LoggedOutProtector />,
		children: [
			{
				path: "",
				element: <LandingAndLogin />,
				children: [
					{
						path: "",
						element: <Landing />,
					},
					{
						path: "login",
						element: <Login />,
					},
					{
						path: "signup",
						element: <Signup />,
					},
				],
			},
		],
	},
	{
		path: "",
		element: <LoggedInProtector />,
		children: [
			{
				path: "",
				element: <LoggedInLayout />,
				children: [
					{
						path: "dashboard",
						element: <Dashboard />,
					},
					{
						path: "explore",
						element: <Explore />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "newproject",
						element: <CreateProject />,
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider>
				<Theme colorPalette="yellow">
					<AuthLoader>
						<RouterProvider router={router} />
					</AuthLoader>
				</Theme>
			</ChakraProvider>
		</ReduxProvider>
	</StrictMode>
);
