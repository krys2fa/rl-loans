# RL Loans - Personal & Business Loan Application 💰

A comprehensive React Native loan application built with Expo, featuring AI-powered credit scoring, seamless payment processing, and a modern user interface. This app provides a complete loan management solution for both personal and business loans with integrated KYC verification.

![App Logo](./assets/images/rl-logo.png)

## 🚀 Features

### 🔐 Authentication & Security

- **Firebase Authentication** - Secure user registration and login
- **Protected Routes** - Authenticated access to sensitive features
- **KYC Verification** - ID document capture and selfie verification using Expo Camera
- **Face Detection** - Enhanced security with Expo Face Detector

### 💳 Loan Management

- **Multiple Loan Types** - Personal, Business, and Education loans
- **Smart Loan Calculator** - Real-time interest and installment calculations
- **Flexible Repayment** - Customizable repayment periods and schedules
- **Loan History** - Complete transaction and payment history
- **Payment Processing** - Secure payment integration

### 📊 Credit Assessment

- **AI Credit Scoring** - Advanced credit assessment using Ghana credit scoring model
- **Comprehensive Survey** - Detailed financial and demographic questionnaire
- **Risk Assessment** - Automated creditworthiness evaluation
- **Real-time Scoring** - Instant credit decisions

### 📱 User Experience

- **Modern UI** - Clean, intuitive interface with React Native Paper
- **Cross-Platform** - Native performance on iOS, Android, and Web
- **Offline Support** - Local data caching with SQLite
- **Push Notifications** - Real-time updates and reminders
- **Dark/Light Mode** - Automatic theme switching

### 🛠️ Technical Features

- **TypeScript** - Type-safe development
- **File-based Routing** - Expo Router for navigation
- **State Management** - Context API for global state
- **Real-time Updates** - Firebase Firestore integration
- **Image Handling** - Document upload and processing
- **Progress Tracking** - Visual feedback for all operations

## 📱 Screenshots

_Note: Add screenshots of your app here after launching it. Recommended sections:_

- Login/Registration screens
- Loan application flow
- KYC verification process
- Dashboard/Home screen
- Payment interface
- Credit assessment results

## 🏗️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **UI Components**: React Native Paper
- **State Management**: React Context API
- **Camera**: Expo Camera with Face Detection
- **Payments**: Integrated payment processing
- **Animations**: React Native Reanimated & Animatable

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### For mobile development:

- **iOS**: Xcode (macOS only)
- **Android**: Android Studio
- **Device Testing**: Expo Go app on your mobile device

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rl-loans.git
cd rl-loans
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase (Important!)

The app uses Firebase for authentication and data storage. You'll need to:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Update `firebaseConfig.ts` with your Firebase configuration
4. Set up authentication providers (Email/Password recommended)

### 4. Start the Development Server

```bash
npx expo start
```

### 5. Run on Your Device/Emulator

After starting the dev server, you'll see a QR code and options:

#### Option A: Physical Device (Recommended for testing camera features)

1. Install [Expo Go](https://expo.dev/client) on your phone
2. Scan the QR code with your camera (iOS) or Expo Go app (Android)

#### Option B: iOS Simulator (macOS only)

```bash
npx expo run:ios
```

#### Option C: Android Emulator

```bash
npx expo run:android
```

#### Option D: Web Browser

```bash
npx expo start --web
```

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator/device
- `npm run ios` - Start on iOS simulator/device
- `npm run web` - Start web version
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to clean project state

## 🏗️ Project Structure

```
rl-loans/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Dashboard/Home
│   │   ├── apply.tsx             # Loan application
│   │   ├── pay.tsx               # Payment processing
│   │   └── profile.tsx           # User profile
│   ├── onboarding/               # KYC verification flow
│   │   ├── index.tsx             # Onboarding start
│   │   ├── id-front.tsx          # ID front capture
│   │   ├── id-back.tsx           # ID back capture
│   │   ├── selfie.tsx            # Selfie verification
│   │   └── complete.tsx          # Verification complete
│   ├── signin.tsx                # Authentication
│   ├── signup.tsx                # User registration
│   ├── credit-check.tsx          # Credit assessment
│   ├── loan-history.tsx          # Transaction history
│   ├── payment-schedule.tsx      # Repayment schedules
│   └── _layout.tsx               # Root layout
├── assets/                       # Static assets
│   ├── data/                     # Credit scoring models
│   ├── fonts/                    # Custom fonts
│   └── images/                   # App images and icons
├── context/                      # React Context providers
│   └── AuthContext.tsx           # Authentication state
├── hooks/                        # Custom React hooks
│   └── useProtectedRoute.ts      # Route protection
├── firebaseConfig.ts             # Firebase configuration
├── app.json                      # Expo configuration
└── package.json                  # Dependencies and scripts
```

## 🔧 Configuration

### Environment Setup

The app requires several configurations for full functionality:

1. **Firebase Configuration** - Update `firebaseConfig.ts`
2. **Payment Gateway** - Configure payment processing
3. **KYC Services** - Set up document verification
4. **Push Notifications** - Configure notification services

### Expo Configuration

Key settings in `app.json`:

- App name and branding
- Platform-specific configurations
- Plugin configurations
- Build settings

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Coverage

The app includes tests for:

- Authentication flows
- Loan calculations
- Credit scoring algorithms
- Component rendering
- API integrations

## 🚀 Building for Production

### Development Build

```bash
npx expo install --fix
eas build --platform ios --profile development
eas build --platform android --profile development
```

### Production Build

```bash
eas build --platform all --profile production
```

### App Store Deployment

```bash
eas submit --platform ios
eas submit --platform android
```

## 🔒 Security Features

- Firebase Authentication with secure token management
- Document verification with face detection
- Encrypted data transmission
- Secure payment processing
- GDPR compliant data handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@rl-loans.com
- 📱 In-app support feature
- 🐛 [Report issues](https://github.com/krys2fa/rl-loans/issues)

## 📈 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with more payment providers
- [ ] Biometric authentication
- [ ] Loan recommendation engine
- [ ] Credit score monitoring
- [ ] Financial education resources

---

Built with ❤️ using React Native and Expo
