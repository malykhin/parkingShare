import React, { Component } from 'react'
import { func, string, bool } from 'prop-types'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export default class Button extends Component {
  static propTypes = {
    handleClick: func.isRequired,
    title: string.isRequired,
    disabled: bool,
  }

  render() {
    const { handleClick, title, disabled } = this.props
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.touchable, disabled ? styles.disabled : null]}
        onPress={handleClick}
      >
        <View style={styles.wrapper}>
          <Text style={styles.touchable}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#EEE',
  },
  touchable: {
    fontSize: 20,
  },
  disabled: {
    opacity: 0.2,
  },
})
