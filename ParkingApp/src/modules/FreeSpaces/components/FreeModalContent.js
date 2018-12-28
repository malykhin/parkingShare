import React, { Component } from 'react'
import { func, object } from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Button from '../../../components/Button'

export default class FreeModalContent extends Component {
  static propTypes = {
    handleModalClose: func.isRequired,
    handleModalSubmit: func.isRequired,
    card: object.isRequired,
  }

  render() {
    const { handleModalClose, handleModalSubmit, card } = this.props
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Do you want to borrow this place?</Text>
        <View style={styles.buttonWrapper}>
          <Button handleClick={() => handleModalSubmit(card)} title={'SUBMIT'} />
          <Button handleClick={() => handleModalClose(false)} title={'CANCEL'} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
  },
  buttonWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
