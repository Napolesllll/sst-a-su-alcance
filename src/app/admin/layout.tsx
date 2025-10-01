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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-10 mt-20">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
              <Package className="w-4 h-4" />
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-3 drop-shadow-2xl">
            Panel de Administración
          </h1>
          <p className="text-cyan-100/80 text-lg font-medium">
            Gestiona tu catálogo de productos y categorías
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 sticky top-6 border border-cyan-500/30">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 text-cyan-100/80 hover:text-cyan-300 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 border border-transparent hover:border-cyan-500/40"
                        >
                          <Icon
                            size={20}
                            className="text-cyan-400/70 group-hover:text-cyan-300 transition-colors group-hover:scale-110 duration-300"
                          />
                          <span className="font-bold">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <Link
                  href="/"
                  className="group flex items-center gap-3 text-sm text-cyan-100/70 hover:text-cyan-300 transition-all duration-300 p-3 rounded-xl hover:bg-slate-700/50 border border-transparent hover:border-cyan-500/30"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold">Volver al sitio</span>
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
