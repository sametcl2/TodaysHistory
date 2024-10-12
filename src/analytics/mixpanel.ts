import { Mixpanel } from 'mixpanel-react-native'

const mixPanelToken = process.env.EXPO_PUBLIC_MIXPANEL_TOKEN

export class MixpanelManager {
  // @ts-ignore
  static sharedInstance: MixpanelManager = MixpanelManager.sharedInstance || new MixpanelManager()

  mixpanel: Mixpanel

  constructor() {
    const trackAutomaticEvents = false
    this.mixpanel = new Mixpanel(mixPanelToken ?? '', trackAutomaticEvents)
    this.mixpanel.init()
    this.mixpanel.setLoggingEnabled(true)
  }
}

export const MixpanelInstance = MixpanelManager.sharedInstance.mixpanel
