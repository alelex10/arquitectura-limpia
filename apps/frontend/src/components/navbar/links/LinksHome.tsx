import { Link } from "react-router"
import { Button } from "../../button/Button"

export const LinksHome = () => {
  return (
    <div>
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">
            <Link to="/">FlowNote</Link>
          </h1>
          <ul className="flex space-x-6">
            <li>
              {/* <a href="#features">Caracteristicas</a> */}
              <Link to="/#features" className="hover:text-gray-300">
                Caracteristicas
              </Link>
            </li>
            <li>
              <Link to="/#preview" className="hover:text-gray-300">
                Previsualizacion
              </Link>
            </li>
            <li>
              <Link to="/#about" className="hover:text-gray-300">
                Sobre la aplicacion
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link to="register">
              <Button variant="indigo">Registrarse</Button>
            </Link>
            <Link to="login">
              <Button variant="blue">Iniciar Sesion</Button>
            </Link>
          </div>
        </div>
    </div>
  )
}
