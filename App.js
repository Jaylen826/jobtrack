import { StatusBar } from "expo-status-bar";
import React, { useState, createRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Loader from './assets/Loader';

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/log2.png")} /> 
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Login</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.create_button} onPress={() => navigation.navigate('register')}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity> 
    </View> 
  );
}
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/log2.png")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#0f1f13"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#0f1f13"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
    </View>
  );
}
function RegisterScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
  //Show Loader
  setLoading(true);
  var dataToSend = {
    email: userEmail,
    password: userPassword,
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://myapp-3581c.firebaseapp.com', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        setIsRegistraionSuccess(true);
        console.log(
          'Registration Successful. Please Login to proceed'
        );
      } else {
        setErrortext(responseJson.msg);
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
    });
}
if (isRegistraionSuccess) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#307ecc',
        justifyContent: 'center',
      }}>
      <Image
        source={require('./assets/log2.png')}
        style={{
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center'
        }}
      />
      <Text style={styles.successTextStyle}>
        Registration Successful
      </Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('WelcomeScreen')}>
        <Text style={styles.buttonTextStyle}>Login Now</Text>
      </TouchableOpacity>
    </View>
  );
} 
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./assets/log2.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/log2.png")} /> 
      <StatusBar style="auto" />
    </View>
  );
}
function WelcomeScreen( { navigation }) {
  return (
    <View style={styles.container}>
    <Image style={styles.image} source={require("./assets/log2.png")} /> 
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.yes_no_button} onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Yes</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.yes_no_button} onPress={() => navigation.navigate('register')}>
        <Text style={styles.loginText}>No</Text>
      </TouchableOpacity> 
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#7af09a",
    borderRadius: 25,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  forgot_button: {
    height: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#7af09a",
  },
  create_button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#7af09a",
  },
  yes_no_button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#7af09a",
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}