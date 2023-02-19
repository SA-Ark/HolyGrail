export const spreadPayments = (payments)=>{
    console.log(payments, "PAYMENTS IN UTIL")
    const newState = {}
    let count = 0
    for (let payment of payments){
        const newPayment = {}

        const {order, item} = payment
        newPayment.item = {...item}
        newPayment.order = {...order}
        newState[count] = newPayment
        count++
    }
    return newState
}

export const spreadFavorites = (favorites)=>{
    const newState = {}
    let count = 0
    for (let favoriteItem of favorites){
        const newFavorite = {}

        const {favorite, item} = favoriteItem
        newFavorite.item = {...item}
        newFavorite.favorite = {...favorite}
        newState[count] = newFavorite
        count++
    }
    return newState
}

export const spreadItems = (items)=>{

    const newState = {}
    let count = 0
    for (let item of Object.values(items)){



        newState[count] = {...item}
        count++
    }
    return newState
}
