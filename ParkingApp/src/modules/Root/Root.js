import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'react-native-firebase'

import Header from './components/Header'
import MySpaces from '../MySpaces/MySpaces'
import FreeSpaces from '../FreeSpaces/FreeSpaces'
import Settings from '../Settings/Settings'
import { TABS } from './constants'
import { NAME, actions } from './reducer'
import { morningNotificationHour } from '../../../config'

class Root extends Component {
  static propTypes = {
    updateFirebaseIdToken: func.isRequired,
    deviceIdUpdated: bool.isRequired,
  }

  state = {
    selected: TABS.mySpaces.value,
  }

  async componentDidMount() {
    try {
      const enabled = await firebase.messaging().hasPermission()

      if (!enabled) {
        await firebase.messaging().requestPermission()
      }

      const firebaseIdToken = await firebase.messaging().getToken()
      this.props.updateFirebaseIdToken(firebaseIdToken)
      this.scheduleMorningNotification()
      // eslint-disable-next-line
    } catch (error) {}
  }

  async componentDidUpdate() {
    if (!this.props.deviceIdUpdated) {
      const firebaseIdToken = await firebase.messaging().getToken()
      this.props.updateFirebaseIdToken(firebaseIdToken)
    }
  }

  scheduleMorningNotification() {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('freeSpace')
      .setTitle('Have a free space?')
      .setBody('Lend it to your colleagues!')

    const date = new Date()

    date.setHours(0, 0, 0, 0)
    if (date.getHours() < morningNotificationHour) {
      date.setDate(date.getDate() + 1)
    } else {
      date.setDate(date.getDate() + 2)
    }
    date.setHours(morningNotificationHour)
    if (Platform.OS === 'android') {
      const channel = new firebase.notifications.Android.Channel(
        'general',
        'General Notifications',
        firebase.notifications.Android.Importance.Default,
      ).setDescription('General Notifications')
      firebase.notifications().android.createChannel(channel)
      notification.android.setChannelId('morning-channel')
    }
    firebase.notifications().scheduleNotification(notification, {
      fireDate: date.getTime(),
    })
  }

  handleTabSelect = (selected) => {
    this.setState({ selected })
  }

  renderTab() {
    const tabsMap = {
      [TABS.mySpaces.value]: <MySpaces />,
      [TABS.freeSpaces.value]: <FreeSpaces />,
      [TABS.settings.value]: <Settings />,
    }
    return tabsMap[this.state.selected]
  }

  render() {
    return (
      <View style={styles.container}>
        <Header handleSelect={this.handleTabSelect} tabs={TABS} selected={this.state.selected} />
        <View style={styles.tabContainer}>{this.renderTab()}</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  deviceIdUpdated: state[NAME].deviceIdUpdated,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateFirebaseIdToken: actions.updateFirebaseIdToken.request,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#FFF',
    width: '100%',
  },
  tabContainer: {
    paddingTop: 10,
    width: '100%',
  },
})
