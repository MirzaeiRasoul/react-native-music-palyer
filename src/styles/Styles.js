import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const primaryColor = '#333';

export default styles = StyleSheet.create({
    bodyContainer: {
        height: height,
        // backgroundColor: '#fde',
    },
    /* --------- Player --------- */
    infoSection: {
        height: height * 0.1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#333',
        fontSize: 17,
        fontWeight: 'bold',
    },
    singer: {
        color: '#333a',
        fontSize: 13,
        marginTop: 8,
    },
    coverSection: {
        height: height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackCover: {
        width: width * 0.7,
        height: width * 0.7,
    },
    controllerSection: {
        height: height * 0.2,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    slider: {
        width: '100%',
    },
    times: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    time: {
        fontSize: 11,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    button: {
        color: '#333',
        backgroundColor: '#eee',
        marginHorizontal: 16,
    },
    boldButton: {
        width: 65,
        height: 65,
        color: '#fff',
        backgroundColor: '#333',
        borderRadius: 50,
    },
    /* --------- Footer --------- */
    footer: {
        backgroundColor: primaryColor,
    },
});