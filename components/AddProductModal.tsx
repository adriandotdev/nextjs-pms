"use client";

import { trpc } from "@/app/_trpc/client";
import { ProductContext } from "@/contexts/ProductContext";
import React, { useContext } from "react";
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

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		resetField,
	} = useForm<Inputs>({
		defaultValues: {
			category: 1,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		addProduct.mutate({
			name: data.name,
			price: +data.price,
			category_id: +data.category,
		});
		resetField("name");
		resetField("price");
	};

	const openModal = () => {
		const modalElement = document.getElementById(
			"my_modal_5"
		) as HTMLDialogElement | null;

		modalElement?.showModal();
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

			<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
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
								pattern="^\d+(\.\d{1,2})?$"
								placeholder="Please provide the product price"
								{...register("price", {
									required: "Please provide the product price",
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
							<button className="w-full btn btn-outline mt-5">Add</button>
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
