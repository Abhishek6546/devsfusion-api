import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FolderOpen, MessageSquare, Star, Settings, LogOut,
  Briefcase, Plus, Edit2, Trash2, Eye, X, Upload, Save, Image,
  Search, Bell, Moon, Sun, ChevronRight, MoreVertical, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { projectService } from '../../api/services/projectService';
import { serviceService } from '../../api/services/serviceService';
import { testimonialService } from '../../api/services/testimonialService';
import { contactService } from '../../api/services/contactService';
import { uploadService } from '../../api/services/uploadService';
import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({ projects: 0, messages: 0, testimonials: 0, services: 0 });
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'project', 'service', 'testimonial'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projectsRes, servicesRes, testimonialsRes, messagesRes] = await Promise.all([
        projectService.getAllProjects(),
        serviceService.getAllServices(),
        testimonialService.getAllTestimonials(),
        contactService.getAllContacts()
      ]);

      setProjects(projectsRes.data?.projects || projectsRes.data || []);
      setServices(servicesRes.data || []);
      setTestimonials(testimonialsRes.data?.testimonials || testimonialsRes.data || []);
      setMessages(messagesRes.data?.contacts || messagesRes.data || []);

      setStats({
        projects: (projectsRes.data?.projects || projectsRes.data || []).length,
        services: (servicesRes.data || []).length,
        testimonials: (testimonialsRes.data?.testimonials || testimonialsRes.data || []).length,
        messages: (messagesRes.data?.contacts || messagesRes.data || []).length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin/login';
  };

  // Modal handlers
  const openAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData(getDefaultFormData(type));
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setImageFile(null);
    setImagePreview(item.imageLink || item.image || item.avatar || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
    setImageFile(null);
    setImagePreview('');
  };

  const getDefaultFormData = (type) => {
    switch (type) {
      case 'project':
        return { title: '', description: '', imageLink: '', liveLink: '', githubLink: '', featured: false };
      case 'service':
        return { title: '', description: '', image: '', icon: 'Code', features: [], technologies: [], isActive: true };
      case 'testimonial':
        return { name: '', designation: '', company: '', message: '', avatar: '', rating: 5, featured: true };
      default:
        return {};
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl = formData.imageLink || formData.image || formData.avatar || '';

      // Upload image if new file selected
      if (imageFile) {
        let uploadRes;
        if (modalType === 'project') uploadRes = await uploadService.uploadProjectImage(imageFile);
        else if (modalType === 'service') uploadRes = await uploadService.uploadServiceImage(imageFile);
        else if (modalType === 'testimonial') uploadRes = await uploadService.uploadTestimonialImage(imageFile);

        if (uploadRes?.data?.url) {
          imageUrl = uploadRes.data.url;
        }
      }

      const dataToSave = { ...formData };
      if (modalType === 'project') dataToSave.imageLink = imageUrl;
      else if (modalType === 'service') dataToSave.image = imageUrl;
      else if (modalType === 'testimonial') dataToSave.avatar = imageUrl;

      if (modalType === 'service') {
        if (typeof dataToSave.features === 'string') {
          dataToSave.features = dataToSave.features.split(',').map(s => s.trim()).filter(Boolean);
        }
        if (typeof dataToSave.technologies === 'string') {
          dataToSave.technologies = dataToSave.technologies.split(',').map(s => s.trim()).filter(Boolean);
        }
      }

      if (editingItem) {
        // Update
        if (modalType === 'project') await projectService.updateProject(editingItem._id, dataToSave);
        else if (modalType === 'service') await serviceService.updateService(editingItem._id, dataToSave);
        else if (modalType === 'testimonial') await testimonialService.updateTestimonial(editingItem._id, dataToSave);
      } else {
        // Create
        if (modalType === 'project') await projectService.createProject(dataToSave);
        else if (modalType === 'service') await serviceService.createService(dataToSave);
        else if (modalType === 'testimonial') await testimonialService.createTestimonial(dataToSave);
      }

      closeModal();
      fetchAllData();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'project') await projectService.deleteProject(id);
      else if (type === 'service') await serviceService.deleteService(id);
      else if (type === 'testimonial') await testimonialService.deleteTestimonial(id);
      else if (type === 'message') await contactService.deleteContact(id);
      fetchAllData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting: ' + (error.response?.data?.message || error.message));
    }
  };

  const navItems = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', name: 'Projects', icon: <FolderOpen size={20} /> },
    { id: 'services', name: 'Services', icon: <Briefcase size={20} /> },
    { id: 'testimonials', name: 'Testimonials', icon: <Star size={20} /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare size={20} /> },
  ];

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <Card className="relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 border-none bg-card/50 backdrop-blur-sm group" hover={false}>
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={80} />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10 text-white shadow-lg`}>
            <Icon size={24} />
          </div>
        </div>
        <div className="text-muted-foreground text-sm font-medium mb-1 uppercase tracking-wider">{title}</div>
        <div className="text-2xl sm:text-4xl font-bold tracking-tight">{value}</div>
      </div>
    </Card>
  );

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value={stats.projects} color="from-blue-500 to-cyan-400" icon={FolderOpen} />
        <StatCard title="Active Services" value={stats.services} color="from-violet-500 to-purple-400" icon={Briefcase} />
        <StatCard title="Testimonials" value={stats.testimonials} color="from-amber-400 to-orange-500" icon={Star} />
        <StatCard title="Unread Messages" value={stats.messages} color="from-emerald-400 to-green-500" icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 border-none shadow-md bg-card/50 backdrop-blur-sm" hover={false}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Messages</h2>
            <Button variant="ghost" size="sm" onClick={() => setActiveSection('messages')}>View All</Button>
          </div>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.slice(0, 5).map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={msg._id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {msg.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-semibold truncate">{msg.name}</div>
                      <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{msg.email}</div>
                    <p className="text-sm mt-2 line-clamp-2 text-foreground/80">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 border-none shadow-md bg-card/50 backdrop-blur-sm" hover={false}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => openAddModal('project')} className="p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 flex flex-col items-center justify-center gap-3 transition-colors h-32 border border-blue-500/20">
              <FolderOpen size={32} />
              <span className="font-medium">Add Project</span>
            </button>
            <button onClick={() => openAddModal('service')} className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 flex flex-col items-center justify-center gap-3 transition-colors h-32 border border-purple-500/20">
              <Briefcase size={32} />
              <span className="font-medium">Add Service</span>
            </button>
            <button onClick={() => openAddModal('testimonial')} className="p-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-amber-500 flex flex-col items-center justify-center gap-3 transition-colors h-32 border border-orange-500/20">
              <Star size={32} />
              <span className="font-medium">Add Testimonial</span>
            </button>
            <button onClick={() => setActiveSection('messages')} className="p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-emerald-500 flex flex-col items-center justify-center gap-3 transition-colors h-32 border border-green-500/20">
              <MessageSquare size={32} />
              <span className="font-medium">Check Inbox</span>
            </button>
          </div>
        </Card>
      </div>
    </motion.div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-primary before:rounded-full">
          Projects
        </h2>
        <Button onClick={() => openAddModal('project')} className="flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2 border-border bg-transparent" hover={false}>
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderOpen size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">Start building your portfolio by adding your first project.</p>
          <Button onClick={() => openAddModal('project')}>Create Project</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={project._id}
            >
              <Card className="overflow-hidden group border-none shadow-md bg-card/50 backdrop-blur-sm h-full flex flex-col" hover={false}>
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  {project.imageLink ? (
                    <img src={project.imageLink} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image size={32} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                    <button onClick={() => openEditModal('project', project)} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/20">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete('project', project._id)} className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-full transition-colors backdrop-blur-md border border-red-500/20">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 right-3 bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-primary/20">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">{project.description}</p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                        Live Demo <Eye size={12} />
                      </a>
                    )}
                    <div className="text-xs text-muted-foreground ml-auto">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-primary before:rounded-full">
          Services
        </h2>
        <Button onClick={() => openAddModal('service')} className="flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} /> Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2 border-border bg-transparent" hover={false}>
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No services listed</h3>
          <p className="text-muted-foreground mb-6">Define what you offer to your clients.</p>
          <Button onClick={() => openAddModal('service')}>Add Service</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={service._id}
            >
              <Card className="p-6 h-full flex flex-col border-none shadow-md bg-card/50 backdrop-blur-sm group hover:bg-card/80 transition-colors" hover={false}>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform overflow-hidden">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <Briefcase size={28} />
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal('service', service)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete('service', service._id)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">{service.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {service.technologies?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs bg-secondary/50 border border-border px-2 py-1 rounded-md">{tech}</span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-primary before:rounded-full">
          Testimonials
        </h2>
        <Button onClick={() => openAddModal('testimonial')} className="flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} /> Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2 border-border bg-transparent" hover={false}>
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Star size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No testimonials</h3>
          <p className="text-muted-foreground mb-6">Social proof builds trust. Add client feedback here.</p>
          <Button onClick={() => openAddModal('testimonial')}>Add Testimonial</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={testimonial._id}
            >
              <Card className="p-6 border-none shadow-md bg-card/50 backdrop-blur-sm relative overflow-hidden" hover={false}>
                <div className="absolute top-0 right-0 p-3 flex gap-2">
                  <button onClick={() => openEditModal('testimonial', testimonial)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete('testimonial', testimonial._id)} className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors text-muted-foreground hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full bg-secondary object-cover border-2 border-primary/10"
                  />
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.designation}, {testimonial.company}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative pl-6">
                  <span className="absolute top-0 left-0 text-3xl font-serif text-primary/20 leading-none">"</span>
                  <p className="text-muted-foreground italic leading-relaxed">{testimonial.message}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'projects': return renderProjects();
      case 'services': return renderServices();
      case 'testimonials': return renderTestimonials();
      case 'messages': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-primary before:rounded-full">
            Messages
          </h2>
          {messages.length === 0 ? (
            <Card className="p-16 text-center border-dashed border-2 border-border bg-transparent" hover={false}>
              <MessageSquare size={40} className="mx-auto mb-4 text-muted-foreground" />
              <h3>No messages yet</h3>
            </Card>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <Card key={msg._id} className="p-6 border-none shadow-md bg-card/50 backdrop-blur-sm" hover={false}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {msg.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold">{msg.name}</div>
                        <div className="text-sm text-muted-foreground">{msg.email}</div>
                        {msg.phone && <div className="text-sm text-muted-foreground">📞 {msg.phone}</div>}
                        <p className="mt-3 bg-secondary/30 p-3 rounded-lg">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{new Date(msg.createdAt).toLocaleString()}</span>
                      <button onClick={() => handleDelete('message', msg._id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
      default: return renderOverview();
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-card/95 backdrop-blur-xl z-50 flex flex-col transition-transform duration-300 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">DevsFusion</div>
          </div>
          <button onClick={() => setShowMobileMenu(false)} className="md:hidden p-1 hover:bg-secondary rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1.5 px-3 py-6 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setShowMobileMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item.id
                ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 translate-x-1'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground hover:translate-x-1'
                }`}
            >
              <div className={activeSection === item.id ? 'text-white' : ''}>{item.icon}</div>
              {item.name}
              {activeSection === item.id && <ChevronRight size={16} className="ml-auto opacity-70" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-4 md:p-8 bg-gradient-to-br from-background via-secondary/10 to-background min-h-screen">
        <header className="flex justify-between items-center mb-8 bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 sticky top-4 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMobileMenu(true)} className="md:hidden p-2 hover:bg-secondary rounded-lg">
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {activeSection === 'overview' ? `Welcome back, ${admin.name?.split(' ')[0] || 'Admin'}` : navItems.find(n => n.id === activeSection)?.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-4 border-l border-border hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold">{admin.name || 'Admin User'}</div>
                  <div className="text-xs text-muted-foreground">Administrator</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-tr from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-background shadow-md">
                  {admin.name?.[0]?.toUpperCase() || 'A'}
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-background shadow-lg">
                          {admin.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-bold text-lg truncate">{admin.name || 'Admin'}</h3>
                          <p className="text-xs text-muted-foreground truncate">{admin.email || 'admin@devsfusion.com'}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium uppercase tracking-wider">Administrator</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                      </button>
                      <hr className="my-1 border-border" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Keep existing modal logic, just update styling if needed, but standard modal is fine. 
          The Modal is defined in renderModal() inside the component in the previous version.
          I need to restore renderModal and include it in return.
      */}
      {/* Re-implementing modal logic below */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-card/95 backdrop-blur z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {editingItem ? <Edit2 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Image / Avatar</label>
                <div className="flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative group">
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-border" />
                      <button onClick={() => { setImageFile(null); setImagePreview(''); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"> <X size={12} /> </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-secondary/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border text-muted-foreground">
                      <Image size={24} />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 rounded-xl cursor-pointer transition-colors">
                      <Upload size={20} className="text-primary" />
                      <span className="font-medium text-primary">Click to upload image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-px bg-border flex-1"></div>
                      <span className="text-xs text-muted-foreground uppercase">OR</span>
                      <div className="h-px bg-border flex-1"></div>
                    </div>
                    <input
                      type="url"
                      placeholder="Paste image URL..."
                      value={formData.imageLink || formData.image || formData.avatar || ''}
                      onChange={(e) => {
                        const key = modalType === 'project' ? 'imageLink' : modalType === 'service' ? 'image' : 'avatar';
                        setFormData({ ...formData, [key]: e.target.value });
                        if (e.target.value) setImagePreview(e.target.value);
                      }}
                      className="w-full mt-2 bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                </div>
              </div>

              {modalType === 'project' && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Project Title *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Description *</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Live Demo Link</label>
                      <input
                        type="url"
                        value={formData.liveLink || ''}
                        onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">GitHub Repo</label>
                      <input
                        type="url"
                        value={formData.githubLink || ''}
                        onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 p-3 bg-secondary/30 rounded-lg border border-border">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="featured" className="text-sm font-medium cursor-pointer select-none">Mark as Featured Project</label>
                  </div>
                </>
              )}

              {modalType === 'service' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Service Title *</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Description *</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </>
              )}

              {modalType === 'testimonial' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Client Name *</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Designation</label>
                      <input
                        type="text"
                        value={formData.designation || ''}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Rating</label>
                      <div className="flex items-center gap-2">
                        <select
                          value={formData.rating || 5}
                          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>{r} Stars</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message *</label>
                    <textarea
                      value={formData.message || ''}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-border sticky bottom-0 bg-card/95 backdrop-blur rounded-b-2xl">
              <Button variant="ghost" onClick={closeModal} className="hover:bg-secondary">Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 min-w-[100px]">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <><Save size={18} /> Save Changes</>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
