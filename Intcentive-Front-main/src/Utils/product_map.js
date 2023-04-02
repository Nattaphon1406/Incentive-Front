import prod_data from "../Utils/Product.json";

export const map_data= prod_data.map((prod_data=>{
    return(
        <tr key={prod_data.product.item}>
            <td>
                {prod_data.product.Part_no}
            </td>
            <td>
                {prod_data.product.Part_name}
            </td>
            <td>
                {prod_data.product["Qty_/_unit"]}
            </td>
            <td>
                {prod_data.product.Route}
            </td>
            <td>
                {prod_data.product}
            </td>
        </tr>
    )
        
    
}))