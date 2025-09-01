// File: README.md
# File Manager Application

A modern, responsive file manager built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **File Operations**: List, search, upload, download, and delete files
- **Folder Management**: Create and navigate through folders
- **Bulk Operations**: Select multiple files for bulk deletion
- **Search Functionality**: Search files by name, type, or MIME type
- **Grid/List Views**: Toggle between grid and list view modes
- **Upload Progress**: Real-time upload progress tracking
- **Modern UI**: Clean, professional interface inspired by modern design trends

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **React Dropzone**: Drag & drop file uploads
- **Headless UI**: Accessible UI components

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── FileManager/      # File manager components
│   └── ui/               # Reusable UI components
├── hooks/
│   └── useFileManager.ts # File manager logic
├── lib/
│   └── api.ts            # API client
├── types/
│   └── file.ts           # TypeScript types
└── utils/
    └── helpers.ts        # Utility functions
```

## API Integration

The application includes mock API routes for demonstration. To integrate with a real backend:

1. Update the `API_BASE_URL` in `lib/api.ts`
2. Modify the API client methods as needed
3. Replace mock API routes with real backend endpoints

## Customization

### Styling
- Colors can be customized in `tailwind.config.js`
- Global styles are in `app/globals.css`
- Component-specific styles use Tailwind classes

### Features
- Add new file operations by extending the API client
- Customize file icons in `utils/helpers.ts`
- Add new view modes by modifying the FileGrid component

## Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

3. **Deploy to Vercel, Netlify, or your preferred platform**

## License

MIT License