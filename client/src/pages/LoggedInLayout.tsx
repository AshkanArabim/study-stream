import SidebarButton from "@/components/SidebarButton";
import { Box, Button, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { CircleUserRound, Gauge, Plus, Search } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function LoggedInLayout() {
	return (
		<Container h="dvh">
			<HStack h="100%" w="100%">
				<Stack w="250px" h="100%" borderRightWidth="1px" justifyContent="space-between">
					{/* sidebar starts here */}
					<Stack gap="0">
						{/* top half of sidebar */}
						<Box borderBottomWidth="1px">
							<Button variant="plain">HackerHunt</Button>
						</Box>

						<SidebarButton label="Dashboard" icon={Gauge} />
						<SidebarButton label="Explore" icon={Search} />
						<SidebarButton label="Profile" icon={CircleUserRound} />
						<SidebarButton label="Create Project" icon={Plus} />
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
