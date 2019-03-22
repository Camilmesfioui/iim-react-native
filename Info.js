// React
import React from 'react';
import { 
    Text, 
    View,
    Image, 
    Linking,
    ImageBackground,
    AsyncStorage, 
    ScrollView,
} from 'react-native';
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
            AsyncStorage.setItem('lastGame', data.name);
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
                <ImageBackground source={require('./assets/bg-2.jpg')} style={{width: '100%', height: '100%'}}>
                    <Button style={style.btn} title="Retour à la liste" type="solid" onPress={() =>{
                                this.props.navigation.state.params.onNavigateBack(this.state.gameName),
                                this.props.navigation.goBack()
                            }} />
                    <View style={style.wrapper}>
                        <ScrollView>
                            <Text h1 style={style.h1}>{this.state.gameName}</Text>
                            <Text style={style.space}>Players : {this.state.gamePlayers}</Text>
                            <Text style={style.space}>Type : {this.state.gameType}</Text>
                            <Text style={style.space}>Year : {this.state.gameYear}</Text>
                            <Text style={style.space}>Description : {this.state.gameDescriptionEN}</Text>
                        </ScrollView>
                    </View>
                    <Button style={style.btn} title="Page wikipédia" type="solid" onPress={() => Linking.openURL(`${this.state.gameUrl}`)} />
                </ImageBackground>
            </View>
        );
    }
}

export default connect(mapStateToProps)(InfoScreen)