# Bad Music Player

## Overview

Bad Music Player is exactly what it implies. I created this because i wanted something simple for my
own personal use and well thought might as well share.

## Technologies Used

- **React**: React is a free and open-source front-end JavaScript library for building user interfaces.
- **Material-UI**: React components that implement Material Design.
- **Redux**: Redux is an open-source JavaScript library for managing and centralizing application state.

## Building the Application

To build the application for different operating systems, you can use the `electron-builder` package. Follow the instructions below for each supported OS.

### Build for Windows

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lostsoul12345/bad-music-player.git
   cd bad-music-player
   ```

2. **Install needed libraries:**

   ```bash
   npm install
   ```

3. **Run the build command:**

   ```bash
   npm run electron-pack
   ```
4. **Install:**

Now all you have to do is run the `bad-music-player Setup x.x.x.exe`

### Build for macOS

1. **Prepare your environment:**

   You will need a macOS system with Xcode installed. Ensure that you have the necessary tools and permissions for macOS app signing.

2. **Run the build command:**

   ```bash
   npm install
   npm run electron-pack
   ```

   This will generate a `.dmg` file in the `dist/` directory.

### Build for Linux

1. **Prepare your environment:**

   You will need a Linux system with necessary tools for building Linux applications. You might need packages like `fakeroot` and `dpkg` for Debian-based distributions.

2. **Run the build command:**

   ```bash
   npm install
   npm run electron-pack
   ```

   This will generate packages suitable for different Linux distributions in the `dist/` directory, such as `.deb` or `.AppImage` files.

## Running the Application

After building, you can run the installer or application directly from the `dist/` directory.

- **Windows:** Double-click the `.exe` file.
- **macOS:** Open the `.dmg` file and drag the application to the `Applications` folder.
- **Linux:** Use the appropriate package manager or run the `.AppImage` file directly.