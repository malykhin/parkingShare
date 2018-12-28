import React, { Component } from 'react'
import { string, bool } from 'prop-types'
import { StyleSheet, Text } from 'react-native'

export default class Notice extends Component {
  static propTypes = {
    isError: bool.isRequired,
    message: string.isRequired,
  }

  render() {
    const { isError, message } = this.props
    return <Text style={[styles.notice, isError ? styles.error : null]}>{message}</Text>
  }
}

const styles = StyleSheet.create({
  notice: {
    marginTop: 20,
  },
  error: {
    color: '#E00',
  },
})
