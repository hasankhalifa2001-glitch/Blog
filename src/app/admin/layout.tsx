import React from 'react'
import AdminSidebar from './AdminSidebar';
import { Metadata } from 'next';

interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "This is the admin dashboard",
};

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
    return (
        <div className='flex items-start'>
            <div className='bg-white height w-1/6 lg:w-1/6 py-6 px-4 text-gray-900 border-r font-semibold'>
                <AdminSidebar />
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default AdminDashboardLayout