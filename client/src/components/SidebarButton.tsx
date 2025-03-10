import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface SidebarButtonProps {
	label: string;
	icon: LucideIcon;
}

export default function SidebarButton({ label, icon }: SidebarButtonProps) {
	return (
		<Button variant="ghost" justifyContent="flex-start">
			<HStack>
				<Box as={icon} />
				<Text>{label}</Text>
			</HStack>
		</Button>
	);
}
