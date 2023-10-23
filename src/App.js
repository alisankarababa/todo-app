import "./App.css";

import { Route, useHistory } from "react-router-dom";
import GetStarted from "./pages/GetStarted";

function App() {
	const [users, updateUsers, clearUsers] = useLocalStorage("users", []);
	const history = useHistory();
	function hSignUp(userInfo) {
		userInfo.signupTime = Date.now();
		userInfo.id = nanoid();

		const usersNew = [...users, userInfo];
		updateUsers(usersNew);
        setSingedInUser(userInfo);
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
		</div>
	);
}

export default App;
