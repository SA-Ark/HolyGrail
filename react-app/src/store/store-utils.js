export const spreadPayments = (payments)=>{
    console.log(payments, "PAYMENTS IN UTIL")
    const newState = {}
    let count = 0
    for (let payment of payments){
        const newPayment = {}

        console.log(payment)

        const {order, item} = payment
        newPayment.item = {...item}
        newPayment.order = {...order}
        newState[count] = newPayment
        console.log(order, item, "MAYBE?")
        count++
    }
    return newState
}

export const spreadFavorites = (favorites)=>{
    console.log(favorites, "favorites IN UTIL")
    const newState = {}
    let count = 0
    for (let favoriteItem of favorites){
        const newFavorite = {}



        const {favorite, item} = favoriteItem
        newFavorite.item = {...item}
        newFavorite.favorite = {...favorite}
        newState[count] = newFavorite
        console.log(favorite, item, "MAYBE?")
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
