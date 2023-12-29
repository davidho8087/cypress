
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const DashboardLayout = async ({ children, params }: LayoutProps) => {
  return (
    <main className="flex over-hidden h-screen">
        {children}
    </main>
  );
};

export default DashboardLayout;