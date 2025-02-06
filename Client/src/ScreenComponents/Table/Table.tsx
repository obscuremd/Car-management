import { useEffect, useState } from "react";
import { List, ListHeader } from "../../Components/List";
import { useApi } from "../../Providers/ApiProvider";

export default function Table(){

      const [loading, setLoading] = useState(false);
    
      const { getTransaction, transactions } = useApi();

        useEffect(() => {
          getTransaction({ setLoading });
        }, []);

        const formatDate =(isoDate:string)=>{
           // Create a Date object from the ISO 8601 date string
          const date = new Date(isoDate);

          // Extract the year, month, and day
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
          const day = String(date.getDate()).padStart(2, '0');

          // Format the date as YYYY-MM-DD
          const formattedDate = `${year}-${month}-${day}`;

          return formattedDate;
        }

    return(
        <div className="flex flex-col gap-2 h-[50vh] max-w-[80vw] overflow-y-scroll overscroll-x-auto">
          <ListHeader
            column1="Model"
            column2="Chases No"
            column3="Color"
            column4="Date Out"
            column5="Dealer"
            column6="Status"
            status={"WithDrawn"}
          />
          {loading
            ? "loading..."
            : transactions.map((item, index) => (
                <List
                  id={item._id}
                  key={index}
                  color={item.vehicle_color_hex_code}
                  column1={item.vehicle_type}
                  column2={formatDate(item.createdAt)}
                  column3={item.chases_no}
                  column4={item.vehicle_color}
                  column5={formatDate(item.updatedAt)}
                  column6={item.dealer}
                  status={item.status}
                />
              ))}
        </div>
    )
}