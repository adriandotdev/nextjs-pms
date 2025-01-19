import React from "react";

function Sidebar({ logout }: { logout: any }) {
	return (
		<div className="drawer drawer-end ">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-4"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					<h1 className="font-bold text-xl mb-5">Yan-Yan Store: PMS</h1>
					{/* Sidebar content here */}
					<li className="font-bold text-lg">
						<a>Add Category</a>
					</li>
					<li className="font-bold text-lg">
						<a>Add New User</a>
					</li>
					<li
						className="font-bold text-lg text-red-700"
						onClick={() => {
							const checkbox = document.getElementById(
								"my-drawer-4"
							) as HTMLInputElement;
							checkbox.checked = false;
							logout.mutate();
						}}
					>
						<a>Logout</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
