import loanReducer, { setLoanDetails, setLoanStatus, resetLoan } from '../features/loanSlice';

describe('loan reducer', () => {
  it('should handle initial state', () => {
    expect(loanReducer(undefined, { type: 'unknown' })).toEqual({
      amount: 0,
      type: '',
      repaymentPeriod: '',
      interestRate: '',
      repaymentDate: '',
      status: 'pending',
    });
  });

  it('should handle setLoanDetails', () => {
    const initialState = {
      amount: 0,
      type: '',
      repaymentPeriod: '',
      interestRate: '',
      repaymentDate: '',
      status: 'pending',
    };
    expect(loanReducer(initialState, setLoanDetails({ amount: 5000, type: 'Business Loan' }))).toEqual({
      ...initialState,
      amount: 5000,
      type: 'Business Loan',
    });
  });

  it('should handle setLoanStatus', () => {
    const initialState = {
      amount: 0,
      type: '',
      repaymentPeriod: '',
      interestRate: '',
      repaymentDate: '',
      status: 'pending',
    };
    expect(loanReducer(initialState, setLoanStatus('approved'))).toEqual({
      ...initialState,
      status: 'approved',
    });
  });

  it('should handle resetLoan', () => {
    const initialState = {
      amount: 5000,
      type: 'Business Loan',
      repaymentPeriod: '12',
      interestRate: '15%',
      repaymentDate: '2025-08-09',
      status: 'approved',
    };
    expect(loanReducer(initialState, resetLoan())).toEqual({
      amount: 0,
      type: '',
      repaymentPeriod: '',
      interestRate: '',
      repaymentDate: '',
      status: 'pending',
    });
  });
});
