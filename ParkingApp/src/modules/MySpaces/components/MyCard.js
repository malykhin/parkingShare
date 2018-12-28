import React, { Component } from 'react'
import { string, bool, func } from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default class MyCard extends Component {
  static propTypes = {
    id: string.isRequired,
    parkingName: string,
    parkingPlaceNumber: string,
    own: bool.isRequired,
    handleClick: func.isRequired,
  }

  render() {
    const { id, parkingName, parkingPlaceNumber, own, handleClick } = this.props
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleClick({ id, own, parkingName, parkingPlaceNumber })}
      >
        <View style={[styles.wrapper, own ? styles.own : null]}>
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
  own: {
    backgroundColor: '#EEE',
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
