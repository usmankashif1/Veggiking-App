import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet
  } from 'react-native'
  import React, { useState } from 'react'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import { COLORS, icons, images } from '../constants'
  import { Feather, FontAwesome, Entypo } from "@expo/vector-icons"
  import { GiftedChat, Bubble } from 'react-native-gifted-chat'
  import { StatusBar } from 'expo-status-bar'
  
  const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
  
    const handleInputText = (text) => {
        setInputMessage(text)
    }
  
    const renderMessage = (props) => {
        const { currentMessage } = props
  
        if (currentMessage.user._id === 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: COLORS.primary,
                                marginRight: 12,
                                marginVertical: 12,
                            },
                        }}
                        textStyle={{
                            right: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Image
                        source={images.avatar}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginLeft: 8,
                        }}
                    />
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: COLORS.secondary,
                                marginLeft: 12,
                            },
                        }}
                        textStyle={{
                            left: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    />
                </View>
            )
        }
  
        return <Bubble {...props} />
    }
  
    /***
     * Implementing chat functionnality
     */
  
    const submitHandler = () => {
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createdAt: new Date(),
            user: { _id: 1 },
        }
        setMessages((previousMessage) =>
            GiftedChat.append(previousMessage, [message])
        );
  
        setInputMessage("")
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.arrowLeft}
                            resizeMode="contain"
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={icons.more}
                            resizeMode="contain"
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Image
                            source={images.avatar7}
                            resizeMode="contain"
                            style={styles.userAvatar}
                        />
                        <View style={styles.userInfoText}>
                            <Text style={styles.userName}>Orlando Diggs</Text>
                            <View style={styles.userStatus}>
                                <View style={styles.statusIndicator} />
                                <Text style={styles.statusText}>Online</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Call")}
                            style={styles.actionIcon}>
                            <Feather name="phone" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                         onPress={()=>navigation.navigate("VideoCall")}
                         style={styles.actionIcon}>
                            <Feather name="video" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.chatContainer}>
                    <GiftedChat
                        messages={messages}
                        renderInputToolbar={() => { }}
                        user={{ _id: 1 }}
                        minInputToolbarHeight={0}
                        renderMessage={renderMessage}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputMessageContainer}>
                        <View style={styles.attachmentIconContainer}>
                            <TouchableOpacity>
                                <Entypo name="attachment" size={24} color={COLORS.blue2} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            value={inputMessage}
                            onChangeText={handleInputText}
                            placeholderTextColor={COLORS.blue2}
                            placeholder="Enter your message..."
                        />
                        <TouchableOpacity onPress={submitHandler}>
                            <View style={styles.sendButton}>
                                <FontAwesome name="send" size={22} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
  
                </View>
            </View>
        </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLORS.secondaryWhite,
    },
    headerIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    userInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 32,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 999,
    },
    userInfoText: {
        marginLeft: 12,
    },
    userName: {
        fontSize: 14,
        color: COLORS.blue,
        fontFamily: 'bold',
    },
    userStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        height: 8,
        width: 8,
        borderRadius: 999,
        backgroundColor: 'green',
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.blue2,
        marginLeft: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginRight: 12,
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.secondaryWhite,
        paddingVertical: 8,
    },
    inputMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        marginHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center'
    },
    attachmentIconContainer: {
        marginLeft: 10,
    },
    input: {
        color: COLORS.blue2,
        flex: 1,
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 999,
        marginHorizontal: 12,
    },
  });
  
  export default Chat