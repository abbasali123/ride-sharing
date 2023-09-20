import {Field, FieldProps, Formik, FormikProps} from 'formik';
import React from 'react';
import {
  Button,
  GestureResponderEvent,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import * as yup from 'yup';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContext, RootStackParamList} from '../../App';
import {useLoginMutation} from '../gql/graphql';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn', 'MyStack'>;

function Login({navigation}: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
    flex: 1,
  };

  const [login] = useLoginMutation();

  const {signIn} = React.useContext(AuthContext)!;

  const validationSchema = yup.object().shape({
    username: yup.string().required('username is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleLogin = async (values: typeof initialValues) => {
    try {
      const res = await login({
        variables: {
          ...values,
        },
      });

      console.log('res', res.data);

      if (res.data) {
        const {login: loginRes} = res.data || {};
        const {accessToken} = loginRes || {};

        signIn({token: accessToken});
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Image style={styles.logo} source={require('../assets/ride.png')} />
        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.formContainer,
          ]}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              handleSubmit,
              values,
              errors,
              touched,
            }: FormikProps<typeof initialValues>) => (
              <>
                <Text style={styles.textHeading}>Login</Text>
                <Text style={styles.text}>Username or Email</Text>
                <Field
                  name="username" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Username or Email"
                        onChangeText={field.onChange('username')}
                        onBlur={field.onBlur('username')}
                        value={values.username}
                      />
                      {errors.username && touched.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </>
                  )}
                />
                <Text style={styles.text}>Password</Text>
                <Field
                  name="password" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Enter Password"
                        onChangeText={field.onChange('password')}
                        onBlur={field.onBlur('password')}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </>
                  )}
                />

                <Button
                  title="Login"
                  onPress={
                    handleSubmit as unknown as (
                      e: GestureResponderEvent,
                    ) => void
                  }
                />
              </>
            )}
          </Formik>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orBorders} />
          <View>
            <Text style={styles.orText}>OR</Text>
          </View>
          <View style={styles.orBorders} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.button}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  errorText: {
    marginLeft: 12,
    color: 'red',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    width: '80%',
    height: 230,
    margin: 40,
  },
  text: {
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 15,
  },
  textHeading: {
    fontWeight: '600',
    fontSize: 28,
    marginLeft: '38%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
  },
  orBorders: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    width: 50,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginTop: 10,
    marginLeft: 130,
    color: 'white',
    backgroundColor: '#1565bf',
    width: 140,
    padding: 10,
    paddingLeft: 20,
  },
});

export default Login;
