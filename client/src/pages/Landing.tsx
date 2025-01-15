import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Landing: React.FC = () => {
	return (
		<Flex direction="column" height="100vh" alignItems="stretch" width="100vw">
			<Flex as="nav" direction="row-reverse" padding="10px" backgroundColor="red">
				<Button variant="ghost">Log in</Button>
			</Flex>
			<Flex flex="1" direction="column" alignItems="center" justifyContent="center">
				<Heading as='h1'>Study Stream!</Heading>
				<Text>Log in to get started</Text>
			</Flex>
		</Flex>
	);
};

export default Landing;
