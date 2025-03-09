import { useAppSelector } from "@/store/hooks";
import { checkUserTokens } from "@/utils/utils";
import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AuthLoader({ children }: { children: React.ReactNode }) {
	const loggedIn: boolean | undefined = useAppSelector((state) => state.user.loggedIn);
	const [loading, setLoading] = useState(true);

	// check once if use is logged in
	useEffect(() => {
		if (loggedIn === undefined) {
			checkUserTokens().finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [loggedIn]);

	if (loading) {
		return (
			<Center h="dvh" w="dvw">
				<Spinner size="xl" />
			</Center>
		);
	}

	return <>{children}</>;
}
