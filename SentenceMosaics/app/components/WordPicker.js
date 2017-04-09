'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Container,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { editWord, goBack } from '../actions';
import { styles } from '../styles';
import { words } from '../words';

const WordPicker = ({ wordType, wordIndex, editWordClick, goBackClick }) => {
  var categories = [];
  var wordList = words[wordType]['categories'];
  for (var category in wordList) {
    var wordStyle = ([
      styles.categoryWord,
      { backgroundColor: words[wordType]['color'] }
    ]);
    var wordOptions = wordList[category].map(item =>
      <TouchableHighlight
        underlayColor='transparent'
        key={item}
        onPress={editWordClick.bind(this,item,wordIndex)}>
        <Text key={item} style={wordStyle}>{item}</Text>
      </TouchableHighlight>
    );
    categories.push(
      <View key={category + "_view" } style={styles.page}>
        <Text key={category} style={styles.categoryHeader}>{category}</Text>
        <View style={styles.categoryContainer}>
          { wordOptions }
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.sentenceContainer}>
        { categories }
        <Button title = "Go Back" 
                onPress = {() => goBackClick()} />
      </View>
    </View>
  );
}

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {
    editWordClick: (word, wordIndex) => {
      dispatch(editWord(word,wordIndex))
    }, 
    goBackClick: () => {
      dispatch(goBack())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wordType: state.sentences.wordPicker,
    wordIndex: state.sentences.editIndex,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordPicker)