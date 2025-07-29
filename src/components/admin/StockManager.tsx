import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Minus, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Save,
  X,
  History
} from 'lucide-react';
import { toast } from 'sonner';

interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  date: string;
  user: string;
}

interface StockManagerProps {
  productId: string;
  productName: string;
  currentStock: number;
  isOpen: boolean;
  onClose: () => void;
  onStockUpdate: (productId: string, newStock: number, movement: Omit<StockMovement, 'id' | 'date' | 'user'>) => Promise<void>;
}

export const StockManager: React.FC<StockManagerProps> = ({
  productId,
  productName,
  currentStock,
  isOpen,
  onClose,
  onStockUpdate
}) => {
  const [movementType, setMovementType] = useState<'in' | 'out' | 'adjustment'>('in');
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock stock movements history
  const [stockHistory] = useState<StockMovement[]>([
    {
      id: '1',
      type: 'in',
      quantity: 50,
      reason: 'Réapprovisionnement initial',
      date: '2024-01-15T10:00:00Z',
      user: 'Admin'
    },
    {
      id: '2',
      type: 'out',
      quantity: 5,
      reason: 'Vente en ligne',
      date: '2024-01-16T14:30:00Z',
      user: 'Système'
    },
    {
      id: '3',
      type: 'adjustment',
      quantity: -2,
      reason: 'Produit défectueux',
      date: '2024-01-17T09:15:00Z',
      user: 'Admin'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity === 0) {
      toast.error('La quantité doit être différente de 0');
      return;
    }

    if (!reason.trim()) {
      toast.error('Veuillez indiquer une raison pour ce mouvement');
      return;
    }

    let newStock = currentStock;
    
    switch (movementType) {
      case 'in':
        newStock = currentStock + quantity;
        break;
      case 'out':
        newStock = currentStock - quantity;
        if (newStock < 0) {
          toast.error('Le stock ne peut pas être négatif');
          return;
        }
        break;
      case 'adjustment':
        newStock = quantity;
        if (newStock < 0) {
          toast.error('Le stock ne peut pas être négatif');
          return;
        }
        break;
    }

    setIsLoading(true);
    try {
      await onStockUpdate(productId, newStock, {
        type: movementType,
        quantity: movementType === 'adjustment' ? newStock - currentStock : quantity,
        reason: reason.trim()
      });
      
      toast.success('Stock mis à jour avec succès');
      setQuantity(0);
      setReason('');
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du stock');
    } finally {
      setIsLoading(false);
    }
  };

  const getMovementIcon = (type: StockMovement['type']) => {
    switch (type) {
      case 'in':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'out':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'adjustment':
        return <Package className="w-4 h-4 text-blue-500" />;
    }
  };

  const getMovementLabel = (type: StockMovement['type']) => {
    switch (type) {
      case 'in':
        return 'Entrée';
      case 'out':
        return 'Sortie';
      case 'adjustment':
        return 'Ajustement';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestion du stock</h2>
              <p className="text-gray-600 mt-1">{productName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stock actuel */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="w-8 h-8 text-accent-gold" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Stock actuel</h3>
                  <p className="text-sm text-gray-600">Quantité disponible</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{currentStock}</div>
                <div className="flex items-center space-x-1 text-sm">
                  {currentStock === 0 && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">Rupture de stock</span>
                    </>
                  )}
                  {currentStock > 0 && currentStock <= 5 && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-500">Stock faible</span>
                    </>
                  )}
                  {currentStock > 5 && (
                    <span className="text-green-500">En stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de mouvement */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de mouvement
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMovementType('in')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    movementType === 'in'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Plus className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Entrée</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMovementType('out')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    movementType === 'out'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Minus className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Sortie</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMovementType('adjustment')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    movementType === 'adjustment'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Package className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Ajustement</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {movementType === 'adjustment' ? 'Nouveau stock' : 'Quantité'}
              </label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                placeholder={movementType === 'adjustment' ? 'Stock final' : 'Quantité à ajouter/retirer'}
                required
              />
              {movementType !== 'adjustment' && (
                <p className="text-sm text-gray-500 mt-1">
                  Stock après mouvement : {movementType === 'in' ? currentStock + quantity : Math.max(0, currentStock - quantity)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison du mouvement
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                placeholder="Ex: Réapprovisionnement, vente, produit défectueux..."
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-accent-gold text-luxury-black font-semibold rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
              </motion.button>
            </div>
          </form>

          {/* Historique des mouvements */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <History className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Historique des mouvements</h3>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stockHistory.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getMovementIcon(movement.type)}
                    <div>
                      <div className="font-medium text-gray-900">
                        {getMovementLabel(movement.type)}
                        <span className={`ml-2 ${
                          movement.type === 'in' ? 'text-green-600' : 
                          movement.type === 'out' ? 'text-red-600' : 
                          'text-blue-600'
                        }`}>
                          {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}
                          {Math.abs(movement.quantity)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{movement.reason}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{formatDate(movement.date)}</div>
                    <div>{movement.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
