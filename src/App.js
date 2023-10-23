import { Route, useHistory } from "react-router-dom";
import GetStarted from "./pages/GetStarted";

function App() {
	return (
		<div className="app">
			<Route exact path="/">
				<GetStarted className="container" />
			</Route>
		</div>
	);
}

export default App;
