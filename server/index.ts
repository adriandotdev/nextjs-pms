import { publicProcedure, router } from "./trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { z } from "zod";
export const appRouter = router({
	getProducts: publicProcedure.query(async () => {
		const result = await prisma.user.findMany();

		return result;
	}),
	addProduct: publicProcedure
		.input(z.object({ name: z.string(), password: z.string() }))
		.mutation(async (opts) => {
			await prisma.user.create({
				data: {
					name: opts.input.name,
					password: opts.input.password,
				},
			});
		}),
});

export type AppRouter = typeof appRouter;
