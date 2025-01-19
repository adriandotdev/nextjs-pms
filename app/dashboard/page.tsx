"use client";
import Product from "@/components/Product";
import { ProductContext } from "@/contexts/ProductContext";
import React, { useContext, useState } from "react";
import { trpc } from "../_trpc/client";

function DashboardPage() {
	const context = useContext(ProductContext);
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
	const [test, setTest] = useState("");

	const testProducts = trpc.getProducts.useQuery({ product_name: test });

	const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		const timeout = setTimeout(() => {
			setTest(e.target.value);
		}, 1000);

		setSearchTimeout(timeout);
	};

	return (
		<div className="max-w-[100vw] w-full px-2 py-3 min-h-[90vh] ">
			<div className="w-full">
				<input
					onChange={searchProduct}
					className="input w-full input-bordered"
					type="text"
					name="search"
					id="search"
					placeholder="Search product"
				/>
			</div>

			{testProducts?.isFetched && testProducts.data?.length === 0 ? (
				<div className="mt-5  min-h-[75vh] max-h-[75vh] overflow-y-auto flex flex-col gap-3 justify-center">
					<h1 className="text-center text-3xl font-bold">No Products</h1>
				</div>
			) : testProducts?.isFetching ? (
				<div className="flex justify-center items-center mt-5  min-h-[75vh] max-h-[75vh]">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : (
				<div className="mt-5  min-h-[75vh] max-h-[75vh] overflow-y-auto flex flex-col gap-3">
					{testProducts?.data?.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}

export default DashboardPage;
