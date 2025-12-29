# NextIF Ambassador Platform - Admin Frontend

The admin portal for managing the NextIF Ambassador Program. This React-based web application provides administrators with comprehensive tools to manage ambassadors, tasks, submissions, complaints, announcements, and more.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
nextif-ambassadors-admin-frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API client configuration
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── AmbassadorListPage.tsx
│   │   ├── AnnouncementsPage.tsx
│   │   ├── BulkOnboardPage.tsx
│   │   ├── ComplaintsPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   ├── TaskManagementPage.tsx
│   │   └── TaskSubmissionsPage.tsx
│   ├── routes/         # Route definitions
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Setup Steps

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🏃 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## 🎨 Features

### 🔐 Authentication

- **First-time login** for new admins (email + last name)
- **Standard login** with email and password
- **Password reset** flow
- **JWT-based authentication** with automatic token management
- **Protected routes** with role-based access control

### 👥 Ambassador Management

- **View all ambassadors** with search and filtering
- **Create individual ambassadors** with detailed forms
- **Bulk onboarding** via CSV upload
- **Edit ambassador details**
- **Delete ambassadors**
- **Force password reset** for ambassador accounts
- **View ambassador statistics** and activity

### 📋 Task Management

- **Create tasks** (mandatory or bonus)
- **Edit and delete tasks**
- **Set deadlines and point values**
- **Configure submission requirements** (file upload, link submission, or both)
- **Activate/deactivate tasks**
- **View task statistics**

### ✅ Submission Review

- **View all submissions** for each task
- **Approve or reject submissions**
- **Provide feedback** to ambassadors
- **Filter submissions** by status (pending, approved, rejected)
- **View submitted files and links**

### 📢 Announcements

- **Create announcements** for all ambassadors
- **Edit and delete announcements**
- **Target specific ambassador groups**
- **Schedule announcements** (if implemented)

### 🎫 Complaint Management

- **View all complaints** from ambassadors
- **Update complaint status** (pending, in-progress, resolved)
- **Respond to complaints**
- **Filter and search complaints**

### 📊 Dashboard

- **Overview statistics** (total ambassadors, active tasks, pending submissions)
- **Recent activity feed**
- **Quick actions** for common tasks
- **Visual charts and graphs** (if implemented)

### 👤 Profile Management

- **View and edit admin profile**
- **Change password**
- **Update contact information**

## 🎯 Key Pages

### Login Page (`/login`)

- Email and password authentication
- Redirect to first-time login if needed
- Remember me functionality
- Password reset link

### Dashboard (`/dashboard`)

- Overview of platform statistics
- Recent activity
- Quick action buttons
- Navigation to key features

### Ambassador List (`/ambassadors`)

- Searchable and filterable table
- Bulk actions
- Quick view of ambassador details
- Link to bulk onboarding

### Bulk Onboard (`/ambassadors/bulk`)

- CSV file upload
- Template download
- Preview before import
- Validation and error handling

### Task Management (`/tasks`)

- Task creation form
- Task list with status indicators
- Edit and delete actions
- View submissions link

### Task Submissions (`/tasks/:id/submissions`)

- Submission list for specific task
- Approve/reject actions
- View submitted content
- Provide feedback

### Complaints (`/complaints`)

- Complaint list with filters
- Status management
- Response interface
- Search functionality

### Announcements (`/announcements`)

- Create new announcements
- Edit existing announcements
- Delete announcements
- Preview functionality

### Profile (`/profile`)

- View admin details
- Edit profile information
- Change password
- Account settings

## 🔒 Authentication Flow

### First-Time Login

1. Admin enters email and last name
2. System validates credentials
3. Admin is prompted to set a new password
4. Redirect to dashboard after successful setup

### Standard Login

1. Admin enters email and password
2. JWT token is received and stored
3. User is redirected to dashboard
4. Token is included in all API requests

### Password Reset

1. Admin requests password reset
2. Reset link/token is sent via email
3. Admin enters new password
4. Password is updated and user can log in

## 🎨 UI/UX Features

- **Modern, clean design** with Tailwind CSS v4
- **Smooth animations** using Framer Motion
- **Responsive layout** for all screen sizes
- **Accessible components** following WCAG guidelines
- **Loading states** for async operations
- **Error handling** with user-friendly messages
- **Toast notifications** for user feedback
- **Modal dialogs** for confirmations
- **Form validation** with real-time feedback

## 🛠️ State Management

### Zustand Store

The application uses Zustand for global state management:

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // ... other auth methods
}
```

State is persisted to localStorage for session management.

## 🌐 API Integration

### Axios Configuration

- Base URL configured via environment variables
- Automatic JWT token injection
- Request/response interceptors
- Error handling and retry logic

### API Client Example

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📤 File Upload

### Cloudinary Integration

- Direct upload to Cloudinary
- Image and document support
- Progress tracking
- Error handling
- Preview functionality

## 🎯 Routing

### Protected Routes

All routes except `/login` and `/unauthorized` are protected and require authentication.

### Route Structure

```
/login                      - Login page
/reset-password            - Password reset page
/dashboard                 - Admin dashboard
/ambassadors               - Ambassador list
/ambassadors/bulk          - Bulk onboarding
/tasks                     - Task management
/tasks/:id/submissions     - Task submissions
/complaints                - Complaints management
/announcements             - Announcements management
/profile                   - Admin profile
/unauthorized              - Unauthorized access page
```

## 🧩 Reusable Components

### Button

Customizable button component with variants (primary, secondary, danger, etc.)

### Input

Form input component with validation and error display

### Layout

Main application layout with navigation sidebar and header

### ProtectedRoute

Route wrapper for authentication and authorization checks

## 📝 Environment Variables

| Variable                        | Description              | Required |
| ------------------------------- | ------------------------ | -------- |
| `VITE_API_BASE_URL`             | Backend API base URL     | Yes      |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name    | Yes      |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes      |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Hosting

The `dist/` folder can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages

### Environment Variables

Ensure all environment variables are configured in your hosting platform.

## 🐛 Troubleshooting

### Common Issues

**Issue**: API requests fail with CORS error

- **Solution**: Ensure backend CORS is configured to allow requests from the frontend URL

**Issue**: Authentication token not persisting

- **Solution**: Check localStorage permissions and browser settings

**Issue**: Cloudinary uploads fail

- **Solution**: Verify Cloudinary credentials and upload preset configuration

**Issue**: Build fails with TypeScript errors

- **Solution**: Run `npm run build` to see detailed error messages and fix type issues

## 🤝 Contributing

1. Follow React best practices and hooks guidelines
2. Use TypeScript for type safety
3. Follow the existing component structure
4. Use Tailwind CSS for styling (avoid inline styles)
5. Add proper error handling and loading states
6. Test all features before committing

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for NextIF Ambassador Program**
