export const normalize = (array) => {
    const object = {};
    for (let ele of array) {
        object[ele.id] = ele;
    }
    return object;
}

export const deNormalize = (object) => {
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