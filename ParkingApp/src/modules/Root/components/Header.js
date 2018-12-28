import React, { Component } from 'react'
import { object, string, func } from 'prop-types'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import { TABS } from '../constants'

export default class Header extends Component {
  static propTypes = {
    selected: string.isRequired,
    tabs: object.isRequired,
    handleSelect: func.isRequired,
  }

  handleTabPress = (selected) => {
    this.props.handleSelect(selected)
  }

  getSelectionStyle = (value) => (this.props.selected === value ? styles.selected : null)

  render() {
    const { tabs } = this.props
    const tabKeys = Object.keys(tabs)
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          {tabKeys.map((tabKey) => (
            <View
              style={[styles.touchableContainer, this.getSelectionStyle(tabs[tabKey].value)]}
              key={tabs[tabKey].value}
            >
              <TouchableOpacity style={styles.touchable} onPress={() => this.handleTabPress(tabs[tabKey].value)}>
                <Text>{tabs[tabKey].text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.hr} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchableContainer: {
    width: `${100 / Object.keys(TABS).length}%`,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  selected: {
    backgroundColor: '#EEE',
  },
  hr: {
    width: '100%',
    height: 2,
    backgroundColor: '#EEE',
  },
})
