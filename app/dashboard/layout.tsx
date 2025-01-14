"use client";

import AddProductModal from "@/components/AddProductModal";
import { ProductProvider } from "@/contexts/ProductContext";
import React, { useRef } from "react";

function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ProductProvider>
			<main className="min-h-[100vh]">
				<div className="navbar bg-slate-950">
					<a className="btn btn-ghost text-xl text-white">
						Yan-Yan's Store: PMS
					</a>
				</div>
				{children}
				<AddProductModal />
			</main>
		</ProductProvider>
	);
}

export default DashboardLayout;
