import React, { Component } from 'react'
import { array, string, bool, object, func } from 'prop-types'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FreeCard from './components/FreeCard'
import FreeModalContent from './components/FreeModalContent'
import Notice from '../../components/Notice'
import { NAME, actions } from './reducer'

class FreeSpaces extends Component {
  static propTypes = {
    cards: array.isRequired,
    selectedCard: object.isRequired,
    loading: bool.isRequired,
    errorMessage: string.isRequired,
    setSelectedCard: func.isRequired,
    borrowFreeCard: func.isRequired,
    getFreeCards: func.isRequired,
  }

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    this.props.setSelectedCard()
    this.props.getFreeCards()
  }

  handleCardClick = (card) => {
    this.setModalVisible(true)
    this.props.setSelectedCard(card)
  }

  handleModalSubmit = (card) => {
    this.setModalVisible(false)
    this.props.borrowFreeCard(card)
    this.props.setSelectedCard({})
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
      return 'No places avaliable'
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
          <FreeCard
            key={card._id}
            id={card._id}
            email={card.email}
            parkingName={card.parkingName}
            parkingPlaceNumber={card.parkingPlaceNumber}
            own={card.own}
            handleClick={this.handleCardClick}
          />
        ))}
        <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {}}>
          <FreeModalContent
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
      getFreeCards: actions.getFreeCards.request,
      borrowFreeCard: actions.borrowFreeCard.request,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreeSpaces)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  activity: {
    marginTop: 20,
  },
})
