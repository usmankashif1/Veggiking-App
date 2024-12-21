import { View, Text, TouchableOpacity, Image, LayoutAnimation, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import { faqs } from '../data/faqs'

const Faqs = ({ navigation }) => {
  /**
   * Render FAQS header
   */
  function renderHeader() {
    return (
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
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>FAQS</Text>
      </View>
    )
  }

  /***
   * Render common question asked
   */

  function renderFAQS() {
    const [expanded, setExpanded] = useState(-1);




    const toggleExpand = (index) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (expanded === index) {
        setExpanded(-1);
      } else {
        setExpanded(index);
      }
    };


    return (
      <View style={styles.container}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)} activeOpacity={0.8}>
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{faq.question}</Text>
                <Text style={styles.icon}>{expanded === index ? '-' : '+'}</Text>
              </View>
            </TouchableOpacity>
            {expanded === index && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}
      </View>
    )
  }

  /**Render Button to ask question */

  function renderActionButtons() {
    return (
      <Button
        title="ASK QUESTION"
        onPress={() => navigation.navigate("SubmitQuestion")}
        filled
        style={{
          width: SIZES.width - 32,
          marginVertical: 12
        }}
      />
    )
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <View style={{
        flex: 1,
        marginHorizontal: 16
      }}>
        {renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {renderFAQS()}
          {renderActionButtons()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 4,
    paddingTop: 20,
  },
  faqContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'bold',
    color: '#333',
  },
  icon: {
    fontSize: 18,
    color: '#666',
  },
  answer: {
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    fontFamily: 'regular',
    color: '#666',
  },
});

export default Faqs