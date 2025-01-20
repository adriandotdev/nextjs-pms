"use client";

import { trpc } from "@/app/_trpc/client";
import { ProductContext } from "@/contexts/ProductContext";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	name: string;
	price: number;
	category: number;
};

function AddProductModal() {
	const context = useContext(ProductContext);
	const categories = trpc.getCategories.useQuery();

	const addProduct = trpc.addProduct.useMutation({
		onSettled: () => {
			context?.products?.refetch();
		},
	});

	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [alertTimeout, setAlertTimeout] = useState<NodeJS.Timeout>();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
		resetField,
		reset,
	} = useForm<Inputs>({
		defaultValues: {
			category: 1,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (alertTimeout) clearTimeout(alertTimeout);
		setShowAlert(true);
		const timeout = setTimeout(() => {
			setShowAlert(false);
		}, 2000);
		setAlertTimeout(timeout);
		addProduct.mutate({
			name: data.name,
			price: +data.price,
			category_id: +data.category,
		});
		reset();
	};

	const openModal = () => {
		const modalElement = document.getElementById(
			"my_modal_5"
		) as HTMLDialogElement | null;

		modalElement?.showModal();
	};

	const closeModal = () => {
		const modalElement = document.getElementById(
			"my_modal_5"
		) as HTMLDialogElement | null;

		modalElement?.close();
		reset();
	};

	return (
		<>
			{/* Modal */}
			{categories.data && (
				<button
					onClick={openModal}
					className="btn bg-slate-950 text-white btn-lg btn-circle font-bold text-2xl fixed bottom-5 right-5 text-center"
				>
					<p>+</p>
				</button>
			)}

			<dialog
				id="my_modal_5"
				className="modal modal-bottom sm:modal-middle"
				onClick={closeModal}
			>
				{showAlert && (
					<div className="toast toast-top toast-end pr-5">
						<div className="alert bg-green-700 text-white font-bold outline-none border-none rounded-lg">
							<span>Product successfully added!</span>
						</div>
					</div>
				)}
				<div className="modal-box" onClick={(e) => e.stopPropagation()}>
					<h3 className="font-bold text-lg">New Product</h3>
					<form
						className=" w-full flex flex-col gap-1"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="w-full">
							<label className="label font-bold" htmlFor="name">
								Name
							</label>
							<input
								className={`input w-full ${
									errors.name ? "input-error" : "input-bordered"
								}`}
								type="text"
								id="name"
								placeholder="Please provide the product name"
								{...register("name", {
									required: "Please provide the product name",
								})}
							/>
							{errors.name && (
								<small className="text-error font-medium">
									{errors.name.message}
								</small>
							)}
						</div>
						<div className="w-full">
							<label className="label font-bold" htmlFor="price">
								Price
							</label>
							<input
								className={`input w-full ${
									errors.price ? "input-error" : "input-bordered"
								}`}
								id="price"
								type="text"
								inputMode="decimal"
								placeholder="Please provide the product price"
								{...register("price", {
									required: "Please provide the product price",
									pattern: {
										value: /^\d+(\.\d{0,2})?$/,
										message:
											"Enter a valid price with up to two decimal places",
									},
								})}
							/>
							{errors.price && (
								<small className="text-error font-medium">
									{errors.price.message}
								</small>
							)}
						</div>

						<div className="w-full">
							<label className="label font-bold" htmlFor="category">
								Category
							</label>
							<select
								{...register("category", {
									validate: (value) =>
										value !== null ||
										value !== undefined ||
										"Please choose product category",
								})}
								className={`select w-full ${
									errors.category ? "select-error" : "select-bordered"
								}`}
							>
								<option disabled selected>
									Category ---
								</option>
								{categories.data?.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="w-full">
							<button
								disabled={isSubmitting}
								className="w-full btn btn-outline mt-5"
							>
								{isSubmitting ? (
									<span className="loading loading-spinner text-white"></span>
								) : (
									"Add"
								)}
							</button>
						</div>
					</form>
					<div className="w-full">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn  w-full mt-3">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default AddProductModal;
