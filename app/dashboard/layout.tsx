"use client";

import AddProductModal from "@/components/AddProductModal";
import { ProductProvider } from "@/contexts/ProductContext";
import React, { useRef } from "react";
import { trpc } from "../_trpc/client";
import { useRouter } from "next/navigation";

function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const logout = trpc.logout.useMutation({
		onSuccess: () => {
			router.replace("/login");
		},
	});

	return (
		<ProductProvider>
			<main className="min-h-[100vh]">
				<div className="navbar bg-slate-950 flex justify-between">
					<a className="btn btn-ghost text-xl text-white">
						Yan-Yan's Store: PMS
					</a>
					<button
						onClick={() => {
							logout.mutate();
						}}
						className="btn btn-outline btn-sm text-white hover:bg-inherit"
					>
						Logout
					</button>
				</div>
				{children}
				<AddProductModal />
			</main>
		</ProductProvider>
	);
}

export default DashboardLayout;
