import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>An error occurred.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
