import { Button, Card, Fieldset, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Form } from "react-router-dom";
import { BACKEND_URL } from "@/utils/vars";
import { extractStrings } from "@/utils/utils";
import { useState } from "react";

export default function Login() {
	const [message, setMessage] = useState("");
	const [failure, setFailure] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		// make login request
		fetch(BACKEND_URL + "/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then(async (response) => {
				const data = await response.json()

				if (response.ok) {
					setMessage("Login successful!");
					setFailure(false);
				} else {
					const serverErrorResponse: string = extractStrings(data)[0];
					setMessage("Login failed: " + (serverErrorResponse || "Unknown"));
					setFailure(true);
				}
			})
			.catch((error) => {
				setMessage("Error: " + error.message);
				setFailure(true);
			});

		// set state to loading while waiting
		setMessage("loading...")
	}
	
	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			height="100vh"
			padding="10px"
			direction="column"
			gap="15px"
		>
			<Card.Root padding="10px" width="400px" maxWidth="100%">
				<Form onSubmit={handleSubmit}>
					<Fieldset.Root>
						<Stack>
							<Fieldset.Legend as="h3" textStyle="2xl">
								Log in
							</Fieldset.Legend>
						</Stack>
						<Fieldset.Content>
							<Field label="Username" required>
								<Input name="username" type="text" />
							</Field>
							<Field label="Password" required>
								<Input name="password" type="password" />
							</Field>
						</Fieldset.Content>
						<Text color={failure ? "fg.error" : "InfoText"}>{message}</Text>
						<Button type="submit" mx="auto">
							Submit
						</Button>
					</Fieldset.Root>
				</Form>
			</Card.Root>
		</Flex>
	);
}
