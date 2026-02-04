import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res) => {
    try {
        const { limit, sort = 'order' } = req.query;

        let query = { isActive: true };

        let servicesQuery = Service.find(query).sort(sort);

        if (limit) {
            servicesQuery = servicesQuery.limit(parseInt(limit));
        }

        const services = await servicesQuery;

        res.status(200).json({
            status: 'success',
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin only)
export const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
export const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Service updated successfully',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
