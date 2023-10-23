import "./App.css";

import { Route, useHistory } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./hooks/custom-hooks";
import GetStarted from "./pages/GetStarted";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
	const [signedInUser, setSingedInUser] = useState(null);
	const [users, updateUsers, clearUsers] = useLocalStorage("users", []);
	const history = useHistory();
	const [credentialError, updateCredentialError, clearCredentialError] =
		useLocalStorage("loginError", null);
	function hSignUp(userInfo) {
		userInfo.signupTime = Date.now();
		userInfo.id = nanoid();

		const usersNew = [...users, userInfo];
		updateUsers(usersNew);
        setSingedInUser(userInfo);
		history.push("/tasks");
	}

	function hSignIn(credentials) {
		console.log(credentials);
		const user = users.find((user) => {
			return user.email === credentials.email;
		});

		if (!user) {
			updateCredentialError({
				type: "email",
				message: "This email does not exist.",
			});
			return;
		}

		if (user.password !== credentials.password) {
			updateCredentialError({ type: "password", message: "Wrong password!" });
			return;
		}

		setSingedInUser({ ...user });
		clearCredentialError();
		console.log(user);
		history.push("/tasks");
	}

	return (
		<div className="app">
			<Route exact path="/">
				<GetStarted className="container" />
			</Route>

			<Route exact path="/register">
				<Register className="container" hSignUp={hSignUp} />
			</Route>

			<Route exact path="/signin">
				<SignIn className="container" hSignIn={hSignIn} />
			</Route>
		</div>
	);
}

export default App;
