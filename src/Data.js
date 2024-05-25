export const API_KEY = 'AIzaSyD-PqB3KMF9rQ_LqGryMn_8QTUZYzwYsU4';

export const value_converter = (value) => {
    if(value >= 1000000){
        return Math.floor(value/1000000) + "M"
    }
    if(value >= 1000){
        return Math.floor(value/1000) + "k"
    }

    else{
        return value
    }
}