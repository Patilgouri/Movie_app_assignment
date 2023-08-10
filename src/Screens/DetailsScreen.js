import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Button from '../Components/Button';
import { useDispatch } from 'react-redux';
import { addToWatchlist, addToFavorites } from '../Redux/action/movieActions';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();
const DetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params; // Assuming you pass the movie object as a route parameter
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie)); // Action to add to favorites
    navigation.navigate('Favourite');
  };

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist(movie));
    navigation.navigate('Watchlist'); // Navigate to the Watchlist screen
  };
  const rating = Math.round(movie.vote_average);

  const renderStars = () => {
    const starIcons = [];

    for (let i = 1; i <= 10; i++) {
      if (i <= rating) {
        starIcons.push(<Text key={i}>★</Text>); // Filled star
      } else {
        starIcons.push(<Text key={i}>☆</Text>); // Empty star
      }
    }

    return starIcons;
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />
      <View style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
          style={styles.movieImage}
        />
        <Text style={styles.movieName}>{movie.title}</Text>
        <Text style={styles.movieRatings}>Ratings:  {renderStars()}</Text>
        <Text style={styles.movieDescription}>{movie.overview}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Favorites"
            onPress={handleAddToFavorites}
            style={styles.addButton}
            variant="primary"
          />
          <Button
            title="Add to Watchlist"
            onPress={handleAddToWatchlist}
            style={styles.addButton}
            variant="secondary"
          />
        </View>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    // marginHorizontal: 20,
    bottom: 30,
  },
  movieImage: {
    width: 415,
    height: 500,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginHorizontal: 20,
  },
  movieRatings: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
    marginHorizontal: 20,
  },
  movieDescription: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    color: '#000',
    marginHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'col',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    color: '#000'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButton: {
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#5858d6',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 24,
    marginHorizontal: 20,
    marginBottom: 10
  },
});

export default DetailsScreen;
