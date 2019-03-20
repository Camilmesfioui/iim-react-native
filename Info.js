// React
import React from 'react';
import { Text, View } from 'react-native';
// Input Gesture
import { TextInput } from 'react-native-gesture-handler';

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
    state = {
        clicked: false
    }
    empty = ''
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>INFO</Text>
                <Text>Saisir nom</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text) => this.text = text}
                ></TextInput>
                <Text
                    style={styles.text}
                    onPress={() => this.props.dispatch({ type: 'TEXT', payload: this.text }, this.props.navigation.navigate('Home'))}
                >Valider</Text>
            </View>
            //     onPress={() => this.props.navigation.goBack()}
        );
    }
}

export default connect(mapStateToProps)(InfoScreen)