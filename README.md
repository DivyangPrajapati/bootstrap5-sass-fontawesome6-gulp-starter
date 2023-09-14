# Bootstrap 5, Sass, Font Awesome 6, and Gulp Starter

A starter template for web development with Bootstrap 5, Sass, Font Awesome 6, and Gulp.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This starter template provides a foundation for web development projects, incorporating the following technologies:

- **Bootstrap 5**: A popular CSS framework for building responsive and mobile-first websites.
- **Sass**: A CSS preprocessor that enhances your CSS with variables, mixins, and more.
- **Font Awesome 6**: A library of scalable vector icons you can customize and style using CSS.
- **Gulp**: A build tool to automate tasks like Sass compilation, minification, and more.

## Features

- Bootstrap 5 integration for responsive design.
- Sass with `gulp-sass` for easy CSS development with variables and modular styles.
- Font Awesome 6 for customizable icons.
- Gulp tasks for automating common development tasks, including Sass compilation using `gulp-sass`.

## Getting Started

Follow these steps to get this project up and running on your local machine:

1. Clone this repository.

```sh
git clone https://github.com/DivyangPrajapati/bootstrap5-sass-fontawesome6-gulp-starter.git
```

2. Navigate to the project directory.

```sh
cd bootstrap5-sass-fontawesome6-gulp-starter
```

3. Install project dependencies.

```sh
npm install
```

4. To compile Bootstrap, run the following command:

```sh
gulp bootstrap
```

5. To compile Font Awesome, run the following command:

```sh
gulp fontawesome
```

6. If you want to combine Bootstrap and Font Awesome into a single CSS file, you can use the following command:

```sh
gulp vendor
```

7. To watch for changes in your project files (Scss, JavaScript, etc.) and automatically recompile them during development, use the following command:

```sh
gulp watch
```

This task starts a development server and watches for changes, making your development workflow more efficient.

Feel free to customize these tasks or add more as needed for your specific project requirements.