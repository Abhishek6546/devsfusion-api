import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Service title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    image: {
        type: String,
        required: [true, 'Service image link is required'],
        trim: true
    },
    icon: {
        type: String,
        trim: true,
        default: 'Code' // Lucide icon name
    },
    features: {
        type: [String],
        default: []
    },
    technologies: {
        type: [String],
        default: []
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Service', serviceSchema);
