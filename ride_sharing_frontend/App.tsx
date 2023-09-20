import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {ApolloProvider} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import client from './apollo-client';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import SplashScreen from './src/screens/SplashScreen';

type SignInType = {token: string};

type AuthContextType = {
  signIn: (data: SignInType) => void;
  signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

type AppState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
}

type Action =
  | {type: 'RESTORE_TOKEN'; token: string | null}
  | {type: 'SIGN_IN'; token: string}
  | {type: 'SIGN_OUT'};

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        const value = await AsyncStorage.getItem('authToken');
        userToken = value;
      } catch (e) {
        // Restoring token failed
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: SignInType) => {
        // In a production app, we need to send some data (usually username, password) to the server and get a token
        // We will also need to handle errors if sign in failed
        // After getting a token, we need to persist it using `SecureStore` or any other encrypted storage
        // In this example, we'll use a dummy token
        await AsyncStorage.setItem('authToken', data.token);

        dispatch({type: 'SIGN_IN', token: data.token});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <ApolloProvider client={client}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {state.isLoading ? (
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : state.userToken == null ? (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={Login}
                    options={{
                      title: 'Sign in',
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                  />

                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: 'Sign up',
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                  />
                </>
              ) : (
                <Stack.Screen name="Home" component={Home} />
              )}
            </Stack.Navigator>
          </ApolloProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

export default App;
