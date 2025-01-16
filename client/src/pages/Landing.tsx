import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Landing: React.FC = () => {
	return (
		<Flex direction="column" height="100vh" alignItems="stretch" width="100vw">
			<Flex as="nav" direction="row-reverse" padding="10px" gap="10px">
				<Button>Log in</Button>
				<Button variant="outline">Sign up</Button>
			</Flex>
			<Flex flex="1" direction="column" alignItems="center" justifyContent="center" gap="15px">
				<Heading as="h1" textStyle="6xl">
					Study Stream!
				</Heading>
				<Text>Log in to get started</Text>
			</Flex>
		</Flex>
	);
};

export default Landing;
