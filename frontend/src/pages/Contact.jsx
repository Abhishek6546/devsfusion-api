import { useState } from 'react';
import { Send, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactService } from '../api/services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactService.submitContactForm(formData);
      setStatus({ type: 'success', message: "Thanks for reaching out! We'll get back to you within 24 hours." });
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  };

  // Shared input/textarea classes — light + dark
  const fieldClass = [
    'w-full px-4 py-3 rounded-xl text-sm transition-all duration-200',
    'bg-gray-50 dark:bg-gray-800/70',
    'border border-gray-200 dark:border-gray-700',
    'text-gray-900 dark:text-gray-100',
    'placeholder-gray-400 dark:placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent',
  ].join(' ');

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white dark:bg-[#0a0b0f] transition-colors duration-300">

      {/* Background glows (dark mode only) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full opacity-0 dark:opacity-100 bg-blue-500/10 blur-3xl transition-opacity duration-500" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-0 dark:opacity-100 bg-blue-600/8 blur-3xl transition-opacity duration-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">

        {/* ── Page Header ── */}
        <div className="mb-14 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Lets Work Together</span>
                <div className="h-px w-8 bg-primary" />
              </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4
            text-gray-900 dark:text-white">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
              touch
            </span>
          </h1>

          <p className="text-lg leading-relaxed max-w-xl mx-auto
            text-gray-500 dark:text-gray-400">
            Have a project in mind? We'd love to hear about it. Fill out the form
            or reach out directly — we typically respond within 24 hours.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid lg:grid-cols-3 gap-7">

          {/* ── Left: Info ── */}
          <div className="flex flex-col gap-5">

            {/* Contact details */}
            <div className="rounded-2xl p-6
              bg-white dark:bg-gray-900/60
              border border-gray-100 dark:border-gray-800
              backdrop-blur-sm">

              <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-5
                text-gray-400 dark:text-gray-500">
                Contact
              </p>

              {[
                {
                  icon: Mail,
                  label: 'Email us',
                  value: 'contact.devsfusion@gmail.com',
                  href: 'mailto:contact.devsfusion@gmail.com',
                },
                { icon: MapPin, label: 'Location', value: 'Remote-first agency' },
                { icon: Clock,   label: 'Response time', value: 'Within 24 hours' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label}
                  className="flex items-start gap-3 p-3 rounded-xl mb-1 last:mb-0
                    hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    bg-blue-50 dark:bg-blue-500/10
                    border border-blue-100 dark:border-blue-500/20">
                    <Icon size={15} className="text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[0.68rem] mb-0.5 text-gray-400 dark:text-gray-500">{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{value}</a>
                      : <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="rounded-2xl p-6
              bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-500/8 dark:to-blue-600/6
              border border-blue-100 dark:border-blue-500/20">
              <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white">
                What to expect
              </h3>
              <ul className="space-y-0">
                {[
                  'Response within 24 hours',
                  'Free initial consultation',
                  'Detailed project proposal',
                  'Transparent pricing',
                ].map((item, i, arr) => (
                  <li key={i}
                    className={`flex items-center gap-2.5 py-3 text-sm
                      text-gray-600 dark:text-gray-400
                      ${i < arr.length - 1 ? 'border-b border-blue-100 dark:border-blue-500/15' : ''}`}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-8
              bg-white dark:bg-gray-900/60
              border border-gray-100 dark:border-gray-800
              backdrop-blur-sm">

              <div className="mb-7">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Send us a message
                </h2>
                <p className="text-sm mt-1 text-gray-400 dark:text-gray-500">
                  Fill in the details and we'll be in touch shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] font-bold uppercase tracking-wider mb-2
                      text-gray-500 dark:text-gray-400">
                      Name <span className="text-blue-500">*</span>
                    </label>
                    <input type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      className={fieldClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[0.7rem] font-bold uppercase tracking-wider mb-2
                      text-gray-500 dark:text-gray-400">
                      Email <span className="text-blue-500">*</span>
                    </label>
                    <input type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className={fieldClass} placeholder="your@email.com" />
                  </div>
                </div>

                {/* Subject + Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] font-bold uppercase tracking-wider mb-2
                      text-gray-500 dark:text-gray-400">
                      Subject <span className="text-blue-500">*</span>
                    </label>
                    <input type="text" name="subject" required
                      value={formData.subject} onChange={handleChange}
                      className={fieldClass} placeholder="Project inquiry" />
                  </div>
                  <div>
                    <label className="block text-[0.7rem] font-bold uppercase tracking-wider mb-2
                      text-gray-500 dark:text-gray-400">
                      Phone{' '}
                      <span className="normal-case font-normal tracking-normal text-gray-400 dark:text-gray-600">
                        (optional)
                      </span>
                    </label>
                    <input type="text" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className={fieldClass} placeholder="+91 98765 43210" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider mb-2
                    text-gray-500 dark:text-gray-400">
                    Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea name="message" required rows={6}
                    value={formData.message} onChange={handleChange}
                    className={`${fieldClass} resize-none`}
                    placeholder="Tell us about your project..." />
                </div>

                {/* Status alert */}
                {status.message && (
                  <div className={`flex items-center gap-3 p-4 rounded-xl text-sm border ${
                    status.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'
                  }`}>
                    {status.type === 'success'
                      ? <CheckCircle2 size={16} className="flex-shrink-0" />
                      : <AlertCircle size={16} className="flex-shrink-0" />}
                    {status.message}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6
                    rounded-xl text-sm font-bold text-white
                    bg-gradient-to-r from-blue-500 to-blue-700
                    hover:from-blue-600 hover:to-blue-700
                    shadow-lg shadow-blue-500/20 dark:shadow-blue-500/15
                    hover:shadow-xl hover:shadow-blue-500/30
                    hover:-translate-y-0.5 active:translate-y-0
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={15} />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;