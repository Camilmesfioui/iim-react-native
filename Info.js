// React
import React from 'react';
import { Text, View, Linking } from 'react-native';
// Input Gesture
// import { TextInput } from 'react-native-gesture-handler';

// Import Button 
import { Button } from 'react-native-elements';

// Connect
import { connect } from 'react-redux';

// Style
import style from './style'

function mapStateToProps(state) {
    return {
        text: state.text
    }
}

class InfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            gameId: this.props.navigation.state.params.id
        }
    }

    // Same as in Home.Js
    async componentDidMount() {
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.gameId}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    // Setting state for all needed props
                    gameName: data.name,
                    gameType: data.type,
                    gameYear: data.year,
                    gamePlayers: data.players,
                    gameDescriptionEN: data.description_en,
                    gameUrl: data.url
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={style.container}>
                <Text h1>{this.state.gameName}</Text>
                <View>
                    <Text>Players : {this.state.gamePlayers}</Text>
                    <Text>Type : {this.state.gameType}</Text>
                    <Text>Year : {this.state.gameYear}</Text>
                    <Text>Description : {this.state.gameDescriptionEN}</Text>
                    <Button title="Page wikipédia" type="outline" onPress={() => Linking.openURL(`${this.state.gameUrl}`)} />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(InfoScreen)