import { useForm } from "react-hook-form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./SignIn.css";

import imgSignInSvg from "../assets/signin.svg";

export default function SignIn(props) {
	const { className, hSignIn } = props;

	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: "onBlur" });

	function onSubmit(formData) {
		reset();
		hSignIn(formData);
	}
	return (
		<div className={`signin ${className}`}>
			<h1 className="fnt-w700">Welcome Back!</h1>
			<p>Let’s help you to complete your tasks.</p>

            <img src={imgSignInSvg} alt="signin-img"/>

			<form
				className={`form-signup ${className}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="form-group">
					<input
						className={`form-input ${
							watch("email", "") ? "input-notempty" : ""
						}`}
						id="email"
						type="email"
						{...register("email", {
							required: "Email is required.",
							maxLength: 80,
						})}
					/>
					<label htmlFor="email" className="form-input-label">
						Email
					</label>
				</div>
				{errors.email && <p className="form-error pl-1em pb-1-5rem">{errors.email.message}</p>}

				<div className="form-group">
					<input
						className={`form-input ${
							watch("password", "") ? "input-notempty" : ""
						}`}
						id="password"
						type="password"
						{...register("password", {
							required: "Password is required",
							maxLength: 100,
						})}
					/>
					<label htmlFor="password" className="form-input-label">
						Password
					</label>
				</div>
				{errors.password && (
					<p className="form-error pl-1em pb-1-5rem">{errors.password.message}</p>
				)}

				<input
					disabled={!isValid}
					class="btn btn-full bg-greenish"
					type="submit"
					value="Login"
				/>
			</form>

			<p>
				Don't have an account?{" "}
				<Link className="clr-greenish" to="/register">
					Sign Up
				</Link>
			</p>
		</div>
	);
}
