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

// Wed, 15 Feb 2023 00:00:00 GMT
export const dbDateToMonthYear = (date) => {
    date = date.split(' ');
    return "" + date[2] + " " + date[3]
};

export const dayMonthYear = (date) => {
    date = date.split(' ');
    return "" + date[2] + " " + date[1] + ", " + date[3]
}

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

export const switchTab = (tab) => {
    return null
}

export const truncateName = (name) => {
    const shortName = name?.slice(0, 12);
    return shortName + "...";
}
