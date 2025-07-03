# Figmenta Studio Website

A modern, interactive website for Figmenta Studio built with Next.js 14, featuring fluid animations, dynamic page transitions, and a headless CMS integration with Sanity.io.

## 🌟 Features

- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Internationalization**: Full support for English and Italian languages
- **Dynamic Routing**: Advanced routing with locale support
- **Interactive UI Elements**:
  - Fluid cursor animations
  - Smooth page transitions
  - Interactive carousels with GSAP animations
  - Custom cursor effects
  - Responsive design for all devices
- **Content Management**: Headless CMS integration with Sanity.io
- **Performance Optimized**: Server-side rendering and static generation
- **SEO Ready**: Built-in metadata optimization and dynamic SEO tags

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion
- **CMS**: Sanity.io
- **State Management**: React Context
- **Form Handling**: Custom implementation
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                   # Next.js app router pages
│   └── [locale]/         # Localized routes
├── components/           # React components
│   ├── branding/        # Branding-related components
│   ├── contact/         # Contact form components
│   ├── digital-products/ # Digital products components
│   ├── home-page/       # Homepage components
│   ├── layout/          # Layout components
│   ├── slug/            # Dynamic page components
│   └── ui/              # Reusable UI components
├── lib/                 # Utility functions and configurations
│   ├── i18n/           # Internationalization setup
│   └── sanity/         # Sanity.io configuration and queries
├── styles/             # Global styles and CSS modules
└── types/              # TypeScript type definitions

studio-figmenta/        # Sanity Studio configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Sanity.io account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Figmenta/f-studio25.git
   cd f-studio25
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=your-site-url
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Setting up Sanity Studio

1. Navigate to the Sanity Studio directory:
   ```bash
   cd studio-figmenta
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the Sanity Studio:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🎨 Key Features Explained

### Page Transitions
The website uses custom page transitions with overlay animations and loaders, managed by the `next-transition-router` package. Transitions are smooth and provide visual feedback during navigation.

### Interactive Elements
- **Fluid Cursor**: Custom cursor effects with fluid animations
- **Image Carousels**: Interactive carousels with speed control and touch support
- **Dynamic Solutions**: Interactive solution cards with hover effects
- **Contact Form**: Animated contact form with validation

### Internationalization
The website supports English and Italian languages with:
- Dynamic content loading based on locale
- SEO-friendly URLs with locale prefixes
- Automatic language detection
- Easy language switching

### Content Management
All content is managed through Sanity.io, including:
- Case studies
- Branding solutions
- Digital products
- Contact information
- FAQ sections

## 🔧 Configuration

### Customizing Animations
Animation settings can be adjusted in:
- `src/components/provider.tsx` for page transitions
- `src/components/ui/splash-cursor.jsx` for cursor effects
- `src/components/layout/carousel-with-speed.tsx` for carousel animations

### Adding New Languages
1. Add new locale in `src/lib/i18n/constants.ts`
2. Create corresponding content in Sanity Studio
3. Update language switcher component

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Custom breakpoints
- Touch-friendly interactions
- Optimized images and animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Credits

Developed by Figmenta Team
