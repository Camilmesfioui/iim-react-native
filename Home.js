import React from 'react';
// Adding Flatlist to import to render Flat list latter on.
import { 
    Text, 
    View, 
    FlatList,
    ImageBackground, 
    AsyncStorage 
} from 'react-native';
import { ListItem, Image } from 'react-native-elements'
import { connect } from 'react-redux';

// Style 
import style from './style'

function mapStateToProps(state) {
    return {
        text: state.text,
    }
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            // loading state for when collect da returns data.
            loading: true,
            lastGame: ""
        }
    }

    //Define your componentDidMount lifecycle hook that will retrieve data.
    //Also have the async keyword to indicate that it is asynchronous. 
    async componentDidMount() {
        // Then fetching game API.
        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list', {
            method: "GET"
        })
            // Taking the response and sending a JSON reponse back.
            .then((response) => response.json())
            .then((data) => {
                // Init Async storage 
                AsyncStorage.getItem('lastGame').then(value => {
                    this.setState({
                        loading: false,
                        gameList: data,
                        lastGameClicked: value,
                    });
                });
            })
            // Catching errors
            .catch((error) => {
                console.error(error);
            });
    }

    handleOnNavigateBack = (lastGame) => {
        if (lastGame) {
            this.setState({
                lastGame
            })
        }
    }

    render() {
        return (
            // Rendering view
            <View style={style.container}>
                <ImageBackground source={require('./assets/bg-1.jpg')} style={{width: '100%', height: '100%'}}>
                    <Text style={style.intro}>Welcome in API Game</Text>
                    <Text style={style.lastGame}>Last Game checked was : {this.state.lastGame}</Text>
                    {/* Rendering Flat list to display items in UI. */}
                    <FlatList
                        // Data plain array
                        data={this.state.gameList}
                        // Items Rendering
                        renderItem={({item}) => <Text style={style.item} onPress={ () => {
                                this.props.navigation.navigate('Info', {
                                    id: item.id,
                                    onNavigateBack: this.handleOnNavigateBack
                                })
                            }}>{item.name}</Text>
                        }
                        // Extracting Unique Key Id.
                        keyExtractor={({id}) => id}
                    />
                </ImageBackground>
            </View>
        );
    }
}
  
export default connect(mapStateToProps)(HomeScreen)