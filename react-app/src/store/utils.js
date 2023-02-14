export const normalize = (array) => {
    //pure function
    if (!array) return null
    const object = {};
    for (let ele of array) {
        object[ele.id] = ele;
    }
    return object;
}

export const deNormalize = (object) => {
    //pure fucntion
    if (!object) return null
    const array = [];

    for (let value of Object.values(object))
    array.push(value);
    return array;
}

export const dateToParts = (string) => {

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Septembr',
        'November',
        'December'
    ];

    const stringArray = string.split('-');
    stringArray[2] = stringArray[2].split('T')[0];
    stringArray[1] = months[+stringArray[1]];
    const year = stringArray[0];
    const month = stringArray[1];
    const day = stringArray[2];

    return [day, month, year];
};

export const switchCarousel = (images, nonSequitur=false) => {

    if (nonSequitur) {

    }
}

export const getUserItems = (items, userId) => {
    let userItems = [];
    if (items){

        items.forEach((item) => {
            if (Number(item.seller_id) === Number(userId)) {
                userItems.push(item);
            }
        })
    }
    return userItems
}

export const getUserReviews = (reviews, userId) => {
    let userReviews = [];
    for (let review in reviews) {
        if (review.seller_id === userId )
        userReviews.push(review)
    }
    return userReviews
}


export const switchTab = (tab) => {
    console.log(tab)
}
