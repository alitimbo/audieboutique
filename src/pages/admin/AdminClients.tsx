import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  DollarSign,
  User,
  Users,
  UserCheck,
  Crown
} from 'lucide-react';

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  provider: string;
  createdAt: string;
  lastOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const mockClients: Client[] = [
  {
    id: '1',
    fullName: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    isAdmin: false,
    provider: 'email',
    createdAt: '2024-01-10',
    lastOrderDate: '2024-01-15',
    totalOrders: 5,
    totalSpent: 789.50,
    address: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    }
  },
  {
    id: '2',
    fullName: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    phone: '+33 6 98 76 54 32',
    isAdmin: false,
    provider: 'google',
    createdAt: '2024-01-08',
    lastOrderDate: '2024-01-15',
    totalOrders: 3,
    totalSpent: 456.25,
    address: {
      street: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69000',
      country: 'France'
    }
  },
  {
    id: '3',
    fullName: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    isAdmin: false,
    provider: 'email',
    createdAt: '2024-01-05',
    lastOrderDate: '2024-01-14',
    totalOrders: 8,
    totalSpent: 1234.75,
    address: {
      street: '789 Boulevard Saint-Germain',
      city: 'Marseille',
      postalCode: '13000',
      country: 'France'
    }
  },
  {
    id: '4',
    fullName: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 11 22 33 44',
    isAdmin: false,
    provider: 'email',
    createdAt: '2024-01-03',
    totalOrders: 1,
    totalSpent: 67.25
  },
  {
    id: '5',
    fullName: 'Admin Système',
    email: 'admin@audieboutique.com',
    isAdmin: true,
    provider: 'email',
    createdAt: '2023-12-01',
    totalOrders: 0,
    totalSpent: 0
  }
];

export const AdminClients: React.FC = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'Tous les clients' },
    { value: 'customers', label: 'Clients seulement' },
    { value: 'admins', label: 'Administrateurs' },
    { value: 'recent', label: 'Récents (30 jours)' },
    { value: 'active', label: 'Clients actifs' }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (selectedFilter) {
      case 'customers':
        matchesFilter = !client.isAdmin;
        break;
      case 'admins':
        matchesFilter = client.isAdmin;
        break;
      case 'recent':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        matchesFilter = new Date(client.createdAt) >= thirtyDaysAgo;
        break;
      case 'active':
        matchesFilter = client.totalOrders > 0;
        break;
    }
    
    return matchesSearch && matchesFilter;
  });

  const getClientStats = () => {
    const totalClients = clients.filter(c => !c.isAdmin).length;
    const totalAdmins = clients.filter(c => c.isAdmin).length;
    const activeClients = clients.filter(c => !c.isAdmin && c.totalOrders > 0).length;
    const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0);

    return { totalClients, totalAdmins, activeClients, totalRevenue };
  };

  const stats = getClientStats();

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return '🔍';
      case 'email':
        return '📧';
      default:
        return '👤';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des clients</h1>
        <p className="text-gray-600 mt-1">Gérez votre base de clients et administrateurs</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total clients</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Crown className="w-8 h-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Administrateurs</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalAdmins}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <UserCheck className="w-8 h-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Clients actifs</p>
              <p className="text-xl font-bold text-gray-900">{stats.activeClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">CA total</p>
              <p className="text-xl font-bold text-gray-900">€{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
              />
            </div>
          </div>

          {/* Filtre */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des clients */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total dépensé
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                          {client.isAdmin ? (
                            <Crown className="w-5 h-5 text-accent-gold" />
                          ) : (
                            <User className="w-5 h-5 text-accent-gold" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{client.fullName}</div>
                          {client.isAdmin && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <span className="mr-1">{getProviderIcon(client.provider)}</span>
                          {client.provider === 'google' ? 'Google' : 'Email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          {client.phone}
                        </div>
                      )}
                      {client.address && (
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500">
                            {client.address.city}, {client.address.country}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    {client.lastOrderDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Dernière commande: {new Date(client.lastOrderDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <ShoppingBag className="w-4 h-4 text-gray-400 mr-2" />
                      {client.totalOrders}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    €{client.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-accent-gold transition-colors"
                        title="Voir le profil"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun client trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClients;
