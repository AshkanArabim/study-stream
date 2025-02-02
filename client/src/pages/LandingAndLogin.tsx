import { Button, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import { Link as RouteLink } from "react-router-dom";

const LandingAndLogin = () => {
	return (
		<Flex direction="column" height="100vh" alignItems="stretch" width="100vw">
			{/* header */}
			<Flex as="nav" justifyContent="space-between" padding="10px" alignItems="center">
				<RouteLink to="/">
					{/* height hardcoded to match height of header buttons... */}
					<Logo style={{ height: "40px", width: "auto" }} />
				</RouteLink>

				<Flex gap="10px">
					<Link to="/signup">
						<Button variant="outline">Sign up</Button>
					</Link>
					<Link to="/login">
						<Button>Log in</Button>
					</Link>
				</Flex>
			</Flex>

			{/* body comes here */}
			<Outlet />
		</Flex>
	);
};

export default LandingAndLogin;
