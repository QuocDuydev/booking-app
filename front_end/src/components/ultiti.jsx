export function useAccessToken() {
	const authTokens = localStorage.getItem("authTokens");

	if (authTokens) {
		const parsedTokens = JSON.parse(authTokens);

		if (parsedTokens?.access) {
			return parsedTokens.access;
		}
		return null;
	}

	return null;
}
export default useAccessToken;
