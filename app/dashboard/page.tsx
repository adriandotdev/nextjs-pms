"use client";
import Product from "@/components/Product";
import { ProductContext } from "@/contexts/ProductContext";
import React, { useContext } from "react";

function DashboardPage() {
	const context = useContext(ProductContext);

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

			{context?.products?.data ? (
				<div className="mt-5  min-h-[75vh] max-h-[75vh] overflow-y-auto flex flex-col gap-3">
					{context?.products?.data?.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</div>
			) : (
				<div className="flex justify-center items-center mt-5  min-h-[75vh] max-h-[75vh]">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			)}
		</div>
	);
}

export default DashboardPage;
