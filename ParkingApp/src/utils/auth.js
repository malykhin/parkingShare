import { AsyncStorage } from 'react-native'

export const setToken = async (token) => await AsyncStorage.setItem('token', token)

export const getToken = async () => await AsyncStorage.getItem('token')
