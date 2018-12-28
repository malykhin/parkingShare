import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { StyleSheet, TextInput, View } from 'react-native'

export default class Input extends Component {
  static propTypes = {
    placeholder: string.isRequired,
    handleChange: func.isRequired,
    value: string.isRequired,
    name: string.isRequired,
  }

  render() {
    const { placeholder, handleChange, value, name } = this.props
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(text) => handleChange(name, text)}
          value={value}
          autoCapitalize={'none'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minWidth: 200,
    paddingTop: 20,
  },
  input: {
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center',
    marginBottom: 20,
  },
})
