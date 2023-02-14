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

export const getUserFavoriteItems = (favorites, items) => {
    // pure function
    //Takes in favorites and items nested objects and filters for items favorites
    // by the user. returns an array of items.
    const favoriteIds = []
    const favoriteItems = []
    if (!Object.values(items).length || !Object.values(favorites).length) return null
    for (let favorite of deNormalize(favorites)) {
        favoriteIds.push(favorite.item_id)
    }

    for (let id of favoriteIds) {
        favoriteItems.push(items[id])
        // !@#$ check the ids against each other console.log(items[id], id, "meowwwwwww")
    }
    return favoriteItems
}

export const getUserPurchases = (purchases, items) => {
    // pure function
    // Takes in purchases and items objects. builds array of objects that have been purchased by the user
    // and builds an array of larger purchased items objects from the filtered items
    const purchasedIds = []
    const purchasedItems = []
    const purchaseObjects = []
    if (!Object.values(items).length || !Object.values(purchases).length) return null

    for (let purchase of deNormalize(purchases)) {
        purchasedIds.push(purchase.item_id)
    }

    for (let id of purchasedIds) {
        purchaseObjects.push(items[id])
    }

    for (let object of purchaseObjects){
        console.log(object, "OBJECKT@!")
    }


}

export const switchTab = (tab) => {
    console.log(tab)
}
