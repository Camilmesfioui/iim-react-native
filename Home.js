import React from 'react';
// Adding Flatlist to import to render Flat list latter on.
import { Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

// Style 
import style from './style'

function mapStateToProps(state) {
    return {
        text: state.text
    }
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            // loading state for when collect da returns data.
            loading: true
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
                // Updating current state.
                this.setState({
                    loading: false,
                    gameList: data,
                });
            })
            // Catching errors
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            // Rendering vie
            <View style={style.container}>
                {/* Rendering Flat list to display items in UI. */}
                <FlatList
                    // Data plain array
                    data={this.state.gameList}
                    // Items Rendering
                    renderItem={
                        ({item}) => <Text style={style.item} onPress={ () => {
                            this.props.navigation.navigate('Info', {id: item.id})
                        }}>{item.name}</Text>
                    }
                    // Extracting Unique Key Id.
                    keyExtractor={({id}) => id}
                />
            </View>
        );
    }
}
  
export default connect(mapStateToProps)(HomeScreen)