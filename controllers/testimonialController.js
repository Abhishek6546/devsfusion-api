const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getAllTestimonials = async (req, res) => {
    try {
        const { featured, limit, sort = '-createdAt' } = req.query;

        let query = {};
        if (featured === 'true') {
            query.featured = true;
        }

        let testimonialsQuery = Testimonial.find(query).sort(sort);

        if (limit) {
            testimonialsQuery = testimonialsQuery.limit(parseInt(limit));
        }

        const testimonials = await testimonialsQuery;

        res.status(200).json({
            status: 'success',
            count: testimonials.length,
            data: { testimonials }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                status: 'error',
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { testimonial }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin only)
exports.createTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Testimonial created successfully',
            data: { testimonial }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin only)
exports.updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!testimonial) {
            return res.status(404).json({
                status: 'error',
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Testimonial updated successfully',
            data: { testimonial }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin only)
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                status: 'error',
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
