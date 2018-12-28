import React, { Component } from 'react'
import { array, string, bool, object, func } from 'prop-types'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MyCard from './components/MyCard'
import MyModalContent from './components/MyModalContent'
import Notice from '../../components/Notice'
import { NAME, actions } from './reducer'

class MySpaces extends Component {
  static propTypes = {
    cards: array.isRequired,
    selectedCard: object.isRequired,
    loading: bool.isRequired,
    errorMessage: string.isRequired,
    setSelectedCard: func.isRequired,
    returnPlace: func.isRequired,
    lendPlace: func.isRequired,
    getMyCards: func.isRequired,
  }

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    this.props.getMyCards()
  }

  handleCardClick = (card) => {
    this.setModalVisible(true)
    this.props.setSelectedCard(card)
  }

  handleModalSubmit = (card) => {
    this.setModalVisible(false)
    this.props.setSelectedCard({})

    if (card.own) {
      this.props.lendPlace(card)
    } else {
      this.props.returnPlace(card)
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  getNoticeText = () => {
    const { cards, loading, errorMessage } = this.props
    if (loading) {
      return ''
    }
    if (errorMessage) {
      return errorMessage
    }
    if (!cards.length) {
      return 'No places here'
    }
    return ''
  }

  render() {
    const { cards, selectedCard, loading, errorMessage } = this.props
    return (
      <View style={styles.wrapper}>
        <Notice isError={!!errorMessage} message={this.getNoticeText()} />
        {loading && <ActivityIndicator style={styles.activity} size={'large'} color={'#777'} />}
        {cards.map((card) => (
          <MyCard
            key={card._id}
            id={card._id}
            parkingName={card.parkingName}
            parkingPlaceNumber={card.parkingPlaceNumber}
            own={card.own}
            handleClick={this.handleCardClick}
          />
        ))}
        <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {}}>
          <MyModalContent
            card={selectedCard}
            handleModalSubmit={this.handleModalSubmit}
            handleModalClose={this.setModalVisible}
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state[NAME].cards,
  selectedCard: state[NAME].selectedCard,
  loading: state[NAME].loading,
  errorMessage: state[NAME].errorMessage,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedCard: actions.setSelectedCard,
      returnPlace: actions.returnPlace.request,
      lendPlace: actions.lendPlace.request,
      getMyCards: actions.getMyCards.request,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySpaces)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
})
