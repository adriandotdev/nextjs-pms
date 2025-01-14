import React from "react";

function DashboardPage() {
	return (
		<div className="max-w-[100vw] w-full px-2 py-3 min-h-[90vh] ">
			<div className="w-full">
				<input
					className="input w-full input-bordered"
					type="text"
					name="search"
					id="search"
					placeholder="Search product"
				/>
			</div>

			<div className="mt-5  min-h-[75vh] max-h-[75vh] overflow-y-auto flex flex-col gap-3">
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
				<div className="border border-slate-950 border-opacity-20 p-5 rounded-2xl">
					<h1 className="text-bold text-xl font-bold ">San Mig Light</h1>
					<p className="text-green-600 font-bold text-2xl">35.00</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardPage;
