import axiosInstance from '../axiosInstance';

export const testimonialService = {
  getAllTestimonials: async (params = {}) => {
    const response = await axiosInstance.get('/testimonials', { params });
    return response.data;
  },
  getTestimonialById: async (id) => {
    const response = await axiosInstance.get(`/testimonials/${id}`);
    return response.data;
  },
  createTestimonial: async (testimonialData) => {
    const response = await axiosInstance.post('/testimonials', testimonialData);
    return response.data;
  },
  updateTestimonial: async (id, testimonialData) => {
    const response = await axiosInstance.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  },
  deleteTestimonial: async (id) => {
    const response = await axiosInstance.delete(`/testimonials/${id}`);
    return response.data;
  },
};
