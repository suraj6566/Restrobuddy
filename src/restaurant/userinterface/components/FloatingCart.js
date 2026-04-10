import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function FloatingCart({ qty, setCartOpen, cartOpen }) {
  var cart = useSelector((state) => state.cart);
  var count = Object.keys(cart).length;
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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
          style={{ width: matches ? '92%' : '40%' }}
        >
          <div
            style={{
              padding: matches ? '16px' : '18px',
              background: '#1f9d55',
              width: '100%',
              minHeight: 18,
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 14,
              fontWeight: 500,
              gap: 10,
              boxShadow: '0 14px 28px rgba(31,157,85,0.28)',
            }}
          >
            <span>{count} items added in cart</span>
            <span
              onClick={handleViewCart}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', whiteSpace:'nowrap' }}
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
