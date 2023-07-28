import OneSignal from 'react-native-onesignal'

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email)
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: 'Henrique Marcelo',
    email: 'henrique@email.com.br',
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount)
}
