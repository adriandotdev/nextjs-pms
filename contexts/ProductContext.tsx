import { trpc } from "@/app/_trpc/client";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { createContext } from "react";

type Product = {
	name: string;
	price: number;
	category_id: number;
	id: number;
};

interface ProductContextType {
	products?: UseTRPCQueryResult<Product[], Error>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) => {
	const products = trpc.getProducts.useQuery() as UseTRPCQueryResult<
		Product[],
		Error
	>;

	return (
		<ProductContext.Provider value={{ products: products }}>
			{children}
		</ProductContext.Provider>
	);
};
