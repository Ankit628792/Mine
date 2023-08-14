import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cardsData: [
    {
      phoneNumber: '8745960884',
      country: 'India',
      profileImage:
        'https://publish.purewow.net/wp-content/uploads/sites/2/2023/06/gosling-universal.jpg?resize=720%2C780',
      dob: '2001-01-07',
      age: 22,
      bio: 'I am Ryan Gosling',
      fullName: 'Litterally Me',
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
        'https://imgix.bustle.com/scary-mommy/2019/05/garrett-tinder.jpg?w=414&h=825&fit=crop&crop=faces&auto=format%2Ccompress',
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
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
    {
      phoneNumber: '9876543210',
      country: 'India',
      profileImage: 'https://i.imgur.com/UPrs1EWl.jpg',
      dob: '1998-12-31',
      age: 23,
      bio: 'I am a coder',
      fullName: 'Nitesh Kumar',
    },
  ],
};

const cardSlice = createSlice({
  name: 'CARDS',
  initialState,
  reducers: {},
});

export default cardSlice.reducer;
