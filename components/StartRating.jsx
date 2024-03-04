import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5;

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < filledStars) {
            stars.push(<Icon key={i} name="star" size={20} color="gold" />);
        } else if (halfStar && i === filledStars) {
            stars.push(<Icon key={i} name="star-half-full" size={20} color="gold" />);
        } else {
            stars.push(<Icon key={i} name="star-o" size={20} color="gold" />);
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {stars}
            <Text style={{ marginLeft: 5 }}>{rating}</Text>
        </View>
    );
};

export default StarRating;
