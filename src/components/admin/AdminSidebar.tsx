import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Tableau de bord',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Gestion catalogue',
    href: '/admin/catalog',
    icon: Package,
  },
  {
    name: 'Gestion commandes',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Gestion clients',
    href: '/admin/clients',
    icon: Users,
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
  },
];

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { signOut, profile } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo et titre */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-gold rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-luxury-black font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Audieboutique</h1>
            <p className="text-gray-400 text-sm">Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive: navIsActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  navIsActive || isActive
                    ? 'bg-accent-gold text-luxury-black shadow-lg font-semibold'
                    : 'text-luxury-gray-300 hover:text-luxury-white hover:bg-luxury-gray-700/50'
                }`
              }
            >
              {({ isActive: navIsActive }) => (
                <>
                  <item.icon 
                    className={`mr-3 h-5 w-5 ${
                      navIsActive || isActive ? 'text-luxury-black' : 'text-luxury-gray-400 group-hover:text-luxury-white'
                    }`} 
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight 
                    className={`ml-2 h-4 w-4 transition-transform ${
                      navIsActive || isActive 
                        ? 'text-luxury-black rotate-90' 
                        : 'text-luxury-gray-400 group-hover:text-luxury-white'
                    }`} 
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profil utilisateur et déconnexion */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-luxury-gold/20 rounded-full flex items-center justify-center">
            <span className="text-luxury-gold font-semibold text-sm">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {profile?.full_name || 'Administrateur'}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {profile?.email}
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-luxury-gray-300 hover:text-luxury-white hover:bg-luxury-red/20 hover:border-luxury-red/30 border border-transparent rounded-lg transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </motion.button>
      </div>
    </div>
  );
};

export default AdminSidebar;
