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
