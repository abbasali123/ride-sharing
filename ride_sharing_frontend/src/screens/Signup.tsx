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
import {UserRoles, useSignUpMutation} from '../gql/graphql';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp', 'MyStack'>;

function SignUp({navigation}: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

  const [signUp, {data, error}] = useSignUpMutation();

  const initialValues = {
    name: '',
    username: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: '',
    role: '',
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    username: yup.string().required('username is required'),
    contactNo: yup
      .string()
      .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  });

  console.log('data', data, error);

  const handleSignUp = async (values: typeof initialValues) => {
    const [firstName, lastName] = values.name.split(' ');
    try {
      const res = await signUp({
        variables: {
          createUserInput: {
            email: values.email,
            first_name: firstName,
            last_name: lastName,
            password: values.password,
            username: values.username,
            role: values.role as UserRoles,
          },
        },
      });

      if (res.data) {
        //navigate user
      }

      console.log('res', res);
      // eslint-disable-next-line no-catch-shadow
    } catch (err) {
      console.log('err', err);
    }
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
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={values => handleSignUp(values)}>
            {({
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }: FormikProps<typeof initialValues>) => (
              <>
                <Text style={styles.textHeading}>Sign Up</Text>
                <Text style={styles.text}>Full Name</Text>
                <Field
                  name="name" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        onChangeText={field.onChange('name')}
                        onBlur={field.onBlur('name')}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <Text style={styles.errorText}>{errors.name}</Text>
                      )}
                    </>
                  )}
                />
                <Text style={styles.text}>Username</Text>
                <Field
                  name="username" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
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
                <Text style={styles.text}>Sign up as</Text>
                <Field
                  name="username" // Define the name property here
                  render={() => (
                    <View style={styles.inputChipContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setFieldValue('role', UserRoles.Driver);
                        }}>
                        <Text
                          style={[
                            styles.inputChip,
                            values.role === UserRoles.Driver
                              ? // eslint-disable-next-line react-native/no-inline-styles
                                {
                                  backgroundColor: '#1565c0',
                                  color: 'white',
                                  borderColor: 'white',
                                }
                              : {},
                          ]}>
                          Driver
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setFieldValue('role', UserRoles.Customer);
                        }}>
                        <Text
                          style={[
                            styles.inputChip,
                            values.role === UserRoles.Customer
                              ? // eslint-disable-next-line react-native/no-inline-styles
                                {
                                  backgroundColor: '#1565c0',
                                  color: 'white',
                                  borderColor: 'white',
                                }
                              : {},
                          ]}>
                          Customer
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <Text style={styles.text}>Email</Text>
                <Field
                  name="email" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        inputMode="email"
                        placeholder="Enter Email"
                        onChangeText={field.onChange('email')}
                        onBlur={field.onBlur('email')}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </>
                  )}
                />
                <Text style={styles.text}>Contact No.</Text>
                <Field
                  name="contactNo" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        onChangeText={field.onChange('contactNo')}
                        onBlur={field.onBlur('contactNo')}
                        inputMode="tel"
                        placeholder="Enter Contact No."
                        value={values.contactNo}
                      />
                      {errors.contactNo && touched.contactNo && (
                        <Text style={styles.errorText}>{errors.contactNo}</Text>
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
                <Text style={styles.text}>Confirm Password</Text>
                <Field
                  name="confirmPassword" // Define the name property here
                  render={({field}: FieldProps) => (
                    <>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Cinfirm Password"
                        onChangeText={field.onChange('confirmPassword')}
                        onBlur={field.onBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </>
                  )}
                />
                <Button
                  title="Sign Up"
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

        <View style={styles.buttonContainer}>
          <View>
            <Text>Already have an account?</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </View>
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
  inputChip: {
    // backgroundColor: 'blue',
    width: 130,
    height: 40,
    // borderRadius: 30,
    paddingHorizontal: 30,
    color: 'black',
    paddingTop: 10,
    borderColor: '#1565bf',
    borderWidth: 1,
  },
  inputChipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 10,
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
    marginLeft: 10,
    color: 'white',
    backgroundColor: '#1565bf',
    width: 80,
    padding: 10,
    paddingLeft: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SignUp;
