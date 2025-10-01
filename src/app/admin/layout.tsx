import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Package, Folder, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Verificar rol de administrador
  if (session.user?.role !== "ADMIN") {
    redirect("/acceso-denegado");
  }

  const menuItems = [
    {
      href: "/admin/categories",
      label: "Categorías",
      icon: Folder,
    },
    {
      href: "/admin/products",
      label: "Productos",
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-10 mt-20">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm">
              <Package className="w-4 h-4" />
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-3">
            Panel de Administración
          </h1>
          <p className="text-gray-600 text-lg">
            Gestiona tu catálogo de productos y categorías
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100/50">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-300 group hover:shadow-md transform hover:scale-105"
                        >
                          <Icon
                            size={20}
                            className="text-gray-500 group-hover:text-blue-600 transition-colors group-hover:scale-110 duration-300"
                          />
                          <span className="font-semibold">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="group flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 p-3 rounded-xl hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Volver al sitio</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
