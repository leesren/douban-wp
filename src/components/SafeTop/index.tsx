const isIOS = /iphone/gi.test(navigator.userAgent);
const isIPhoneX = isIOS && screen.height == 812 && screen.width == 375;

export const NavBarHeight = 50;
export const NavStatusHeight = (isIOS ? 20 : 0) + (isIPhoneX ? 24 : 0);
export const NavBarTotalHeight = NavBarHeight + NavStatusHeight;
