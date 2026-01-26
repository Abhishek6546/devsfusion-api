import axiosInstance from '../axiosInstance';

export const contactService = {
  submitContactForm: async (formData) => {
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
  },
  getAllSubmissions: async (params = {}) => {
    const response = await axiosInstance.get('/contact', { params });
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/contact/${id}/status`, { status });
    return response.data;
  },
};
