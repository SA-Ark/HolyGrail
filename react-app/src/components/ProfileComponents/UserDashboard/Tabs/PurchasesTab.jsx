import PurchaseCard from "../../../Cards/PurchaseCard";
import { deNormalize } from "../../../../store/utils";
import "./PurchasesTab.css";


const PurchasesTab = ({purchases}) => {
    const purchaseList = deNormalize(purchases)
    console.log(purchaseList, "purchaseList")

    return (
        <div className="purchases-container">
            {/* PURCHASES TAB */}
            {/* <h3>Purchases</h3> */}
            <div className="title">

                {
                    purchaseList?.length
                        ? purchaseList.map(purchase => {
                            return <PurchaseCard purchase={purchase} key={purchase.item.id} />
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default PurchasesTab;
