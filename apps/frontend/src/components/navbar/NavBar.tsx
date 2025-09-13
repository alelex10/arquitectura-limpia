export const NavBar = () => {
	return (
		<>
			<nav className="bg-gray-900 text-white">
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					<h1 className="text-2xl font-bold">FlowNote </h1>
					<ul className="flex space-x-6">
						<li>
							<a href="#features" className="hover:text-gray-300">
								Características
							</a>
						</li>
						<li>
							<a href="#preview" className="hover:text-gray-300">
								Preview
							</a>
						</li>
						<li>
							<a href="#about" className="hover:text-gray-300">
								Sobre la App
							</a>
						</li>
					</ul>
					<button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Probar Ahora</button>
				</div>
			</nav>
		</>
	);
};


