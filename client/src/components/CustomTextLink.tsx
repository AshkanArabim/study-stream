import { Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

interface CustomRouteLinkProps {
	to: string;
	children: React.ReactNode;
}
export default function CustomTextLink({ to, children }: CustomRouteLinkProps) {
	return (
		<RouteLink to={to}>
			<Link>{children}</Link>
		</RouteLink>
	);
}
