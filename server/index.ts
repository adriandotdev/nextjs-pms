import { publicProcedure, router } from "./trpc";

import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

import { SignJWT } from "jose";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

import { z } from "zod";

export const appRouter = router({
	getProducts: publicProcedure
		.input(z.object({ product_name: z.string().optional() }))
		.query(async (opts) => {
			let result;

			if (!opts.input.product_name) result = await prisma.product.findMany();
			else
				result = prisma.product.findMany({
					where: {
						name: {
							contains: opts.input.product_name,
							mode: "insensitive",
						},
					},
				});
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

			const accessTokenEncodedKey = new TextEncoder().encode("secret-key");
			const token = new SignJWT({ id: user.id, username: user.username })
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.sign(accessTokenEncodedKey);

			(await cookies()).set("session", await token, {
				secure: true,
				sameSite: "strict",
			});

			// return "SUCCESS";
		}),
	logout: publicProcedure.mutation(async () => {
		(await cookies()).delete("session");
	}),
	searchProduct: publicProcedure
		.input(z.object({ product: z.string() }))
		.mutation(async (opts) => {
			await prisma.product.findMany({
				where: {
					name: {
						equals: opts.input.product,
					},
				},
			});
		}),
});

export type AppRouter = typeof appRouter;
