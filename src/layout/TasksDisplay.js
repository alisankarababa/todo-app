import "./TasksDisplay.css";

import TaskCard from "../components/TaskCard";

export default function TasksDisplay(props) {
	const { title, tasks, className, hSetTaskStatus } = props;

	return (
		<div className={`tasks-display ${className}`}>
            <h1 className="tasks-display__title">{title}</h1>
			{tasks &&
				tasks.map((task) => {
					return (
                        <TaskCard task={task} hSetTaskStatus={hSetTaskStatus}/>
					);
				})}
		</div>
	);
}
