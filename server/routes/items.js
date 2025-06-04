
const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Item = require('../models/Item');
const User = require('../models/User');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/items
// @desc    Get items with filters and pagination
// @access  Public (with optional auth for personalized results)
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isString().trim(),
  query('type').optional().isIn(['lend', 'donate']),
  query('condition').optional().isIn(['New', 'Like New', 'Good', 'Fair', 'Poor']),
  query('search').optional().isString().trim(),
  query('lat').optional().isFloat({ min: -90, max: 90 }),
  query('lng').optional().isFloat({ min: -180, max: 180 }),
  query('radius').optional().isFloat({ min: 0.1, max: 50 }).withMessage('Radius must be between 0.1 and 50 km')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const {
      page = 1,
      limit = 20,
      category,
      type,
      condition,
      search,
      lat,
      lng,
      radius = 5
    } = req.query;

    // Build query
    let query = { status: 'available', isActive: true };

    if (category) query.category = category;
    if (type) query.type = type;
    if (condition) query.condition = condition;
    if (search) {
      query.$text = { $search: search };
    }

    // Exclude user's own items if authenticated
    if (req.userId) {
      query.owner = { $ne: req.userId };
    }

    let aggregationPipeline = [];

    // Add geospatial search if coordinates provided
    if (lat && lng) {
      aggregationPipeline.push({
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: 'distance',
          maxDistance: radius * 1000, // Convert km to meters
          spherical: true,
          query: query
        }
      });
    } else {
      aggregationPipeline.push({ $match: query });
    }

    // Add sorting
    if (search && !lat && !lng) {
      aggregationPipeline.push({
        $sort: { score: { $meta: 'textScore' }, createdAt: -1 }
      });
    } else {
      aggregationPipeline.push({
        $sort: { createdAt: -1 }
      });
    }

    // Add pagination
    aggregationPipeline.push(
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    );

    // Populate owner details
    aggregationPipeline.push({
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              trustScore: 1,
              totalExchanges: 1,
              profileImage: 1
            }
          }
        ]
      }
    });

    aggregationPipeline.push({
      $unwind: '$owner'
    });

    const items = await Item.aggregate(aggregationPipeline);

    // Get total count for pagination
    const totalQuery = lat && lng 
      ? Item.find(query).near('location', {
          center: [parseFloat(lng), parseFloat(lat)],
          maxDistance: radius * 1000,
          spherical: true
        })
      : Item.find(query);

    const total = await totalQuery.countDocuments();

    res.json({
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'firstName lastName trustScore totalExchanges profileImage location')
      .populate('borrowedBy', 'firstName lastName');

    if (!item || !item.isActive) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Increment view count
    await Item.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({ item });
  } catch (error) {
    console.error('Get item error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error while fetching item' });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn([
    'Tools & Equipment', 'Books & Media', 'Electronics', 'Furniture', 'Clothing',
    'Sports & Recreation', 'Baby & Kids', 'Kitchen & Appliances', 'Garden & Outdoor',
    'Musical Instruments', 'Art & Crafts', 'Other'
  ]).withMessage('Invalid category'),
  body('condition').isIn(['New', 'Like New', 'Good', 'Fair', 'Poor']).withMessage('Invalid condition'),
  body('type').isIn(['lend', 'donate']).withMessage('Type must be lend or donate'),
  body('availability.startDate').isISO8601().withMessage('Valid start date is required'),
  body('availability.endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('availability.flexible').optional().isBoolean()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemData = {
      ...req.body,
      owner: req.userId,
      location: user.location // Use user's location
    };

    const item = new Item(itemData);
    await item.save();

    // Update user's items shared count
    await User.findByIdAndUpdate(req.userId, { $inc: { itemsShared: 1 } });

    // Populate owner details for response
    await item.populate('owner', 'firstName lastName trustScore totalExchanges');

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error while creating item' });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private (owner only)
router.put('/:id', [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('category').optional().isIn([
    'Tools & Equipment', 'Books & Media', 'Electronics', 'Furniture', 'Clothing',
    'Sports & Recreation', 'Baby & Kids', 'Kitchen & Appliances', 'Garden & Outdoor',
    'Musical Instruments', 'Art & Crafts', 'Other'
  ]).withMessage('Invalid category'),
  body('condition').optional().isIn(['New', 'Like New', 'Good', 'Fair', 'Poor']).withMessage('Invalid condition'),
  body('availability.startDate').optional().isISO8601().withMessage('Valid start date is required'),
  body('availability.endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('availability.flexible').optional().isBoolean()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const item = await Item.findById(req.params.id);
    if (!item || !item.isActive) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns the item
    if (item.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update item
    Object.assign(item, req.body);
    await item.save();

    await item.populate('owner', 'firstName lastName trustScore totalExchanges');

    res.json({
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update item error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error while updating item' });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item (soft delete)
// @access  Private (owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns the item
    if (item.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    // Soft delete
    item.isActive = false;
    await item.save();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error while deleting item' });
  }
});

// @route   GET /api/items/user/:userId
// @desc    Get items by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let query = { 
      owner: req.params.userId, 
      isActive: true 
    };

    if (status) {
      query.status = status;
    }

    const items = await Item.find(query)
      .populate('owner', 'firstName lastName trustScore totalExchanges')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Item.countDocuments(query);

    res.json({
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user items error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: 'Server error while fetching user items' });
  }
});

module.exports = router;
