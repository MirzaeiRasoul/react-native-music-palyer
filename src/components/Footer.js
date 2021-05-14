import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Styles from '../styles/Styles';

import Player from './Player';

const ProfileRoute = () => <Text>Profile</Text>;
const CalendarRoute = () => <Text>Calendar</Text>;

export default Tabbar = () => {
    const [index, setIndex] = useState(1);
    const [routes] = useState([
        { key: 'profile', title: 'Profile', icon: 'account' },
        { key: 'player', title: 'Player', icon: 'music' },
        { key: 'calendar', title: 'Calendar', icon: 'calendar-check' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        profile: ProfileRoute,
        player: Player,
        calendar: CalendarRoute,
    });

    return (
        <BottomNavigation barStyle={Styles.footer} sceneAnimationEnabled={true} shifting={false}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}