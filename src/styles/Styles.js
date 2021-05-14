import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const primaryColor = '#00afd0';

export default styles = StyleSheet.create({
    bodyContainer: {
        height: height,
        // backgroundColor: '#ebc',
    },
    /* --------- Online Player --------- */
    infoContainer: {
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 4,
    },
    trackSinger: {
        color: '#888',
        fontSize: 13,
    },
    coverContainer: {
        // backgroundColor: '#ecd',
        height: height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackCover: {
        width: width * 0.6,
        height: width * 0.6,
    },
    playerContainer: {
        height: height * 0.2,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        // backgroundColor: '#555',
    },
    playerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    /* --------- Footer Style --------- */
    footer: {
        backgroundColor: primaryColor,
    },
});