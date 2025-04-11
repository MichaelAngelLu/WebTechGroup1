const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./modules/Job'); // Adjust path if needed

dotenv.config();

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const jobs = [
      {
        title: 'Software Engineer',
        description: 'Develop full-stack applications',
        location: 'Manila',
        company: 'TechCorp'
      },
      {
        title: 'UI/UX Designer',
        description: 'Design clean interfaces and user flows',
        location: 'Cebu',
        company: 'CreativeSolutions'
      },
      {
        title: 'Project Manager',
        description: 'Coordinate development teams and timelines',
        location: 'Davao',
        company: 'ManagePro'
      }
    ];

    await Job.insertMany(jobs);
    console.log('✅ Sample jobs inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    process.exit(1);
  }
};

seedJobs();
