# 🎓 Teacher Management System

A modern, full-featured teacher management application built with Next.js, React, and TypeScript. This system provides comprehensive tools for managing teacher information, schedules, and administrative tasks.

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login System** - Modern authentication with form validation
- **Session Management** - Persistent login state with local storage
- **Protected Routes** - Secure access to administrative features

### 👥 Teacher Management
- **Complete Teacher Profiles** - Store detailed information including:
  - Personal details (name, email, phone, address)
  - Professional qualifications with add/edit/delete functionality
  - Profile pictures and contact information
- **Interactive Teacher List** - Search, filter, and manage all teachers
- **CRUD Operations** - Add, edit, and delete teacher records
- **Active Teacher Tracking** - Monitor teacher status and availability

### 📅 Schedule Management
- **Interactive Schedule Grid** - Visual weekly schedule interface
- **Dynamic Event Scheduling** - Create and manage teacher appointments
- **Availability Toggle** - Click-to-toggle availability for each time slot
- **Teacher Assignment** - Assign specific teachers to schedule slots
- **Event Management** - Add, edit, and delete scheduled events

### 🎛️ Dashboard & Analytics
- **Real-time Dashboard** - Overview of system statistics
- **Active Teachers Display** - Quick view of currently active teachers
- **System Overview** - Key metrics and quick actions

### ⚙️ Settings & Configuration
- **Profile Settings** - User profile management
- **System Preferences** - Application configuration options
- **Data Persistence** - Local storage for all application data

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Interactive Sidebar** - Navigation with active state tracking
- **Modern Styling** - Built with Tailwind CSS for beautiful interfaces
- **Smooth Animations** - Enhanced user experience with transitions
- **Form Validation** - Real-time feedback and error handling

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Heroicons
- **State Management**: Local Storage + React State
- **Development**: ESLint, Turbopack

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teacher-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── login/          # Authentication pages
│   ├── teachers/       # Teacher management pages
│   ├── schedule/       # Schedule management pages
│   └── settings/       # Settings pages
├── components/         # Reusable UI components
├── features/          # Feature-specific components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── styles/            # Global styles and CSS
```

## 🔧 Key Features Implementation

### Data Persistence
- All data is stored in browser's local storage
- Automatic data persistence across sessions
- No external database required

### Component Architecture
- Modular component design
- Reusable UI components
- Feature-based organization

### Form Handling
- Comprehensive form validation
- Real-time feedback
- Error handling and user notifications

## 🎯 Use Cases

This teacher management system is ideal for:
- **Educational Institutions** - Manage teacher information and schedules
- **Tutoring Centers** - Track teacher availability and assignments
- **Training Organizations** - Coordinate instructor schedules
- **Schools & Universities** - Administrative teacher management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from Heroicons
- Modern development practices with TypeScript

---

**Ready to manage your teachers efficiently? Get started today! 🚀**
