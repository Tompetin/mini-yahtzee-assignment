import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'darkblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "lightgreen",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttontext: {
    backgroundColor: "lightgreen",
    padding: 5,
    margin: 1,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightgreen",
    borderRadius: 5,
    margin: 6,
    padding: 6
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace'
  },
  headertext: {
    padding:2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold',
    fontFamily: 'monospace'
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 13
  },
  textbig:{
    padding: 10,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'monospace'
  }
});
