import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import connectDB from '../db/mongoClient.js';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await connectDB();
        const usersCollection = db.collection('users');

        const email = profile.emails[0].value;

        let user = await usersCollection.findOne({ email });

        if (!user) {
          const newUser = {
            googleId: profile.id,
            email,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            role: 'applicant',
          };

          const result = await usersCollection.insertOne(newUser);
          user = await usersCollection.findOne({ _id: result.insertedId });

          console.log('New user created:', user);
        } else {
          console.log('Existing user found:', user);
        }

        return done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

export default passport;
