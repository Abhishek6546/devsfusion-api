const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    imageLink: {
        type: String,
        required: [true, 'Project image link is required'],
        trim: true
    },
    techStack: {
        type: [String],
        default: []
    },
    liveLink: {
        type: String,
        trim: true,
        default: ''
    },
    githubLink: {
        type: String,
        trim: true,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
