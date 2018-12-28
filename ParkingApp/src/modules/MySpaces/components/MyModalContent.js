import React, { Component, Fragment } from 'react'
import { object, func } from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Button from '../../../components/Button'
import Notice from '../../../components/Notice'
import Datepicker from '../../../components/Datepicker'

export default class MyModalContent extends Component {
  static propTypes = {
    handleModalClose: func.isRequired,
    card: object.isRequired,
    handleModalSubmit: func.isRequired,
  }

  state = {
    dateTo: Datepicker.getDate(),
    errorMessage: '',
  }

  modalQuestion() {
    return this.props.card.own ? 'Do you want to share your place?' : 'Do you want to return lended place?'
  }

  handleDateChange = (date) => this.setState({ dateTo: date, errorMessage: '' })

  handleSubmit = () => {
    const { card, handleModalSubmit } = this.props
    const { dateTo } = this.state

    if (new Date().valueOf() > dateTo.valueOf()) {
      const errorMessage = 'Incorrect "Date to".'
      this.setState({ errorMessage })
    } else {
      handleModalSubmit({ ...card, dateTo })
    }
  }

  render() {
    const { handleModalClose, card } = this.props
    const { errorMessage } = this.state
    return (
      <View style={styles.wrapper}>
        <Notice isError={!!errorMessage} message={errorMessage} />
        <Text style={styles.text}>{this.modalQuestion()}</Text>
        {card.own && (
          <Fragment>
            <Text style={styles.text}>Date to:</Text>
            <Datepicker handleChange={this.handleDateChange} />
          </Fragment>
        )}
        <View style={styles.buttonWrapper}>
          <Button handleClick={this.handleSubmit} title={'SUBMIT'} />
          <Button handleClick={() => handleModalClose(false)} title={'CANCEL'} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
