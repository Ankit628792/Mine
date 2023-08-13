import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import PostCard from '../../components/PostCard';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';

const Profile = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      item: 'Item 1',
      imageUrl:
        'https://i0.wp.com/www.jenniferbland.com/wp-content/uploads/Learn-CSS-Create-The-React-Logo.png?fit=1200%2C630&ssl=1s',
    },
    {
      id: '2',
      item: 'Item 2',
      imageUrl:
        'https://cdn.kinandcarta.com/-/media-assets/images/kincarta/insights/2022/02/react-native/react_hero.png?as=0&iar=0&w=1200&rev=61e1dad3af7e465e9544cf8490237772&hash=0AD31383BCBA1DA1C88546327312BA33',
    },
    {
      id: '3',
      item: 'Item 3',
      imageUrl:
        'https://i0.wp.com/www.jenniferbland.com/wp-content/uploads/Learn-CSS-Create-The-React-Logo.png?fit=1200%2C630&ssl=1s',
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState({
    fname: 'Test',
    lname: 'User',
    userImg: null,
    about: 'No details added.',
  });

  const logout = () => {};
  const handleDelete = () => {};

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      <SafeAreaView>
        <ScrollView
          style={tw`p-1 pt-5`}
          contentContainerStyle={tw`justify-center items-center`}
          showsVerticalScrollIndicator={false}>
          <Image
            style={tw`h-32 w-32 rounded-full`}
            source={{
              uri: userData
                ? userData.userImg ||
                  'https://i1.sndcdn.com/artworks-1CYFgpCe6nIn-0-t500x500.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
          />
          <Text style={tw`text-xl font-bold mt-4 mb-2`}>
            {userData ? userData.fname || 'Test' : 'Test'}
            {userData ? userData.lname || 'User' : 'User'}
          </Text>
          <Text style={tw`text-base font-semibold mb-4`}>
            {userData ? userData.about || 'No details added.' : ''}
          </Text>
          <View style={tw`w-full h-px bg-black mb-4`} />
          <View style={tw`flex-row justify-around w-full my-4`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold mb-1`}>{posts.length}</Text>
              <Text style={tw`text-sm`}>Posts</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold mb-1`}>10,000</Text>
              <Text style={tw`text-sm`}>Followers</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold mb-1`}>100</Text>
              <Text style={tw`text-sm`}>Following</Text>
            </View>
          </View>
          <View style={tw`flex-row`}>
            {posts.map(item => (
              <PostCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;
