"use client";

import AddProductModal from "@/components/AddProductModal";
import React, { useRef } from "react";

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
			<AddProductModal />
		</main>
	);
}

export default DashboardLayout;
