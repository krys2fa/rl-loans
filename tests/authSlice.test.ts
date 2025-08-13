import authReducer, { setUser, setLoading, setError, signOut } from '../features/authSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      loading: false,
      error: null,
    });
  });

  it('should handle setUser', () => {
    const initialState = { user: null, loading: false, error: null };
    expect(authReducer(initialState, setUser({ uid: '123', email: 'test@example.com' }))).toEqual({
      ...initialState,
      user: { uid: '123', email: 'test@example.com' },
      error: null,
    });
  });

  it('should handle setLoading', () => {
    const initialState = { user: null, loading: false, error: null };
    expect(authReducer(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle setError', () => {
    const initialState = { user: null, loading: false, error: null };
    expect(authReducer(initialState, setError('error'))).toEqual({
      ...initialState,
      error: 'error',
    });
  });

  it('should handle signOut', () => {
    const initialState = { user: { uid: '123', email: 'test@example.com' }, loading: false, error: null };
    expect(authReducer(initialState, signOut())).toEqual({
      user: null,
      loading: false,
      error: null,
    });
  });
});
