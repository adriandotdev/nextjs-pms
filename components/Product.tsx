import React, { useContext, useState } from "react";

import {
	ProductContext,
	Product as ProductType,
} from "@/contexts/ProductContext";
import { trpc } from "@/app/_trpc/client";

function Product({ product }: { product: ProductType }) {
	const context = useContext(ProductContext);
	const [timer, setTimer] = useState<any>();

	// TRPC
	const deleteProductByID = trpc.removeProductByID.useMutation({
		onSettled: () => {
			context.products?.refetch();

			closeModal();
		},
	});

	// Util
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const showModal = () => {
		const showDialog = document.getElementById(
			"delete_product_modal"
		) as HTMLDialogElement;

		showDialog.showModal();
	};

	const closeModal = () => {
		const showDialog = document.getElementById(
			"delete_product_modal"
		) as HTMLDialogElement;

		showDialog.close();
	};

	const handleMouseDown = () => {
		const currentTimer = setTimeout(() => {
			context?.setProductToDelete(product);

			showModal();
		}, 500);

		setTimer(currentTimer);
	};

	const handleMouseUp = () => {
		clearTimeout(timer);
		setTimer(null);
	};

	const deleteProduct = () => {
		deleteProductByID.mutate({ id: context?.productToDelete?.id });
	};

	return (
		<>
			<div
				onMouseUp={handleMouseUp}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseUp}
				onTouchEnd={handleMouseDown}
				key={product.id}
				className="border border-slate-950 border-opacity-20 p-5 rounded-2xl"
			>
				<h1 className="text-bold text-2xl font-bold ">{product.name}</h1>
				<p className="text-green-600 font-bold text-xl">
					{formatCurrency(product.price)}
				</p>
			</div>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog
				id="delete_product_modal"
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Are you sure you want to remove this product?
					</h3>
					<h1 className="py-4 font-bold text-3xl text-red-500">
						{context.productToDelete?.name}
					</h1>
					<div className="flex flex-col w-full mt-5 gap-5">
						<div className="w-full">
							<button
								onClick={deleteProduct}
								className="btn bg-red-800 hover:bg-red-950 w-full text-white"
							>
								Delete
							</button>
						</div>
						<div className="w-full">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn w-full">Cancel</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default Product;
