import { publicProcedure, router } from "./trpc";

import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

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
	login: publicProcedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.mutation(async (opts) => {
			const user = await prisma.user.findFirst({
				select: {
					id: true,
					name: true,
					username: true,
					password: true,
				},
				where: {
					username: opts.input.username,
				},
			});

			if (!user) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid Credentials",
				});
			}

			if (user && user.password !== opts.input.password) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid Credentials",
				});
			}

			(await cookies()).set("session", "session-value");

			// return "SUCCESS";
		}),
	logout: publicProcedure.mutation(async () => {
		(await cookies()).delete("session");
	}),
});

export type AppRouter = typeof appRouter;
