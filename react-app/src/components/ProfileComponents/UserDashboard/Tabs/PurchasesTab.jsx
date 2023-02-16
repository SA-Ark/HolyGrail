import PurchaseCard from "../../../Cards/PurchaseCard";
import { deNormalize } from "../../../../store/utils";


const PurchasesTab = ({purchases}) => {
    const purchaseList = deNormalize(purchases)

    return (
        <div className="purchases-container">
            {/* PURCHASES TAB */}
            <div className="title">

                {
                    purchaseList?.length
                        ? purchaseList.map(purchase => {
                            return <PurchaseCard key={purchase?.item?.id}purchase={purchase}/>
                        })
                        : null
                }

            </div>
        </div>
    )
}


export default PurchasesTab;
