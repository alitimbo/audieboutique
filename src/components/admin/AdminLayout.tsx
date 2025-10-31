import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useAuthStore } from '../../store/useAuthStore'
import { subscribeNotificationUser } from '../../lib/notificationSubscription'

interface AdminLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  subtitle,
  children
}) => {
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    if (user) {

      //console.log('Subscribing to notifications for user:', user)
      subscribeNotificationUser(user.id)
    }
  }, [])

  return (
    <div className='h-screen bg-gray-50 flex overflow-hidden'>
      {/* Sidebar Desktop */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='w-64'>
          <AdminSidebar />
        </div>
      </div>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className='fixed inset-y-0 left-0 z-50 w-64 lg:hidden'
            >
              <AdminSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onToggleSidebar={toggleSidebar}
        />

        {/* Contenu de la page */}
        <main className='flex-1 overflow-y-auto bg-gray-50'>
          <div className='p-6'>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
