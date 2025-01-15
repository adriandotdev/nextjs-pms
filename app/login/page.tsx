"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../_trpc/client";
import { useRouter } from "next/navigation";

type Inputs = {
	username: string;
	password: string;
};

function LoginPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const router = useRouter();

	const login = trpc.login.useMutation({
		onSuccess: () => {
			router.replace("/dashboard");
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const loginResult = login.mutate({
			username: data.username,
			password: data.password,
		});
	};

	return (
		<main className="min-h-[100vh] flex flex-col justify-center items-center py-10 px-5">
			<h1 className="text-2xl font-bold">Yan-Yan Store: PMS</h1>
			<form
				className="max-w-[25rem] w-full flex flex-col gap-3"
				onSubmit={handleSubmit(onSubmit)}
			>
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
						placeholder="Please provide your username"
						{...register("username", {
							required: "Please provide your username",
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
						type="text"
						id="password"
						placeholder="Please provide your password"
						{...register("password", {
							required: "Please provide your password",
						})}
					/>
					{errors.password && (
						<small className="text-error font-medium">
							{errors.password.message}
						</small>
					)}
				</div>

				<div className="w-full">
					<button className="w-full btn btn-outline">Login</button>
				</div>
			</form>
		</main>
	);
}

export default LoginPage;
