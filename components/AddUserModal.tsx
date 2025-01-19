import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	name: string;
	username: string;
	password: string;
	confirm_password: string;
	role: string;
};

function AddUserModal() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		resetField,
		reset,
	} = useForm<Inputs>({
		defaultValues: {},
	});

	const onSubmit: SubmitHandler<Inputs> = () => {};

	const password = watch("password");

	const closeModal = () => {
		const modalElement = document.getElementById(
			"add_user_modal"
		) as HTMLDialogElement | null;

		modalElement?.close();
		reset();
	};
	return (
		<dialog
			id="add_user_modal"
			className="modal modal-bottom sm:modal-middle"
			onClick={closeModal}
		>
			<div className="modal-box" onClick={(e) => e.stopPropagation()}>
				<h3 className="font-bold text-lg">New User</h3>

				<form
					className=" w-full flex flex-col gap-1"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="w-full">
						<label className="label font-bold" htmlFor="name">
							Name
						</label>
						<input
							className={`input w-full ${
								errors.name ? "input-error" : "input-bordered"
							}`}
							type="text"
							id="name"
							placeholder="Please provide a name"
							{...register("name", {
								required: "Please provide a name",
							})}
						/>
						{errors.name && (
							<small className="text-error font-medium">
								{errors.name.message}
							</small>
						)}
					</div>

					<div className="w-full">
						<label className="label font-bold" htmlFor="username">
							Username
						</label>
						<input
							className={`input w-full ${
								errors.username ? "input-error" : "input-bordered"
							}`}
							type="text"
							id="username"
							placeholder="Please provide a username"
							{...register("username", {
								required: "Please provide a username",
							})}
						/>
						{errors.username && (
							<small className="text-error font-medium">
								{errors.username.message}
							</small>
						)}
					</div>

					<div className="w-full">
						<label className="label font-bold" htmlFor="password">
							Password
						</label>
						<input
							className={`input w-full ${
								errors.password ? "input-error" : "input-bordered"
							}`}
							type="password"
							id="password"
							placeholder="Please provide a password"
							{...register("password", {
								required: "Please provide a password",
							})}
						/>
						{errors.password && (
							<small className="text-error font-medium">
								{errors.password.message}
							</small>
						)}
					</div>

					<div className="w-full">
						<label className="label font-bold" htmlFor="confirm_password">
							Confirm Password
						</label>
						<input
							className={`input w-full ${
								errors.confirm_password ? "input-error" : "input-bordered"
							}`}
							type="confirm_password"
							id="confirm_password"
							placeholder="Please confirm the password"
							{...register("confirm_password", {
								required: "Please confirm the password",
								validate: (value) =>
									value === password || "Password do not match",
							})}
						/>
						{errors.confirm_password && (
							<small className="text-error font-medium">
								{errors.confirm_password.message}
							</small>
						)}
					</div>

					<div className="w-full">
						<label className="label font-bold" htmlFor="category">
							Role
						</label>
						<select
							{...register("role", {
								validate: (value) =>
									value !== null ||
									value !== undefined ||
									"Please choose a role",
							})}
							className={`select w-full ${
								errors.role ? "select-error" : "select-bordered"
							}`}
						>
							<option disabled selected>
								Role ---
							</option>
						</select>
					</div>
					<div className="w-full">
						<button className="w-full btn btn-outline mt-5">Add</button>
						<button
							type="button"
							className="btn w-full mt-3"
							onClick={closeModal}
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

export default AddUserModal;
