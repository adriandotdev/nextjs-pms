"use client";

import React from "react";

function LoginPage() {
	return (
		<main className="min-h-[100vh] flex flex-col justify-start items-center py-10">
			<h1 className="text-2xl font-bold">Yan-Yan Store: PMS</h1>
			<form
				className="max-w-[25rem] w-full flex flex-col gap-3"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="w-full">
					<label className="label font-bold" htmlFor="username">
						Username
					</label>
					<input
						className="input input-bordered w-full"
						type="text"
						name="username"
						id="username"
						placeholder="Please provide your username"
					/>
				</div>

				<div className="w-full">
					<label className="label font-bold" htmlFor="password">
						Password
					</label>
					<input
						className="input input-bordered w-full"
						type="password"
						name="password"
						id="password"
						placeholder="Please provide your password"
					/>
				</div>

				<div className="w-full">
					<button className="w-full btn btn-outline">Login</button>
				</div>
			</form>
		</main>
	);
}

export default LoginPage;
