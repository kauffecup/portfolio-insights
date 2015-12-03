import React, { Component, Text, StyleSheet } from 'react-native';

export default class PortfolioInsights extends Component {
  render() {
    return (
        <Text style={styles.matt}>Matt Damon</Text>
    );
  }
}

const styles = StyleSheet.create({
  matt: {
    marginTop: 50
  }
})
