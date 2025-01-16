import { Flex, Heading, Text } from "@chakra-ui/react";

const Landing = () => {
	// manually importing chakra's theme

	return (
		<Flex flex="1" direction="column" alignItems="center" justifyContent="center" gap="15px">
			<Heading as="h1" textStyle="6xl">
				Study Stream!
			</Heading>
			<Text>Log in to get started</Text>
		</Flex>
	);
};

export default Landing;
