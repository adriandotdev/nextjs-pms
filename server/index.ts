import { publicProcedure, router } from "./trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { z } from "zod";

export const appRouter = router({
	getProducts: publicProcedure.query(async () => {
		const result = await prisma.product.findMany();

		return result;
	}),
	addProduct: publicProcedure
		.input(
			z.object({ name: z.string(), price: z.number(), category_id: z.number() })
		)
		.mutation(async (opts) => {
			await prisma.product.create({
				data: {
					name: opts.input.name,
					price: opts.input.price,
					category_id: opts.input.category_id,
				},
			});
		}),
	removeProductByID: publicProcedure
		.input(z.object({ id: z.number().optional() }))
		.mutation(async (opts) => {
			await prisma.product.delete({
				where: {
					id: opts.input.id,
				},
			});
		}),
	getCategories: publicProcedure.query(async () => {
		const result = await prisma.category.findMany();
		return result;
	}),
});

export type AppRouter = typeof appRouter;
