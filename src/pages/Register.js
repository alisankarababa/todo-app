import "./Register.css"
import {Link} from "react-router-dom"
import { useForm } from "react-hook-form";
import { useEffect } from "react";



export default function GetStarted(props) {
    
    const { className, hSignUp } = props;

	const {
		register,
		reset,
        watch,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: "onBlur" });

	function onSubmit(formData) {
		reset();
		hSignUp(formData);
	}



	return (
        <div className={`register ${className}`}>
        <h1 className="fnt-w700">Welcome On Board!</h1>
        <p>Let’s help you to complete your tasks</p>

		<form
			className={`form ${className}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form-group">
				<input
					className={`form-input ${watch("first_name", "") ? "input-notempty" : ""}`}
					id="first_name"
					type="text"
					{...register("first_name", {
						required:
							"First name is required.",
						maxLength: 80,
					})}
				/>
                <label htmlFor="first_name" className="form-input-label">First Name</label>
			</div>
            {errors.first_name && (
					<p className="form-error pl-1em pb-1-5rem">{errors.first_name.message}</p>
				)}

			<div className="form-group">
				<input
					className={`form-input ${watch("last_name", "") ? "input-notempty" : ""}`}
					id="last-name"
					type="text"
					{...register("last_name", {
						required: "Last name is required.",
						maxLength: 100,
					})}
				/>
                <label htmlFor="last_name" className="form-input-label">Last Name</label>
            </div>
				{errors.last_name && (
					<p className="form-error pl-1em pb-1-5rem">{errors.last_name.message}</p>
				)}

			<div className="form-group">
				<input
					className={`form-input ${watch("email", "") ? "input-notempty" : ""}`}
					id="email"
					type="email"
					{...register("email", {
						required: "Email is required.",
						pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Not a valid email pattern."
                        }
					})}
				/>
                <label htmlFor="email" className="form-input-label">Email</label>
            </div>
				{errors.email && (
					<p className="form-error pl-1em pb-1-5rem">{errors.email.message}</p>
				)}
			<div className="form-group">
				<input
					className={`form-input ${watch("password", "") ? "input-notempty" : ""}`}
					id="password"
					type="password"
					{...register("password", { required: "Password is required" })}
				/>
                <label htmlFor="password" className="form-input-label">Password</label>

			</div>
                {errors.password && (
					<p className="form-error pl-1em pb-1-5rem">{errors.password.message}</p>
				)}

            <input disabled={!isValid} className="btn btn-full bg-greenish" type="submit" value="Register"/>
		</form>

        <p>Already have an account? <Link className="clr-greenish" to="/signin">Sign In</Link></p>

        </div>
	);
}