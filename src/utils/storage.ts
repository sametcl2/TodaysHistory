import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocalStorageKeys } from 'constants/storage'

export const saveToLocalStorage = async (key: LocalStorageKeys, data: unknown) => {
  await AsyncStorage.setItem(key, JSON.stringify(data))
}

export const removeFromLocalStorage = async (key: LocalStorageKeys) => {
  const result = await AsyncStorage.removeItem(key)
  return result
}

export const getValueFromLocalStorage = async <T>(key: string, defaultReturn?: unknown): Promise<T> => {
  const localStorageValue = await AsyncStorage.getItem(key)
  const keyValue =
    localStorageValue && localStorageValue !== 'undefined' ? JSON.parse(localStorageValue) : defaultReturn
  return keyValue
}

export const clearUserDataFromLocalStorage = async () => {
  const result = await AsyncStorage.multiRemove(Object.values(LocalStorageKeys))
  return result
}
