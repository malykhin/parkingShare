import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default class FreeCard extends Component {
  static propTypes = {
    id: string.isRequired,
    email: string.isRequired,
    parkingName: string,
    parkingPlaceNumber: string,
    handleClick: func.isRequired,
  }

  render() {
    const { id, email, parkingName, parkingPlaceNumber, handleClick } = this.props
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleClick({ id, email, parkingName, parkingPlaceNumber })}
      >
        <View style={styles.wrapper}>
          <Text style={styles.text}>{`Parking: ${parkingName || 'n/a'}, `}</Text>
          <Text style={styles.text}>{`place: ${parkingPlaceNumber || 'n/a'}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#EEE',
    padding: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
  touchable: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
