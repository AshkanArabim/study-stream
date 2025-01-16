import { Button, Card, Fieldset, Flex, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Form } from "react-router-dom";

export default function Signup() {
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
				<Form>
					<Fieldset.Root>
						<Stack>
							<Fieldset.Legend as="h3" textStyle="2xl">
								Sign up
							</Fieldset.Legend>
						</Stack>
						<Fieldset.Content>
							<Field label="Username">
								<Input name="username" type="text" />
							</Field>
							<Field label="Email">
								<Input name="username" type="email" />
							</Field>
							<Field label="Password">
								<Input name="username" type="text" />
							</Field>
							<Field label="Repeat Password">
								<Input name="username" type="text" />
							</Field>
						</Fieldset.Content>

						<Button type="submit" mx="auto">
							Submit
						</Button>
					</Fieldset.Root>
				</Form>
			</Card.Root>
		</Flex>
	);
}
