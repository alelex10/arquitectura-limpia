// src/pages/Dashboard.jsx
import { Plus, Trash2, Edit3 } from "lucide-react";
import { SideBar } from "./components/SideBar";

const documentos = [
  { id: 1, titulo: "Notas de reunión", fecha: "2025-09-12" },
  { id: 2, titulo: "Plan de proyecto", fecha: "2025-09-10" },
  { id: 3, titulo: "Ideas rápidas", fecha: "2025-09-05" },
];



export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}

      <SideBar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Mis Documentos</h1>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} className="mr-2" />
            Nuevo Documento
          </button>
        </div>

        {/* LISTA DE DOCUMENTOS */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Título</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{doc.titulo}</td>
                  <td className="px-6 py-4">{doc.fecha}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
