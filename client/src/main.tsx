import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import { Theme } from "@chakra-ui/react";
import Login from "./pages/Login.tsx";
import LandingAndLogin from "./pages/LandingAndLogin.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingAndLogin />,
		children: [
			{
				path: "/",
				element: <Landing />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<Theme colorPalette="yellow">
				<RouterProvider router={router} />
			</Theme>
		</Provider>
	</StrictMode>
);
