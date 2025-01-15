import { trpc } from "@/app/_trpc/client";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

export type Product = {
	name: string;
	price: number;
	category_id: number;
	id: number;
};

interface ProductContextType {
	products?: UseTRPCQueryResult<Product[], Error>;
	productToDelete?: Product;
	setProductToDelete: Dispatch<SetStateAction<Product | undefined>>;
}

export const ProductContext = createContext<ProductContextType>({
	products: undefined,
	productToDelete: undefined,
	setProductToDelete: () => {}, // Default no-op function
});

export const ProductProvider = ({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) => {
	const products = trpc.getProducts.useQuery() as UseTRPCQueryResult<
		Product[],
		Error
	>;
	const [productToDelete, setProductToDelete] = useState<Product | undefined>();
	return (
		<ProductContext.Provider
			value={{ products: products, productToDelete, setProductToDelete }}
		>
			{children}
		</ProductContext.Provider>
	);
};
