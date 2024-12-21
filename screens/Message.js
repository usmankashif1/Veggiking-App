import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants'
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { messsagesData } from '../data/utils'

const Message = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(messsagesData);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = messsagesData.filter((user) =>
      user.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };
  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={()=>navigation.goBack()}
          style={styles.iconBtnContainer}>
          <AntDesign
            name="arrowleft"
            color={COLORS.black}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Message</Text>
        <TouchableOpacity
          style={styles.iconBtnContainer}>
          <View style={styles.notiContainer}>
            <Text style={styles.notiText}>2</Text>
          </View>
          <Ionicons
            name="chatbubble-ellipses-sharp"
            color={COLORS.black}
            size={24}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate('Chat', {
          userName: item.fullName,
        })
      }
      style={[
        styles.userContainer,
        index % 2 !== 0 ? styles.oddBackground : null,
      ]}
    >
      <View style={styles.userImageContainer}>
        {item.isOnline && item.isOnline === true && (
          <View style={styles.onlineIndicator}/>
        )}

        <Image
          source={item.userImg}
          resizeMode="contain"
          style={styles.userImage}
        />
      </View>
      <View style={{ flexDirection: "row", width: SIZES.width - 104}}>
      <View style={[styles.userInfoContainer]}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.lastSeen}>{item.lastMessage}</Text>
      </View>
      <View style={{ position: "absolute",
      right: 4,
      alignItems: "center"
      }}>
      <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
      <View>
    
      <TouchableOpacity style={{
        width: 20,
        height: 20,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: item.messageInQueue ? COLORS.primary : "transparent",
        marginTop: 12
      }}>
        <Text style={styles.messageInQueue}>{`${item.messageInQueue}`}</Text>
      </TouchableOpacity>
  
</View>
      </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Render content
   */
  const renderContent = () =>{
    return (
      <View>
          <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={24}
            color={COLORS.black}
          />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search contacts..."
          />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        {renderContent()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.secondaryWhite
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.secondaryWhite
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconBtnContainer: {
    height: 40,
    width: 40,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center"
  },
  notiContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 16,
    width: 16,
    borderRadius: 999,
    backgroundColor: COLORS.red,
    position: "absolute",
    top: 1,
    right: 1,
    zIndex: 999,
  },
  notiText: {
    fontSize: 10,
    color: COLORS.white,
    fontFamily: "regular"
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.black
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 50,
    marginVertical: 22,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    marginHorizontal: 12,
  },
  flatListContainer: {
    paddingBottom: 100,
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.secondaryWhite,
    borderBottomWidth: 1,
  },
  oddBackground: {
    backgroundColor: COLORS.tertiaryWhite,
  },
  userImageContainer: {
    paddingVertical: 15,
    marginRight: 22,
  },
  onlineIndicator: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.white,
    borderWidth: 2,
    position: 'absolute',
    top: 14,
    right: 2,
    zIndex: 1000,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: "bold",
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 14,
    color: "gray",
  },
  lastMessageTime: {
      fontSize: 12,
      fontFamily: "regular"
    },
    messageInQueue: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.white
    }
  
})
export default Message