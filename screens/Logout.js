import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("_id");
      await AsyncStorage.removeItem("user_type");
      console.error('Cleared successfully:');

      navigation.replace('Main');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  handleLogout();
};

export default Logout