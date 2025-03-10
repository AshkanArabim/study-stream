import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarButtonProps {
	label: string;
	icon: LucideIcon;
    dest: string;
}

export default function SidebarButton({ label, icon, dest }: SidebarButtonProps) {
	return (
		<Link to={dest}>
            <Button variant="ghost" justifyContent="flex-start">
                <HStack>
                    <Box as={icon} />
                    <Text>{label}</Text>
                </HStack>
            </Button>
        </Link>
	);
}
