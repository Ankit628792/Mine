import React from 'react';
import SwipeableProfile from './SwipeableProfile';

const profilesData = [
  {
    phoneNumber: '8745960884',
    country: 'India',
    profileImage:
      'http://res.cloudinary.com/die9o5d6p/image/upload/v1691661816/lxgbf0tvbhpq4nguralg.png',
    dob: '2001-01-07',
    age: 22,
    bio: 'I am a coder',
    fullName: 'Nitesh Kumar',
    gender: 'MALE',
    religion: 'HINDU',
    profession: 'ENGINEER',
    genderInterest: 'FEMALE',
    interest: ['coding', 'riding', 'school'],
    notInterest: ['love', 'world', 'smoking'],
  },
  {
    phoneNumber: '1234567890',
    country: 'USA',
    profileImage:
      'http://res.cloudinary.com/die9o5d6p/image/upload/v1691661816/sample_profile2.png',
    dob: '1995-05-15',
    age: 28,
    bio: 'Passionate about technology and innovation.',
    fullName: 'Jessica Smith',
    gender: 'FEMALE',
    religion: 'CHRISTIAN',
    profession: 'SOFTWARE DEVELOPER',
    genderInterest: 'MALE',
    interest: ['technology', 'hiking', 'reading'],
    notInterest: ['clutter', 'rainy days', 'crowds'],
  },
];

const Home = () => {
  return <SwipeableProfile profiles={profilesData} />;
};

export default Home;
