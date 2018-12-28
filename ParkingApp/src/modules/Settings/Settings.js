import React, { Component } from 'react'
import { string, bool, func } from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Notice from '../../components/Notice'
import { NAME, actions } from './reducer'
import { getErrorMessage } from '../../utils/error'

class Settings extends Component {
  static propTypes = {
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired,
    errorMessage: string.isRequired,
    loading: bool.isRequired,
    updateCredentials: func.isRequired,
    getSettings: func.isRequired,
    setFormValue: func.isRequired,
    setErrorMessage: func.isRequired,
    hasToken: bool.isRequired,
    getToken: func.isRequired,
  }

  componentDidMount() {
    this.props.getToken()
    this.props.getSettings()
  }

  handleInputChange = (valueName, value) => {
    this.props.setFormValue(valueName, value)
  }

  handleUpdate = () => {
    const { firstName, lastName, email, setErrorMessage, updateCredentials } = this.props

    if (!(firstName && lastName && email)) {
      setErrorMessage(getErrorMessage('Required'))
      return
    }
    // if (!/^.+?@lohika.com$/.test(email)) {
    //   setErrorMessage(getErrorMessage('EmailNotValid'))
    //   return
    // }
    updateCredentials({ firstName, lastName, email })
  }

  render() {
    const { firstName, lastName, email, errorMessage, loading, hasToken } = this.props
    return (
      <View style={styles.wrapper}>
        <Notice isError={!!errorMessage} message={errorMessage} />
        <View style={styles.form}>
          <Input
            value={firstName}
            handleChange={this.handleInputChange}
            name={'firstName'}
            placeholder={'FIRST NAME'}
          />
          <Input value={lastName} handleChange={this.handleInputChange} name={'lastName'} placeholder={'LAST NAME'} />
          <Input value={email} handleChange={this.handleInputChange} name={'email'} placeholder={'EMAIL'} />
        </View>
        {!hasToken && <Button disabled={loading} handleClick={this.handleUpdate} title={'UPDATE'} />}
        {loading && <ActivityIndicator style={styles.activity} size={'large'} color={'#777'} />}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  firstName: state[NAME].firstName,
  lastName: state[NAME].lastName,
  email: state[NAME].email,
  errorMessage: state[NAME].errorMessage,
  loading: state[NAME].loading,
  hasToken: state[NAME].hasToken,
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      updateCredentials: actions.updateCredentials.request,
      getSettings: actions.getSettings.request,
      getToken: actions.getToken.request,
      setFormValue: actions.setFormValue,
      setErrorMessage: actions.setErrorMessage,
    },
    dispatch,
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 10,
  },
  activity: {
    marginTop: 20,
  },
})
