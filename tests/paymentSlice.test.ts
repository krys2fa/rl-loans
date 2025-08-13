import paymentReducer, { setPaymentDetails, setPaymentStatus, resetPayment } from '../features/paymentSlice';

describe('payment reducer', () => {
  it('should handle initial state', () => {
    expect(paymentReducer(undefined, { type: 'unknown' })).toEqual({
      amount: 0,
      date: '',
      method: '',
      status: 'pending',
    });
  });

  it('should handle setPaymentDetails', () => {
    const initialState = {
      amount: 0,
      date: '',
      method: '',
      status: 'pending',
    };
    expect(paymentReducer(initialState, setPaymentDetails({ amount: 100, method: 'Mobile Money' }))).toEqual({
      ...initialState,
      amount: 100,
      method: 'Mobile Money',
    });
  });

  it('should handle setPaymentStatus', () => {
    const initialState = {
      amount: 0,
      date: '',
      method: '',
      status: 'pending',
    };
    expect(paymentReducer(initialState, setPaymentStatus('completed'))).toEqual({
      ...initialState,
      status: 'completed',
    });
  });

  it('should handle resetPayment', () => {
    const initialState = {
      amount: 100,
      date: '2025-08-09',
      method: 'Mobile Money',
      status: 'completed',
    };
    expect(paymentReducer(initialState, resetPayment())).toEqual({
      amount: 0,
      date: '',
      method: '',
      status: 'pending',
    });
  });
});
