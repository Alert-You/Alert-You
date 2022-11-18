import { MAIN, RED, WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';
import { W } from '@/constants/dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
    opacity: 0.8
  },
  teacherScreenContainer: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  profileContainer: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: WHITE.white,
  },
  profileBox: {
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 16,
    fontWeight: FONT_WEIGHT.Medium,
  },
  accountText: {
    fontSize: 16,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
    fontWeight: FONT_WEIGHT.Medium,
  },
  selectBoxGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectBox: {
    margin: 8,
  },
  countBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: FONT_WEIGHT.Regular,
    color: MAIN.mainFont,
  },
  selectText: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.Regular,
    color: MAIN.mainFont,
  },
  arrowBox: {
    color: MAIN.mainFont,
  },
  headerBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE.white,
    marginVertical: 16,
    marginHorizontal: 16,
    zIndex: 1,
  },
  textBox: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Bold,
    color: MAIN.mainFont,
    paddingTop: 4,
  },
  dotContainer: {
    position: 'absolute',
    right: 0,
    top: 26,
    width: W - 250,
    elevation: 6,
    backgroundColor: WHITE.white,
    height: 60,
    borderRadius: 4,
    zIndex: 2,
  },
  dotContent: {
    margin: 4,
    marginLeft: 8,
  },
  guardText: {
    fontSize: 15,
    color: MAIN.mainFont,
  },
  excludeText: {
    fontSize: 15,
    color: RED.red700,
  },
  tabBoxGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 32,
  },
  tabBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    marginVertical: 12,
  },
  tabText: {
    fontSize: 17,
    color: MAIN.mainFont,
    marginBottom: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.SemiBold,
    color: MAIN.placeholder,
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  categoryItem: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Medium,
    marginLeft: 5,
    color: MAIN.mainFont,
  },
  categoryIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Regular,
    color: MAIN.mainFont,
  },
  avatarFlex: { flexDirection: 'row' },
  contentMargin: { marginLeft: 16 },
  teacherButton: { backgroundColor: 'white', marginTop: 16 },
});
