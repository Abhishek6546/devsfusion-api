import Contact from '../models/Contact.js';
import { sendContactNotification, sendAutoReply } from '../utils/emailService.js';

// @desc    Submit contact form (Public)
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message, phone } = req.body;

        // Create contact submission
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            phone
        });

        // Send emails
        let emailSent = false;
        try {
            // Send notification to admin
            await sendContactNotification(contact);
            // Send auto-reply to user
            await sendAutoReply(contact);
            emailSent = true;

            // Update contact with email status
            contact.emailSent = true;
            await contact.save();
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
            // Don't fail the request if email fails, contact is still saved
        }

        res.status(201).json({
            status: 'success',
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                contact: {
                    id: contact._id,
                    name: contact.name,
                    email: contact.email,
                    subject: contact.subject
                },
                emailSent
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin only)
export const getAllContacts = async (req, res) => {
    try {
        const { status, limit, page = 1, sort = '-createdAt' } = req.query;

        let query = {};
        if (status) {
            query.status = status;
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit) || 20;
        const skip = (pageNum - 1) * limitNum;

        const contacts = await Contact.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        const total = await Contact.countDocuments(query);

        res.status(200).json({
            status: 'success',
            count: contacts.length,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            data: { contacts }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin only)
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id/status
// @access  Private (Admin only)
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid status. Must be: unread, read, replied, or archived'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact status updated',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get contact stats
// @route   GET /api/contact/stats
// @access  Private (Admin only)
export const getContactStats = async (req, res) => {
    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Contact.countDocuments();

        const formattedStats = {
            total,
            unread: 0,
            read: 0,
            replied: 0,
            archived: 0
        };

        stats.forEach(stat => {
            formattedStats[stat._id] = stat.count;
        });

        res.status(200).json({
            status: 'success',
            data: { stats: formattedStats }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
