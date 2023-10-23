import "./Tasks.css";
import { useForm } from "react-hook-form";

export default function Tasks(props) {
	const { className, hAddTask } = props;

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: "onBlur" });

	function onSubmit(formData) {
		hAddTask(formData);
	}

	return (
		<form
			className={`form-tasks ${className}`}
			onSubmit={handleSubmit(onSubmit)}
		>
				<label className="form-tasks--label" htmlFor="email">
					Task Description
				</label>
				<textarea
					className="form-tasks--input bg-white"
					id="task-description"
					type="textarea"
					rows="4"
					{...register("description", {
						required: "Task description is required",
					})}
				/>
                {errors.description && <p className="form-error mt-1rem">{errors.description.message}</p>}
				<label className="form-tasks--label" htmlFor="deadline">
					Deadline
				</label>
				<input
					className="form-tasks--input bg-white"
					id="deadline"
					type="date"
					{...register("deadline", { required: "Deadline is required" })}
				/>
                {errors.deadline && <p className="form-error mt-1rem">{errors.deadline.message}</p>}

            <input disabled={!isValid} className="btn btn-full bg-greenish mt-1rem" type="submit" value="Submit"/>
		</form>
	);
}
