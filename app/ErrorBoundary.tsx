import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error: Error}>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error!} />;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.error}>
            Error: {this.state.error?.message || 'Unknown error'}
          </Text>
          <Text style={styles.stack}>
            {this.state.error?.stack || 'No stack trace available'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffe6e6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 16,
  },
  error: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 16,
    textAlign: 'center',
  },
  stack: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    maxHeight: 200,
  },
});
