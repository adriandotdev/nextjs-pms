import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	getProducts: publicProcedure.query(async () => {
		return [];
	}),
});

export type AppRouter = typeof appRouter;
