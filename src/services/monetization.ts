import { AdMob, RewardAdOptions, AdMobRewardItem, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

// Ad Unit IDs (Replace YOUR_AD_UNIT_ID with the actual units you created in AdMob)
const REWARDED_AD_UNIT_ID = Capacitor.getPlatform() === 'ios' 
  ? 'ca-app-pub-8787930461062225/YOUR_IOS_AD_UNIT_ID' 
  : 'ca-app-pub-8787930461062225/3499183887';

// Public API Keys for RevenueCat (Replace with real keys from RevenueCat Dashboard)
const REVENUECAT_API_KEY_ANDROID = 'goog_ERPiaRKTbsXksbFlRuzaqqQNbMi';
const REVENUECAT_API_KEY_IOS = 'appl_sandbox_key_here';

export const initializeMonetization = async () => {
  try {
    // 1. Initialize AdMob
    await AdMob.initialize({
      initializeForTesting: false,
    });
    if (Capacitor.getPlatform() === 'ios') {
      await AdMob.requestTrackingAuthorization();
    }
    console.log('AdMob Initialized');

    // 2. Initialize RevenueCat
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    
    if (Capacitor.getPlatform() === 'android') {
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY_ANDROID });
    } else if (Capacitor.getPlatform() === 'ios') {
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY_IOS });
    }
    console.log('RevenueCat Initialized');
    
  } catch (err) {
    console.error('Failed to initialize monetization:', err);
  }
};

export const prepareRewardedAd = async () => {
  try {
    const options: RewardAdOptions = {
      adId: REWARDED_AD_UNIT_ID,
      isTesting: false,
    };
    await AdMob.prepareRewardVideoAd(options);
  } catch (err) {
    console.error('Failed to prepare Rewarded Ad:', err);
  }
};

export const showRewardedAd = async (onReward: (reward: AdMobRewardItem) => void) => {
  try {
    // Register listener for reward
    const rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward: AdMobRewardItem) => {
      onReward(reward);
    });
    
    const dismissListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
      rewardListener.remove();
      dismissListener.remove();
      // Prepare the next ad for future use
      prepareRewardedAd();
    });

    await AdMob.showRewardVideoAd();
  } catch (err) {
    console.error('Failed to show Rewarded Ad:', err);
    throw err;
  }
};

export const checkProStatus = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    // Assuming the entitlement identifier in RevenueCat is 'pro'
    return typeof customerInfo.entitlements.active['pro'] !== 'undefined';
  } catch (err) {
    console.error('Failed to check Pro status:', err);
    return false;
  }
};

export const getProPackages = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
      return offerings.current.availablePackages;
    }
    return [];
  } catch (err) {
    console.error('Failed to get Pro packages:', err);
    return [];
  }
};

export const purchasePackage = async (pack: any): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pack });
    return typeof customerInfo.entitlements.active['pro'] !== 'undefined';
  } catch (err: any) {
    if (err.userCancelled) {
      console.log('User cancelled purchase');
    } else {
      console.error('Purchase failed:', err);
    }
    return false;
  }
};

export const restorePurchases = async (): Promise<boolean> => {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return typeof customerInfo.entitlements.active['pro'] !== 'undefined';
  } catch (err) {
    console.error('Restore failed:', err);
    return false;
  }
};
