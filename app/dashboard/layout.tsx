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
					{/* <button
						onClick={() => {
							logout.mutate();
						}}
						className="btn btn-outline btn-sm text-white hover:bg-inherit"
					>
						Logout
					</button> */}
					<div className="drawer-content">
						<label
							htmlFor="my-drawer-4"
							className="drawer-button btn btn-sm btn-outline text-white hover:bg-inherit"
						>
							Open drawer
						</label>
					</div>
				</div>
				{children}
				<AddProductModal />
				<div className="drawer drawer-end">
					<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
					<div className="drawer-side">
						<label
							htmlFor="my-drawer-4"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
							{/* Sidebar content here */}
							<li className="font-bold text-lg">
								<a>Add Category</a>
							</li>
							<li
								className="font-bold text-lg text-red-700"
								onClick={() => {
									const checkbox = document.getElementById(
										"my-drawer-4"
									) as HTMLInputElement;
									checkbox.checked = false;
									logout.mutate();
								}}
							>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</ProductProvider>
	);
}

export default DashboardLayout;
