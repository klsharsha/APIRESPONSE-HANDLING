# 🚀 UX Challenges - React Components

Two advanced React components built for a senior mentor assignment, showcasing real-world UX patterns for error prevention and graceful recovery.

## 📋 Overview

This project implements two intermediate-to-difficult UX challenges:

### Task A: "Undo Mistake" UX Challenge ⏱️
A delete confirmation pattern that gives users a 5-second grace period to undo accidental deletions.

### Task B: "Smart Warning" Challenge ⚠️
An intelligent form guard that detects unsaved changes and prevents accidental data loss.

## 🎯 Features

### Task A - Undo Delete Component
- ✅ **Instant Visual Feedback**: Item disappears immediately on delete
- ✅ **5-Second Countdown**: Clear timer showing remaining undo time
- ✅ **Visual Progress Bar**: Color-coded (green → yellow → red) for urgency
- ✅ **Non-blocking Toast**: Notification appears at bottom without interrupting workflow
- ✅ **Clear Messaging**: Shows item name and exact countdown
- ✅ **Permanent Deletion**: Auto-deletes after timeout with visual confirmation

### Task B - Unsaved Changes Component
- ✅ **Smart State Comparison**: Deep comparison of form state, not just dirty flags
- ✅ **Real-time Status Bar**: Shows current save state with visual indicators
- ✅ **Field-level Highlighting**: Modified fields get visual feedback
- ✅ **Custom Warning Modal**: Polished UI instead of browser's default alert
- ✅ **Change Counter**: Shows exact number of unsaved changes
- ✅ **Browser Protection**: Prevents accidental tab/window close
- ✅ **Navigation Guard**: Intercepts route changes with React Router
- ✅ **Clear Actions**: "Stay and Save" vs "Leave Anyway" options

## 🛠️ Technology Stack

- **React 18.2** - Modern React with Hooks
- **React Router 6** - Client-side routing and navigation guards
- **Vite** - Fast build tool and development server
- **Modern CSS** - Custom styling with animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Installation

1. Navigate to the frontend directory:
```bash
cd infosys-internship/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
frontend/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main app with routing
    ├── App.css            # App-level styles
    └── components/
        ├── UndoDelete.jsx          # Task A component
        ├── UndoDelete.css          # Task A styles
        ├── UnsavedChanges.jsx      # Task B component
        └── UnsavedChanges.css      # Task B styles
```

## 🎨 UX Design Principles

### Forgiveness Pattern (Task A)
- **Immediate Feedback**: Action happens instantly for responsiveness
- **Recovery Window**: 5 seconds provides ample time without feeling slow
- **Progressive Urgency**: Color coding creates awareness without panic
- **Clear Communication**: User always knows what's happening and how to undo

### Prevention Pattern (Task B)
- **Smart Detection**: Only warns when there are actual changes
- **Contextual Awareness**: Shows exactly what fields were modified
- **Escape Hatch**: Allows override while making the safe choice obvious
- **Multi-layer Protection**: Guards both navigation and browser close

## 💡 Key Learning Points

### Time-based Logic
- Managing countdown timers with `useEffect`
- Cleanup of intervals to prevent memory leaks
- Visual progress indicators synced with state

### State Management
- Deep state comparison for change detection
- Tracking initial vs current vs saved states
- Managing multiple related state variables

### Navigation Guards
- Intercepting route changes with React Router
- Browser `beforeunload` event handling
- Custom warning dialogs vs native confirms

### User Experience
- Non-intrusive notifications
- Clear, actionable messaging
- Visual feedback for all interactions
- Accessibility considerations

## 🔧 Technical Implementation Highlights

### Task A Technical Details
```javascript
// Countdown timer with cleanup
useEffect(() => {
  let timer;
  if (deletedItem && countdown > 0) {
    timer = setInterval(() => {
      setCountdown(prev => prev <= 1 ? (permanentlyDelete(), 0) : prev - 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [deletedItem, countdown]);
```

### Task B Technical Details
```javascript
// Smart change detection
const hasUnsavedChanges = useCallback(() => {
  return JSON.stringify(formData) !== JSON.stringify(savedFormData);
}, [formData, savedFormData]);

// Browser protection
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (hasUnsavedChanges() && hasInteracted) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [hasUnsavedChanges, hasInteracted]);
```

## 📱 Responsive Design

Both components are fully responsive and work seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🎯 Assignment Requirements Met

### Task A Requirements
- ✅ Deletes an item
- ✅ Shows Undo option for 5 seconds
- ✅ Permanently deletes after timeout
- ✅ Includes countdown timer
- ✅ Clear messaging
- ✅ Good UX explanation (in comments and UI)
- ✅ Creative UX implementation
- ✅ Time-based logic

### Task B Requirements
- ✅ Detects unsaved changes
- ✅ Shows custom warning UI
- ✅ Allows "Stay" option
- ✅ Allows "Leave anyway" option
- ✅ Real-world behavior
- ✅ State comparison logic
- ✅ UX thinking demonstrated

## 🏆 Bonus Features

- 🎨 Beautiful gradient UI design
- 📊 Visual progress indicators
- 🎭 Smooth animations and transitions
- 📱 Fully responsive layout
- ♿ Accessibility features (focus states, keyboard navigation)
- 📝 Detailed inline documentation
- 🔄 Multiple item management (Task A)
- 📋 Complex form with multiple fields (Task B)

## 👨‍💻 Author

Built with ❤️ for the Senior Mentor Assignment

## 📄 License

This project is created for educational purposes as part of an internship assignment.

---

**Note**: Both components include extensive inline documentation explaining the UX decisions and implementation details. Check the component files for detailed comments!
