import axiosInstance from '../axiosInstance';

export const uploadService = {
    // Upload project image
    uploadProjectImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/upload/project', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Upload service image
    uploadServiceImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/upload/service', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Upload testimonial avatar
    uploadTestimonialImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/upload/testimonial', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Upload general image
    uploadGeneralImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/upload/general', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete image
    deleteImage: async (imageUrl) => {
        const response = await axiosInstance.delete('/upload', {
            data: { imageUrl },
        });
        return response.data;
    },
};
