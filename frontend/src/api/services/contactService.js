import axiosInstance from '../axiosInstance';

export const contactService = {
  submitContactForm: async (formData) => {
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
  },
  getAllContacts: async (params = {}) => {
    const response = await axiosInstance.get('/contact', { params });
    return response.data;
  },
  getAllSubmissions: async (params = {}) => {
    const response = await axiosInstance.get('/contact', { params });
    return response.data;
  },
  getContactById: async (id) => {
    const response = await axiosInstance.get(`/contact/${id}`);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/contact/${id}/status`, { status });
    return response.data;
  },
  deleteContact: async (id) => {
    const response = await axiosInstance.delete(`/contact/${id}`);
    return response.data;
  },
};
