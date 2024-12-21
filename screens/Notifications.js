import { View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS,  icons } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { messages, notifications } from '../data/utils'
import { StatusBar } from 'expo-status-bar'


const NotificationsRoute = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={notifications}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 12
          }}
        >
          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              source={item.avatar}
              style={{
                height: 54,
                width: 54,
                borderRadius: 27,
                marginRight: 16
              }}
            />
            <View style={{
              flexDirection: 'column',
              width: 150
            }}>
              <View style={{ flexDirection: 'row', width: 150, flexWrap: 'wrap' }}>
                <Text style={{
                  fontSize: 13,
                  fontFamily: 'bold',
                  color: COLORS.black,
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 13,
                  fontFamily: 'regular',
                  color: COLORS.black,
                  marginLeft: 2,
                  flexWrap: 'wrap'
                }}>{item.message}</Text>
              </View>
              <Text style={{
                fontSize: 10,
                fontFamily: 'regular',
                color: COLORS.black,
                marginVertical: 16
              }}>{item.time}</Text>
            </View>
          </View>

          <Image
            source={item.image}
            style={{
              height: 54,
              width: 54,
              borderRadius: 10,
              borderColor: COLORS.gray,
              borderWidth: 1
            }}
          />
        </View>
      )}
    />
  </View>
)

const MessagesRoute = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 12
          }}
        >
          <View style={{
            flexDirection: 'row'
          }}>
            <View>
              <View style={{
                position: 'absolute',
                bottom: 10,
                left: 48,
                height: 8,
                width: 8,
                borderRadius: 4,
                zIndex: 999,
                backgroundColor: COLORS.green
              }} />
              <Image
                source={item.image}
                style={{
                  height: 54,
                  width: 54,
                  borderRadius: 27,
                  marginRight: 16
                }}
              />
            </View>

            <View style={{
              flexDirection: 'column',
              width: 150
            }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{
                  fontSize: 13,
                  fontFamily: 'bold',
                  color: COLORS.black,
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 13,
                  fontFamily: 'regular',
                  color: COLORS.black,
                  marginLeft: 2,
                }}>{item.lastMessage}</Text>
              </View>
            </View>
          </View>


          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              fontSize: 10,
              fontFamily: 'regular',
              color: COLORS.black,
              marginVertical: 12
            }}>{item.time}</Text>
            <View style={{
              height: 22,
              width: 22,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 11,
              backgroundColor: item.pendingMessage !== 0 ? COLORS.primary : undefined,
            }}>

              <Text style={{
                fontSize: 12,
                fontFamily: 'regular',
                color: COLORS.white
              }}>{item.pendingMessage}</Text>
            </View>
          </View>



        </View>
      )}
    />
  </View>
)
const renderScene = SceneMap({
  first: NotificationsRoute,
  second: MessagesRoute,
});


const Notifications = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Notifications' },
    { key: 'second', title: 'Messages' },
  ])

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary
      }}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );
 
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.header1Icon}
        >
          <Image
            resizeMode='contain'
            source={icons.arrowLeft}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Notifications</Text>
      </View>
        <View style={{
          flex: 1,
        }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default Notifications