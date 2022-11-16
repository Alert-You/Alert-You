import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN, NAVY, WHITE, BLUE } from '@/theme/colorVariants';

import { styles } from './style';

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route:any, index:number) => {
        const isFocused = state.index === index
        const {options} = descriptors[route.key]

        const selectTabNavigation = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.reset({ routes: [{ name: route.name }] });
          }
        }
        return (
          <TouchableOpacity
            key={index}
            onPress={selectTabNavigation}
            testID={options.tabBarTestID}
            accessibilityRole="button"
            activeOpacity={0.75}>
            {index === 0 && (
              <View>
                {isFocused ? (
                  <MaterialCommunityIcons
                    name="comment-alert"
                    size={28}
                    color={MAIN.blue}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="comment-alert-outline"
                    size={28}
                    color={MAIN.placeholder}
                  />
                )}
              </View>
            )}
            {index === 1 && (
              <LinearGradient
                colors={[BLUE.blue500, MAIN.red]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.centerIcon}>
                {isFocused ? (
                  <MaterialCommunityIcons
                    name="bell-ring"
                    size={28}
                    color={WHITE.white}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="bell-ring-outline"
                    size={28}
                    color={WHITE.white}
                  />
                )}
              </LinearGradient>
            )}
            {index === 2 && (
              <View>
                {isFocused ? (
                  <MaterialCommunityIcons
                    name="account"
                    size={28}
                    color={MAIN.blue}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={28}
                    color={MAIN.placeholder}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

export default CustomTabBar