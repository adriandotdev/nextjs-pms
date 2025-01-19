import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
	const path = request.nextUrl;

	const accessTokenEncodedKey = new TextEncoder().encode("secret-key");
	const token = (await cookies()).get("session");

	switch (path.pathname) {
		case "/dashboard":
			try {
				await jwtVerify(token?.value, accessTokenEncodedKey, {
					algorithms: ["HS256"],
				});

				return NextResponse.next();
			} catch (err) {
				console.log(err);
				return NextResponse.redirect(new URL("/login", request.url));
			}
		case "/login":
			try {
				await jwtVerify(token?.value, accessTokenEncodedKey, {
					algorithms: ["HS256"],
				});

				return NextResponse.redirect(new URL("/dashboard", request.url));
			} catch (err) {}
	}
	console.log(path.pathname);
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
