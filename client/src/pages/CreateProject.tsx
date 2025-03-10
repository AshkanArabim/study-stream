import { Field } from "@/components/ui/field";
import { Container, Fieldset, Heading, Input, Textarea } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export default function CreateProject() {
	// TODO: vv
	const handleSubmit = () => {};

	return (
		<Container minHeight="100%" paddingY={6}>
			<Heading textAlign="center">Create Project</Heading>
			<Form onSubmit={handleSubmit}>
				<Fieldset.Root>
					<Field label="Project Title">
						<Input name="title" type="text" placeholder="HackerHunt" />
					</Field>

					<Field label="Description">
						<Textarea
							name="description"
							rows={4}
							placeholder="HackerHunt is a website aiming to help CS students find technical sideprojects to collaborate on."
						/>
					</Field>

					{/* TODO: vv */}
					<Field label="Skills">
						<Input
							name="skills"
							type="text"
							placeholder="TODO: implement a skill selection system..."
						/>
					</Field>

					<Field label="Contributor Expectations">
						<Input
							name="cont-expectations"
							type="text"
							placeholder="We're looking for someone with Django experience to write the back-end. You'll write the ..."
						/>
					</Field>

					<Heading size="md" mt={4}>
						Project Links
					</Heading>
					<Container display="flex" gap={4}>
						<Field label="Discord">
							<Input name="discord" type="text" placeholder="https://discord.gg/..." />
						</Field>

						<Field label="GitHub">
							<Input name="github" type="text" placeholder="https://github.com/..." />
						</Field>
					</Container>

					<Field label="Post-Acceptance Info">
						<Textarea
							name="cont-expectations"
							rows={4}
							placeholder="e.g. Contact info & other details to share once a contributor is accepted."
						/>
					</Field>
				</Fieldset.Root>
			</Form>
		</Container>
	);
}
