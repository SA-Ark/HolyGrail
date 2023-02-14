import { deNormalize } from "../../../../store/utils";

const PurchasesTab = ({purchases}) => {
    const purchaseList = deNormalize(purchases)
    console.log(purchaseList, "purchaseList")

    return (
        <div className="purchases-container">
            PURCHASES TAB
            <div className="title">

            </div>
        </div>
    )
}

export default PurchasesTab;
