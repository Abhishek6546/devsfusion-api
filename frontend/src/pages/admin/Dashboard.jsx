import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, MessageSquare, Star, Settings, LogOut } from 'lucide-react';
import Card from '../../components/ui/Card';
import Section from '../../components/ui/Section';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, testimonials: 0 });
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-12 px-2">DevsFusion</div>
        
        <nav className="space-y-2 flex-grow">
          {[
            { name: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
            { name: 'Projects', icon: <FolderOpen size={20} /> },
            { name: 'Messages', icon: <MessageSquare size={20} /> },
            { name: 'Testimonials', icon: <Star size={20} /> },
            { name: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-secondary/10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {admin.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Here's what's happening today.</p>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/30">
            {admin.name?.[0]}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 border-l-4 border-l-primary" hover={false}>
            <div className="text-muted-foreground text-sm font-medium mb-2 uppercase tracking-wider">Total Projects</div>
            <div className="text-4xl font-bold">12</div>
          </Card>
          <Card className="p-8 border-l-4 border-l-blue-400" hover={false}>
            <div className="text-muted-foreground text-sm font-medium mb-2 uppercase tracking-wider">New Messages</div>
            <div className="text-4xl font-bold">05</div>
          </Card>
          <Card className="p-8 border-l-4 border-l-purple-500" hover={false}>
            <div className="text-muted-foreground text-sm font-medium mb-2 uppercase tracking-wider">Testimonials</div>
            <div className="text-4xl font-bold">08</div>
          </Card>
        </div>

        <Card className="p-8" hover={false}>
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <MessageSquare size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">New inquiry from John Doe</div>
                    <div className="text-sm text-muted-foreground">"Interested in custom web development..."</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">2 hours ago</div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
