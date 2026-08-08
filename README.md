# Gary Alulu - Digital Product Designer Portfolio

This is the official portfolio for Gary Alulu, a visionary Digital Product Designer with over 6 years of experience crafting premium, user-centric experiences.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org) (React)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB (for storing projects and form submissions)
- **Storage:** Cloudinary (for storing images and resumes)
- **Icons:** Lucide React

## Features
- **Premium Glassmorphic UI:** Smooth, high-fidelity UI with advanced backdrop blurs, gradients, and custom scrollbars.
- **Dynamic Projects Showcase (/work):** Projects are fetched directly from MongoDB and categorized dynamically. Includes custom filtering and smooth animations.
- **Bento Grid Gallery (/gallery):** An interactive, masonry-style layout using opposite scroll dynamics on hover.
- **Integrated Admin Dashboard (/admin):** A secure admin panel for uploading new projects, managing gallery images, uploading resumes, and viewing contact messages.
- **Interactive About Page (/about):** A story-driven about page featuring hover-activated tooltip modals over the hero section, plus full placeholder sections for in-depth storytelling.
- **Interactive Contact Form:** Fully functional form that securely stores submissions to MongoDB.

## Getting Started Locally

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file at the root and provide the following keys:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Admin Auth
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Deployment
This project is configured to be seamlessly deployed on [Vercel](https://vercel.com/). Connect your GitHub repository to Vercel and ensure your environment variables are set in the Vercel project settings.
