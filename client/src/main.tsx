import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "./components/ui/provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import { Theme } from "@chakra-ui/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
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
