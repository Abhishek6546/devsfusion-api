import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Sparkles, Clock, Globe } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      title: 'Email Us',
      details: 'contact@devsfusion.com',
      link: 'mailto:contact@devsfusion.com',
      color: 'bg-blue-500/10'
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: 'Working Hours',
      details: 'Open 24/7',
      color: 'bg-indigo-500/10'
    },
  ];

  return (
    <div className="min-h-screen pt-10">
      {/* ── Hero ── */}
      <div className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
              <Sparkles size={12} />
              Let's Talk
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Ready to <span className="text-primary">Start?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have an idea in mind or need help with an existing project?
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Form Section ── */}
      <Section className="pb-24 pt-0">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">

            {/* Left Column: Info */}
            <div className="lg:col-span-1 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex gap-5 group">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl ${info.color} flex items-center justify-center border border-primary/5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                        {info.icon}
                      </div>
                      <div className="py-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-wider text-xs">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-muted-foreground font-medium">{info.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Placeholder */}
                <div className="mt-12 p-8 rounded-3xl bg-secondary/30 dark:bg-secondary/10 border border-border/50">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Follow Us</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Stay updated with our latest works and tech insights on social media.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/devsfusion/' },
                      { platform: 'Instagram', url: 'https://www.instagram.com/devsfusionofficial/' }
                    ].map(item => (
                      <a
                        key={item.platform}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-pointer"
                      >
                        {item.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Message Sent!</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                      Thank you for reaching out. We've received your request and will get back to you shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="rounded-full px-8">
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Phone (Optional)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                          className="w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project or requirements..."
                        required
                        className="w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center sm:text-left mt-4 opacity-70">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;