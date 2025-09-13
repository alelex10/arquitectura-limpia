import { NavBar } from "../components/navbar/NavBar";

export const Home = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/* NAVBAR */}

			<NavBar></NavBar>
			{/* HERO */}
			<header className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col justify-center items-center text-center p-10">
				<h2 className="text-4xl font-bold mb-4">Escribe, guarda y organiza tus documentos Markdown</h2>
				<p className="text-lg mb-6 max-w-2xl">
					Una aplicación ligera y rápida para crear notas en Markdown, con previsualización en tiempo real y guardado
					automático en la base de datos.
				</p>
				<button className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100">
					Comenzar Gratis
				</button>
			</header>

			{/* FEATURES */}
			<section id="features" className="py-16 bg-gray-50">
				<div className="container mx-auto px-6">
					<h3 className="text-3xl font-bold text-center mb-12">Características principales</h3>
					<div className="grid md:grid-cols-3 gap-10 text-center">
						<div className="p-6 bg-white shadow rounded-lg">
							<h4 className="text-xl font-semibold mb-2">Editor en vivo</h4>
							<p>Escribe en Markdown y observa al instante cómo se ve tu documento en la vista previa.</p>
						</div>
						<div className="p-6 bg-white shadow rounded-lg">
							<h4 className="text-xl font-semibold mb-2">Guardado automático</h4>
							<p>No pierdas nunca tu trabajo gracias al autosave con debounce en la base de datos.</p>
						</div>
						<div className="p-6 bg-white shadow rounded-lg">
							<h4 className="text-xl font-semibold mb-2">Organización simple</h4>
							<p>Crea, actualiza y elimina documentos de manera intuitiva desde tu panel personal.</p>
						</div>
					</div>
				</div>
			</section>

			{/* PREVIEW */}
			<section id="preview" className="py-16 bg-white">
				<div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
					<div className="md:w-1/2 mb-10 md:mb-0">
						<h3 className="text-3xl font-bold mb-4">Previsualización en tiempo real</h3>
						<p className="text-lg mb-6">
							Escribe tus notas en el editor de la izquierda y visualízalas renderizadas a la derecha, sin
							interrupciones.
						</p>
						<button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Ver Demo</button>
					</div>
					<div className="md:w-1/2">
						<div className="border rounded-lg shadow p-6 bg-gray-50">
							<pre className="bg-gray-800 text-green-400 p-4 rounded mb-4 text-sm">
								{`# Mi Documento
- Punto 1
- Punto 2
**Markdown en acción!**`}
							</pre>
							<div className="prose max-w-none">
								<h1>Mi Documento</h1>
								<ul>
									<li>Punto 1</li>
									<li>Punto 2</li>
								</ul>
								<p>
									<strong>Markdown en acción!</strong>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ABOUT */}
			<section id="about" className="py-16 bg-gray-100">
				<div className="container mx-auto px-6 text-center">
					<h3 className="text-3xl font-bold mb-4">Sobre la aplicación</h3>
					<p className="max-w-2xl mx-auto text-lg">
						Este proyecto es un clon simplificado de HackMD, desarrollado para practicar arquitectura frontend y
						backend, con un solo usuario que puede gestionar sus propios documentos Markdown. Todo se guarda en la base
						de datos y se previsualiza en tiempo real.
					</p>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="bg-gray-900 text-white py-6">
				<div className="container mx-auto px-6 flex justify-between items-center">
					<p>&copy; {new Date().getFullYear()} HackMD Clone. Todos los derechos reservados.</p>
					<div className="flex space-x-4">
						<a href="#" className="hover:text-gray-400">
							GitHub
						</a>
						<a href="#" className="hover:text-gray-400">
							Contacto
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

