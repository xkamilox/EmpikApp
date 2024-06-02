import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import basketService from "../services/basketService.js";
import {useSelector} from "react-redux";



function PlacedOrder() {    //TODO zrobić przysick do przejścia np na stronę główną
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const location = useLocation();
  const placedOrder = location.state;

  useEffect(() => {
      const clearBasket = async() => {
          if(isLoggedIn) {      //Jeśli zalogowany to usuwa koszyk z reduxa i z bazy
              await basketService.clearUserBasket();
          }else {               //Jeśli niezalogowany to usuwa koszyk z reduxa i z localstorage
              basketService.clearNotLoggedInBasket();
          }
      };

      clearBasket();
  }, [])


  return (  // tu można jeszcze ewentualnie wyswietlic zamowione przedmioty - id są w placedOrder
      <div>
          {placedOrder.status === "Paid" ? (
            <p>You paid for your order.</p>) :
            (<p>Thank you for placing an order. You can pay for it in &quot;Orders&quot; tab in your profile page.</p>)
          }
          <p>Order id: {placedOrder.id}</p>
          <p>Status: {placedOrder.status}</p>
          <p>Placement date: {placedOrder.dateOfOrder}</p>
      </div>
  )
}

export default PlacedOrder;
