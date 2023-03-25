/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';




function Home() {
  return (
    <View style={styles.body}>
        <LinearGradient
          colors={['#ECEEA1', '#48AF7E', '#2EACB4', '#2EA7EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.linearGradient}
        >
          <Text style = {styles.sectionTitle}> Red </Text>
          <Text style = {styles.title1}>
            push
          </Text>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'stretch',
    justifycontent: 'center',
  },
  sectionTitle: {
    fontSize: 100,
    fontFamily: 'Pacifico-Regular',
    color: '#E63946',
  },
  title1:{
    fontSize: 100,
    color: '#E63946',
    fontFamily: 'Aclonica-Regular'
  },
  linearGradient: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default Home;
