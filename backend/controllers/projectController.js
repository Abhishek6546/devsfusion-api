import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
    try {
        const { featured, limit, sort = '-createdAt' } = req.query;

        let query = {};
        if (featured === 'true') {
            query.featured = true;
        }

        let projectsQuery = Project.find(query).sort(sort);

        if (limit) {
            projectsQuery = projectsQuery.limit(parseInt(limit));
        }

        const projects = await projectsQuery;

        res.status(200).json({
            status: 'success',
            count: projects.length,
            data: { projects }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
export const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Project created successfully',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Project updated successfully',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Project deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
