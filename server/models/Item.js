
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Item title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Tools & Equipment',
      'Books & Media',
      'Electronics',
      'Furniture',
      'Clothing',
      'Sports & Recreation',
      'Baby & Kids',
      'Kitchen & Appliances',
      'Garden & Outdoor',
      'Musical Instruments',
      'Art & Crafts',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['lend', 'donate'],
    default: 'lend'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(url) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
      },
      message: 'Invalid image URL format'
    }
  }],
  availability: {
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(date) {
          return date >= new Date();
        },
        message: 'Start date must be in the future'
      }
    },
    endDate: {
      type: Date,
      validate: {
        validator: function(date) {
          return !date || date > this.availability.startDate;
        },
        message: 'End date must be after start date'
      }
    },
    flexible: {
      type: Boolean,
      default: false
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(coords) {
          return coords.length === 2 && 
                 coords[0] >= -180 && coords[0] <= 180 && // longitude
                 coords[1] >= -90 && coords[1] <= 90; // latitude
        },
        message: 'Invalid coordinates'
      }
    }
  },
  status: {
    type: String,
    enum: ['available', 'borrowed', 'unavailable'],
    default: 'available'
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  borrowedAt: {
    type: Date,
    default: null
  },
  returnBy: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
itemSchema.index({ location: '2dsphere' });

// Compound indexes for common queries
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ owner: 1, status: 1 });
itemSchema.index({ status: 1, createdAt: -1 });

// Text index for search functionality
itemSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text' 
});

// Virtual for distance (will be populated in queries)
itemSchema.virtual('distance');

// Pre-save middleware to generate tags from title and description
itemSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isModified('description')) {
    const text = `${this.title} ${this.description}`.toLowerCase();
    const words = text.match(/\b\w{3,}\b/g) || [];
    this.tags = [...new Set(words)].slice(0, 10); // Limit to 10 unique tags
  }
  next();
});

module.exports = mongoose.model('Item', itemSchema);
