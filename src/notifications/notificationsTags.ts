import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
    OneSignal.sendTag('user_email', email)
}

export function tagUserInfoCreate() {
    OneSignal.sendTags({
        user_name: 'Marcelo Henrique',
        email: 'marcelo.henrique@email.com.br'
    })
}