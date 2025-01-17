import { Button, Card, Fieldset, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Form } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "@/utils/vars";
import { extractStrings } from "@/utils/utils";

export default function Signup() {
	const [message, setMessage] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [failure, setFailure] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// make request
		// on callback, update state depending on status code
		fetch(BACKEND_URL + "/api/auth/registration/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password1: password,
				password2: password,
			}),
		})
			.then(async (response) => {
				const data = await response.json();

				if (response.ok) {
					setMessage("Registration successful! Now, sign in with your new account.");
					setFailure(false);
				} else {
					const serverErrorResponse: string = extractStrings(data)[0];
					setMessage("Registration failed: " + (serverErrorResponse || data.message));
					setFailure(true);
				}
			})
			.catch((error) => {
				setMessage("Error:" + error.message);
			});

		// set state to loading while waiting
		setMessage("loading...");
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let match = false;
		if (name === "password") {
			setPassword(value);
			match = value === repeatPassword;
		} else if (name === "repeatPassword") {
			setRepeatPassword(value);
			match = value === password;
		}

		setPasswordMatch(match);
		setMessage(match ? "" : "Passwords do not match");
		setFailure(!match);
	};

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
								Sign up
							</Fieldset.Legend>
						</Stack>
						<Fieldset.Content>
							<Field label="Username" required>
								<Input name="username" type="text" />
							</Field>
							<Field label="Email" required>
								<Input name="email" type="email" />
							</Field>
							<Field label="Password" required>
								<Input
									name="password"
									type="password"
									value={password}
									onChange={handlePasswordChange}
								/>
							</Field>
							<Field label="Repeat Password" required>
								<Input
									name="repeatPassword"
									type="password"
									value={repeatPassword}
									onChange={handlePasswordChange}
								/>
							</Field>
						</Fieldset.Content>
						<Text color={failure ? "fg.error" : "InfoText"}>{message}</Text>
						<Button type="submit" mx="auto" disabled={!passwordMatch}>
							Submit
						</Button>
					</Fieldset.Root>
				</Form>
			</Card.Root>
		</Flex>
	);
}
