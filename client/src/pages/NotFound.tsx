import { Button, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export default function NotFound() {
    return (
        <Flex alignItems="center" justifyContent="center" height="100vh">
            <Stack>
                <Heading>Page not found :/</Heading>
                <HStack justifyContent="center">
                    <RouteLink to="/"><Button>Go Home</Button></RouteLink>
                </HStack>
            </Stack>
        </Flex>
    )
}
