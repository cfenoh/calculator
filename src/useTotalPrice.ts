import React from "react";
import {TAX_BY_PROVINCES} from "./taxByProvinces";
type PriceMembers = {
    price: number | string,
    provinceId: number,
    tipsPercentage: number
}
export const useTotalPrice = ({
                      price,
                      provinceId,
                      tipsPercentage
                  }: PriceMembers): string => {
    const [total, setTotal] = React.useState<string>('')

    React.useEffect(() => {
        const parsedPrice = (Number(price)||0)
        const province = TAX_BY_PROVINCES.find(province => province.id === Number(provinceId))
        const taxPrice = (parsedPrice * (province?.value || 1))
        const tipsPrice = parsedPrice * (Number(tipsPercentage) / 100)
        console.log({taxPrice, price:parsedPrice, tax: province?.value, provinceId, tipsPrice,tipsPercentage})
        const total = (taxPrice + tipsPrice + parsedPrice).toFixed(2)
        setTotal(total)
    }, [price,
        provinceId,
        tipsPercentage])

    return total

}
