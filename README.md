# TaskFlow - Real-Time To-Do List Web App

A modern, real-time to-do list application built with React, TypeScript, Tailwind CSS, and Firebase. Works seamlessly on desktop and mobile devices with instant synchronization across all connected devices.

## Features

✨ **Real-Time Sync** - Changes sync instantly across all devices using Firebase Realtime Database
📱 **Fully Responsive** - Beautiful UI that works perfectly on mobile, tablet, and desktop
🎨 **Modern Design** - Clean, intuitive interface with dark mode support
✅ **Task Management** - Add, complete, and delete tasks with real-time updates
📊 **Task Statistics** - View pending and completed task counts
⚡ **Lightning Fast** - Built with Vite for instant HMR and optimized builds
🔒 **Secure** - Powered by Firebase for reliable data storage

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Real-Time Database**: Firebase Realtime Database
- **Build Tool**: Vite
- **Authentication**: Firebase Auth (configured for future use)

## Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Firebase account (create at [firebase.google.com](https://firebase.google.com))

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Create a Realtime Database (Start in test mode for development)
3. Copy your Firebase configuration
4. Update `src/firebase.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};
```

### Running the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Add Task** - Type your task in the input field and click "Add" (or press Enter)
2. **Complete Task** - Click the circle icon next to a task to mark it as complete
3. **Delete Task** - Click the trash icon to remove a task
4. **View Statistics** - See your progress with pending and completed task counts

## Project Structure

```
src/
├── components/
│   ├── Logo.tsx          # App branding
│   ├── AddTodo.tsx       # Add new task form
│   ├── TodoItem.tsx      # Individual task component
│   └── TodoList.tsx      # Task list container
├── firebase.ts           # Firebase configuration
├── App.tsx              # Main app component
├── index.css            # Global styles with Tailwind
└── main.tsx             # Entry point
```

## Firebase Database Structure

```json
{
  "todos": {
    "-task1Id": {
      "title": "Task title",
      "completed": false,
      "createdAt": 1234567890,
      "updatedAt": 1234567890
    }
  }
}
```

## Customization

### Change Theme Colors

Edit `tailwind.config.js` to customize the color scheme. Update the Logo component colors in `src/components/Logo.tsx`.

### Add User Authentication

The Firebase Auth is already configured in `src/firebase.ts`. Add auth logic to require login before accessing the app.

### Add Task Categories/Tags

Extend the todo object in Firebase to include category and update components accordingly.

## Troubleshooting

### "Failed to load tasks" Error

- Check your Firebase configuration in `src/firebase.ts`
- Ensure Firebase Realtime Database is created and security rules allow reads/writes
- Check browser console for detailed error messages

### Changes Not Syncing

- Verify Firebase database connection
- Check that `databaseURL` is correctly set in Firebase config
- Open DevTools to check for network errors

### App Not Running

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run build` then try `npm run dev` again

## Environment Variables

Create a `.env` file in the root directory (optional for local development):

```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
# ... other Firebase config
```

Then update `src/firebase.ts` to use these variables:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ...
};
```

## Performance Tips

- The app uses Firebase's Realtime Database for instant updates
- Vite provides fast builds and HMR during development
- All styles are generated on-demand with Tailwind CSS
- Consider implementing pagination if you have many tasks (100+)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the [Firebase documentation](https://firebase.google.com/docs)
2. Review the [React documentation](https://react.dev)
3. Check the [Tailwind CSS docs](https://tailwindcss.com)

## Future Enhancements

- User authentication and multi-user support
- Task due dates and reminders
- Task categories and filtering
- Cloud backup and sync
- Progressive Web App (PWA) features
- Offline support with service workers
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
