import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

export default function FloatingCart({ qty, setCartOpen, cartOpen }) {
  var cart = useSelector((state) => state.cart);
  var count = Object.keys(cart).length;
  const navigate = useNavigate();

  const handleClose = () => {
    setCartOpen(false);
  };

  const handleViewCart = () => {
    navigate('/viewcart');
    setCartOpen(false);
  };

  return (
    <div>
      {count >= 1 ? (
        <Snackbar
          open={cartOpen}
          autoHideDuration={6000}
          // onClose={handleClose}
          // message="Note archived"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          style={{ width: '40%' }}
        >
          <div
            style={{
              padding: '20px',
              background: 'green',
              width: '100%',
              height: 10,
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              fontWeight: 500,
            }}
          >
            <span>{count} items added in cart</span>
            <span
              onClick={handleViewCart}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <ShoppingBagIcon style={{ marginRight: 6 }} />
              View Cart
            </span>
          </div>
        </Snackbar>
      ) : (
        setCartOpen(false)
      )}
    </div>
  );
}
