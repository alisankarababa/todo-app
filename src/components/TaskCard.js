import "./TaskCard.css";

export default function TaskCard(props) {
	const { className, task, hSetTaskStatus } = props;

	return (

		<div class="task-card-container">
            <div className= {`task-card ${className}`}>
                <p className="task-card__deadline">{task.deadline}</p>
                <p className="task-card__description">{task.description}</p>
                <button className="task-card__button" onClick={() => {hSetTaskStatus(task.id, !task.isComplete)}} >{task.isComplete ? "Mark Incomplete" : "Mark Complete"}</button>
            </div>
        </div>
	);
}
