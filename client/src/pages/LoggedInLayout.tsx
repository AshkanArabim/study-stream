import SidebarButton from "@/components/SidebarButton";
import { Box, Button, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { CircleUserRound, Gauge, Plus, Search } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function LoggedInLayout() {
	return (
		<Container h="dvh">
			<HStack h="100%" w="100%">
				<Stack w="250px" h="100%" borderRightWidth="1px" justifyContent="space-between" flex="0 0 auto">
					{/* sidebar starts here */}
					<Stack gap="0">
						{/* top half of sidebar */}
						<Link to="/">
                            <Box borderBottomWidth="1px">
                                <Button variant="plain">HackerHunt</Button>
                            </Box>
                        </Link>

						<SidebarButton label="Dashboard" icon={Gauge} dest="/dashboard" />
						<SidebarButton label="Explore" icon={Search} dest="/explore" />
						<SidebarButton label="Profile" icon={CircleUserRound} dest="/profile" />
						<SidebarButton label="Create Project" icon={Plus} dest="/newproject" />
					</Stack>
					<Stack>
						{/* bottom half of sidebar */}
						<Text>will do this later...</Text>
						{/* TODO: */}
					</Stack>
				</Stack>
				<Outlet />
			</HStack>
		</Container>
	);
}
