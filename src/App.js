import "./App.css";

import { Route, useHistory } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./hooks/custom-hooks";
import Tasks from "./layout/Tasks";
import TasksDisplay from "./layout/TasksDisplay";
import GetStarted from "./pages/GetStarted";
import User from "./layout/User";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
	const [signedInUser, setSingedInUser] = useState(null);
	const [users, updateUsers, clearUsers] = useLocalStorage("users", []);
	const [tasks, updateTasks, clearTasks] = useLocalStorage("tasks", []);

	const history = useHistory();
	const [credentialError, updateCredentialError, clearCredentialError] =
		useLocalStorage("loginError", null);

	function hAddTask(taskInfo) {
		taskInfo.additionTime = Date.now();
		taskInfo.id = nanoid();
		taskInfo.userId = signedInUser.id;
        taskInfo.isComplete = false;
		console.log(taskInfo);
		const tasksNew = [...tasks, taskInfo];
		updateTasks(tasksNew);
	}

	function hLogout(userInfo) {
		setSingedInUser(null);
		history.push("/signin");
	}

    function hSetTaskStatus(taskId, status) {

        const tasksUpdated = tasks.map((task) => {
            
            if(task.id === taskId)
                task.isComplete = status;

            return task;
        })

        updateTasks(tasksUpdated);
    }

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

			{signedInUser && (
				<Route exact path="/tasks">
					<User user={signedInUser} hLogout={hLogout} />
					<Tasks
						className="tasks container"
						hAddTask={hAddTask}
						credentialError={credentialError}
					/>
					<div className="task-display-area">
						<TasksDisplay
                            title="Complete Tasks"
                            hSetTaskStatus={hSetTaskStatus}
							tasks={
								signedInUser &&
								tasks.filter((task) => task.userId === signedInUser.id && task.isComplete === true)
							}
						/>
						<TasksDisplay
                            title="Incomplete Tasks"
                            hSetTaskStatus={hSetTaskStatus}
							tasks={
								signedInUser &&
								tasks.filter((task) => task.userId === signedInUser.id && task.isComplete === false)
							}
						/>
					</div>
				</Route>
			)}
		</div>
	);
}

export default App;
