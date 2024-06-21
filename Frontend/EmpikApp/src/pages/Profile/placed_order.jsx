import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import basketService from "../../services/basketService";
import PATH from "../../paths";
import "../../styles/placed_order.css";

function PlacedOrder() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();
  const placedOrder = location.state;

  useEffect(() => {
    const clearBasket = async () => {
      if (isLoggedIn) {
        await basketService.clearUserBasket();
      } else {
        basketService.clearNotLoggedInBasket();
      }
    };

    clearBasket();
  }, [isLoggedIn]);

  return (
    <div className="placed-order-container">
      <Link to={PATH.PRODUCT}>
        <button className="product5">Powrót do strony</button>
      </Link>
      <div className="order-details">
        {placedOrder.status === "Paid" ? (
          <p className="order-status">Zapłaciłeś za zamówienie.</p>
        ) : (
          <p className="order-status">
            Dziękujemy za złożenie zamówienia. Możesz opłacić je w zakładce
            "Zamówienia" na swoim profilu.
          </p>
        )}
        <p className="order-id">Numer zamówienia: {placedOrder.id}</p>
        <p className="order-status">Status: {placedOrder.status}</p>
        <p className="order-date">Data złożenia zamówienia: {placedOrder.dateOfOrder}</p>
      </div>
    </div>
  );
}

export default PlacedOrder;
