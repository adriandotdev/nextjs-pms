import React from "react";

function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-[100vh]">
			<div className="navbar bg-slate-950">
				<a className="btn btn-ghost text-xl text-white">Yan-Yan's Store: PMS</a>
			</div>
			{children}
		</main>
	);
}

export default DashboardLayout;
