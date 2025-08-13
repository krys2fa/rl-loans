import profileReducer, { setProfile, setCreditScore } from "./profileSlice";

describe("profile reducer", () => {
  it("should handle initial state", () => {
    expect(profileReducer(undefined, { type: "unknown" })).toEqual({
      name: "Kwaku Mintah",
      email: "user@example.com",
      phone: "0551234567",
      address: "123 Main St, Accra",
      occupation: "Shop Attendant",
      creditScore: 750,
    });
  });

  it("should handle setProfile", () => {
    const initialState = {
      name: "Kwaku Mintah",
      email: "user@example.com",
      phone: "0551234567",
      address: "123 Main St, Accra",
      occupation: "Shop Attendant",
      creditScore: 750,
    };
    expect(
      profileReducer(
        initialState,
        setProfile({ name: "Ama Serwaa", email: "ama@example.com" })
      )
    ).toEqual({
      ...initialState,
      name: "Ama Serwaa",
      email: "ama@example.com",
    });
  });

  it("should handle setCreditScore", () => {
    const initialState = {
      name: "Kwaku Mintah",
      email: "user@example.com",
      phone: "0551234567",
      address: "123 Main St, Accra",
      occupation: "Shop Attendant",
      creditScore: 750,
    };
    expect(profileReducer(initialState, setCreditScore(800))).toEqual({
      ...initialState,
      creditScore: 800,
    });
  });
});
