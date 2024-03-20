import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import Header from './Header';
import Footer from './Footer.js';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game.js';

import styles from '../style/style';

export default function Home({ navigation }) {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header />
            <View>
                <View style={styles.info}>
                    <MaterialCommunityIcons
                        name="home-alert"
                        size={90}
                        color="darkblue"
                    />
                </View>
                {!hasPlayerName ?
                    <>
                        <Text style={styles.headertext}> For Scoreboard, enter your name... </Text>
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={setPlayerName}
                                autoFocus={true} />
                        </View>

                        <Pressable
                            onPress={() => handlePlayerName(playerName)}
                        >
                            <Text style={styles.buttontext}>Ok</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <Text style={styles.headertext}>Rules of the game:</Text>
                        <Text multiline="true" style={styles.text}>
                            THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.
                        </Text>
                        <Text multiline="true" style={styles.text}>
                            POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the
                            game you can not select same points from
                            {MIN_SPOT} to {MAX_SPOT} again.
                        </Text>
                        <Text multiline="true" style={styles.text}>
                            GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMIT} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.
                        </Text>
                        <Text style={styles.textbig}>Good luck, {playerName} </Text>
                        <Pressable
                            onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                            <Text style={styles.buttontext}>Play</Text>
                        </Pressable>
                    </>
                }

            </View>
            <Footer />
        </>
    )
}
