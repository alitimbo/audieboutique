import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {changeType === 'positive' ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ml-1 ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      </div>
      <div className="p-3 bg-accent-gold/10 rounded-lg">
        <Icon className="w-6 h-6 text-accent-gold" />
      </div>
    </div>
  </motion.div>
);

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Chiffre d\'affaires',
      value: '€45,231',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Commandes',
      value: '156',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Clients',
      value: '2,847',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Produits',
      value: '89',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Package,
    },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'Marie Dubois', amount: '€156.00', status: 'Livré', date: '2024-01-15' },
    { id: '#12346', customer: 'Pierre Martin', amount: '€89.50', status: 'En cours', date: '2024-01-15' },
    { id: '#12347', customer: 'Sophie Laurent', amount: '€234.00', status: 'Expédié', date: '2024-01-14' },
    { id: '#12348', customer: 'Jean Dupont', amount: '€67.25', status: 'En attente', date: '2024-01-14' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800';
      case 'Expédié':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'En attente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Aperçu de votre boutique</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-accent-gold hover:bg-accent-gold/90 text-luxury-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Voir le site
        </motion.button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des ventes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ventes des 7 derniers jours</h3>
            <TrendingUp className="w-5 h-5 text-accent-gold" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Ici vous pourrez intégrer un graphique (Chart.js, Recharts, etc.) */}
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Graphique des ventes</p>
              <p className="text-sm text-gray-400">À intégrer avec une librairie de graphiques</p>
            </div>
          </div>
        </motion.div>

        {/* Commandes récentes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Commandes récentes</h3>
            <ShoppingCart className="w-5 h-5 text-accent-gold" />
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{order.id}</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 text-accent-gold hover:text-accent-gold/80 font-medium text-sm transition-colors hover:underline"
          >
            Voir toutes les commandes →
          </motion.button>
        </motion.div>
      </div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-200 hover:shadow-md"
          >
            <Package className="w-6 h-6 text-accent-gold mb-2" />
            <p className="font-medium text-gray-900">Ajouter un produit</p>
            <p className="text-sm text-gray-600">Créer un nouveau produit</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-200 hover:shadow-md"
          >
            <ShoppingCart className="w-6 h-6 text-accent-gold mb-2" />
            <p className="font-medium text-gray-900">Gérer les commandes</p>
            <p className="text-sm text-gray-600">Traiter les commandes en attente</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border border-gray-200 rounded-lg hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-200 hover:shadow-md"
          >
            <Users className="w-6 h-6 text-accent-gold mb-2" />
            <p className="font-medium text-gray-900">Voir les clients</p>
            <p className="text-sm text-gray-600">Gérer la base clients</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
