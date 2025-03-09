// import { useAppSelector } from "@/store/hooks";
// import { logInWithTokenCookie } from "@/utils/utils";
import { Flex, Heading, Text } from "@chakra-ui/react";
// import { useEffect } from "react";

const Landing = () => {
	// // debug: vv calling utils to make sure it works

	// const user = useAppSelector((state) => state.user);
	// useEffect(() => {
	// 	// call login function
	// 	logInWithTokenCookie().then(async () => {
	// 		// print updated user
	// 		console.log("USER COMING UP!!! vv");
	// 		console.log(user);
	// 	});
	// });

	// // debug: ^^

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
