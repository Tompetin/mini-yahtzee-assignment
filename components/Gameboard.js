import { useState, useEffect } from 'react';
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
import { Container, Row, Col } from 'react-native-flex-grid';
import styles from '../style/style';

let board = [];

export default function Gameboard({ navigation, route }) {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);

    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    const [playerName, setPlayerName] = useState('');

    const [totalPoints, setTotalPoints] = useState(0);
    const [roundNumber, setRoundNumber] = useState(0);

    const [bonusApplied, setBonusApplied] = useState(false);

    const [test, setTest] = useState(false);

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, [])

    const row = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        row.push(
            <Col key={"row" + dice}>
                <Pressable
                    key={"row" + dice}
                    onPress={() => selectDice(dice)}
                >
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={"row" + dice}
                        size={50}
                        color={getDiceColor(dice)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        );
    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot} style={styles.info}>
                <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        );
    }

    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonRow" + diceButton}>
                <Pressable
                    key={"buttonRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons
                        key={"buttonRow" + diceButton}
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        );
    }

    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "green" : "darkblue"
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "green" : "darkblue"
    }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
                setSelectedDicePoints(selectedPoints);
                setDicePointsTotal(points);
                setNbrOfThrowsLeft(NBR_OF_THROWS);

                // Calculate total points for the round
                let roundTotal = totalPoints + points[i];
                if (roundTotal >= BONUS_POINTS_LIMIT && !bonusApplied) {
                    // Apply bonus points
                    roundTotal += BONUS_POINTS;
                    setBonusApplied(true);
                }

                // Update totalPoints
                setTotalPoints(roundTotal);
                setRoundNumber(currentRound => currentRound + 1);
                setSelectedDices(new Array(NBR_OF_DICES).fill(false));

                if (roundNumber === 5) {
                    setGameEndStatus(true);
                }

                return points[i];
            } else {
                setStatus('You already selected points for ' + (i + 1));
            }
        } else {
            setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
        }
    }


    const throwDices = () => {
        console.log(totalPoints);
        console.log(dicePointsTotal);

        setTest(true);
        if (nbrOfThrowsLeft > 0) {
            let spots = [...diceSpots];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
                    spots[i] = randomNumber;
                    board[i] = 'dice-' + randomNumber;
                }
            }
            setDiceSpots(spots);
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        } else {
            setStatus("You should set points");
        }

    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function resetGame() {
        console.log(totalPoints);
        console.log(dicePointsTotal);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setRoundNumber(0);
        setTest(false);
        setBonusApplied(false);
    }

    const remainingPointsForBonus = BONUS_POINTS_LIMIT - totalPoints;
    const displayBonusCounter = remainingPointsForBonus > 0;

    return (

        <>
            <Header />
            {!gameEndStatus ?
                <>
                    <View>
                        {!test ?
                            <>
                                <View>
                                    <View style={styles.info}>
                                        <MaterialCommunityIcons
                                            name="dice-5"
                                            size={90}
                                            color="darkblue"
                                        />
                                    </View>
                                    <Text style={styles.textbig}>Start round by pressing the button below</Text>
                                </View>
                            </>
                            :
                            <>
                                <Container>
                                    <Row>{row}</Row>
                                </Container>
                            </>
                        }
                        <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
                        <Text style={styles.text}>{status}</Text>
                        <Text style={styles.textbig}>Total points: {totalPoints}</Text>
                        {displayBonusCounter &&
                            <Text style={styles.text}>Points to Bonus: {remainingPointsForBonus}</Text>}
                        <Pressable onPress={() => throwDices()}>
                            <Text style={styles.buttontext}>THROW DICES</Text>
                        </Pressable>
                        <Container>
                            <Row>{pointsRow}</Row>
                        </Container>
                        <Container>
                            <Row>{pointsToSelectRow}</Row>
                        </Container>
                        <Text style={styles.text}>Player name: {playerName}</Text>
                    </View>

                </>
                :
                <>
                    <View>
                        <Text style={styles.textbig}>Your game has ended. Press this button to reset the game:</Text>
                        <Pressable onPress={() => resetGame()}>
                            <Text style={styles.buttontext}>RESET GAME</Text>
                        </Pressable>
                        <Text style={styles.textbig}>Total points: {totalPoints}</Text>
                        <Container>
                            <Row>{pointsRow}</Row>
                        </Container>
                        <Container>
                            <Row>{pointsToSelectRow}</Row>
                        </Container>
                        <Text style={styles.text}>Player name: {playerName}</Text>
                    </View>
                </>
            }
            <Footer />
        </>

    )
}