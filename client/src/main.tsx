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
		errorElement: <NotFound />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider>
				<Theme colorPalette="yellow">
					<RouterProvider router={router} />
				</Theme>
			</ChakraProvider>
		</ReduxProvider>
	</StrictMode>
);
