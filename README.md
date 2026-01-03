# Contact Management Web App - MERN Stack

A modern, responsive Contact Management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- ✅ Add new contacts with validation
- ✅ View all contacts in a responsive table
- ✅ Delete contacts
- ✅ Sort contacts (by date, name, or email)
- ✅ Real-time form validation
- ✅ Client-side and server-side validation
- ✅ Success/error messages
- ✅ Fully responsive design
- ✅ Beautiful UI with gradient styling

## Tech Stack

### Frontend
- React.js
- Axios (for API calls)
- CSS3 (responsive design)
- React Hooks (useState, useEffect)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Contact_Management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb://localhost:27017/contact_management
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contact_management?retryWrites=true&w=majority
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Project Structure

```
Contact_Management/
├── backend/
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contacts.js         # API endpoints
│   ├── server.js               # Express server
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.js  # Form component
│   │   │   └── ContactList.js  # List component
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── ContactForm.css
│   │   │   ├── ContactList.css
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Create Contact
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello"
}
```

### Get All Contacts
```
GET /api/contacts
```

### Get Single Contact
```
GET /api/contacts/:id
```

### Delete Contact
```
DELETE /api/contacts/:id
```

## Validation Rules

### Name
- Required
- Minimum 2 characters

### Email
- Required
- Must be valid email format

### Phone
- Required
- 10 digits or international format (+country code)

### Message
- Optional
- Any text

## Features Breakdown

### Form Validation
- Real-time validation feedback
- Error messages below each field
- Submit button disabled when form is invalid
- Success message on submission

### Contact List
- Displays all submitted contacts
- Sortable by date, name, or email
- Delete functionality with confirmation
- Responsive table that adapts to mobile
- Shows total count of contacts

### Responsive Design
- Mobile-first approach
- Works on screens from 320px to 2560px
- Optimized for tablets and desktops
- Grid layout that adapts to screen size

## Running the Application

### Development Mode
1. Start MongoDB
2. In `backend/` directory: `npm run dev`
3. In `frontend/` directory: `npm start`
4. Open `http://localhost:3000` in your browser

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend can be deployed to services like Heroku, Render, etc.
```

## Deployment Options

### Frontend
- Vercel (Recommended for React apps)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend
- Heroku
- Render
- Railway
- AWS EC2
- DigitalOcean

### Database
- MongoDB Atlas (free tier available)
- Self-hosted MongoDB
- AWS DocumentDB

## Testing the Application

1. Fill out the contact form with:
   - Name: At least 2 characters
   - Email: Valid email format
   - Phone: 10 digits
   - Message: Optional

2. Click "Add Contact"

3. See the contact appear in the list below

4. Try sorting by different options

5. Delete a contact to test that functionality

## Error Handling

- Network errors are caught and displayed
- Validation errors prevent submission
- Server-side validation ensures data integrity
- User-friendly error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Author

Created as part of a MERN Stack Interview Challenge

## License

MIT License - feel free to use this project as a reference

## Future Enhancements

- Edit existing contacts
- Search functionality
- Export contacts to CSV/PDF
- Contact categories/groups
- Email verification
- Two-factor authentication
- Dark mode
- Advanced filtering
- Contact images/avatars
