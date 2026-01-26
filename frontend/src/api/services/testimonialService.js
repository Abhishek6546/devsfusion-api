import axiosInstance from '../axiosInstance';

export const testimonialService = {
  getAllTestimonials: async (params = {}) => {
    const response = await axiosInstance.get('/testimonials', { params });
    return response.data;
  },
  createTestimonial: async (testimonialData) => {
    const response = await axiosInstance.post('/testimonials', testimonialData);
    return response.data;
  },
  deleteTestimonial: async (id) => {
    const response = await axiosInstance.delete(`/testimonials/${id}`);
    return response.data;
  },
};
