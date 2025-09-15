import { FileText, Plus, User } from "lucide-react";


export const SideBar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
      <div className="flex items-center space-x-3 mb-10">
        <User className="w-8 h-8" />
        <div>
          <p className="font-bold">Alejandro</p>
          <p className="text-sm text-gray-400">Mi cuenta</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <FileText size={18} /> <span>Mis Documentos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <Plus size={18} /> <span>Nuevo Documento</span>
            </a>
          </li>
        </ul>
      </nav>

      <footer className="text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} HackMD Clone
      </footer>
    </aside>
  );
};
