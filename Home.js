import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

// Style 
import style from './style'

function mapStateToProps(state) {
    return {
        text: state.text
    }
}

class HomeScreen extends React.Component {
    state = {
        clicked: false,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>HOME</Text>
                
                <Text style={styles.h2} onPress={() =>
                    this.props.navigation.navigate('Info', {name: "lol"})}
                    >Saisissez votre nom -></Text>
                
                <Text>{this.props.text ? 'Nom: '+ this.props.text : ''}</Text>
            </View>
        );
    }
}
  
export default connect(mapStateToProps)(HomeScreen)