"use client";
import { useEffect } from "react";
import { trpc } from "./_trpc/client";

export default function Home() {
	const result = trpc.getProducts.useQuery();

	console.log(result.data);

	const addTodo = trpc.addProduct.useMutation({
		onSettled: () => {
			result.refetch();
		},
	});

	useEffect(() => {
		addTodo.mutate({
			name: "Shayna",
			password: "password",
		});
	}, []);
	return (
		<>
			<h1>Hello to NextJS and tRPC</h1>
		</>
	);
}
