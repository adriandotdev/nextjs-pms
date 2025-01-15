import { initTRPC } from "@trpc/server";

export const createContext = ({
	req,
	res,
}: {
	req: Request;
	res: Response;
}) => {
	return { req, res };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
