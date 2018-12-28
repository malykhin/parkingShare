import React, { Component } from 'react'
import { func } from 'prop-types'
import { Modal, View, StyleSheet, DatePickerIOS, DatePickerAndroid, Platform } from 'react-native'

import Button from './Button'

export default class Datepicker extends Component {
  static propTypes = {
    handleChange: func.isRequired,
  }

  constructor() {
    super()
    const date = Datepicker.getDate()

    this.state = {
      selectedDate: date,
      preSelectedDate: date,
      modalVisible: false,
    }
  }

  static getDate(selectedDate = new Date()) {
    const date = new Date(selectedDate)
    date.setHours(23, 59, 59)
    date.setDate(date.getDate())
    return date
  }

  handleModalSubmit = () => {
    const { preSelectedDate } = this.state
    const date = Datepicker.getDate(preSelectedDate)
    this.setState({ selectedDate: date, modalVisible: false }, () => this.props.handleChange(this.state.selectedDate))
  }

  handleIosChange = (preSelectedDate) => this.setState({ preSelectedDate })

  handleButtonClick = async () => {
    if (Platform.OS === 'android') {
      let selectedDate = new Date()
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: this.state.selectedDate,
        })
        if (action !== DatePickerAndroid.dismissedAction) {
          selectedDate = new Date(year, month, day)
        }
      } catch (error) {
        selectedDate = new Date()
      }
      const date = Datepicker.getDate(selectedDate)

      this.setState({ selectedDate: date }, () => this.props.handleChange(this.state.selectedDate))
    } else {
      this.setState({ modalVisible: true })
    }
  }

  render() {
    const { selectedDate, modalVisible, preSelectedDate } = this.state
    return (
      <View style={styles.container}>
        <Modal animationType={'slide'} transparent={false} visible={modalVisible} onRequestClose={() => {}}>
          <View style={styles.container}>
            <DatePickerIOS
              style={styles.datePickerIos}
              date={preSelectedDate}
              onDateChange={this.handleIosChange}
              mode={'date'}
            />
            <Button title={'SUBMIT'} handleClick={this.handleModalSubmit} />
          </View>
        </Modal>

        <Button title={selectedDate.toDateString()} handleClick={this.handleButtonClick} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  datePickerIos: {
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
})
